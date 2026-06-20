---
paths:
  - 'blog/**/*.mdx'
  - 'docs/**/*.mdx'
  - 'i18n/zh-Hans/docusaurus-plugin-content-blog/**/*.mdx'
  - 'i18n/zh-Hans/docusaurus-plugin-content-docs/**/*.mdx'
---

# Writing style rules

lailai's site is mostly in Simplified Chinese, with three content streams (`blog/`, `docs/`, translated MDX under `i18n/zh-Hans/`). Voice is **understated, dry, occasionally wry** — short declarative sentences, no exclamation, no "本文将……" preambles. Match these conventions when authoring or editing.

> **General writing rules live in lailai.skill.** The cross-project voice, punctuation/spacing, wording (你/仅/若, no 显然/易得/不难发现), bilingual term format, LaTeX math (`$...$`, `\frac` not `\dfrac`), and the C++ code template are in [`.claude/skills/lailai-skill/references/`](../skills/lailai-skill/references/) (`writing-style`, `wording`, `markdown-style`, `latex-math-style`, `cpp-oi-style`). **This file holds only the site-specific authoring layer** below — frontmatter taxonomy, MDX widgets, admonitions, image hosting, internal links, and the solution-post template.

## Frontmatter

- **Blog post** fields, in order: `title`, `date`, `authors: lailai` (scalar, never an array), `tags` (always array, even single-tag). Optional: `image` / `image_dark` / `pinned` — used only on `welcome.mdx`. **Solution posts** also carry `lid` (Luogu column article id); the blog meta bar reads it and renders the Luogu 原文 link inline — there is no body widget. Never use `slug` — the filename is the slug.
- **Doc page** carries only `title:`. No date, no authors, no tags.
- Dates are `YYYY-MM-DDTHH:MM:SS+08:00` — seconds **and** an explicit Asia/Shanghai offset: `date: 2025-08-04T15:30:00+08:00`. The `+08:00` is mandatory: without it `new Date()` resolves against the build host's zone (CI runs UTC), so an offsetless timestamp renders 8h off — `src/utils/format.ts` already pins display to `timeZone: 'Asia/Shanghai'`, so the instant must be unambiguous at the source. Every blog post carries seconds. **Solution posts** (`blog/solution/*.mdx`) use the **exact** publish second of their Luogu column counterpart (the `lid` frontmatter field; Luogu records second precision) — keep the two in sync. All other posts use `:00` for the seconds. (`src/data/moments.tsx` follows the same `+08:00` form; `changelog.tsx`/`travel.tsx` stay coarse date/month labels.)
- Title pattern is `<category>：<name>` with a **full-width colon**. Category prefix vocabulary is fixed: `题解：` / `数学：` / `项目：` / `资源：` / `个人：` / `旅行：` / `记录：` / `杂谈：`. The prefix is the real taxonomy, not the folder — `blog/misc/` holds both `项目：` and `资源：` posts; `blog/record/` holds both `记录：` and `杂谈：`.
- Quote the title in YAML only when it contains a `:` that would confuse the parser, e.g. `title: '旅行：National Geographic: 50 Places of a Lifetime'`.
- Tags come from `blog/tags.yml` only. Solution posts always tag `[oi, solution, <oj>]` where `<oj>` ∈ `luogu` / `codeforces` / `atcoder` / `spoj` / `uva`. Math posts tag `[math]`. Records combine `[life, record, memory]` or `[school, record, memory]`. Don't invent tags.

## Intro and truncate

- Every blog post has **one** short lead paragraph (typically under 30 chars, one sentence), a blank line, then `{/* truncate */}`. The lead is what shows in listings. No greeting, no "本文将".
- Solution posts have no lead paragraph at all: the body opens directly with `{/* truncate */}` (the Luogu 原文 link comes from the `lid` frontmatter, rendered in the meta bar).

## Headings

- No H1 in body — frontmatter `title` is the only H1. Body always opens with `##`.
- Section headings are short Chinese noun phrases. Recurring vocabulary (reuse before coining): `## 参考资料`, `## 题意简述`, `## 解题思路`, `## 参考代码`, `## 思想`, `## 化简`, `## 求解`, `## 例题`, `## 代码`, `## 效果展示`.
- No trailing `。` `？` `！` on headings. Inline `<code>` / KaTeX inside headings is fine: `## INT_MAX`, `## 牛顿–莱布尼茨公式`.
- `## 参考资料` is conventionally the **first** `##` of any math/misc post that cites sources — it goes before the body, not after.

