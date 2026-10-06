# Home performance

Measured on 2026-10-06 using [huashu-flash](https://github.com/alchaincyf/huashu-flash). Baseline: `d6f2412b0d0c766a30655e51cce700efd83f00ef`. The font delivery, Problem imports and lossless logo compression preserve Home's styling and layout.

Production builds, cold cache, Chromium, 20 ms latency, 524,288 B/s downstream and 393,216 B/s upstream. Desktop: English, 1440 × 900, CPU rate 1; 20 observations per version and page, alternating AB/BA. The endpoint is an actual theme change after clicking its working button. Iconify and Algolia fixtures are identical; analytics is blocked.

| Desktop page                 | Baseline p75 |  Final p75 | Reduction |
| ---------------------------- | -----------: | ---------: | --------: |
| Home                         |   1,836.7 ms | 1,291.9 ms |     29.7% |
| Logic                        |   3,631.6 ms | 1,788.7 ms |     50.7% |
| Application UI documentation |   3,361.5 ms | 1,533.8 ms |     54.4% |

Supplemental Chinese mobile-viewport tests use 390 × 900 and CPU rate 4, with 10 observations per version and page. Home's theme endpoint improves 24.9%; Logic improves 37.8%. English Trie testing improves 11.8%, with 10 observations per version. These profiles remain separate; all 180 final paired observations succeed.

Global CSS gzip decreases from 432,316 to 62,945 bytes (85.4%). Logo gzip decreases from 39,428 to 22,395 bytes (43.2%). All 55 font-face definitions and 130 font variants are preserved; SVG framing, PNG metadata and decompressed logo scanlines remain identical. Ordinary MDX no longer loads the entire Problem catalog.

Verification passes for all 1,098 generated HTML pages, 144 functional checks and 20 screenshot comparisons. Screenshot tolerance is at most two RGBA channel levels affecting at most 0.5% of pixels, justified by an identical-build raster control. Delaying the Problem chunk by two seconds preserves SSR statements and subsequent interactions in both languages.

CI retains the 12 compiler/render assertions in [check-problem-imports.mjs](../.github/scripts/check-problem-imports.mjs). [check-performance.py](../.github/scripts/check-performance.py) checks six overlapping byte budgets per locale using Docusaurus's manifests and [performance-budgets.json](../.github/performance-budgets.json). Limits are the verified build plus 3%, rounded up to 1 KiB. Run the checks from the repository root:

```bash
node .github/scripts/check-problem-imports.mjs
python3 .github/scripts/check-performance.py --locale en
```

Run the byte check immediately after the matching locale build. These are laboratory results; live latency and real-user gains remain unverified. Detailed tools and raw records are archived outside the current repository tree; their original snapshot is also available in commit `a64becab59cb334d43dbf4db5b9da140136ba945`.
