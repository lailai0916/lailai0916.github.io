---
paths:
  - 'blog/**/*.mdx'
  - 'docs/**/*.mdx'
  - 'i18n/zh-Hans/docusaurus-plugin-content-blog/**/*.mdx'
  - 'i18n/zh-Hans/docusaurus-plugin-content-docs/**/*.mdx'
---

# Site authoring rules

General voice, wording, Markdown, LaTeX, and C++ live only in the external `lailai-skill`.
This file contains the website-owned delta: frontmatter, content taxonomy, MDX behavior, media,
links, and the local envelope around externally produced solution bodies.

## Frontmatter

- **Blog post** fields, in order: `title`, `date`, `authors: lailai` (scalar, never an array), `tags` (always array, even single-tag). Optional: `image` / `pinned` — used only on `welcome.mdx`. **Solution posts** also carry `lid` (Luogu column article id); the blog meta bar reads it and renders the Luogu 原文 link inline — there is no body widget. Never use `slug` — the filename is the slug.
- **Doc page** carries `title:` and, optionally, `summary:`. No date, authors, or tags. `summary` is a **custom passthrough field** (not a Docusaurus one) holding an **AI-written TL;DR**, surfaced by the `Article/Summary` streaming card right after the title. **Docs and blog posts, with exclusions:** for docs, never on the three section roots (`docs/{contest,note,project}/index.mdx`) nor on any `docs/contest/problems/**` example-problem page; for blog, never on `welcome.mdx`. Blog posts keep their hand-written lead as well — the summary is a separate fuller TL;DR above the content, not a replacement for the lead. `blog/solution/*.mdx` **do** get summaries: adding the `summary` field — or the `description` field (see below) — is a sanctioned solution-post edit that needs no Luogu re-sign-off, because both are site-only front-matter fields never mirrored to the column body.
  - **Doc-summary spec** (the standard for every `summary`): **one plain-text paragraph, length adapting to the doc** — aim ~150–250 characters, floor 100, ceiling 400 (a long/dense doc gets a longer summary, a thin doc a shorter one). **Never pad to reach a count nor trim just to cut one.** No line breaks / lists / links / Markdown / HTML at all. In lailai's understated voice — obey the external `lailai-skill` `ai-tone-blacklist.md` (no 本文 / 介绍 / 涵盖了 / 显然 / 首先…其次…). **Professional and specific** — state concretely what **this** doc covers (its actual concepts / algorithms / results) so a reader can judge relevance; open on the subject, not "本文…". Never the vague, generic, filler tone of a throwaway AI summary (the 豆包-style "本文全面介绍了…，帮助读者…"). No LaTeX (`$…$`) either — write complexity in words or plain notation (`O(nlogn)`). **Keep `summary` and `description` distinct** — never copy the summary text into `description`, which is its own authored field (see the next bullet). Stored as a **plain single-line** value right under `title:` (below `description:` when present; `summary: <text>` — no `>-` block, no quotes); so the text must avoid a half-width `: ` (colon-space), a ` #`, or a leading YAML-special char, which Chinese prose satisfies naturally (full-width `：` is fine). Generate it by reading the complete doc; **sample a handful for style sign-off before batching the rest**.
- **`description`** is the Docusaurus-standard SEO field (feeds `<meta name="description">` / `og:description`; not rendered on-page). **Every doc page and every blog post carries one, with a single exclusion: `docs/contest/problems/**`example-problem (题解) pages.** So unlike`summary`, the three section roots (`docs/{contest,note,project}/index.mdx`), `welcome.mdx`, and all `blog/solution/\*.mdx`**do** get a`description`. **Description spec:** one or two short Chinese sentences, **20–50 汉字**. Deliberately framed with a 「本文…」opener — `本文将介绍…`/`本文为…`(题解:`本文为洛谷 P<id> 的题解，…`). This is an intentional exception to the summary's no-本文 rule: `description`is the terse SEO / social one-liner while`summary`is the fuller on-page TL;DR, so the two open differently on purpose. Accurate, professional, no filler. Stored as a **plain single-line, unquoted** value immediately under`title:`(above`summary:`when present) — so avoid a half-width`:`/`#`/`[` / `]`/`{`/`}`; for 题解 name the problem as `洛谷 P<id>`, never the bracketed `[contest] name`form. Distilled from the doc's`summary` where one exists, else written from the body.
- Dates are `YYYY-MM-DDTHH:MM:SS+08:00` — seconds **and** an explicit Asia/Shanghai offset: `date: 2025-08-04T15:30:00+08:00`. The `+08:00` is mandatory: without it `new Date()` resolves against the build host's zone (CI runs UTC), so the instant becomes ambiguous. Display and grouping follow [the date-time rules](datetime.md). Every blog post carries seconds. **Solution posts** (`blog/solution/*.mdx`) use the **exact** publish second of their Luogu column counterpart (the `lid` frontmatter field; Luogu records second precision) — keep the two in sync. All other posts use `:00` for the seconds. (`src/data/moments.tsx` follows the same `+08:00` form; `changelog.tsx`/`travel.tsx` stay coarse date/month labels.)
- Title pattern is `<category>：<name>` with a **full-width colon**. Category prefix vocabulary is fixed: `题解：` / `数学：` / `项目：` / `资源：` / `个人：` / `旅行：` / `记录：` / `杂谈：`. The prefix is the real taxonomy, not the folder — `blog/misc/` holds both `项目：` and `资源：` posts; `blog/record/` holds both `记录：` and `杂谈：`.
- AI solution collections use `题解：AI 题解合集（<中文数字>）`; the sequence in the visible title is always a Chinese numeral, while the filename keeps its stable ASCII number.
- Quote the title in YAML only when it contains a `:` that would confuse the parser, e.g. `title: '旅行：National Geographic: 50 Places of a Lifetime'`.
- Tags come from `blog/tags.yml` only. Solution posts always tag `[oi, solution, <oj>]` where `<oj>` ∈ `luogu` / `codeforces` / `atcoder` / `spoj` / `uva`. Math posts tag `[math]`. Records combine `[life, record, memory]` or `[school, record, memory]`. Don't invent tags.

