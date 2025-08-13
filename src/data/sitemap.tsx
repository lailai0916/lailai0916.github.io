export interface SitemapItem {
  title: string;
  href: string;
}

export interface SitemapCategoryItem {
  title: string;
  sitemaps: SitemapItem[];
}

export const SITEMAP_LIST: SitemapCategoryItem[] = [
  {
    title: '页面',
    sitemaps: [
      { title: '首页', href: '/' },
      { title: '关于', href: '/about' },
      { title: '旅行', href: '/travel' },
      { title: '友链', href: '/friends' },
      { title: '资源', href: '/resources' },
      { title: '游戏', href: '/game' },
    ],
  },
  {
    title: '地图',
    sitemaps: [{ title: '地图', href: '/map' }],
  },
  {
    title: '文档',
    sitemaps: [
      { title: '竞赛', href: '/docs/contest' },
      { title: '笔记', href: '/docs/note' },
      { title: '项目', href: '/docs/project' },
    ],
  },
  {
    title: '博客',
    sitemaps: [
      { title: '博客', href: '/blog' },
      { title: '归档', href: '/blog/archive' },
      { title: '作者', href: '/blog/author' },
      { title: '标签', href: '/blog/tags' },
    ],
  },
  {
    title: '搜索',
    sitemaps: [{ title: '搜索', href: '/search' }],
  },
  {
    title: '设置',
    sitemaps: [{ title: '设置', href: '/settings' }],
  },
  {
    title: '测试',
    sitemaps: [{ title: '测试', href: '/test' }],
  },
];
