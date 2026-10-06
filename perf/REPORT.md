# Home performance results

Measured on 2026-10-06 using [huashu-flash](https://github.com/alchaincyf/huashu-flash). Baseline: `d6f2412b0d0c766a30655e51cce700efd83f00ef`. Home's component styling, layouts, typography and interactions are preserved.

## Changes

- Externalize embedded fonts through Docusaurus's existing font loader. Browsers fetch the formats and subsets they use instead of receiving every embedded font in global CSS. All 55 font-face definitions preserve their families, styles, weights and Unicode ranges; all 130 font file variants retain their exact bytes.
- Import `Problem` only in MDX that uses it, through a compiler transform. Share its catalog across those routes. Ordinary articles no longer require the entire problem/solution catalog; authors still use `<Problem>` without adding imports. Docusaurus preloads required route dependencies before hydration.
- Recompress the PNG embedded in the logo losslessly. SVG framing, PNG metadata and all 4,195,328 decompressed scanline bytes are identical.
- Add fixed CI byte budgets and compiler checks. Repair public deployment verification so minified HTML with unquoted attributes cannot silently skip CSS/JavaScript checks; verify bilingual contest HTML as well.

## Paired measurements

Production builds, fresh Chromium contexts, disabled cache, actual HTTP gzip downloads. Fast 4G profile: 20 ms latency, 524,288 B/s down and 393,216 B/s up. Desktop: English, 1440 × 900, CPU rate 1. Each primary page has 20 observations per version, alternating AB/BA. No build or other browser ran during timing. Iconify fixtures and empty Algolia responses are identical; analytics is blocked.

The primary endpoint is an actual theme change after clicking its working button, sampled in the page. These are navigation-to-interaction times, not just SSR or skeleton appearance.

| Desktop page                  | Baseline p75 |  Final p75 | Reduction |
| ----------------------------- | -----------: | ---------: | --------: |
| Home                          |   1,836.7 ms | 1,291.9 ms |     29.7% |
| Ordinary document, Logic      |   3,631.6 ms | 1,788.7 ms |     50.7% |
| UI documentation, Application |   3,361.5 ms | 1,533.8 ms |     54.4% |

The halving goal was met for the two document routes. Homepage interaction improved 29.7%. The three primary pages completed all 120 observations successfully.

Font readiness p75 improved 30.5%, 49.8% and 53.7% respectively. The complete tested sequence—theme interaction, font readiness, then opening search and entering text—improved from 3,335.0 to 2,706.2 ms on Home, 5,076.5 to 3,230.5 ms on Logic and 4,779.1 to 2,962.3 ms on Application. This includes the same Playwright action/poll overhead; it is not pure search latency, earliest search availability or search-result delivery time.

Supplemental English contest-page testing uses the same desktop profile, with 10 observations per version:

| Trie operation             | Baseline p75 |  Final p75 | Reduction |
| -------------------------- | -----------: | ---------: | --------: |
| Theme interaction          |   3,497.1 ms | 3,085.8 ms |     11.8% |
| Open complete problem code |   3,614.8 ms | 3,245.4 ms |     10.2% |

This route still needs the complete catalog and therefore improves less than ordinary documents. Its statement and code remain fully available.

Supplemental Chinese mobile-viewport testing uses 390 × 900 and CPU rate 4, with 10 observations per version and page. It uses desktop Chromium with a smaller viewport and CPU throttling, rather than a physical phone:

| Mobile operation        | Baseline p75 |  Final p75 | Reduction |
| ----------------------- | -----------: | ---------: | --------: |
| Home menu opens         |   2,815.7 ms | 1,874.1 ms |     33.4% |
| Home theme interaction  |   2,990.8 ms | 2,247.1 ms |     24.9% |
| Logic menu opens        |   4,517.5 ms | 2,629.6 ms |     41.8% |
| Logic theme interaction |   5,068.5 ms | 3,152.2 ms |     37.8% |

All 180 final paired observations across the three profiles succeed, including every required mobile menu endpoint. Desktop, mobile and contest results remain separate.

Mobile timing requires an on-screen, hit-testable theme button, after the real menu opens. An initial probe incorrectly accepted the translated-offscreen sidebar button; those mobile results were discarded. The corrected probe records the menu endpoint independently and marks a missing endpoint as a failure. Desktop's first target was already visible, so the primary desktop results remain valid.

## Resources

Node gzip sizes, English locale:

| Asset      |  Baseline |    Final | Reduction |
| ---------- | --------: | -------: | --------: |
| Global CSS | 432,316 B | 62,945 B |     85.4% |
| Logo SVG   |  39,428 B | 22,395 B |     43.2% |

The Chinese global CSS shows the same 85.4% reduction. Main JavaScript grows slightly, about 0.36%; runtime shrinks. Required initial Home scripts are approximately unchanged, while ordinary documents lose the large catalog dependency.

`resourceEntries`, `transferBytes` and `jsBytes` count completed same-origin resource entries through the tested sequence plus 200 ms. They include existing Docusaurus viewport-link prefetches and exclude unfinished requests. Home's faster hydration lets more existing prefetches finish, so its windowed JS count increases despite no added links or required dependencies. Use the static entry/route budgets for startup-byte comparisons; these windowed metrics are diagnostics.

## Verification

- Both locale production builds and the merged-site validator pass.
- All 1,098 generated HTML pages match in Markdown text, headings/anchors, SEO metadata and Problem panel counts: 966 Markdown pages, 242 Problem pages and 476 panels, with no missing or added pages.
- 144 functional checks pass across desktop/mobile, both languages and both themes. They cover actual search input, theme controls, avatar dragging, exact Markdown copy, print, complete statements and code tabs.
- 20 screenshot comparisons pass: 13 PNGs are byte-identical; seven differ only at raster edges by at most two channel levels, affecting at most 93 pixels (0.0283%). An identical-build A/A control reproduces such Chromium raster variation. The checker permits at most two channel levels and 0.5% changed pixels, without masking regions.
- A two-second delayed Problem chunk test passes in both locales. SSR statements never disappear; early controls stay inert until required route dependencies arrive. Subsequent SPA navigation, tabs, collapse, theme switching and printing work without hydration errors.
- 12 compiler/render cases verify conditional/helper JSX, ordinary documents, explicit imports, literal text/code fences and idempotence.
- Font and lossless-logo byte assertions pass. Both locales meet all six CI byte limits.

The first experiment used `React.lazy` with Suspense. Delayed-chunk testing exposed a disappearing SSR statement after early context updates, so that implementation was discarded. Compiler-driven route imports preserve Docusaurus's existing hydration/preload contract.

## Evidence and limits

[Raw observations](results/measurements.csv), [p50/p75/p95 summaries](results/summary.csv) and [first-observation resource waterfalls](results/waterfalls.csv) accompany the [asset proof](results/assets.json), [SSR proof](results/ssr-parity.json), [functional/screenshot proof](results/guards.json), [raster control](results/raster-control.json) and [slow-chunk proof](results/slow-problem.json). [Reproduction commands](README.md) and the [brief](BRIEF.md) specify the protocol.

LCP, CLS and long tasks are diagnostics during the tested operations, not neutral Core Web Vitals or INP. Primary desktop CLS is zero in both versions. Byte budgets cover entry CSS/main/runtime and the synchronous script unions of three representative routes per locale; the unions overlap. They do not guarantee every route, lazy feature or third-party service's performance. Limits use the verified final build plus 3%, rounded up to 1 KiB; tightening is reviewed manually.

These are laboratory results. This environment's outbound proxy rejected live requests to both Home and a control site with HTTP 403, so live latency and real-user gains are unverified. Publication uses the existing workflow's exact-build HTML and entry-asset comparisons, followed by GitHub Pages deployment.
