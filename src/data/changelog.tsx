import { translate } from '@docusaurus/Translate';

interface ChangelogItem {
  date: string;
  type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
  content: string;
}

export const CHANGELOG_LIST: ChangelogItem[] = [
  {
    date: '2026-08-22',
    type: 'removed',
    content: translate({
      id: 'data.changelog.entry20260822GoogleAnalytics',
      message: 'Google Analytics',
    }),
  },
  {
    date: '2026-08-22',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260822Footer',
      message: 'Site footer layout',
    }),
  },
  {
    date: '2026-08-22',
    type: 'removed',
    content: translate({
      id: 'data.changelog.entry20260822CookieBanner',
      message: 'Cookie consent banner',
    }),
  },
  {
    date: '2026-07-16',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260716TorMirror',
      message: 'Tor onion mirror',
    }),
  },
  {
    date: '2026-07-16',
    type: 'removed',
    content: translate({
      id: 'data.changelog.entry20260716PublicIpAccess',
      message: 'Direct access via public IP and port',
    }),
  },
  {
    date: '2026-07-13',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260713Eslint',
      message: 'ESLint code checks',
    }),
  },
  {
    date: '2026-07-11',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260711Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.10.2">Docusaurus v3.10.2</a>',
    }),
  },
  {
    date: '2026-07-08',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260708AiSummary',
      message: 'AI summaries for documentation',
    }),
  },
  {
    date: '2026-06-18',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260618BlogOverview',
      message: 'Blog Overview statistics page',
    }),
  },
  {
    date: '2026-06-14',
    type: 'removed',
    content: translate({
      id: 'data.changelog.entry20260614Solution',
      message: '<code>&lt;Solution /&gt;</code> solution title component',
    }),
  },
  {
    date: '2026-06-09',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260609ImageZoom',
      message: 'Image zoom with docusaurus-plugin-image-zoom',
    }),
  },
  {
    date: '2026-05-24',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260524CodeBlockTheme',
      message: 'Code block themes to <code>vsLight</code> and <code>vsDark</code>',
    }),
  },
  {
    date: '2026-05-24',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260524Katex',
      message: 'KaTeX migration from CDN to npm and upgrade to <code>0.16.47</code>',
    }),
  },
  {
    date: '2026-05-23',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260523PinnedPosts',
      message: 'Blog post pinning',
    }),
  },
  {
    date: '2026-05-10',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260510PublicIpAccess',
      message: 'Direct access via public IP and port',
    }),
  },
  {
    date: '2026-05-01',
    type: 'removed',
    content: translate({
      id: 'data.changelog.entry20260501Sitemap',
      message: 'Sitemap page',
    }),
  },
  {
    date: '2026-05-01',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260501Insights',
      message: 'Insights page',
    }),
  },
  {
    date: '2026-05-01',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260501Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.10.1">Docusaurus v3.10.1</a>',
    }),
  },
  {
    date: '2026-04-28',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260428LorenzAttractor',
      message: 'Lorenz Attractor component on the homepage',
    }),
  },
  {
    date: '2026-04-26',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260426Community',
      message: 'Community component on the About page',
    }),
  },
  {
    date: '2026-04-26',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260426Devices',
      message: 'Devices component on the About page',
    }),
  },
  {
    date: '2026-04-26',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260426CookieBanner',
      message: 'Cookie consent banner',
    }),
  },
  {
    date: '2026-04-25',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260425GrayMode',
      message: 'Site grayscale mode',
    }),
  },
  {
    date: '2026-04-25',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260425CloudDeployment',
      message: 'Primary site deployment to a cloud server',
    }),
  },
  {
    date: '2026-04-25',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260425Mirror',
      message: 'Mirror site <code>lailai0916.com</code>',
    }),
  },
  {
    date: '2026-04-19',
    type: 'removed',
    content: translate({
      id: 'data.changelog.entry20260419Tailwind',
      message: 'Tailwind CSS dependency',
    }),
  },
  {
    date: '2026-04-19',
    type: 'removed',
    content: translate({
      id: 'data.changelog.entry20260419HomeLayout',
      message: 'Legacy homepage layout',
    }),
  },
  {
    date: '2026-04-12',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260412Mdx',
      message: 'Documentation file extension to <code>.mdx</code>',
    }),
  },
  {
    date: '2026-04-12',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260412TravelMap',
      message: 'Travel Map component on the Travel page',
    }),
  },
  {
    date: '2026-04-11',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260411Inter',
      message: 'Default font on non-Apple devices to Inter',
    }),
  },
  {
    date: '2026-04-10',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260410Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.10.0">Docusaurus v3.10.0</a>',
    }),
  },
  {
    date: '2026-04-02',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260402HomeLayout',
      message: 'New homepage layout',
    }),
  },
  {
    date: '2026-01-29',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260129HomeLayout',
      message: 'Experimental new homepage layout',
    }),
  },
  {
    date: '2026-01-28',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260128ReadingProgress',
      message: 'Blog post reading progress indicator',
    }),
  },
  {
    date: '2026-01-25',
    type: 'removed',
    content: translate({
      id: 'data.changelog.entry20260125InspiringThoughts',
      message: 'Inspiring Thoughts component on the homepage',
    }),
  },
  {
    date: '2026-01-25',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260125FourierTransform',
      message: 'Fourier Transform component on the homepage',
    }),
  },
  {
    date: '2026-01-21',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20260121Moments',
      message: 'Moments page',
    }),
  },
  {
    date: '2026-01-18',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20260118Problem',
      message: 'Improved title information for the <code>&lt;Problem /&gt;</code> component',
    }),
  },
  {
    date: '2025-12-26',
    type: 'fixed',
    content: translate({
      id: 'data.changelog.entry20251226KatexWidth',
      message: 'KaTeX formula width issue',
    }),
  },
  {
    date: '2025-12-05',
    type: 'removed',
    content: translate({
      id: 'data.changelog.entry20251205Assets',
      message: '<code>&lt;Assets /&gt;</code> resource management component',
    }),
  },
  {
    date: '2025-12-02',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20251202Cloud',
      message: 'Resource migration to <a href="https://cloud.lailai.one">lailai\'s Cloud</a>',
    }),
  },
  {
    date: '2025-10-23',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20251023Assets',
      message: '<code>&lt;Assets /&gt;</code> resource management component',
    }),
  },
  {
    date: '2025-10-19',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20251019Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.9.2">Docusaurus v3.9.2</a>',
    }),
  },
  {
    date: '2025-10-15',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20251015BlogLayout',
      message: 'New blog layout',
    }),
  },
  {
    date: '2025-10-01',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20251001Solution',
      message: '<code>&lt;Solution /&gt;</code> solution title component',
    }),
  },
  {
    date: '2025-09-30',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20250930Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.9.1">Docusaurus v3.9.1</a>',
    }),
  },
  {
    date: '2025-09-26',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20250926DocSearch',
      message:
        'Search upgraded to <a href="https://docsearch.algolia.com/docs/what-is-docsearch">DocSearch v4</a>',
    }),
  },
  {
    date: '2025-09-26',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20250926Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.9.0">Docusaurus v3.9.0</a>',
    }),
  },
  {
    date: '2025-09-05',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250905SearchPlatforms',
      message:
        '<a href="https://search.google.com/search-console/welcome">Google Search Console</a>, <a href="https://www.bing.com/webmasters">Bing Webmaster Tools</a>, and <a href="https://ziyuan.baidu.com/linksubmit/url">Baidu Search Resource Platform</a> integrations',
    }),
  },
  {
    date: '2025-09-01',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250901BlogLayout',
      message: 'Experimental new blog layout',
    }),
  },
  {
    date: '2025-08-31',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250831Example',
      message: '<code>:::example</code> admonition',
    }),
  },
  {
    date: '2025-08-25',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250825Umami',
      message:
        'Umami analytics dashboard <a href="https://analytics.lailai.one/share/DDd09iBEYOQw2k9L">lailai\'s Analytics</a>',
    }),
  },
  {
    date: '2025-08-14',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250814DebugMode',
      message: 'Site debug mode',
    }),
  },
  {
    date: '2025-08-13',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250813CopyTex',
      message: 'Formula copying improvements with copy-tex',
    }),
  },
  {
    date: '2025-07-22',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250722GitHub',
      message: '<code>&lt;GitHub /&gt;</code> project showcase component',
    }),
  },
  {
    date: '2025-06-23',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20250623DefaultLanguage',
      message: 'Default language to English',
    }),
  },
  {
    date: '2025-06-23',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250623English',
      message: 'English localization support',
    }),
  },
  {
    date: '2025-06-07',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20250607Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.8.1">Docusaurus v3.8.1</a>',
    }),
  },
  {
    date: '2025-05-31',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20250531Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.8.0">Docusaurus v3.8.0</a>',
    }),
  },
  {
    date: '2025-01-08',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250108Mermaid',
      message: 'Mermaid diagrams',
    }),
  },
  {
    date: '2025-01-08',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20250108GoogleAnalytics',
      message: 'Google Analytics',
    }),
  },
  {
    date: '2025-01-03',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20250103Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.7.0">Docusaurus v3.7.0</a>',
    }),
  },
  {
    date: '2024-11-22',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20241122Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.6.3">Docusaurus v3.6.3</a>',
    }),
  },
  {
    date: '2024-11-19',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20241119Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.6.2">Docusaurus v3.6.2</a>',
    }),
  },
  {
    date: '2024-11-08',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20241108Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.6.1">Docusaurus v3.6.1</a>',
    }),
  },
  {
    date: '2024-11-04',
    type: 'changed',
    content: translate({
      id: 'data.changelog.entry20241104Docusaurus',
      message:
        'Site upgraded to <a href="https://docusaurus.io/changelog/3.6.0">Docusaurus v3.6.0</a>',
    }),
  },
  {
    date: '2024-10-29',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20241029Giscus',
      message: 'Giscus comments',
    }),
  },
  {
    date: '2024-10-29',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20241029Iconify',
      message: 'Iconify icons',
    }),
  },
  {
    date: '2024-10-29',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20241029Tailwind',
      message: 'Tailwind CSS dependency',
    }),
  },
  {
    date: '2024-10-19',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20241019LocalSearch',
      message: 'Local search with docusaurus-search-local',
    }),
  },
  {
    date: '2024-10-18',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20241018Katex',
      message: 'KaTeX math typesetting',
    }),
  },
  {
    date: '2024-10-17',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20241017Website',
      message:
        'Personal website <a href="https://lailai.one">lailai\'s Home</a>, built with <a href="https://docusaurus.io/changelog/3.5.2">Docusaurus v3.5.2</a> and deployed on <a href="https://pages.github.com">GitHub Pages</a>',
    }),
  },
  {
    date: '2024-10-16',
    type: 'added',
    content: translate({
      id: 'data.changelog.entry20241016Domain',
      message: '<code>lailai.one</code> domain registration',
    }),
  },
];

export const TYPE_LABEL = {
  added: translate({ id: 'data.changelog.added', message: '[Added]' }),
  changed: translate({
    id: 'data.changelog.changed',
    message: '[Changed]',
  }),
  deprecated: translate({
    id: 'data.changelog.deprecated',
    message: '[Deprecated]',
  }),
  removed: translate({
    id: 'data.changelog.removed',
    message: '[Removed]',
  }),
  fixed: translate({ id: 'data.changelog.fixed', message: '[Fixed]' }),
  security: translate({
    id: 'data.changelog.security',
    message: '[Security]',
  }),
} as const;
