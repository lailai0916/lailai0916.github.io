---
paths:
  - 'src/**/*.{ts,tsx}'
  - 'src/**/*.css'
---

# Component & design-system rules

The site has an in-house design system, `laikit` (`src/components/laikit/`). New UI must be visually and behaviourally indistinguishable from what already exists. Reuse before you build.

## laikit inventory

Each primitive is a folder with `index.tsx` + `styles.module.css`. Import via the `@site` alias, e.g. `import Button from '@site/src/components/laikit/Button'`.

- **Layout / surfaces:** `Card`, `TitleCard`, `LinkCard`, `DataCard`, `ShareCard`, `Page`, `Section`.
- **Controls:** `Button`, `Segmented`, `Slider`, `Switch`.
- **Atoms / display:** `Badge`, `IconBlock`, `IconText`, `Tooltip`, `Skeleton`, `TrafficLights`, `Markdown`, `Quote`, `GitHub`.

Before adding a component, check whether an existing primitive (optionally with an extra optional prop) covers the case.

- **`Card` vs `TitleCard`.** `TitleCard` is `Card` plus a header; `icon` and `description` are both optional. A card with no title uses plain `Card` — do not reach for `TitleCard` and leave the title empty. (`TitleCard` absorbed the former `IconCard` and `BlogCard`; neither exists any more.)
  - **`size` prop** picks the header scale: `md` (default) is the settings-tile look — IconBlock accent chip + 1.25rem title; `sm` is the compact panel look — inline primary icon + 0.95rem title, used by the Insights cards (chart, metric lists, runtime snapshot). `description` is only meaningful at `md`. `TitleCard` owns header→body spacing via the header's `margin-bottom`, so a consumer passing `className` should not also set `gap` on the card.

## File & CSS layout

- One component per folder: `ComponentName/index.tsx` + `ComponentName/styles.module.css`. The folder/`index.tsx` resolution means `@site/.../ComponentName` imports resolve automatically.
- CSS lives in CSS Modules next to the component. Global tokens and overrides live in `src/css/custom.css`.
- Prefer modern CSS — `grid`, `clamp()`, `color-mix()`, container queries — over JS layout.
- **Shared-module pattern:** when a few classes are genuinely shared across sibling components (the only real cases today are `src/theme/BlogShared/styles.module.css` — theme-toggled cover images and the article-meta action buttons), keep a small root `styles.module.css` and import it as `shared` alongside the component's own `styles`. Component-exclusive classes stay in the component's own module. Do not let a shared module accrete single-owner classes.
- **CSS-Module typos fail silently.** `tsc` does not type-check `styles.module.css` class names — a misspelled `styles.foo` is `undefined` at runtime, not a compile error. After renaming or splitting CSS, audit class existence by hand and verify the rendered surface in the dev server; don't trust a green `npm run check` alone.

## Hover motion

- **No whole-card hover lift.** Never add hover-triggered `translateY` / `translateX` to a whole card or any large container block. The "card floats up on hover" effect is an AI-tell the maintainer dislikes.
- Small, purposeful motion on _internal_ elements is fine when it signals an interaction: an arrow nudging on hover, a modest `scale()` on an icon or active control. Keep it subtle.

## MDX author-facing widgets

Components registered in `src/theme/MDXComponents.tsx` are globally available in every `.mdx` file with no import. Current set: `BrowserWindow` (+ `IframeWindow`, `ImageWindow`), `Notation`, `GitHub`, `Quote`, `Desmos`, `Problem`, `Solution`, plus the Docusaurus `Tabs` / `TabItem` / `DocCardList`. When you add a widget meant for authors, register it here; otherwise it must be imported explicitly in the MDX. Author-side usage conventions for these widgets live in `.claude/rules/writing-style.md`.

## Theme overrides

Swizzled Docusaurus overrides live in `src/theme/` (Layout, Blog\*, MDXComponents, Admonition, Root). Use `npm run swizzle` rather than hand-copying framework files. `src/theme/BlogShared/` is **not** an official Docusaurus slot — it is a local helper folder of blog building blocks, each following the same per-component-folder layout as `laikit`.
