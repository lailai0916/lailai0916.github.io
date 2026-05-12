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

- `docs/` — three doc sets (`contest/`, `note/`, `project/`) wired up in `sidebars.ts` as `sidebar1/2/3`. Sidebars are hand-curated, not auto-generated.
- `blog/` — MDX posts grouped by topic folders; `authors.yml` and `tags.yml` define the controlled vocabularies (`onInlineTags`/`onInlineAuthors` warn if a post uses an unlisted value).
- `src/pages/` — custom React pages (`about`, `travel`, `friends`, `resources`, `settings`, `insights`, `changelog`, `privacy`, plus the bespoke `index.tsx` cover/home). Page-local React lives in `src/pages/_components/` (the leading `_` stops Docusaurus from routing it).
- `src/theme/` — swizzled Docusaurus theme overrides (Layout, Blog\*, MDXComponents, Admonition, Root). Use `npm run swizzle` rather than copying files by hand.
- `src/components/laikit/` — the in-house design system (`Card`, `Tooltip`, `Segmented`, `Skeleton`, `Button`, `Badge`, `Slider`, `Switch`, `Page`, `Section`, `IconCard`, `LinkCard`, etc.). Reuse these primitives before creating new components.
- `src/components/` (non-laikit) — MDX-only widgets exposed to authors (`BrowserWindow`, `Desmos`, `Notation`, `Problem`, `Solution`).
- `src/hooks/`, `src/utils/`, `src/data/` — shared hooks, helpers, and static data (e.g. `data/resources.tsx`, `data/changelog.tsx`) consumed by the custom pages.
- `static/` — copied verbatim to site root. Contains `CNAME`, `.nojekyll`, verification files, and image/JSON assets.

### Build-time metadata

`docusaurus.config.ts` shells out to `git` (wrapped in `safeGit`) to compute `BUILD_TIME`, `GIT_SHA`, `GIT_COUNT`, and a `DEBUG_ID` exposed via `customFields`. Don't break that fallback path — code must still build outside a git checkout.

### Markdown pipeline

Docs, blog, and pages all share the same plugin set: `remark-math` + `rehype-katex` for LaTeX, `@docusaurus/remark-plugin-npm2yarn` (sync) for install snippets, Mermaid via `@docusaurus/theme-mermaid`, and live React via `@docusaurus/theme-live-codeblock`. Admonitions are extended with a custom `example` keyword.

### i18n (critical)

The site ships in `en` (default) and `zh-Hans`.

- Every user-facing string in code must use `translate({ id, message })` (or `<Translate>`) from `@docusaurus/Translate`. After adding/changing strings, run `npm run i18n` and add the Chinese counterpart to `i18n/zh-Hans/code.json`.
- **Never use a `theme.*` ID in custom code.** The `theme.*` namespace belongs exclusively to Docusaurus built-in strings (`@docusaurus/theme-classic` and friends) — they are scanned automatically from the framework's source. Reusing one in your own `translate()` call piggybacks on a framework-owned key and creates invisible coupling. Custom strings always go under a project-owned prefix (`pages.*`, `components.*`, `blog.*`, `data.*`).
- **Each i18n key may appear at most once in source.** If the same string is needed in multiple places, hoist the `translate()` call to a module-level `const` and reference the const — never paste the same `translate({ id, message })` literal twice. Duplicate occurrences are a refactor smell, not a feature.
- **Top-level prefixes are fixed at exactly five:** `theme` (Docusaurus built-ins only — see rule above), `pages` (page-specific strings under `src/pages/<page>`), `components` (reusable component strings under `src/components`), `blog` (blog area), `data` (static data files under `src/data`). Do not invent a sixth top-level prefix, and do not let a single component squat at the top level (e.g. `cookieConsent.*` was wrong; correct form is `components.cookieConsent.*`).
- **When you move a component or rename its folder, update its translation IDs to match.** The id's prefix should reflect _where the string is currently defined_, not its historical home. Example: a string in `src/components/Countdown` belongs under `components.countdown.*`, even if it used to live in `src/pages/_components/Countdown` and was named `home.countdown.*`. Stale-prefix ids accumulate as silent coupling; rename them in the same commit as the move.
- **Clean up orphan translations.** When you remove a `translate()` call (deleted component, removed feature), its entry in `code.json` becomes orphaned — `write-translations` does _not_ prune them. The canonical-rebuild workflow naturally drops them: backup `code.json` as `{key: {message}}` map → `rm code.json` → `npm run i18n` (regenerates with English fallbacks in canonical order, no orphans) → walk fresh keys, override `message` with backed-up Chinese where present → write back. Use this whenever you delete or rename source-side translation calls.
- Translated content lives under `i18n/zh-Hans/`:
  - `docusaurus-plugin-content-docs/current.json` — sidebar/category labels
  - `docusaurus-plugin-content-blog/` — translated `authors.yml`, `tags.yml`, blog options, and per-post MDX overrides
  - `docusaurus-plugin-content-pages/<page>/` — translated MDX/markdown for custom pages (mirror the source filename)
- `onBrokenLinks: 'throw'` is set, so missing translated targets will fail the build.

### Styling

Components use CSS Modules (`styles.module.css` next to `index.tsx`). Global tokens and overrides live in `src/css/custom.css`. Per the contributing guide, prefer modern CSS (`grid`, `clamp()`, `color-mix()`, container queries) over JS layout.

## Conventions (from `.github/CONTRIBUTING.md`)

These are project rules, not general advice — follow them:

- **Reuse `laikit` primitives** before adding new components. New UI should be visually and behaviourally indistinguishable from existing parts.
- **Edit, don't rewrite.** Prefer minimal targeted edits; one coherent change per commit; do not reformat or refactor unrelated code.
- **No decorative noise.** Do not introduce emoji, decorative animations, or visual flourishes unless explicitly requested.
- **No hover motion.** Never add hover-triggered transforms — no `translateY`/`translateX` lifts, no `scale()` zooms on cards or images, no animated arrow slides, no width-animated underlines that grow from 0 to 100%. These are AI-tells and the maintainer hates them. Hover state should change at most: `border-color`, `color`, `background-color`, plain `text-decoration: underline`. Anything that moves on hover must be removed.
- **i18n is mandatory.** Any new user-facing string requires both a `translate()` call and a Chinese entry in `i18n/zh-Hans/code.json`.
- **Verify before committing.** Run `npm run check` and ensure it exits cleanly. For UI changes, also confirm in the `npm start` dev server.
- **Small changes go straight to `main`.** Do not create a feature branch or open a PR for minor edits (copy tweaks, single-component refactors, style fixes, etc.) — commit directly on `main`. Reserve branches and PRs for substantial multi-file work the maintainer explicitly asks to be reviewed.

Prettier config: `printWidth: 80`, `singleQuote: true`, `trailingComma: 'es5'`. TypeScript is `strict`.

## Path alias

`@site` resolves to the project root (Docusaurus default), e.g. `import Button from '@site/src/components/laikit/Button'`.
