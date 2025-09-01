export interface BlogPost {
  title: string;
  permalink: string;
  date: string;
  // optional fields
  tags?: Array<{ label?: string; name?: string; permalink?: string } | string>;
}

export interface ProcessedBlogPost {
  title: string;
  date: string;
  permalink: string;
}

// 博客配置常量
export const BLOG_CONFIG = {
  EXCLUDED_PERMALINKS: ['/blog/welcome', '/zh-Hans/blog/welcome'] as string[],
} as const;

function getBlogListData(): any {
  try {
    const data = require('@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json');
    // 静默加载博客数据
    return data;
  } catch (error) {
    // 静默处理博客数据加载失败
    return null;
  }
}

/**
 * 汇总所有分页中的博客列表（更完整统计）
 * 通过 require.context 收集 default 目录下所有 blog-post-list-prop-*.json
 */
export function getAllBlogItems(): any[] {
  const collected: any[] = [];
  try {
    const ctx = require.context(
      '@generated/docusaurus-plugin-content-blog/default',
      false,
      /blog-post-list-prop-.*\.json$/
    );
    ctx.keys().forEach((key: string) => {
      try {
        const mod = ctx(key);
        const items = (mod && (mod.items || mod.default?.items)) ?? [];
        if (Array.isArray(items)) collected.push(...items);
      } catch {
        // ignore single file read error
      }
    });
  } catch {
    // context 不可用时，退化为 default 页面数据
    const data = getBlogListData();
    if (data?.items) collected.push(...data.items);
  }
  // 去重（按 permalink）
  const seen = new Set<string>();
  return collected.filter((it) => {
    const link: string = (it?.permalink || it?.metadata?.permalink) ?? '';
    if (!link || seen.has(link)) return false;
    seen.add(link);
    return true;
  });
}

/**
 * 读取所有博文的 metadata（包含 tags），通过 ~blog 别名读取编译期生成的数据。
 * 这是官方插件在 routes 构建阶段以 `createData(hash).json` 形式写入的 BlogPostMetadata。
 */
export function getAllPostMetadata(): any[] {
  const list: any[] = [];
  try {
    const ctx = require.context('~blog/default', false, /\.json$/);
    ctx.keys().forEach((key: string) => {
      const mod = ctx(key);
      const data = (mod && (mod.default ?? mod)) as any;
      if (data && data.permalink && Array.isArray(data.tags)) {
        list.push(data);
      }
    });
  } catch {
    // ignore if alias/context unsupported during type-checking
  }
  return list;
}

export function getRecentBlogPosts(maxCount: number = 4): ProcessedBlogPost[] {
  const items = getAllBlogItems();
  if (!items.length) return [];
  const posts: BlogPost[] = items.map((it: any) => ({
    title: it.title ?? it.metadata?.title,
    date: it.date ?? it.metadata?.date,
    permalink: it.permalink ?? it.metadata?.permalink,
  }));
  return posts
    .filter((p) => p.permalink && !BLOG_CONFIG.EXCLUDED_PERMALINKS.includes(p.permalink))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, maxCount)
    .map((post) => ({ title: post.title, date: post.date, permalink: post.permalink }));
}

/**
 * 返回所有文章数量（排除不希望展示的页面）
 */
export function getBlogPostCount(): number {
  const items = getAllBlogItems();
  if (!items.length) return 0;
  return items.filter((it: any) => {
    const link = it.permalink ?? it.metadata?.permalink;
    return link && !BLOG_CONFIG.EXCLUDED_PERMALINKS.includes(link);
  }).length;
}

/**
 * 统计按年份的归档数量（降序）
 */
export function getArchiveByYear(): { year: number; count: number }[] {
  const items = getAllBlogItems();
  if (!items.length) return [];

  const counts = new Map<number, number>();
  items
    .filter((it: any) => {
      const link = it.permalink ?? it.metadata?.permalink;
      return link && !BLOG_CONFIG.EXCLUDED_PERMALINKS.includes(link);
    })
    .forEach((it: any) => {
      const dateStr = it.date ?? it.metadata?.date;
      const y = new Date(dateStr).getUTCFullYear();
      if (!Number.isFinite(y)) return;
      counts.set(y, (counts.get(y) ?? 0) + 1);
    });

  return Array.from(counts.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year - a.year);
}

/**
 * 读取标签统计（若生成数据不可用，则返回空列表）。
 * 返回格式：label、permalink、count
 */
export function getTopTags(limit: number = 20): Array<{
  label: string;
  permalink: string;
  count: number;
}> {
  // 使用全量 metadata（包含 tags）进行统计，官方推荐的 ~blog 别名生成物
  const metas = getAllPostMetadata();
  if (!metas.length) return [];
  const map = new Map<string, { label: string; permalink: string; count: number }>();
  metas.forEach((meta: any) => {
    const tags: any[] = meta.tags ?? [];
    tags.forEach((t) => {
      const label = t.label ?? t.name ?? String(t);
      const permalink = t.permalink ?? `/blog/tags/${(t.name || label).toLowerCase()}`;
      const prev = map.get(label) ?? { label, permalink, count: 0 };
      prev.count += 1;
      map.set(label, prev);
    });
  });
  return Array.from(map.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * 统计全站去重后的标签总数
 */
export function getAllTagCount(): number {
  const metas = getAllPostMetadata();
  if (!metas.length) return 0;
  const set = new Set<string>();
  metas.forEach((meta: any) => {
    const tags: any[] = meta.tags ?? [];
    tags.forEach((t) => {
      const label = t.label ?? t.name ?? String(t);
      set.add(label);
    });
  });
  return set.size;
}
