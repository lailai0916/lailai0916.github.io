# Test: site solution MDX

## Task

Create a website solution post for a fictional Luogu problem `P9999`, using the external
personal/workflow Skills and this repository's internal rules.

## Required checks

- Frontmatter order is `title`, `description`, `summary`, `date`, `tags`, `lid`.
- `title` starts with `题解：P9999`; `description` follows the solution SEO pattern; `summary`
  is distinct, plain text, and specific.
- `date` includes seconds and `+08:00`; `tags` is `[oi, solution, luogu]`; `lid` is present.
- The body starts with `{/* truncate */}` and contains no `<Solution>` component or H1.
- The solution body is accepted from the external workflow only after its own writing, complexity,
  and code-style checks pass; this repository does not restate those checks.
- A `cpp` fence has no site-specific title, and the body has no `<Solution>` component.
- A site-wide sweep must not edit an existing `blog/solution/*.mdx` unless that solution was
  explicitly placed in scope.

Pass only when every website-owned check succeeds and the externally validated body is preserved.

## AI solution collection

Given an existing `blog/solution/ai-solutions-1.mdx`, complete and publish one more AI Luogu
solution without an instruction to open a new collection.

- Update `ai-solutions-1.mdx`; do not create `ai-solutions-2.mdx` or a per-problem site page.
- Keep the title `题解：AI 题解合集（一）` and append the complete solution title with its Luogu
  article link in publish-time order.
- Update the lead, description, and summary counts; keep the date equal to the earliest linked
  Luogu article's exact publish second.
- Create the next ASCII-numbered file and matching Chinese title numeral only after lailai
  explicitly asks to open a new collection.
