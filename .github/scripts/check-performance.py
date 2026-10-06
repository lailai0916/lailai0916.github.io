import argparse
import gzip
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit


class EntryAssets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.css = set()
        self.js = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.css.add(attrs["href"])
        if tag == "script" and attrs.get("src"):
            self.js.add(attrs["src"])


def flatten(value):
    if isinstance(value, str):
        return {value}
    if isinstance(value, dict):
        return set().union(*(flatten(item) for item in value.values()))
    if isinstance(value, list):
        return set().union(*(flatten(item) for item in value))
    raise ValueError(f"Unexpected route chunk value: {value!r}")


def route_path(key):
    route, suffix = key.rsplit("-", 1)
    if not re.fullmatch(r"[0-9a-f]{3}", suffix):
        raise ValueError(f"Unexpected Docusaurus route key: {key}")
    return route


def measure(args):
    build = Path(args.build_dir).resolve()
    prefix = "/zh-Hans/" if args.locale == "zh-Hans" else "/"
    locale_build = build / "zh-Hans" if args.locale == "zh-Hans" and (build / "zh-Hans/index.html").exists() else build
    generated = Path(args.generated_dir)
    manifest = json.loads((generated / "client-manifest.json").read_text())
    routes = json.loads((generated / "routesChunkNames.json").read_text())
    if not isinstance(manifest.get("entrypoints"), list) or not manifest["entrypoints"]:
        raise ValueError("Docusaurus manifest entrypoints are missing")
    if not all(isinstance(manifest.get(key), dict) and manifest[key] for key in ["origins", "assets"]):
        raise ValueError("Docusaurus manifest origins/assets are missing")
    if not isinstance(routes, dict) or not routes:
        raise ValueError("Docusaurus route chunk map is missing")

    def local_path(url):
        parsed = urlsplit(url)
        if parsed.netloc:
            return None
        if not parsed.path.startswith(prefix):
            raise ValueError(f"Entry asset does not match locale {args.locale}: {url}")
        return file_path(parsed.path[len(prefix):])

    def file_path(relative):
        target = (locale_build / relative).resolve()
        if not target.is_relative_to(locale_build) or not target.is_file():
            raise ValueError(f"Missing or invalid build asset: {relative}")
        return target

    def assets_for(names, inline_names):
        files = set()
        for name in names:
            chunks = manifest["origins"].get(name)
            # The generated site config is already in main, so its optimized import has no origin.
            if chunks is None and name in inline_names:
                continue
            if not isinstance(chunks, list) or not chunks:
                raise ValueError(f"Manifest origin is missing: {name}")
            for chunk in chunks:
                assets = manifest["assets"].get(chunk)
                if not isinstance(assets, dict) or not assets:
                    raise ValueError(f"Manifest chunk assets are missing: {chunk}")
                for record in assets.get("js", []):
                    if not record["publicPath"].startswith(prefix):
                        raise ValueError(f"Manifest does not match locale {args.locale}")
                    files.add(file_path(record["file"]))
        return files

    parser = EntryAssets()
    parser.feed((locale_build / "index.html").read_text())
    css = {target for url in parser.css if (target := local_path(url)) is not None}
    js = {target for url in parser.js if (target := local_path(url)) is not None}
    main = {target for target in js if target.name.startswith("main.")}
    runtime = {target for target in js if target.name.startswith("runtime~main.")}
    if not css or len(main) != 1 or len(runtime) != 1:
        raise ValueError("Expected CSS/main/runtime entry assets are missing")
    for target in css:
        stylesheet = target.read_text()
        if "data:font/" in stylesheet:
            raise ValueError(f"Fonts must remain external: {target.name}")
        for url in re.findall(r"url\(([^)]+)\)", stylesheet):
            url = url.strip("\"'")
            if re.search(r"\.(?:woff2?|ttf|eot|otf)(?:[?#]|$)", url):
                if local_path(url) is None:
                    raise ValueError(f"Fonts must remain self-hosted: {url}")
    sizes = {}

    def zipped(files):
        for target in files:
            if target not in sizes:
                sizes[target] = len(gzip.compress(target.read_bytes(), compresslevel=9, mtime=0))
        return sum(sizes[target] for target in files)

    metrics = {"entryCssGzip": zipped(css), "entryMainGzip": zipped(main), "entryRuntimeGzip": zipped(runtime)}
    details = {}
    for route in ["/", "/docs/note/math/basic/logic", "/docs/project/ui/application"]:
        pathname = prefix + route.lstrip("/")
        selected = [value for key, value in routes.items() if route_path(key) == pathname]
        if len(selected) != 1:
            raise ValueError(f"Expected one route tuple for {pathname}, found {len(selected)}")
        if route.startswith("/docs/"):
            # Docusaurus preloads the nested docs wrappers together with the leaf route.
            wrappers = [value for key, value in routes.items() if route_path(key) == prefix + "docs"]
            if not wrappers:
                raise ValueError("Docusaurus docs wrapper tuples are missing")
            selected.extend(wrappers)
        names = set(manifest["entrypoints"]).union(*(flatten(value) for value in selected))
        inline_names = {value["config"] for value in selected if isinstance(value.get("config"), str)}
        initial = js | assets_for(names, inline_names)
        metrics[f"{route}:initialJsGzip"] = zipped(initial)
        details[route] = {"path": pathname, "files": sorted(str(target.relative_to(locale_build)) for target in initial)}
    return {"locale": args.locale, "metrics": metrics, "routes": details}


def main():
    parser = argparse.ArgumentParser(description="Check Home entry and synchronous route asset budgets.")
    parser.add_argument("--locale", choices=["en", "zh-Hans"], required=True)
    parser.add_argument("--build-dir", default="build")
    parser.add_argument("--generated-dir", default=".docusaurus")
    parser.add_argument("--budgets", default=".github/performance-budgets.json")
    parser.add_argument("--report-only", action="store_true")
    args = parser.parse_args()
    report = measure(args)
    print(json.dumps(report, indent=2))
    if args.report_only:
        return
    budgets = json.loads(Path(args.budgets).read_text())[args.locale]
    if set(budgets) != set(report["metrics"]):
        raise ValueError("Budget metrics must exactly match the measured metrics")
    failures = [f"{key}: {actual} > {budgets[key]} gzip bytes" for key, actual in report["metrics"].items() if actual > budgets[key]]
    if failures:
        raise SystemExit("Performance budget exceeded:\n" + "\n".join(failures))


if __name__ == "__main__":
    main()
