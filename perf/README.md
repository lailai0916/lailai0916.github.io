# Home performance

The [brief](BRIEF.md) defines the scope and measurement protocol. [Results](REPORT.md) record the validated changes and their limits. The baseline is `d6f2412b0d0c766a30655e51cce700efd83f00ef`.

## Reproduce

Use Node 24 and production builds of the baseline and candidate. Build each locale separately if the machine cannot fit a bilingual build in memory; combine the English root with the Chinese output under `zh-Hans/`. Run the budget check immediately after each locale build because `.docusaurus/` contains the latest locale's manifests:

```bash
BUILD_LOCALE=en npm run build -- --locale en
python3 .github/scripts/check-performance.py --locale en
BUILD_LOCALE=zh-Hans npm run build -- --locale zh-Hans
python3 .github/scripts/check-performance.py --locale zh-Hans
node perf/bench/remark.mjs
```

Browser scripts require Playwright and Chromium, installed outside the site's production dependencies. The recorded run uses Playwright 1.62.1 and Chromium 151.0.7922.173. Expose Playwright through `NODE_PATH` if needed, and set `CHROMIUM_PATH` to the browser executable; it defaults to `/usr/bin/chromium`.

Start the two identical servers in separate terminals, then run checks and timings sequentially:

```bash
node perf/bench/server.mjs ../home-baseline/build 5200
node perf/bench/server.mjs build 5202

node perf/bench/assets.mjs --a ../home-baseline/build --b build
node perf/bench/ssr-parity.mjs ../home-baseline/build build
node perf/bench/guard.mjs --a http://127.0.0.1:5200 --b http://127.0.0.1:5202
node perf/bench/slow-problem.mjs --url http://127.0.0.1:5202 --chunk 'assets/js/problem\.'
node perf/bench/measure.mjs --a http://127.0.0.1:5200 --b http://127.0.0.1:5202 --cases home,logic,ui --runs 20
```

`measure.mjs` supports `--locale`, `--width`, `--cpu`, `--cases`, `--runs` and `--output`. Keep profiles separate. Each observation uses a fresh context, disables cache, throttles actual HTTP requests and verifies live controls. Theme readiness is sampled in the page. The search endpoint follows font readiness and, on the contest route, opening the code tab; it includes Playwright opening the dialog and entering text. It is the tested sequence's completion time, not the earliest possible search availability. Font readiness and contest code readiness are recorded separately. The two versions alternate AB/BA; do not run builds or other browsers during timing.

The mobile probe opens the real menu and requires the theme button's center to be in the viewport and hit-testable. A missing mobile menu endpoint fails the observation. `mounted` records a heading with layout height, not FCP. LCP, CLS and long tasks are diagnostics collected through the tested operations and 200 ms afterward, not neutral page-load Core Web Vitals or INP measurements.

`guard.mjs` checks both languages, themes and desktop/mobile layouts. Identical-build control screenshots showed tiny Chromium raster differences at SVG and caret edges. Comparison permits at most two levels per RGBA channel, affecting at most 0.5% of pixels; it records bounds and counts and rejects larger changes. `slow-problem.mjs` holds the required Problem chunk for two seconds and verifies SSR continuity, early controls and subsequent SPA navigation. These are correctness checks, not latency comparisons. `assets.mjs` verifies exact font-face descriptors/file bytes and lossless logo scanlines/metadata. `ssr-parity.mjs` compares every generated HTML page's Markdown text, headings, SEO and Problem panel count.

Iconify fixtures contain only icons used by the tested pages: 93 icons from `@iconify-json/lucide` 1.2.139, nine from `@iconify-json/simple-icons` 1.2.99 and two from `@iconify-json/tabler` 1.2.41. Both variants use the same fixture, an empty Algolia response and blocked analytics; the site's own HTML, CSS, scripts, fonts and images are real HTTP downloads. Fixtures do not validate live third-party service availability.

## CI budgets

[budgets.json](budgets.json) limits gzip bytes for entry CSS, main/runtime JavaScript and the synchronous scripts needed by three representative routes. The checker uses Docusaurus's generated route/client manifests, includes nested docs wrappers and deduplicates files. It fails on missing assets or unexpected manifest structure. Fonts must remain external and self-hosted.

Limits are the verified final build plus 3%, rounded up to 1 KiB. They prevent resource growth; browser measurements verify that the resource improvements also help actual interactions. Python and Node gzip implementations produce slightly different sizes, so CI limits are calibrated with the Python checker, while transfer evidence uses the Node HTTP server.
