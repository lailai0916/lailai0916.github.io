from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET


class PageLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonicals = []
        self.assets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs["href"])
        if tag == "script" and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.assets.append(attrs["href"])


build = Path("build")
assert (build / ".nojekyll").is_file(), "Missing .nojekyll"
for locale, prefix in [("en", ""), ("zh-Hans", "/zh-Hans")]:
    root = build / prefix.lstrip("/")
    locations = ET.parse(root / "sitemap.xml").findall("{*}url/{*}loc")
    assert locations, f"Empty {locale} sitemap"
    for location in locations:
        url = urlsplit(location.text)
        assert url.netloc == "lailai.one", f"Unexpected sitemap URL: {location.text}"
        if prefix:
            assert url.path.startswith(prefix + "/"), f"Incorrect locale path: {url.path}"
        else:
            assert not url.path.startswith("/zh-Hans/"), f"Incorrect locale path: {url.path}"
        route = unquote(url.path).strip("/")
        file = build / (f"{route}.html" if route else "index.html")
        if url.path == prefix + "/":
            file = root / "index.html"
        assert file.is_file(), f"Missing page: {file}"

    for route in ["", "about", "travel", "resources", "insights", "blog", "blog/overview"]:
        file = root / (f"{route}.html" if route else "index.html")
        page = PageLinks()
        page.feed(file.read_text())
        expected = f"https://lailai.one{prefix}/{route}"
        assert page.canonicals == [expected], f"Incorrect canonical in {file}: {page.canonicals}"
        assert page.assets, f"Missing scripts and styles in {file}"
        for asset in page.assets:
            url = urlsplit(asset)
            if url.netloc or not url.path.startswith("/"):
                continue
            path = build / unquote(url.path).lstrip("/")
            assert path.is_file(), f"Missing asset: {path}"
    print(f"{locale}: {len(locations)} sitemap pages and key page assets verified")
