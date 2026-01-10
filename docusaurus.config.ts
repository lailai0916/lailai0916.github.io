import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const defaultLocale = 'en';

const config: Config = {
  title: "lailai's Home",
  tagline:
    "lailai's personal website for sharing technical notes, project experience, and learning insights.",
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    experimental_faster: true,
  },

  url: 'https://lailai.one',
  baseUrl: '/',

  organizationName: 'lailai0916',
  projectName: 'lailai0916.github.io',

  trailingSlash: false,
  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale,
    locales: [defaultLocale, 'zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',

          // showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/lailai0916/lailai0916.github.io/tree/main/',

          remarkPlugins: [
            remarkMath,
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
          rehypePlugins: [rehypeKatex],
          admonitions: { extendDefaults: true, keywords: ['example'] },
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Blog',
          blogDescription: "lailai's Blog",
          // postsPerPage: 'ALL',
          blogSidebarTitle: 'Post List',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: 'all',
            xslt: true,
          },

          // showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          editUrl:
            'https://github.com/lailai0916/lailai0916.github.io/tree/main/',

          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',

          remarkPlugins: [
            remarkMath,
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
          rehypePlugins: [rehypeKatex],
          admonitions: { extendDefaults: true, keywords: ['example'] },
        },
        pages: {
          remarkPlugins: [
            remarkMath,
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
          rehypePlugins: [rehypeKatex],
          admonitions: { extendDefaults: true, keywords: ['example'] },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    algolia: {
      appId: '5RCTMT18J0',
      apiKey: '14ba8b9ca7ed34dbbc3852d690b15473',
      indexName: 'lailai',
      replaceSearchResultPathname: {
        from: `/${defaultLocale}/`,
        to: '/',
      },
      askAi: '58ORw662EwUH',
    },
    navbar: {
      hideOnScroll: true,
      title: "lailai's Home",
      logo: {
        alt: "lailai's Logo",
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'sidebar1',
          position: 'left',
          label: 'Contest',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sidebar2',
          position: 'left',
          label: 'Note',
        },
        {
          type: 'docSidebar',
          sidebarId: 'sidebar3',
          position: 'left',
          label: 'Project',
        },
        { label: 'Blog', to: '/blog', position: 'left' },
        {
          label: 'More',
          position: 'right',
          items: [
            { label: 'About', to: '/about' },
            { label: 'Travel', to: '/travel' },
            { label: 'Friends', to: '/friends' },
            { label: 'Resources', to: '/resources' },
          ],
        },
        { type: 'localeDropdown', position: 'right' },
        {
          href: 'https://github.com/lailai0916/lailai0916.github.io',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Contest', to: '/docs/contest' },
            { label: 'Note', to: '/docs/note' },
            { label: 'Project', to: '/docs/project' },
            { label: 'Blog', to: '/blog' },
          ],
        },
        {
          title: 'Site',
          items: [
            { label: 'Settings', to: '/settings' },
            { label: 'Sitemap', to: '/sitemap' },
            { label: 'Changelog', to: '/changelog' },
            { label: 'Privacy Policy', to: '/privacy' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'X (Twitter)', href: 'https://x.com/lailai0x394' },
            { label: 'Telegram', href: 'https://t.me/lailai0916' },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/lailai0916',
            },
            { label: 'GitHub', href: 'https://github.com/lailai0916' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: "lailai's Status", href: 'https://status.lailai.one' },
            {
              label: "lailai's Analytics",
              href: 'https://analytics.lailai.one/share/DDd09iBEYOQw2k9L',
            },
            {
              label: "lailai's Cloud",
              href: 'https://cloud.lailai.one',
            },
            { label: "lailai's AI", href: 'https://ai.lailai.one' },
          ],
        },
      ],
      copyright: `Copyright © 2021–${new Date().getFullYear()} lailai. Built with <a href="https://docusaurus.io" target="_blank">Docusaurus</a>.<br />This website's content is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
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
    // announcementBar: {
    //   id: 'announcement',
    //   content: 'Happy New Year!',
    // },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    metadata: [
      { name: 'baidu-site-verification', content: 'codeva-eeKBeIm6xX' },
    ],
  } satisfies Preset.ThemeConfig,

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
    mermaid: true,
  },

  scripts: [
    process.env.NODE_ENV === 'production' && {
      src: 'https://analytics.lailai.one/script.js',
      defer: true,
      'data-website-id': '69d3b7de-90e4-4be4-a355-633620ecefdb',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/contrib/copy-tex.min.js',
      defer: true,
    },
  ].filter(Boolean),

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock'],

  plugins: [
    async function tailwindcssPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require('tailwindcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
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
