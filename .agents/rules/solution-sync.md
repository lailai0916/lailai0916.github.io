---
paths:
  - 'blog/solution/**/*.mdx'
  - 'docs/contest/personal/luogu.mdx'
---

# 题解页面路由与站点外壳

本仓库只维护 `blog/solution/**` 的网站呈现与洛谷贡献文档中的本地索引。涉及题解正文或洛谷专栏状态时，先加载外部 `lailai-skill`，由它路由完整工作流；本仓库不决定何时抓题、解题、评测、同步专栏或提交审核，也不复制相应规则。

每篇 `blog/solution/<PID>.mdx` 都是带 `lid` 的洛谷专栏镜像。外部流程要求同步时，以站内 MDX 正文为内容源，并由外部流程负责授权、验证、发布与回读。

## 项目特有约定

- **站点外壳 / frontmatter** 见 [`writing-style.md`](writing-style.md)；题解正文由外部工作流唯一维护。其中 `summary` / `description` 是站内独有字段，可单独增补，**不需重新 sign-off**。
- **AI 题解索引** 固定在 `docs/contest/personal/luogu.mdx` 的 `### AI 题解`，仅列完整标题与洛谷专栏链接。所有条目直接放在同一个列表，不建立合集博客或逐题页面；格式见 [`writing-style.md`](writing-style.md)。
- **维护方式** 只使用本仓库的 Agent 文本规则与行为测试，不为 AI 题解索引增加专用脚本或包管理命令。
- **`blog/solution/*.mdx` 镜像洛谷**：任何站点级 sweep / reformat / 审查（含「找全站问题」式检测）一律**绕开这些文件、单独列出**。用户明确要求维护某篇题解时，该任务本身即授权本地修改；真实发布与审核仍由外部工作流的授权、回读与平台规范闸门决定。
