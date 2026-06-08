---
paths:
  - 'src/**/*.{ts,tsx}'
  - 'src/**/*.css'
---

# Component & design-system rules

The site has an in-house design system, `laikit` (`src/components/laikit/`). New UI must be visually and behaviourally indistinguishable from what already exists. Reuse before you build.

> General **design principles** (统一·简约·现代, no whole-card hover lift, modern CSS, color/spacing tokens, contrast) live in lailai.skill's [`design-style.md`](../skills/lailai-skill/references/design-style.md). This file is the **site-specific** `laikit` inventory, CSS-Module layout, and MDX-widget rules.

## laikit inventory

Each primitive is a folder with `index.tsx` + `styles.module.css`. Import via the `@site` alias, e.g. `import Button from '@site/src/components/laikit/Button'`.

- **Layout / surfaces:** `Card`, `TitleCard`, `LinkCard`, `DataCard`, `ShareCard`, `Page`, `Section`.
- **Controls:** `Button`, `Segmented`, `Slider`, `Switch`.
- **Atoms / display:** `Badge`, `IconBlock`, `IconText`, `Tooltip`, `Skeleton`, `TrafficLights`, `Markdown`, `Quote`, `GitHub`.
- **Navigation:** `Paginator` (Card-based prev/next pair — blog `PostChrome`'s `PostPaginator` and the swizzled `@theme/DocPaginator` both render it, so blog and docs share one paginator).

Before adding a component, check whether an existing primitive (optionally with an extra optional prop) covers the case.

- **`Card` vs `TitleCard`.** `TitleCard` is `Card` plus a header; `icon` and `description` are both optional. A card with no title uses plain `Card` — do not reach for `TitleCard` and leave the title empty. (`TitleCard` absorbed the former `IconCard` and `BlogCard`; neither exists any more.)
  - **`size` prop** picks the header treatment — each value reproduces one of the cards `TitleCard` absorbed, so a consumer's look never changes by accident: `md` (default) is the settings-tile look — IconBlock accent chip + 1.25rem title; `sm` is the Insights compact panel — inline primary icon + 0.95rem/600 title + a `0 0.25rem` header inset (chart, metric lists, runtime snapshot, settings tiles); `plain` is the former `BlogCard` — a bold body-size (1rem/700, flush) title with no icon, used by every blog sidebar/archive/selector panel (`BlogShared/*`, the tag/author posts pages). Blog panels must stay `plain`; `sm` would shrink them and `md` would balloon the title to 1.25rem. `description` is only meaningful at `md`. `TitleCard` owns header→body spacing via the header's `margin-bottom`, so a consumer passing `className` should not also set `gap` on the card.

## Code & style conventions

- **No default `React` import.** The codebase uses the automatic JSX runtime, so never `import React from 'react'`. Pull hooks/`forwardRef`/`memo`/`Fragment` as named imports and types as `type`-only imports (`import { useState, type ReactNode } from 'react'`). For DOM-shadowing event types alias them (`type PointerEvent as ReactPointerEvent`). There is zero `React.*` namespace usage in `src/` — keep it that way.
- **Interaction transitions are `160ms ease`.** Hover/active/color/border transitions all use `160ms ease` (always name the property — never `transition: 0.3s`, which animates `all`). Longer, deliberately different durations are reserved for content reveals / loaders (e.g. Skeleton shimmer, Slider track, the MetricList bar-fill) — those are a separate category, not interaction feedback.
- **No decorative gradients or translucent fills.** Per `design-style.md`. The only gradients in `laikit` are functional: the Slider's progress track and the Skeleton shimmer. Tinted surfaces (e.g. `IconBlock` accent) are flat `color-mix()`, not gradients. (The Problem header's `backdrop-filter` frosted glass and the About greeting's wordmark are deliberate, isolated exceptions.)
- **Shared image-load state** lives in `useImageStatus` (`src/hooks/`) — reused by `LinkCard` and `ShareCard`. Don't re-implement the `loading`/`loaded`/`error` + timeout machine inline.

## File & CSS layout

- One component per folder: `ComponentName/index.tsx` + `ComponentName/styles.module.css`. The folder/`index.tsx` resolution means `@site/.../ComponentName` imports resolve automatically.
- CSS lives in CSS Modules next to the component. Global tokens and overrides live in `src/css/custom.css`.
- Prefer modern CSS — `grid`, `clamp()`, `color-mix()`, container queries — over JS layout.
- **Shared-module pattern:** when a few classes are genuinely shared across sibling components (the only real cases today are `src/theme/BlogShared/styles.module.css` — theme-toggled cover images and the article-meta action buttons), keep a small root `styles.module.css` and import it as `shared` alongside the component's own `styles`. Component-exclusive classes stay in the component's own module. Do not let a shared module accrete single-owner classes.
- **CSS-Module typos fail silently.** `tsc` does not type-check `styles.module.css` class names — a misspelled `styles.foo` is `undefined` at runtime, not a compile error. After renaming or splitting CSS, audit class existence by hand and verify the rendered surface in the dev server; don't trust a green `npm run check` alone.

## CSS rule organization

Every stylesheet follows one structure. The overriding constraint is that reorganizing must keep rendered output **strictly unchanged** — when these rules conflict with the cascade, the cascade wins.

- **Order rules by JSX call order.** Sort selectors by the sequence their classNames first appear reading the component's `.tsx` top-to-bottom. A hoisted style const counts at its JSX usage site, not its definition. In a file with several components, follow file order — helper components first, the main/exported one (often the outer `layout`/`wrapper`) last, even though it's the outermost element. Classes referenced only dynamically (`styles['cardNav' + n]`, `styles[variant]`) or from a sibling file slot in at their nearest sensible group.
- **Group each class's family under it.** A class's pseudo-class/element (`:hover`, `::before`), descendant/compound, theme-override (`[data-theme]` / `html[data-theme]`), and `@media` rules all cluster under its base rule. A compound selector (`.a .b`, `.a:hover .b`) groups under its **leftmost** class, not its target — this keeps an interactive element's whole behaviour together.
- **Responsive sits right after its body, one selector per query.** Place a base rule's `@media (max-width: …)` immediately after that base rule (before its pseudo/descendant rules). Split any combined query so each `@media (max-width)` block wraps exactly **one** rule. (Treat `@container` the same way.) A selector-list rule with identical declarations counts as one rule and may stay grouped. When a selector has two breakpoints, keep wider-before-narrower so the narrower one still wins. Put `@keyframes` next to the rule that consumes it.
- **Merge to shorthand only when provably equivalent.** `inset` for four offsets (`top/right/bottom/left: 0` → `inset: 0`), `margin-inline: auto` for a symmetric left/right `auto` pair, collapsing redundant values (`padding: 0.7rem 0.7rem` → `0.7rem`; `margin: 0 0 1rem 0` → `0 0 1rem`). Reuse idioms already in the repo (`inset`, `margin-inline` are in use); never introduce a logical-property flip or extra explicit side that could change effect.
- **Cascade-safety check before any reorder.** Two rules of equal specificity setting the same property on an element that can carry both must keep their original relative order: base before modifier (`.dot` before `.dotUp`, `.item`/`.tab` before `.itemActive`/`.tabActive`, `.collapse` before `.collapseOpen`, `.pageNav` before `.pageNavDisabled`), and a shared declaration before a single override (GitHub's shared icon-font rule before `.githubLogo`'s own `font-size`). If JSX order would flip such a pair, keep the cascade order instead.
- **Clean up redundancy.** Delete dead/unused stylesheets (e.g. an orphaned swizzle CSS not imported anywhere) and merge duplicate selectors within a file. Confirm "unused" by grepping for the class across `.tsx`/`.mdx` and for the module import — CSS Modules are dead only if nothing imports them.

## Hover motion

- **No whole-card hover lift.** Never add hover-triggered `translateY` / `translateX` to a whole card or any large container block. The "card floats up on hover" effect is an AI-tell the maintainer dislikes.
- Small, purposeful motion on _internal_ elements is fine when it signals an interaction: an arrow nudging on hover, a modest `scale()` on an icon or active control. Keep it subtle.

## MDX author-facing widgets

Components registered in `src/theme/MDXComponents.tsx` are globally available in every `.mdx` file with no import. Current set: `BrowserWindow` (+ `IframeWindow`, `ImageWindow`), `Notation`, `GitHub`, `Quote`, `Desmos`, `Problem`, `Solution`, plus the Docusaurus `Tabs` / `TabItem` / `DocCardList` (the latter swizzled to render laikit `LinkCard`s in a responsive grid — see Theme overrides). When you add a widget meant for authors, register it here; otherwise it must be imported explicitly in the MDX. Author-side usage conventions for these widgets live in `.claude/rules/writing-style.md`.

## Theme overrides

Swizzled Docusaurus overrides live in `src/theme/` (Layout, Blog\*, MDXComponents, Admonition, Root, `DocPaginator`, `NotFound/Content`, `DocCard` + `DocCardList`). Use `npm run swizzle` rather than hand-copying framework files. A swizzled override reuses its own framework `theme.*` strings (e.g. `DocPaginator` keeps `theme.docs.paginator.*`); genuinely new strings take a project prefix (`NotFound/Content`'s home button is `components.notFound.*`, mirroring the `Root/CookieConsent` → `components.cookieConsent.*` precedent). `src/theme/BlogShared/` is **not** an official Docusaurus slot — it is a local helper folder of blog building blocks, each following the same per-component-folder layout as `laikit`.
