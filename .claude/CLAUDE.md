# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Source for [lailai's personal website](https://lailai.one), built with Docusaurus 3 (TypeScript). Deployed via GitHub Actions to GitHub Pages and rsynced to a custom server (see `.github/workflows/deploy.yml`). Requires Node `>=20` (CI uses Node 24).

## Commands

```bash
npm start                 # Dev server (default English locale)
npm run start:zh-Hans     # Dev server in Simplified Chinese
npm run build             # Production build into ./build
npm run serve             # Serve the built site locally
npm run clear             # Clear Docusaurus cache (.docusaurus)

npm run i18n              # Regenerate translation JSON for zh-Hans
npm run format            # Prettier write across the repo
npm run typecheck         # tsc, no emit (uses tsconfig.json)
npm run check             # i18n + format + typecheck — run before every commit
```

There is no test runner. `npm run check` is the gate.

## Architecture

### Content vs. code

- `docs/` — three doc sets (`contest/`, `note/`, `project/`) wired up in `sidebars.ts` as `contestSidebar` / `noteSidebar` / `projectSidebar`. Sidebars are hand-curated, not auto-generated.
- `blog/` — MDX posts grouped by topic folders; `authors.yml` and `tags.yml` define the controlled vocabularies (`onInlineTags`/`onInlineAuthors` warn if a post uses an unlisted value).
- `src/pages/` — custom React pages (`about`, `travel`, `friends`, `resources`, `settings`, `insights`, `changelog`, `privacy`, plus the bespoke `index.tsx` cover/home). Page-local React lives in `src/pages/_components/` (the leading `_` stops Docusaurus from routing it).
- `src/theme/` — swizzled Docusaurus theme overrides (Layout, Blog\*, MDXComponents, Admonition, Root). Use `npm run swizzle` rather than copying files by hand.
- `src/components/laikit/` — the in-house design system (`Card`, `TitleCard`, `LinkCard`, `DataCard`, `Badge`, `Button`, `Segmented`, `Slider`, `Switch`, `Tooltip`, `Skeleton`, `IconBlock`, `Page`, `Section`, etc.). Reuse these primitives before creating new components. The full design-system ruleset — primitive inventory, per-component-folder layout, hover-motion limits, the CSS-Module silent-failure caveat — lives in `.claude/rules/components.md`, auto-loaded whenever files under `src/**` are touched.
- `src/components/` (non-laikit) — MDX-only widgets exposed to authors (`BrowserWindow`, `Desmos`, `Notation`, `Problem`, `Solution`).
- `src/hooks/`, `src/utils/`, `src/data/` — shared hooks, helpers, and static data (e.g. `data/resources.tsx`, `data/changelog.tsx`) consumed by the custom pages.
- `static/` — copied verbatim to site root. Contains `CNAME`, `.nojekyll`, verification files, and image/JSON assets.

### Build-time metadata

`docusaurus.config.ts` shells out to `git` (wrapped in `safeGit`) to compute `BUILD_TIME`, `GIT_SHA`, `GIT_COUNT`, and a `DEBUG_ID` exposed via `customFields`. Don't break that fallback path — code must still build outside a git checkout.

### Markdown pipeline

Docs, blog, and pages all share the same plugin set: `remark-math` + `rehype-katex` for LaTeX, `@docusaurus/remark-plugin-npm2yarn` (sync) for install snippets, Mermaid via `@docusaurus/theme-mermaid`, and live React via `@docusaurus/theme-live-codeblock`. Admonitions are extended with a custom `example` keyword.

### i18n (critical)

The site ships in `en` (default) and `zh-Hans`. Every user-facing string must go through `translate({ id, message })` from `@docusaurus/Translate`, and `i18n/zh-Hans/code.json` must carry the Chinese counterpart. The full ruleset — prefix taxonomy, key-shape conventions, orphan-cleanup workflow, translated-content layout — lives in `.claude/rules/i18n.md`, auto-loaded by Claude Code whenever files under `src/**` or `i18n/**` are touched.

### Styling

Components use CSS Modules (`styles.module.css` next to `index.tsx`). Global tokens and overrides live in `src/css/custom.css`. Per the contributing guide, prefer modern CSS (`grid`, `clamp()`, `color-mix()`, container queries) over JS layout.

### Path alias

`@site` resolves to the project root (Docusaurus default), e.g. `import Button from '@site/src/components/laikit/Button'`.

## Conventions (from `.github/CONTRIBUTING.md`)

These are project rules, not general advice — follow them:

- **Strive for excellence (精益求精).** This is a personal site the maintainer cares about deeply — "good enough" is not the bar. Sweat the details: spacing, wording, ordering, EN/ZH parity, visual rhythm. When something is functional but not yet refined, keep polishing rather than declaring it done. Proactively point out rough edges instead of waiting to be asked.
- **Reuse `laikit` primitives** before adding new components. New UI should be visually and behaviourally indistinguishable from existing parts.
- **Edit, don't rewrite.** Prefer minimal targeted edits; one coherent change per commit; do not reformat or refactor unrelated code.
- **No whole-card hover lift.** Never add hover-triggered `translateY`/`translateX` to whole cards (or other large container blocks) — that "card floats up on hover" effect is an AI-tell and the maintainer hates it. Smaller hover motion on internal elements (e.g. an arrow nudging, a small `scale()` on an icon or active control) is fine when it serves a clear interaction cue.
- **i18n is mandatory.** Any new user-facing string requires both a `translate()` call and a Chinese entry in `i18n/zh-Hans/code.json`.
- **Verify before committing.** Run `npm run check` and ensure it exits cleanly. For UI changes, also confirm in the `npm start` dev server.
- **Small changes go straight to `main`.** Do not create a feature branch or open a PR for minor edits (copy tweaks, single-component refactors, style fixes, etc.) — commit directly on `main`. Reserve branches and PRs for substantial multi-file work the maintainer explicitly asks to be reviewed.

Prettier config: `printWidth: 80`, `singleQuote: true`, `trailingComma: 'es5'`. TypeScript is `strict`.

## Keep `.claude/` current

`.claude/CLAUDE.md` and `.claude/rules/*.md` are living documentation — they only help if they stay true. Maintaining them is part of every change, not an afterthought. Do it proactively, without being asked:

- **Update the doc in the same change that invalidates it.** When you alter something these files describe, fix the description before declaring the task done. Common triggers:
  - Rename / move / delete a component → `rules/components.md` (and any inventory list in this file).
  - Change the blog title-prefix or tag taxonomy, or an authoring convention → `rules/writing-style.md`.
  - Add / remove an i18n prefix, key-shape rule, or workflow → `rules/i18n.md`.
  - Register a new MDX author-facing widget → `rules/components.md`.
  - Change commands, build/deploy, architecture, or directory layout → this file.
- **Record durable conventions, not transient state.** A rule that will still be true next month belongs here; a one-off task note does not. These docs hold the same `精益求精` and "edit, don't rewrite" bar as the code — keep entries accurate and tight, prune what goes stale, and never bloat them with redundant prose.
- **Verify before writing.** Confirm a convention against the actual codebase (grep, read the files) rather than recording it from memory — stale or wrong guidance is worse than none.
- **When unsure whether something is worth recording, surface it to the maintainer** instead of silently adding or omitting it.
