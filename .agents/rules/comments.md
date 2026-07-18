---
paths:
  - 'src/**/*.{ts,tsx}'
  - 'src/**/*.css'
  - '*.ts'
---

# Comment style

The general comment ruleset (comment the _why_ not the _what_; few; concise; English sentence-case; allowed forms; plain section labels; **no ASCII-art dividers**; no commented-out code, banners, author/date, or left-behind TODO/FIXME) lives in **lailai.skill** — see [`.agents/skills/lailai-skill/references/engineering-code-style.md`](../skills/lailai-skill/references/engineering-code-style.md). Follow it for all code in this repo.

## Site-specific note

- **One allowed commented-out exception:** a clearly-labeled config toggle kept as in-place documentation of an available option — e.g. the disabled `announcementBar` / `showLastUpdateAuthor` blocks in `docusaurus.config.ts`. Everything else: delete it, git remembers.
