# Repository instructions

Runtime-neutral guidance for AI coding agents in this repo. This file is the always-loaded
**map**; deep per-area detail lives in `.agents/rules/*.md`. Before editing a path, read the
rules whose `paths` glob matches it.

## Personal style — defer to lailai.skill

lailai's **general, cross-project** style — Chinese voice and wording, Markdown, LaTeX math,
OI C++, design principles (统一·简约·现代), who he is and how he decides — lives in the
**lailai.skill** submodule at [`.agents/skills/lailai-skill/`](.agents/skills/lailai-skill/SKILL.md).
Read its `SKILL.md`, then the relevant `references/` / `profile/`, for any task touching voice,
writing, code, or design.

**This repo's `.agents/` holds portable project config.** It does not duplicate the general
rules; where `.agents/rules/*.md` covers only the site-specific slice, it points to the skill
for the rest. Runtime-specific directories are compatibility adapters only.

Init the submodule after cloning: `git submodule update --init`. Update it later with `git submodule update --remote .agents/skills/lailai-skill`.

## Project

Source for [lailai's personal website](https://lailai.one) — Docusaurus 3 (TypeScript), Node `>=20` (CI uses Node 24). Deployed via GitHub Actions to GitHub Pages and rsynced to a custom server (`.github/workflows/deploy.yml`).

## Commands

```bash
npm start                 # Dev server (default English locale)
npm run start:zh-Hans     # Dev server in Simplified Chinese
npm run build             # Production build into ./build
npm run serve             # Serve the built site locally
npm run clear             # Clear Docusaurus cache (.docusaurus)

npm run i18n              # Regenerate translation JSON for zh-Hans
npm run format            # Prettier write across the repo
npm run lint              # ESLint over src/ (flat config, eslint.config.mjs)
npm run typecheck         # tsc, no emit
npm run check             # i18n + format + lint + typecheck — run before every commit
```

There is no test runner. `npm run check` is the gate.

**Lint layer is deliberately lean** (`eslint.config.mjs`, flat config, `src/` only): Prettier owns formatting and tsc owns types, so ESLint carries no stylistic rules — just what the other two can't see. That's `typescript-eslint` recommended (minus `no-explicit-any` and `no-require-imports`, both of which fight legitimate Docusaurus/webpack patterns here) plus the two **classic** React Hooks rules (`rules-of-hooks` error, `exhaustive-deps` warn). Do **not** switch react-hooks to its v7 `recommended-latest` — the React-Compiler rules it adds (`set-state-in-effect`, `refs`, `immutability`) flag valid patterns and drown the signal. Unused-var escape hatch: `_`-prefix.

## Rules index

Path-scoped detail — before editing, read each file whose scope matches the target paths.
Don't restate their content here; extend the file itself.

| Rule                                                               | Scope                                | Covers                                                                                                          |
| ------------------------------------------------------------------ | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| [`.agents/rules/components.md`](.agents/rules/components.md)       | `src/**` ts·tsx·css                  | `laikit` inventory, CSS-Module layout & rule ordering, hover-motion limits, text-overflow, MDX widgets          |
| [`.agents/rules/i18n.md`](.agents/rules/i18n.md)                   | `src/**`, `i18n/**`                  | `translate()` workflow, five-prefix taxonomy, key shapes, orphan cleanup                                        |
| [`.agents/rules/comments.md`](.agents/rules/comments.md)           | `src/**`, `*.ts`                     | code-comment style (site-specific slice)                                                                        |
| [`.agents/rules/writing-style.md`](.agents/rules/writing-style.md) | `blog/**`, `docs/**`, translated MDX | frontmatter, headings, tone, MDX widgets, math, images, links, solution template                                |
| [`.agents/rules/solution-sync.md`](.agents/rules/solution-sync.md) | `blog/solution/**`                   | 题解 → 洛谷: thin pointer to skill's `luogu-solution.md` (full flow + red lines) + project mirror/summary rules |

## Architecture

### Directory map

| Path                                    | Purpose                                                                                                                                                                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/`                                 | Three doc sets — `contest/`, `note/`, `project/`; sidebars hand-curated in `sidebars.ts`, not auto-generated                                                                                                                           |
| `blog/`                                 | MDX posts by topic folder; `authors.yml` + `tags.yml` are controlled vocabularies (unlisted values warn at build)                                                                                                                      |
| `src/pages/`                            | Custom React pages (`about`, `travel`, `friends`, `resources`, `settings`, `insights`, `changelog`, `privacy`, and the bespoke `index`). Page-local React sits in a `_components/` subfolder (leading `_` stops Docusaurus routing it) |
| `src/theme/`                            | Swizzled Docusaurus overrides (Blog\*, Root, `DocItem/*`, `BlogShared/*`, …) — use `npm run swizzle`, don't hand-copy (`@theme/Layout` is intentionally un-swizzled)                                                                   |
| `src/components/laikit/`                | In-house design system → [`.agents/rules/components.md`](.agents/rules/components.md)                                                                                                                                                  |
| `src/components/` (non-laikit)          | Author-facing MDX widgets, shared `Article/` chrome, one-off `Playground/` demos → [`.agents/rules/components.md`](.agents/rules/components.md)                                                                                        |
| `src/hooks/`, `src/utils/`, `src/data/` | Shared hooks, helpers, and static data (`resources`, `changelog`, `travel`, `moments`)                                                                                                                                                 |
| `static/`                               | Copied verbatim to site root — `CNAME`, `.nojekyll`, verification files, image/JSON assets                                                                                                                                             |

Custom-page notes: `insights` is live Umami traffic. `blog/overview` and `blog/moments` live under the blog area and reuse `BlogShared/Scaffold` (blog chrome + sidebar); `blog/overview` is the first tab of `ArchiveTabs` (Overview / By Year / By Tag / By Author) — add new archive tabs there.

### Non-obvious gotchas

- **Build-time metadata:** `docusaurus.config.ts` shells to `git` (via `safeGit`) for `BUILD_TIME` / `GIT_SHA` / `GIT_COUNT` / `DEBUG_ID`, exposed as `customFields`. Keep the fallback intact — the site must still build outside a git checkout.
- **Markdown pipeline:** docs, blog, and pages share one plugin set — `remark-math` + `rehype-katex`, `remark-plugin-npm2yarn`, Mermaid, live-codeblock; admonitions add a custom `example` keyword.
- **Image zoom:** `docusaurus-plugin-image-zoom`, selector `.markdown img, img[data-zoomable]`. Docs/blog body images zoom automatically; custom pages opt in per-image with `data-zoomable` (hashed CSS-Module classnames can't sit in a global selector).
- **Travel globe** (`src/pages/travel/_components/Map`): one baked equirectangular `CanvasTexture` painted with d3-geo, not extruded polygons (this killed the old z-fighting). GeoJSON added here must follow RFC 7946 right-hand winding, or `geoPath` fills each polygon's complement; the transparent `backgroundColor` must stay `rgba(0,0,0,0)` (react-globe.gl rejects the `transparent` keyword).

### Path alias

`@site` resolves to the project root, e.g. `import Button from '@site/src/components/laikit/Button'`.

## Conventions

Site-specific rules (general taste — 精益求精, edit-don't-rewrite, comment the _why_, no AI-tells — lives in the skill's `profile/` and `references/`):

- **Reuse `laikit` primitives** before adding a component; new UI should be visually and behaviourally indistinguishable from existing parts.
- **No whole-card hover lift.** Never add hover `translateY` / `translateX` to a whole card or other large container — that "float up on hover" effect is an AI-tell the maintainer dislikes. Small motion on internal elements (arrow nudge, a modest icon `scale()`) is fine when it signals an interaction.
- **i18n is mandatory** — a new user-facing string needs both a `translate()` call and a `zh-Hans` entry in `i18n/zh-Hans/code.json`.
- **Own domains: destination → link, identifier → `` `code` ``, never bare.** Full rule + rationale in [`.agents/rules/writing-style.md`](.agents/rules/writing-style.md) (_Links and references_) — repeated here because it binds **outside** that file's blog/docs path scope: `src/pages/{about,privacy}`, `src/data/changelog.tsx`, and both READMEs.
- **Verify before committing** — `npm run check` must exit clean; for UI changes, also confirm in the `npm start` dev server.
- **Style checker hook** — `.claude/settings.json` wires a `PostToolUse` hook that runs the skill's mechanical checker (`.agents/skills/lailai-skill/tools/checker/check.py --hook`) on every edited `.md`/`.mdx`/`.cpp`/`.ts`/… file. It is **diff-aware** (only lines changed since `HEAD` are checked, so legacy `\dfrac`/「显然」in old notes don't block unrelated edits) and blocks (exit 2) on ERROR-tier violations — wrong math delimiters, AI-tone blacklist, OI-C++ tells, etc. WARN-tier is advisory. Rules ↔ checker co-evolve; edit the checker in the same change that changes a machine-checkable rule. Full audit: `python3 .agents/skills/lailai-skill/tools/checker/check.py <files>`.
- **Semantic reviewer skill** — `.agents/skills/lailai-reviewer/SKILL.md` is the portable,
  read-only review workflow for judgment-class rules the mechanical checker can't cover
  (tone/register fit, information density, structure, semantic AI-tone, OI-C++ aesthetics,
  design AI-tells, zh/en parity). Invoke it before delivering lailai-style prose, solutions,
  or docs. It returns findings only and does not edit.
- **Small changes go straight to `main`.** Reserve branches and PRs for substantial multi-file work the maintainer explicitly asks to have reviewed.

Prettier: `printWidth: 100`, `singleQuote: true`, `trailingComma: 'es5'`. TypeScript is `strict`.

## Keep Agent guidance current

These files are living documentation — update them in the same change that invalidates them,
before declaring the task done:

- Rename / move / delete a component, or change a widget / taxonomy / authoring convention → the matching `.agents/rules/*.md` (and any inventory in this file).
- Change commands, build / deploy, architecture, or directory layout → this file.
- Record **durable** conventions, not transient task state. Verify against the actual code (grep, read) before writing — stale guidance is worse than none. When unsure whether something belongs, surface it to the maintainer rather than silently adding or omitting it.
- `CLAUDE.md`, `.claude/rules`, and `.claude/skills` are compatibility pointers; do not
  maintain duplicate instructions there. Claude-only hooks and launch settings may remain under
  `.claude/`.
