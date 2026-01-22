import { translate } from '@docusaurus/Translate';

// https://keepachangelog.com

export interface ChangelogItem {
  date: string;
  type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
  content: string;
}

export const CHANGELOG_LIST: ChangelogItem[] = [
  {
    date: '2026-01-18',
    type: 'changed',
    content: '优化 <code>&lt;Problem /&gt;</code> 组件标题信息',
  },
  {
    date: '2025-12-26',
    type: 'fixed',
    content: 'KaTeX 公式宽度问题',
  },
  {
    date: '2025-12-05',
    type: 'removed',
    content: '<code>&lt;Assets /&gt;</code> 资源管理组件',
  },
  {
    date: '2025-12-02',
    type: 'changed',
    content:
      '资源迁移至 <a href="https://cloud.lailai.one">lailai\'s Cloud</a>',
  },
  {
    date: '2025-10-23',
    type: 'added',
    content: '<code>&lt;Assets /&gt;</code> 资源管理组件',
  },
  {
    date: '2025-10-15',
    type: 'changed',
    content: '博客新版布局',
  },
  {
    date: '2025-10-01',
    type: 'added',
    content: '<code>&lt;Solution /&gt;</code> 题解标题组件',
  },
  {
    date: '2025-09-26',
    type: 'changed',
    content:
      '搜索更新至 <a href="https://docsearch.algolia.com/docs/what-is-docsearch">DocSearch v4</a>',
  },
  {
    date: '2025-09-25',
    type: 'changed',
    content:
      '网站更新至 <a href="https://docusaurus.io/blog/releases/3.9">Docusaurus v3.9</a>',
  },
  {
    date: '2025-09-05',
    type: 'added',
    content:
      '网站收录至 <a href="https://search.google.com/search-console/welcome">Google Search Console</a>、<a href="https://www.bing.com/webmasters">Bing Webmaster Tools</a>、<a href="https://ziyuan.baidu.com/linksubmit/url">百度搜索资源平台</a>',
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
    content:
      '<b>Umami</b> 分析',
  },
  {
    date: '2025-08-14',
    type: 'added',
    content: '网站调试模式',
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
    content: '默认语言更改至 <b>English</b>',
  },
  {
    date: '2025-06-23',
    type: 'added',
    content: '国际化支持 <b>English</b>',
  },
  {
    date: '2025-05-31',
    type: 'changed',
    content:
      '网站更新至 <a href="https://docusaurus.io/blog/releases/3.8">Docusaurus v3.8</a>',
  },
  {
    date: '2025-01-08',
    type: 'added',
    content: '<b>Mermaid</b> 图表',
  },
  {
    date: '2025-01-08',
    type: 'added',
    content: '<b>Google Analytics</b> 分析',
  },
  {
    date: '2024-11-05',
    type: 'added',
    content: '<b>Giscus</b> 评论',
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
