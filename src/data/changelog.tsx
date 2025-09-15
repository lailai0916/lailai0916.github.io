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
      '接入搜索引擎收录平台：[Google Search Console](https://search.google.com/search-console/welcome)、[Bing Webmaster Tools](https://www.bing.com/webmasters)、[百度搜索资源平台](https://ziyuan.baidu.com/linksubmit/url)',
  },
  {
    date: '2025-09-01',
    type: 'added',
    content: '示例告示框 `example`',
  },
  {
    date: '2025-08-13',
    type: 'added',
    content: 'KaTeX 复制优化插件 **copy-tex**',
  },
  {
    date: '2025-06-23',
    type: 'changed',
    content: '默认语言从 **简体中文** 更改为 **English**',
  },
  {
    date: '2025-06-23',
    type: 'added',
    content: '国际化支持 **English**',
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
