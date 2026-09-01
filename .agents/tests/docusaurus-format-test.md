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

## AI solution index

Given one AI Luogu solution selected by the external `lailai-skill`, update the website index.

- Add the complete solution title and Luogu article link to the single list under `### AI 题解` in
  `docs/contest/personal/luogu.mdx`, immediately after the solution example.
- Do not create a blog collection, pagination, a batch file, or a per-problem site page.
- Do not add a dedicated checker script or package-manager command for this index.
- Keep every existing entry in the same list regardless of its length, and reject duplicate PIDs
  or article IDs.
