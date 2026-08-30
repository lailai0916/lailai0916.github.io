---
paths:
  - 'blog/solution/**/*.mdx'
---

# 题解 → 洛谷同步

除 `writing-style.md` 定义的 `ai-solutions-<number>.mdx` 汇总索引外，每篇 `blog/solution/<PID>.mdx` 在**洛谷专栏有一份对外拷贝**（frontmatter 的 `lid` 指向它）。站内 mdx 是**唯一权威源**：改了正文，洛谷那份就过期，需同步——**实质改动就主动发起**（不必等 lailai 提醒）。

**完整抓题、参考、求解、验证、对拍、成稿与合规发布流程由外部 `lailai-skill` 路由**。本仓库不复制专用 Skill，也不硬编码其工具路径。执行题解任务时先加载 `lailai-skill`，再按其跨仓库路由读取完整工作流；目标仓库内部规则仍负责本文件规定的站点层。

## 项目特有约定

- **站点外壳 / frontmatter** 见 [`writing-style.md`](writing-style.md)；题解正文由外部工作流唯一维护。其中 `summary` / `description` 是站内独有字段，可单独增补，**不需重新 sign-off**。
- **`blog/solution/*.mdx` 镜像洛谷**：任何站点级 sweep / reformat / 审查（含「找全站问题」式检测）一律**绕开这些文件、单独列出**。用户明确要求维护某篇题解时，该任务本身即授权本地修改；真实发布与审核仍由外部工作流的授权、回读与平台规范闸门决定。
