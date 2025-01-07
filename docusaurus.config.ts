// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'lailai\'s Home',
  tagline: '光锥之内，就是命运。',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  // url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  // baseUrl: '/',



  url: 'https://lailai0916.github.io',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lailai0916', // Usually your GitHub org/user name.
  projectName: 'lailai\'s Home', // Usually your repo name.
  trailingSlash: false,





  // onBrokenLinks: 'throw',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          showLastUpdateTime: true,

          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],

          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },

        blog: {
          showLastUpdateTime: true,

          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],

          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: '文章列表',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  markdown: {
    mermaid: true,
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo.svg',
      navbar: {
        title: 'lailai\'s Home',
        logo: {
          alt: 'lailai\'s Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docs1',
            position: 'left',
            label: '竞赛',
            to: '/docs/competition'
          },
          {
            type: 'docSidebar',
            sidebarId: 'docs2',
            position: 'left',
            label: '数学',
            to: '/docs/math',
          },
          {
            type: 'docSidebar',
            sidebarId: 'docs3',
            position: 'left',
            label: '项目',
            to: '/docs/project',
          },
          {
            to: '/blog',
            label: '博客',
            position: 'left'
          },
          {
            to: '/about',
            label: '关于',
            position: 'right'
          },
          {
            label: '更多',
            position: 'right',
            items: [
              { label: '友链', to: '/friend' },
              { label: '网站', to: '/site' },
              { label: '设置', to: '/set' },
            ],
          },
          {
            href: 'https://github.com/lailai0916/lailai0916.github.io',
            // label: 'GitHub',
            position: 'right',
            className: 'header-github-link',
            // 'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        links: [
          {
            title: '文档',
            items: [
              {
                label: '竞赛',
                to: '/docs/competition',
              },
              {
                label: '数学',
                to: '/docs/math',
              },
              {
                label: '项目',
                to: '/docs/project',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/lailai0916',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/lailai0916',
              },
              {
                label: 'X',
                href: 'https://x.com/lailai0x394',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: '关于',
                to: '/about',
              },
              {
                label: '设置',
                to: '/set',
              },
            ],
          },
        ],
        copyright: `Copyright © 2024-${new Date().getFullYear()} lailai. Built with <a href="https://docusaurus.io" target="_blank">Docusaurus</a>. <p xmlns:cc="http://creativecommons.org/ns#" >This website's content is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {hideable: true},
      },
      announcementBar: {
        id: 'announcement',
        content: '🎊 Hello, 2025! 🎊',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        isCloseable: true,
      },
    }),

  themes: [
    // ... Your other themes.
    '@docusaurus/theme-mermaid',
    [
        // 本地搜索
        // https://github.com/easyops-cn/docusaurus-search-local
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      // @ts-ignore
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // language:  "zh",
        // ```

        language: ["en", "zh"], // 搜索语言
        indexDocs: true, // 是否对docs进行索引
        indexBlog: true, // 是否对blog进行索引
        indexPages: false, // 是否对pages进行索引
        docsRouteBasePath: ["/docs","/linux","/services"],

      }),
    ],
  ],

  plugins: [
    async function tailwindcssPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    },
    [
      'ideal-image',
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
      } satisfies IdealImageOptions,
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/v50',
            to: 'https://v50to.me',
          },
        ],
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-HGRTVZK8MR',
        anonymizeIP: true,
      },
    ],
  ],
};

export default config;
