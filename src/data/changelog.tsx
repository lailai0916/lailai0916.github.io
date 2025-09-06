// https://keepachangelog.com/zh-CN/

export interface ChangelogItem {
  date: string;
  type: 'Added' | 'Changed' | 'Deprecated' | 'Removed' | 'Fixed' | 'Security';
  content: string;
}

export const CHANGELOG_LIST: ChangelogItem[] = [
  {
    date: '2024-10-17',
    type: 'Added',
    content: '网站建立',
  },
  {
    date: '2025-09-05',
    type: 'Added',
    content:
      '接入搜索引擎收录平台：[Google Search Console](https://search.google.com/search-console/welcome)、[Bing Webmaster Tools](https://www.bing.com/webmasters)、[百度搜索资源平台](https://ziyuan.baidu.com/linksubmit/url)',
  },
  {
    date: '2025-09-06',
    type: 'Added',
    content: '示例告示框 `example` 组件',
  },
];
