import { translate } from '@docusaurus/Translate';

// https://keepachangelog.com/

export interface ChangelogItem {
  date: string;
  type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
  content: string;
}

export const CHANGELOG_LIST: ChangelogItem[] = [
  {
    date: '2025-09-05',
    type: 'added',
    content:
      '搜索引擎收录平台（[Google Search Console](https://search.google.com/search-console/welcome)、[Bing Webmaster Tools](https://www.bing.com/webmasters)、[百度搜索资源平台](https://ziyuan.baidu.com/linksubmit/url)）',
  },
  {
    date: '2025-09-01',
    type: 'added',
    content: '博客新版布局（实验性）',
  },
  {
    date: '2025-08-31',
    type: 'added',
    content: '`example` 示例告示框',
  },
  {
    date: '2025-08-14',
    type: 'added',
    content: '**debug** 调试模式（实验性）',
  },
  {
    date: '2025-08-13',
    type: 'added',
    content: '**copy-tex** 公式复制优化插件',
  },
  {
    date: '2025-07-22',
    type: 'added',
    content: '**GitHub** 项目展示组件',
  },
  {
    date: '2025-06-23',
    type: 'changed',
    content: '默认语言从 **简体中文** 更改为 **English**',
  },
  {
    date: '2025-06-23',
    type: 'added',
    content: '**English** 国际化支持',
  },
  {
    date: '2025-01-08',
    type: 'added',
    content: '**Mermaid** 图表支持',
  },
  {
    date: '2025-01-08',
    type: 'added',
    content: '**Google Analytics** 分析',
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
