<div align="center">
  <h1>lailai's Home</h1>
  <p><a href="README.md">English</a> | 简体中文</p>
  <p>
    <img src="https://img.shields.io/github/actions/workflow/status/lailai0916/lailai0916.github.io/deploy.yml?style=flat-square" />
    <img src="https://img.shields.io/github/last-commit/lailai0916/lailai0916.github.io?style=flat-square" />
    <img src="https://img.shields.io/github/languages/top/lailai0916/lailai0916.github.io?style=flat-square" />
    <img src="https://img.shields.io/github/repo-size/lailai0916/lailai0916.github.io?style=flat-square" />
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4?style=flat-square" />
    <img src="https://img.shields.io/github/license/lailai0916/lailai0916.github.io?style=flat-square" />
  </p>
  <a href="https://lailai.one/zh-Hans/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://cloud.lailai.one/f/DJetK/preview-dark.zh-Hans.png" />
      <source media="(prefers-color-scheme: light)" srcset="https://cloud.lailai.one/f/MrdIy/preview-light.zh-Hans.png" />
      <img src="https://cloud.lailai.one/f/MrdIy/preview-light.zh-Hans.png" />
    </picture>
  </a>
</div>

## 网站简介

我的个人网站，分享技术笔记、项目经验与学习心得。

使用 [Docusaurus](https://docusaurus.io) 构建，源代码托管于 [GitHub](https://github.com/lailai0916/lailai0916.github.io)，并部署在 [GitHub Pages](https://pages.github.com)。

## 网站特性

🎨 **定制首页**：基于便当格布局的自定义首页，配有动态 Lorenz Attractor 与打字机式的身份介绍。

📰 **重塑博客**：全面重新设计的博客，配有丰富的侧边栏与增强的文章页。

📄 **自定义页面**：博客与文档之外的精心定制页面，如 About、Travel、Resources 等。

🧩 **自定义组件**：面向题目、题解、嵌入等场景的领域 MDX 组件。

📐 **数学、图表与实时代码**：自托管 [KaTeX](https://katex.org) 并支持公式复制，集成 [Mermaid](https://mermaid.js.org) 图表与可实时运行的 [React](https://react.dev) 代码块。

🔍 **全文搜索**：由 [Algolia DocSearch](https://docsearch.algolia.com) 提供的全站快速检索。

📱 **响应式设计**：从手机到桌面的各类屏幕均经过适配。

⚙️ **用户设置**：运行时切换主题、强调色、字体等。

🌐 **完整双语**：英文与简体中文，连博客正文都已翻译。

🛡️ **隐私与评论**：内置 Cookie 同意弹窗与 [Giscus](https://giscus.app) 评论系统。

📡 **订阅源**：通过 RSS、Atom 或 JSON 订阅最新文章。

🛠️ **自建设计系统**：手工打造的组件库（`laikit`），统一全站 UI 风格。

📊 **分析与 SEO**：双重统计（[Google Analytics](https://analytics.google.com) + 公开的 [Umami](https://umami.is) 看板），并已在主流搜索引擎验证。

📦 **资源自托管**：媒体与字体均自托管，运行时无第三方 CDN 依赖。

🔧 **现代技术栈**：基于严格 TypeScript 与现代 CSS 构建。

🚀 **稳健部署**：GitHub Actions 每次提交都同步发布到 [GitHub Pages](https://pages.github.com) 与自建服务器，并配有备用域名。

## 快速开始

```bash
git clone https://github.com/lailai0916/lailai0916.github.io.git
cd lailai0916.github.io
npm install
npm start
```

## 项目结构

```bash
lailai0916.github.io/
├── blog/                           # 博客
│   ├── authors.yml                 # 作者配置
│   └── tags.yml                    # 标签配置
├── docs/                           # 文档
├── i18n/                           # 国际化文件
├── src/                            # 源代码
│   ├── components/                 # 自定义组件
│   ├── css/                        # 自定义样式
│   ├── data/                       # 数据文件
│   ├── hooks/                      # 自定义钩子
│   ├── pages/                      # 自定义页面
│   ├── theme/                      # 自定义主题
│   └── utils/                      # 工具函数
├── static/                         # 静态资源
│   ├── img/                        # 图片文件
│   ├── json/                       # JSON 文件
│   └── CNAME                       # 域名配置
├── docusaurus.config.ts            # Docusaurus 配置
├── LICENSE                         # 代码许可协议
├── LICENSE-docs                    # 文档许可协议
├── package-lock.json               # 依赖锁定文件
├── package.json                    # 依赖配置
├── sidebars.ts                     # 文档侧边栏配置
└── tsconfig.json                   # TypeScript 配置
```

## 博客订阅

获取最新博客文章更新：

- [RSS 订阅](https://lailai.one/zh-Hans/blog/rss.xml)
- [Atom 订阅](https://lailai.one/zh-Hans/blog/atom.xml)
- [JSON 订阅](https://lailai.one/zh-Hans/blog/feed.json)

## 赞助支持

你可以请我喝杯咖啡，我会做得更好。谢谢！

|                           贝宝                           |                          支付宝                          |                         微信支付                         |
| :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
| ![](https://cloud.lailai.one/f/jzaFq/sponsor-paypal.svg) | ![](https://cloud.lailai.one/f/1YDhZ/sponsor-alipay.svg) | ![](https://cloud.lailai.one/f/mdrTZ/sponsor-wechat.svg) |

## 许可协议

本项目代码采用 [MIT 许可协议](LICENSE)，本网站内容采用 [知识共享 署名 4.0 国际许可协议](LICENSE-docs)。
