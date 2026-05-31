---
paths:
  - 'src/**/*.{ts,tsx}'
  - 'src/**/*.css'
  - '*.ts'
---

# Comment style

Comments are sparse, uniform, and earn their place. The bar is the same `精益求精` / "edit, don't rewrite" bar as the code: a comment that restates the code is worse than no comment. When in doubt, delete it.

## Principles

- **Comment the _why_, not the _what_.** Explain intent, a non-obvious constraint, a workaround, or a reference — never narrate what the next line plainly does (`// increment i`, `// set state`).
- **Few.** Most code needs none. A well-named function or variable replaces a comment. Reach for one only when the reason isn't visible in the code.
- **Concise.** One line where possible. Trim filler ("basically", "note that", "we do this because"). State the fact.
- **English, sentence case.** Start with a capital; identifiers keep their real case (`sessionStorage`, `react-chrono`). Full sentences end with a period; a short label fragment does not (`// Camera`, `// No solution available`).

## Forms (only these)

- **`//` line comment** — inline explanation in `.ts`/`.tsx`. Default form.
- **`/* … */` block comment** — explanation or a section label in `.css`.
- **JSDoc block (`/**`)** — only to document an exported component's props, a public type, or an exported function. Keep each tag/line tight; one line when it fits (e.g. a one-line `owner/repo` prop doc).
- **Tooling pragmas** — `// eslint-disable-…`, `// @ts-expect-error …`, `// prettier-…` are functional, not prose; leave them as the tool requires.

## Section labels

When a long file needs internal signposts, use a **plain label on its own line** — `// Variants` in TS, `/* Variants */` in CSS. Nothing more.

- **No ASCII-art dividers.** Never `── … ──`, `===== … =====`, `----- … -----`, or repeated rule characters of any kind. They are visual noise and were the main source of past inconsistency.
- A label is a short noun phrase, not a sentence.

## Don't

- **No commented-out code.** Delete it; git remembers. The one allowed exception is a clearly-labeled config toggle kept as in-place documentation of an available option (e.g. the disabled `announcementBar` / `showLastUpdateAuthor` blocks in `docusaurus.config.ts`).
- **No banner/file-header comments**, author tags, dates, or change logs.
- **No TODO/FIXME left behind** — open work belongs in a real task, not a comment.