## Language, tone, punctuation

- **Chinese punctuation is full-width** (`，。：；？！「」《》`) in CJK prose. Half-width only inside inline code, identifiers, English clauses, or math. Quotes use 「」 (corner brackets), not `""`. Book/article titles use 《》.
- **Always put a space between Chinese and Latin/code/math runs**: `使用 React`, `时间复杂度为 $O(n\log n)$。` Never `使用React` or `数列$S_k$`.
- Sentence-final punctuation goes **outside** inline code/math: `共有 $n$ 种糖果，` not `共有 $n$ 种糖果。`.
- Em-dash for asides is `——` (double); single `—` with spaces is the bilingual list separator: `Athens, Greece — 希腊 雅典`.
- Ellipsis is `……` (full-width six-dot), never `...`.
- **Ranges have exactly two forms.** Inside genuine math, use `\sim` — variable/index bounds (`$1\sim n$`), distributions (`$X\sim N(\mu,\sigma^2)$`), or operands that need math notation (`$10^7\sim 10^{13}$`). Everywhere else (prose ranges — times, dates/years/eras, ages, measurements, counts) use a plain **en dash `–`**, unwrapped to plain text, **no surrounding spaces** (`1840–1842 年`, `09:00–11:00`, `5–10 km`, `13–19 岁`); add spaces only when an operand itself contains a space (`公元前 2070 年 – 公元前 1600 年`). Never use a tilde character (`～` / `〜` / `~`) for a range, and never `\sim` for a prose range. (A `～` denoting something else — e.g. the high-energy phosphate bond in `A—P～P～P` — is not a range and stays.)
- **Numbers are plain text in prose; `$...$` is for genuine math only.** A quantity in a narrative sentence or table — year, date, time, score, count, price, duration, percentage, measurement, ordinal/label — is plain text (`616 分`, `2 月 26 日`, `95%`, `17 km`, `第 10 题`, `20 世纪`). Keep `$...$` only when the number is part of a formula, expression, relation, variable / subscript, or operand of a math operator (`$2^{10}=1024$`, `$3:1$`, `$\mu\pm 3\sigma$`, `$O(n\log n)$`, `$X\sim N(\mu,\sigma^2)$`). Identifiers (model / version numbers, `Day 1`) are plain text too.
- `~~strikethrough~~` is reserved for **wry self-mocking parentheticals**, never for actual deletion: `~~细胞膜融合~~。`, `~~半小时过 T1，罚坐四小时。~~`. Use sparingly.
- First-person `我` in personal/record/travel posts and casual asides; inclusive `我们` in math/algorithm exposition.
- Emojis are rare. Allowed: flag emojis in travel post titles (🇭🇰 / 🇹🇭), decorative bullets in long doc landing pages (📦). Never in math or solution posts.
- OI/school jargon (`OI`, `脱产`, `罚坐`, `打表`, `钓鱼题`, `奇技淫巧`, `T1`, `重高`, `分配生`) is used without expansion.

## Bilingual term introduction

Whenever a technical concept is first introduced, render it as **`<中文>`（English[, ACRONYM]）**:

```
**前缀和**（Prefix Sum）
**最大公约数**（Greatest Common Divisor，GCD）
**智能体**（Agent）
```

Acronym after a full-width comma inside the parentheses, not after a slash or dash.

## Math (KaTeX)

