import { translate } from '@docusaurus/Translate';

// https://keepachangelog.com/

export interface ChangelogItem {
  date: string;
  type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
  content: string;
}

export const CHANGELOG_LIST: ChangelogItem[] = [
  {
    date: '2025-10-01',
    type: 'changed',
    content: '<code>&lt;Solution /&gt;</code> 题解标题组件',
  },
  {
    date: '2025-09-26',
    type: 'changed',
    content:
      '更新至 <a href="https://docsearch.algolia.com/docs/what-is-docsearch">DocSearch v4</a>',
  },
  {
    date: '2025-09-25',
    type: 'changed',
    content:
      '更新至 <a href="https://docusaurus.io/blog/releases/3.9">Docusaurus 3.9</a>',
  },
  {
    date: '2025-09-05',
    type: 'added',
    content:
      '搜索引擎收录平台（<a href="https://search.google.com/search-console/welcome">Google Search Console</a>、<a href="https://www.bing.com/webmasters">Bing Webmaster Tools</a>、<a href="https://ziyuan.baidu.com/linksubmit/url">百度搜索资源平台</a>）',
  },
  {
    date: '2025-09-01',
    type: 'added',
    content: '博客新版布局（实验性）',
  },
  {
    date: '2025-08-31',
    type: 'added',
    content: '<code>:::example</code> 示例告示框',
  },
  {
    date: '2025-08-25',
    type: 'added',
    content: '<b>Umami</b> 分析',
  },
  {
    date: '2025-08-14',
    type: 'added',
    content: '<b>debug</b> 调试模式（实验性）',
  },
  {
    date: '2025-08-13',
    type: 'added',
    content: '<b>copy-tex</b> 公式复制优化插件',
  },
  {
    date: '2025-07-22',
    type: 'added',
    content: '<code>&lt;GitHub /&gt;</code> 项目展示组件',
  },
  {
    date: '2025-06-23',
    type: 'changed',
    content: '默认语言从 <b>简体中文</b> 更改为 <b>English</b>',
  },
  {
    date: '2025-06-23',
    type: 'added',
    content: '<b>English</b> 国际化支持',
  },
  {
    date: '2025-01-08',
    type: 'added',
    content: '<b>Mermaid</b> 图表支持',
  },
  {
    date: '2025-01-08',
    type: 'added',
    content: '<b>Google Analytics</b> 分析',
  },
  {
    date: '2024-10-17',
    type: 'added',
    content: '网站建立',
  },
];

export const TYPE_LABEL = {
  added: translate({ id: 'data.changelog.type.added', message: 'Added' }),
  changed: translate({ id: 'data.changelog.type.changed', message: 'Changed' }),
  deprecated: translate({
    id: 'data.changelog.type.deprecated',
    message: 'Deprecated',
  }),
  removed: translate({ id: 'data.changelog.type.removed', message: 'Removed' }),
  fixed: translate({ id: 'data.changelog.type.fixed', message: 'Fixed' }),
  security: translate({
    id: 'data.changelog.type.security',
    message: 'Security',
  }),
} as const;