## Intro and truncate

- Every blog post has **one** short lead paragraph (typically under 30 chars, one sentence), a blank line, then `{/* truncate */}`. The lead is what shows in listings. No greeting, no "本文将".
- Solution posts have no lead paragraph at all: the body opens directly with `{/* truncate */}` (the Luogu 原文 link comes from the `lid` frontmatter, rendered in the meta bar).

## Headings

- No H1 in body — frontmatter `title` is the only H1. Body always opens with `##`.
- Section headings are short Chinese noun phrases. Recurring vocabulary (reuse before coining): `## 参考资料`, `## 简介`, `## 说明`, `## 题意简述`, `## 解题思路`, `## 参考代码`, `## 思想`, `## 化简`, `## 求解`, `## 例题`, `## 代码`, `## 效果展示`.
- No trailing `。` `？` `！` on headings. Inline `<code>` / KaTeX inside headings is fine: `## INT_MAX`, `## 牛顿–莱布尼茨公式`.
- `## 参考资料` is conventionally the **first** `##` of any math/misc post that cites sources — it goes before the body, not after.
- **Docs carry no pre-heading lead line.** The single-sentence description that used to sit between frontmatter and the first `##` is gone site-wide — a doc body opens directly at `##` (a lead paragraph is blog-only, see _Intro and truncate_). A kept subject intro / definition goes in a `## 简介` section (`统计学是…`, `Kahan 求和算法，又名…`); an editorial note about the doc itself — how it's organised, what it covers — goes in `## 说明` (`这份笔记对照人教版教材，按专题归类…`). Both sit **after** `## 参考资料`, never as a bare paragraph before the first heading.

## Site voice exceptions

- `~~strikethrough~~` is reserved for **wry self-mocking parentheticals**, never for actual deletion: `~~细胞膜融合~~。`, `~~半小时过 T1，罚坐四小时。~~`. Use sparingly.
- First-person `我` in personal/record/travel posts and casual asides; inclusive `我们` in math/algorithm exposition.
- Emojis are rare. Allowed: flag emojis in travel post titles (🇭🇰 / 🇹🇭), decorative bullets in long doc landing pages (📦). Never in math or solution posts.
- OI/school jargon (`OI`, `脱产`, `罚坐`, `打表`, `钓鱼题`, `奇技淫巧`, `T1`, `重高`, `分配生`) is used without expansion.

## Math (KaTeX)

Use the external `lailai-skill` for all general formula rules. This site adds one renderer-specific
constraint: cross-out is `\cancel{}`, not `\sout`. Bare CJK or Unicode math symbols may surface as
KaTeX strict warnings only in a cold build, so do not treat a cached build as sufficient evidence.

- **Never write prose announcing that formulas use KaTeX** (`公式用 KaTeX 排版，如…`, `化学式与方程式用 KaTeX 排版…`). The whole site renders math with KaTeX — such a sentence states the obvious and reads as an AI-tell; just use `$…$` and move on. (Genuinely informative meta-notes stay — e.g. `代码用 Python` in the 信息技术 notes, which is specific, not a site-wide given.)

## Code blocks

- C++ and engineering code style come from the external `lailai-skill`.
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

- For rowspan / colspan, drop from Markdown to raw `<table style={{ textAlign: 'center' }}>`.
- Blockquote `>` has two roles: (1) embedding a problem statement, source text, or citation that should be set off; (2) the pithy aphorism line that closes a section (`> 有时一种莫名的信心反而是重要且珍贵的。`).

## Images and media