General math rules → skill [`latex-math-style.md`](../skills/lailai-skill/references/latex-math-style.md) (`$...$` inline, `$$...$$` display on its own line, `\frac` not `\dfrac`, `\dots`, single-letter vars, big-O without constants, wrap every numeric quantity in math). **Site gotcha:** cross-out is `\cancel{}` (math-mode), **not** `\sout` (text-mode-only — trips KaTeX's `mathVsSout` strict warning). Other site macros in use: `\mathrm{d}x`, `\set{...}`, `\bmod`, `\displaystyle` for cell sizing.

## Code blocks

- C++ style (invariant template, Allman braces, tabs, no comments, `bits/stdc++.h`, `cin/cout`, `return 0;`) → skill [`cpp-oi-style.md`](../skills/lailai-skill/references/cpp-oi-style.md). Other code → [`engineering-code-style.md`](../skills/lailai-skill/references/engineering-code-style.md).
- **Site fence conventions:** language tag is `cpp`, never `c++` (also `python` / `bash` / `text` / `svg` / `json` / `js`). Code-fence title (`title="main.cpp"`) only when file identity matters; solution posts omit it. `showLineNumbers` and line highlighting are not used.

## MDX components

- **`<Problem id="..." />`** — at the end of doc topic pages under `## 例题`.
- **`<Quote author="..." source="...">`** — epigraph in personal/record posts. Body is one short line. Author/source must be specific and real, never generic.
- **`<Desmos id="..." />`** — for any equation with a geometric companion.
- **`<Notation>**...**</Notation>`** — visual highlight of a milestone phrase, very sparing use.
- **`<GitHub repo="owner/repo" />`** — card link for a repo.
- **`<Tabs>` / `<TabItem>`** — wraps `<details><summary>题解</summary>…</details>` for worked examples in math posts.

## Admonitions

- Used: `:::tip` (clarifying side note), `:::example` (project's custom keyword — wraps `<Tabs>` of worked examples), `:::warning[版权声明]` (copyright notice on signature long-form posts only).
- `:::note`, `:::info`, `:::danger` are essentially unused — don't reach for them.

## Lists, tables, blockquotes

- Bullets are always `-` (hyphen-space). Numbered `1.` only when ordering carries meaning.
- Tables are pipe-aligned center: `| :------: |`. For rowspan / colspan, drop to raw `<table style={{ textAlign: 'center' }}>`.
- Bulleted list items end with `；` when chaining a parallel series, `。` on the last item — or drop trailing punctuation entirely on short lists. Be consistent within a list.
- Blockquote `>` has two roles: (1) embedding a problem statement, source text, or citation that should be set off; (2) the pithy aphorism line that closes a section (`> 有时一种莫名的信心反而是重要且珍贵的。`).

## Images and media

- All images are hosted at `https://cloud.lailai.one/f/<hash>/<name>.<ext>` — never local under `static/`, never relative. Use bare `![](url)` with empty alt.
- Light/dark pairs glue two image links with no whitespace, using `#gh-light-mode-only` and `#gh-dark-mode-only` anchors (see `blog/personal/business-card.mdx`).
- No `<figure>` / captions — the preceding `##` heading is the de facto caption.
- Never set width/height on `<img>` — sizing is implicit.

## Links and references

- Internal cross-post links use **absolute site paths**: `[《2025 年浙江中考数学第 24 题解析》](/blog/math/zjzk-2025-math-q24)`. Relative `../` paths within the same content tree are acceptable.
- External links are always `[text](url)`. Bare URLs appear only inside code fences. No reference-style `[text][1]` links.
- `## 参考资料` lists use the format `- [Title - Source](url)` with " - Source" suffix: `- [积分 - 维基百科](...)`, `- [最大公约数 - OI Wiki](...)`. Preferred sources: OI Wiki, Wikipedia (zh & en), OEIS.

## Solution-post template (mandatory shape)

Every `blog/solution/*.mdx` follows this exact order:

1. Frontmatter: `title: 题解：<PID> <name>`, `tags: [oi, solution, <oj>]`, `lid: <luogu column id>`.
2. `{/* truncate */}` (no lead paragraph; the Luogu 原文 link renders in the meta bar from `lid`).
3. Optional `## 参考资料` (only when external refs matter).
4. `## 题意简述` — one-paragraph Chinese paraphrase of the problem (may be omitted for trivial CF/AT problems).
5. `## 解题思路` — terse math-heavy reasoning. **Always ends with a complexity line**: `时间复杂度为 $O(n\log n)$。`.
6. Optional intermediate derivation sections (`## 基础知识`, `## 化简`, named lemmas).
7. `## 参考代码` — single `cpp` block matching the template. No fence title, no comments.

No `## 总结` / `## 结语` wrap-up section — the post ends when the code ends.

## Cross-cutting reminders

- **The "参考资料" ritual** — most non-trivial posts open with a references section before content. Treat external sourcing as default, not optional.
- **No card-style closers**: personal/record posts close with reflective `## 落幕` / `## 闲谈` / `## 总结`; algorithmic posts have no closer at all. Don't add "希望本文对你有所帮助" boilerplate to either kind.
- **Footer copyright notice** (`:::warning[版权声明]`) appears only on signature long-form personal posts (e.g. `zk.mdx`). Don't add it to ordinary posts.
- `lailai` is always lowercase, in body prose, in attribution, everywhere.
