import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import type {Options as IdealImageOptions} from '@docusaurus/plugin-ideal-image';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'lailai\'s Home',
  tagline: 'lailai 的个人网站，分享技术笔记、项目经验和学习心得。✨',
  // My personal blog, where I share technical notes, project experiences, and learning insights.
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://lailai0916.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'lailai0916', // Usually your GitHub org/user name.
  projectName: 'lailai\'s Home', // Usually your repo name.

  trailingSlash: false,
  onBrokenLinks: 'throw',
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
      {
        docs: {
          sidebarPath: './sidebars.ts',

          // showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [
            remarkMath,
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          rehypePlugins: [rehypeKatex],

          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: '博客',
          blogDescription: 'lailai\'s Blog',
          postsPerPage: 'ALL',
          blogSidebarTitle: '文章列表',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [
            remarkMath,
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        pages: {
          remarkPlugins: [
            remarkMath,
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.svg',
    navbar: {
      // hideOnScroll: true,
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
        },
        {
          type: 'docSidebar',
          sidebarId: 'docs2',
          position: 'left',
          label: '笔记',
        },
        {
          type: 'docSidebar',
          sidebarId: 'docs3',
          position: 'left',
          label: '项目',
        },
        {
          to: 'blog',
          label: '博客',
          position: 'left'
        },
        {
          to: 'about',
          label: '关于',
          position: 'right'
        },
        {
          label: '更多',
          position: 'right',
          items: [
            { label: '友链', to: 'friends' },
            { label: '资源', to: 'resources' },
            { label: '网站', to: 'sites' },
            { label: '旅行', to: 'travel' },
          ],
        },
        {
          href: 'https://github.com/lailai0916/lailai0916.github.io',
          // label: 'GitHub',
          className: 'header-github-link',
          position: 'right',
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
              to: 'docs/contest',
            },
            {
              label: '笔记',
              to: 'docs/note',
            },
            {
              label: '项目',
              to: 'docs/project',
            },
            {
              label: '博客',
              to: 'blog',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'X (Twitter)',
              href: 'https://x.com/lailai0x394',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/lailai0916',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/lailai0916',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/lailai0916',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '关于',
              to: 'about',
            },
            {
              label: '友链',
              to: 'friends',
            },
            {
              label: '设置',
              to: 'settings',
            },
            {
              label: '仓库',
              href: 'https://github.com/lailai0916/lailai0916.github.io',
            },
          ],
        },
      ],
      copyright: `Copyright © 2024-${new Date().getFullYear()} lailai. Built with <a href="https://docusaurus.io" target="_blank">Docusaurus</a>. <p xmlns:cc="http://creativecommons.org/ns#" >This website's content is licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>`,
    },
    docs: {
      sidebar: {
        hideable: true,
        // autoCollapseCategories: true,
      },
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    // announcementBar: {
    //   id: 'announcement',
    //   content: '🎊 Hello, 2025! 🎊',
    //   backgroundColor: '#ffffff',
    //   textColor: '#000000',
    //   isCloseable: true,
    // },
  } satisfies Preset.ThemeConfig,

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

  themes: [
    // ... Your other themes.
    '@docusaurus/theme-mermaid',
    '@docusaurus/theme-live-codeblock',
    [
      // https://github.com/easyops-cn/docusaurus-search-local
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // language:  "zh",
        // ```

        language: ["en", "zh"],
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
      '@docusaurus/plugin-ideal-image',
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
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-HGRTVZK8MR',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/logo.svg',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json', // your PWA manifest
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(29, 155, 240)',
          },
        ],
      },
    ],
  ],

  future: {
    v4: true,
    experimental_faster: true,
  },
};

export default config;
