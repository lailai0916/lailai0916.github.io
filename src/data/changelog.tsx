import { translate } from '@docusaurus/Translate';

// https://keepachangelog.com/

export interface ChangelogItem {
  date: string;
  type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
  content: string;
}

export const CHANGELOG_LIST: ChangelogItem[] = [
  {
    date: '2024-10-17',
    type: 'added',
    content: '网站建立',
  },
  {
    date: '2025-09-01',
    type: 'added',
    content: '示例告示框 `example` 组件',
  },
  {
    date: '2025-09-05',
    type: 'added',
    content:
      '接入搜索引擎收录平台：[Google Search Console](https://search.google.com/search-console/welcome)、[Bing Webmaster Tools](https://www.bing.com/webmasters)、[百度搜索资源平台](https://ziyuan.baidu.com/linksubmit/url)',
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