- All images are hosted at `https://cloud.lailai.one/f/<hash>/<name>.<ext>` — never local under `static/`, never relative. Use bare `![](url)` with empty alt.
- **Non-functional images live on the Cloud — site-wide, React pages included (`src/pages/*`, not just docs/blog).** Any purely-static / decorative image (illustration, photo, screenshot, concept art, static icon) must be hosted on `cloud.lailai.one`, never a third-party image host. **Exempt (functional):** dynamically-generated cards that reflect live data — skillicons.dev icons, GitHub stat cards (github-stats / profile-summary-cards), shields badges — plus code-block example images, friend avatars, and CC / license icons; these stay on their source. Test: if the image _could_ be a fixed static file, it belongs on the Cloud; if it's a live-data card, leave it.
- Light/dark pairs glue two image links with no whitespace, using `#gh-light-mode-only` and `#gh-dark-mode-only` anchors (see `blog/personal/business-card.mdx`).
- No `<figure>` / captions — the preceding `##` heading is the de facto caption.
- Never set width/height on `<img>` — sizing is implicit.

## Links and references

- **All internal links use absolute site paths** (`/docs/...`, `/blog/...`) — **no file extension, never relative**. e.g. `[《2025 年浙江中考数学第 24 题解析》](/blog/math/zjzk-2025-math-q24)`, `[ST 表](/docs/contest/ds/sparse-table)`. (Relative-vs-absolute and with-vs-without `.mdx` are functionally near-equivalent here — all are checked by `onBrokenLinks: 'throw'` — but absolute-without-extension is the single consistent form: greppable, source-move-proof, locale-safe, one rule for blog + docs.)
- **Inside raw JSX/HTML, markdown link syntax isn't parsed** — `[text](/docs/...)` in a `<div>`/`<td>` renders as literal text. When raw HTML needs a link, use `<Link to="/docs/...">text</Link>` (`import Link from '@docusaurus/Link';` after the frontmatter), with the same absolute-no-extension path so it stays SPA-routed and `onBrokenLinks`-checked.
- External links are always `[text](url)`. Bare URLs appear only inside code fences. No reference-style `[text][1]` links.
- **Own domains: link when it is a destination, `` `code` `` when it is an identifier — never bare.** The test is whether the reader can usefully click it _right now_. A place to go is a link — About / README's `[lailai.one](https://lailai.one)`, `[lailai0916.com](https://lailai0916.com)`. A domain being _named or discussed as a string_ is code — the privacy §6 provider table (`主站 \`lailai.one\` 与 Tor onion 站点的托管与分发`), a changelog event about the string itself (`` 注册域名 `lailai.one` `` — on that date no site existed yet), a teaching specimen (`**域名**（Domain Name）：……如 \`www.lailai.one\``, which would be absurd as a blue clickable link). Bare text is never right: it is neither clickable nor marked as a string. **When it is a link and the site has a name, the link text is the name, not the domain** — `src/data/changelog.tsx` writes `<a href="https://lailai.one">lailai's Home</a>` / `<a href="https://cloud.lailai.one">lailai's Cloud</a>`, and drops to the bare domain only for sites that have no name (`` 镜像站 `lailai0916.com` ``). **This rule spans the whole repo**, not just this file's blog/docs scope — `src/pages/{about,privacy}`, `src/data/changelog.tsx`, and both READMEs all follow it.
- `## 参考资料` lists use the format `- [Title - Source](url)` with " - Source" suffix: `- [积分 - 维基百科](...)`, `- [最大公约数 - OI Wiki](...)`. Preferred sources: OI Wiki, Wikipedia (zh & en), OEIS.

## Solution-post envelope

`blog/solution/*.mdx` normally mirrors a Luogu column article identified by `lid`. Exclude these files from
site-wide sweeps unless the task explicitly places a solution in scope. The external workflow
selected through `solution-sync.md` owns the body structure, proof, complexity treatment, and code.
Do not repeat those rules here.

`blog/solution/ai-solutions-<number>.mdx` is the narrow exception. It is a local link roundup,
not a mirrored Luogu article: it has no `lid`, uses `[oi, solution, luogu, ai]`, follows the normal
blog lead-and-truncate envelope, and never enters Luogu body synchronization. After each completed
AI Luogu solution, update the highest-numbered existing collection; create the next number only when
lailai explicitly asks to open a new collection. Every entry keeps the complete solution title and
Luogu article link. Keep the lead, description, and summary counts in sync. Its date is the exact
publish second of the earliest linked Luogu article, and the links stay in ascending publish order.

This repository owns only the wrapper:

1. Frontmatter: `title: 题解：<PID> <name>`, `tags: [oi, solution, <oj>]`, `lid: <luogu column id>`.
2. `{/* truncate */}` (no lead paragraph; the Luogu 原文 link renders in the meta bar from `lid`).
3. The externally validated body, beginning at its first H2, with no body `<Solution>` component.

`summary` and `description` are site-only metadata and never enter the mirrored Luogu body.

## Cross-cutting reminders

- **The "参考资料" ritual** — most non-trivial posts open with a references section before content. Treat external sourcing as default, not optional.
- **No card-style closers**: personal/record posts close with reflective `## 落幕` / `## 闲谈` / `## 总结`; algorithmic posts have no closer at all. Don't add "希望本文对你有所帮助" boilerplate to either kind.
- **Footer copyright notice** (`:::warning[版权声明]`) appears only on signature long-form personal posts (e.g. `zk.mdx`). Don't add it to ordinary posts.
- `lailai` is always lowercase, in body prose, in attribution, everywhere.
