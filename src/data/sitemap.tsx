import { translate } from '@docusaurus/Translate';

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
    title: translate({
      id: 'data.sitemap.pages.title',
      message: 'Pages',
    }),
    sitemaps: [
      {
        title: translate({
          id: 'data.sitemap.pages.home',
          message: 'Home',
        }),
        href: '/',
      },
      {
        title: translate({
          id: 'data.sitemap.pages.about',
          message: 'About',
        }),
        href: '/about',
      },
      {
        title: translate({
          id: 'data.sitemap.pages.travel',
          message: 'Travel',
        }),
        href: '/travel',
      },
      {
        title: translate({
          id: 'data.sitemap.pages.friends',
          message: 'Friends',
        }),
        href: '/friends',
      },
      {
        title: translate({
          id: 'data.sitemap.pages.resources',
          message: 'Resources',
        }),
        href: '/resources',
      },
      {
        title: translate({
          id: 'data.sitemap.pages.games',
          message: 'Games',
        }),
        href: '/games',
      },
    ],
  },
  {
    title: translate({
      id: 'data.sitemap.sitemap.title',
      message: 'Sitemap',
    }),
    sitemaps: [
      {
        title: translate({
          id: 'data.sitemap.sitemap.sitemap',
          message: 'Sitemap',
        }),
        href: '/sitemap',
      },
    ],
  },
  {
    title: translate({
      id: 'data.sitemap.docs.title',
      message: 'Docs',
    }),
    sitemaps: [
      {
        title: translate({
          id: 'data.sitemap.docs.contest',
          message: 'Contest',
        }),
        href: '/docs/contest',
      },
      {
        title: translate({
          id: 'data.sitemap.docs.note',
          message: 'Note',
        }),
        href: '/docs/note',
      },
      {
        title: translate({
          id: 'data.sitemap.docs.project',
          message: 'Project',
        }),
        href: '/docs/project',
      },
    ],
  },
  {
    title: translate({
      id: 'data.sitemap.blog.title',
      message: 'Blog',
    }),
    sitemaps: [
      {
        title: translate({
          id: 'data.sitemap.blog.blog',
          message: 'Blog',
        }),
        href: '/blog',
      },
      {
        title: translate({
          id: 'data.sitemap.blog.archive',
          message: 'Archive',
        }),
        href: '/blog/archive',
      },
      {
        title: translate({
          id: 'data.sitemap.blog.authors',
          message: 'Authors',
        }),
        href: '/blog/authors',
      },
      {
        title: translate({
          id: 'data.sitemap.blog.tags',
          message: 'Tags',
        }),
        href: '/blog/tags',
      },
    ],
  },
  {
    title: translate({
      id: 'data.sitemap.search.title',
      message: 'Search',
    }),
    sitemaps: [
      {
        title: translate({
          id: 'data.sitemap.search.search',
          message: 'Search',
        }),
        href: '/search',
      },
    ],
  },
  {
    title: translate({
      id: 'data.sitemap.settings.title',
      message: 'Settings',
    }),
    sitemaps: [
      {
        title: translate({
          id: 'data.sitemap.settings.settings',
          message: 'Settings',
        }),
        href: '/settings',
      },
    ],
  },
  {
    title: translate({
      id: 'data.sitemap.test.title',
      message: 'Test',
    }),
    sitemaps: [
      {
        title: translate({
          id: 'data.sitemap.test.test',
          message: 'Test',
        }),
        href: '/test',
      },
    ],
  },
];
