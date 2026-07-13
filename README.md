<div align="center">
  <h1>lailai's Home</h1>
  <p>English | <a href="README.zh-Hans.md">简体中文</a></p>
  <p>
    <img src="https://img.shields.io/github/actions/workflow/status/lailai0916/lailai0916.github.io/deploy.yml?style=flat-square" />
    <img src="https://img.shields.io/github/last-commit/lailai0916/lailai0916.github.io?style=flat-square" />
    <img src="https://img.shields.io/github/languages/top/lailai0916/lailai0916.github.io?style=flat-square" />
    <img src="https://img.shields.io/github/repo-size/lailai0916/lailai0916.github.io?style=flat-square" />
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4?style=flat-square" />
    <img src="https://img.shields.io/badge/linter-ESLint-4B32C3?style=flat-square" />
    <img src="https://img.shields.io/github/license/lailai0916/lailai0916.github.io?style=flat-square" />
  </p>
  <a href="https://lailai.one">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://cloud.lailai.one/f/Wr3he/preview-dark.png" />
      <source media="(prefers-color-scheme: light)" srcset="https://cloud.lailai.one/f/BQPuA/preview-light.png" />
      <img src="https://cloud.lailai.one/f/BQPuA/preview-light.png" />
    </picture>
  </a>
</div>

## Website Introduction

My personal website for sharing technical notes, project experience, and learning insights.

Built with [Docusaurus](https://docusaurus.io), source code hosted on [GitHub](https://github.com/lailai0916/lailai0916.github.io), and deployed on [GitHub Pages](https://pages.github.com).

## Website Features

🎨 **Bespoke Home** — A custom bento-grid homepage with an animated Lorenz Attractor and a typewriter intro.

📰 **Reimagined Blog** — A fully redesigned blog with a rich sidebar and enhanced article pages.

📄 **Custom Pages** — Handcrafted pages beyond the blog and docs, such as About, Travel, and Resources.

🧩 **Custom Components** — Domain-specific MDX components for problems, solutions, embeds, and more.

📐 **Math, Diagrams & Live Code** — Self-hosted [KaTeX](https://katex.org) with copy-tex, [Mermaid](https://mermaid.js.org) diagrams, and live [React](https://react.dev) code blocks.

🔍 **Full-Text Search** — Fast site-wide search powered by [Algolia DocSearch](https://docsearch.algolia.com).

📱 **Responsive Design** — Layouts tuned for everything from phone to desktop.

⚙️ **User Settings** — Runtime controls for theme, accent color, font, and more.

🌐 **Fully Bilingual** — English and Simplified Chinese, with even blog posts fully translated.

🛡️ **Privacy & Comments** — Cookie consent banner and [Giscus](https://giscus.app) comments built in.

📡 **Subscribable Feeds** — Follow new posts via RSS, Atom, or JSON feeds.

🛠️ **In-House Design System** — A handcrafted component library (`laikit`) for a consistent UI.

📊 **Analytics & SEO** — Dual analytics ([Google Analytics](https://analytics.google.com) + a public [Umami](https://umami.is) dashboard) and verification on major search engines.

📦 **Self-Hosted Assets** — Media and fonts served without third-party CDNs at runtime.

🔧 **Type-Safe & Modern Stack** — Built with strict TypeScript and modern CSS.

🚀 **Robust Deployment** — GitHub Actions ships every commit to [GitHub Pages](https://pages.github.com) and a custom server, with a backup domain.

## Getting Started

```bash
git clone https://github.com/lailai0916/lailai0916.github.io.git
cd lailai0916.github.io
npm install
npm start
```

## Project Structure

```bash
lailai0916.github.io/
├── blog/                           # Blog
│   ├── authors.yml                 # Author config
│   └── tags.yml                    # Tag config
├── docs/                           # Documentation
├── i18n/                           # Internationalization files
├── src/                            # Source code
│   ├── components/                 # Custom components
│   ├── css/                        # Custom styles
│   ├── data/                       # Data files
│   ├── hooks/                      # Custom hooks
│   ├── pages/                      # Custom pages
│   ├── theme/                      # Custom theme
│   └── utils/                      # Utility functions
├── static/                         # Static assets
│   ├── img/                        # Image files
│   ├── json/                       # JSON files
│   └── CNAME                       # Domain config
├── docusaurus.config.ts            # Docusaurus config
├── eslint.config.mjs               # ESLint config
├── LICENSE                         # Code license
├── LICENSE-docs                    # Documentation license
├── package-lock.json               # Dependency lock file
├── package.json                    # Dependency config
├── sidebars.ts                     # Documentation sidebar config
└── tsconfig.json                   # TypeScript config
```

## Subscribe

Stay updated with the latest blog posts:

- [RSS Feed](https://lailai.one/blog/rss.xml)
- [Atom Feed](https://lailai.one/blog/atom.xml)
- [JSON Feed](https://lailai.one/blog/feed.json)

## Sponsor

You can buy me a coffee, and I'll do better. Thanks!

|                          PayPal                          |                          Alipay                          |                        WeChat Pay                        |
| :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
| ![](https://cloud.lailai.one/f/jzaFq/sponsor-paypal.svg) | ![](https://cloud.lailai.one/f/1YDhZ/sponsor-alipay.svg) | ![](https://cloud.lailai.one/f/mdrTZ/sponsor-wechat.svg) |

## License

This project's code is licensed under [MIT License](LICENSE), and this website's content is licensed under [CC BY 4.0](LICENSE-docs).
