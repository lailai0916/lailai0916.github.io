# Contributing

## For AI / LLM Contributors

If you are an AI or LLM modifying this repository, read and follow these rules — **they are not optional**.

### Project context

This is the source code of [lailai's personal website](https://lailai.one), built with [Docusaurus](https://docusaurus.io).

- Pages live in `src/pages/`, theme overrides in `src/theme/`, shared primitives in `src/components/laikit/`.
- The site is bilingual: user-facing strings must use `translate()` from `@docusaurus/Translate` and be mirrored in `i18n/zh-Hans/code.json`.
- Familiarise yourself with the overall architecture before changing anything.

### Design philosophy: **Unity · Simplicity · Modernity**

- **Unity** — reuse existing `laikit` primitives (`Card`, `Tooltip`, `Segmented`, `Skeleton`, …) before adding new ones. New components should be visually and behaviourally indistinguishable from what already exists.
- **Simplicity** — pick the shortest correct solution. Avoid speculative abstractions, defensive layers, and decorative noise.
- **Modernity** — favour modern CSS (`grid`, `clamp()`, `color-mix()`, container queries) and current React idioms.

The author is a perfectionist: code should be elegant and refined, and the site polished both inside and out.

### Workflow

1. **Read first.** Study the relevant code and consult upstream docs before making changes. Match local conventions; do not reformat or refactor unrelated code.
2. **Edit, don't rewrite.** Prefer minimal targeted edits over creating new files.
3. **Stay scoped.** One coherent change per commit. Do not bundle unrelated tweaks.
4. **Mind i18n.** Any new user-facing string requires both a `translate()` call and a Chinese entry in `i18n/zh-Hans/code.json`.
5. **No surprises.** Do not introduce emoji, decorative animations, or visual flourishes unless explicitly requested.
6. **Verify before every commit.** Run `npm run check` (i18n + prettier + tsc) and ensure it exits cleanly. For UI changes, also verify in the `npm start` dev server.
