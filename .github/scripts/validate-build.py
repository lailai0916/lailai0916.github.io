from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlsplit
import xml.etree.ElementTree as ET


class PageLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonicals = []
        self.assets = []
        self.links = []
        self.stat_numbers = []
        self.ids = set()
        self.heading_links = []
        self.heading_errors = []
        self._in_heading = False
        self._stat_number = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self._in_heading = True
        if self._in_heading:
            for name, value in attrs.items():
                if value and any(char in value for char in ("\x00", "\ufffd")):
                    self.heading_errors.append(f"Invalid character in {tag}[{name}]")
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs["href"])
        if tag == "script" and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") == "stylesheet":
            self.assets.append(attrs["href"])
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
            classes = attrs.get("class", "").split()
            if "hash-link" in classes or "table-of-contents__link" in classes:
                self.heading_links.append(attrs["href"])
        if tag == "div" and "statNumber__" in attrs.get("class", ""):
            self._stat_number = []

    def handle_data(self, data):
        if self._in_heading and any(char in data for char in ("\x00", "\ufffd")):
            self.heading_errors.append("Invalid character in heading text")
        if self._stat_number is not None:
            self._stat_number.append(data)

    def handle_endtag(self, tag):
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self._in_heading = False
        if tag == "div" and self._stat_number is not None:
            self.stat_numbers.append("".join(self._stat_number).strip())
            self._stat_number = None


def archive_years(file, prefix):
    page = PageLinks()
    page.feed(file.read_text())
    return {
        parse_qs(urlsplit(href).query)["year"][0]
        for href in page.links
        if urlsplit(href).path == f"{prefix}/blog/archive"
        and "year" in parse_qs(urlsplit(href).query)
    }


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
        page = PageLinks()
        page.feed(file.read_text())
        assert not page.heading_errors, f"Corrupted heading in {file}: {page.heading_errors}"
        for href in page.heading_links:
            fragment = unquote(urlsplit(href).fragment)
            assert fragment and fragment in page.ids, f"Missing heading target in {file}: {href}"

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

    years = archive_years(root / "blog/archive.html", prefix)
    assert years, f"Empty {locale} blog archive years"
    for route in ["blog/tags/solution", "blog/authors/lailai"]:
        file = root / f"{route}.html"
        assert archive_years(file, prefix) == years, f"Incorrect archive years in {file}"

    overview = PageLinks()
    overview.feed((root / "blog/overview.html").read_text())
    assert overview.stat_numbers and overview.stat_numbers[0] != "0", f"Empty {locale} blog overview"
    print(f"{locale}: {len(locations)} sitemap pages, heading links and key page assets verified")
