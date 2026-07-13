---
paths:
  - 'blog/solution/**/*.mdx'
---

# 题解 → 洛谷同步

每篇 `blog/solution/<PID>.mdx` 在**洛谷专栏有一份对外拷贝**（frontmatter 的 `lid` 指向它）。站内 mdx 是**唯一权威源**：改了正文，洛谷那份就过期，需同步——**实质改动就主动发起**（不必等 lailai 提醒）。

**完整流程、工具、全部安全红线**（只从洛谷取题、cookie 零密钥、`--live` / 新建前须 lailai 明确确认、防注入、不照搬参考、回填秒级时间 + aid 并保持两边严格一致）**都在 lailai.skill 的单一出处** [`references/luogu-solution.md`](../skills/lailai-skill/references/luogu-solution.md)（脚本 `tools/luogu/publish.py`）。本仓库不复述。

## 项目特有约定

- **题解模板 / frontmatter** 见 [`writing-style.md`](writing-style.md)；其中 `summary` / `description` 是站内独有字段，可单独增补，**不需重新 sign-off**。
- **`blog/solution/*.mdx` 镜像洛谷**：任何站点级 sweep / reformat / 审查（含「找全站问题」式检测）一律**绕开这些文件、单独列出**，经 lailai 确认再改，别并进批量。
