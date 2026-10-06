# Home performance brief

Apply [huashu-flash](https://github.com/alchaincyf/huashu-flash) to lailai's Home. The baseline is commit `d6f2412b0d0c766a30655e51cce700efd83f00ef`.

## Scope

Preserve the component styles, layout, typography, images, animations, saved preferences, accessibility, SEO and analytics. Optimize resource delivery and imports. Do not change Home's design or the shared UI package.

The user previously authorized publishing, pushing and deployment. Use the existing deployment workflow after verification; do not change hosting, DNS or CDN configuration.

## Operations

| Page              | Route                          | Verified usable endpoint                                                                |
| ----------------- | ------------------------------ | --------------------------------------------------------------------------------------- |
| Home              | `/`                            | Theme changes after a click; search opens and accepts text.                             |
| Ordinary document | `/docs/note/math/basic/logic`  | Article is present and the same navbar actions work.                                    |
| UI documentation  | `/docs/project/ui/application` | Document and controls load; the same navbar actions work.                               |
| Contest document  | `/docs/contest/string/trie`    | Complete P8306 statement remains visible; statement/code tabs, collapse and print work. |

SSR text alone does not count as interactive. Record first visible heading, working theme control and working search separately. Contest component readiness is checked separately from the ordinary-document timing.

## Measurement

- Production builds of both locales, identical local gzip HTTP servers.
- Fresh Chromium context and disabled cache for every observation.
- Fast 4G profile: 20 ms latency, 524,288 B/s downstream and 393,216 B/s upstream, applied to actual HTTP requests.
- Primary profile: 1440 × 900, English, light system theme, CPU rate 1.
- At least 10 baseline observations; final comparisons alternate AB/BA with 20 observations per version and page.
- No builds or parallel browser tests during timing. Keep failed observations visible.
- Report p50, p75 and p95. Keep laboratory measurements separate from live or real-user data.
- Use identical public Iconify fixtures and empty Algolia results; block analytics during local testing. Do not mock the site's critical assets or bypass network throttling for them.

## Guards and acceptance

Aim to halve usable p75 where the measured bottleneck supports it. Retain changes only when their measured value justifies their complexity.

Compare desktop/mobile screenshots in both languages and themes. Verify article text, headings and SEO metadata, exact Markdown copy, print, search, theme controls, avatar interaction and contest tabs. Deliberately delay the contest chunk and trigger early context updates to detect hydration regressions.

Preserve exact font file bytes and all font faces. Logo compression must preserve SVG framing, PNG metadata and every decompressed scanline. Add deterministic CSS and entry-script budgets to prevent startup resources growing silently.

Run `npm run check` before committing, build both locales, then deploy through the existing workflow and confirm its exact-build public checks. Rollback uses a revert and that same workflow.

## Provenance

Method: [SKILL.md](https://github.com/alchaincyf/huashu-flash/blob/master/SKILL.md), measurement protocol and playbook, read on 2026-10-06. The Node harness uses the available Chromium/Playwright runtime without adding a production dependency.
