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
    const ctx = (require as any).context(
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
    const ctx = (require as any).context('~blog/default', false, /\.json$/);
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

// 博客配置常量
const BLOG_CONFIG = {
  PINNED_TAG_LABEL: 'Pinned',
} as const;

/**
 * 检查文章是否为置顶文章
 */
function isPinnedPost(tags: any[]): boolean {
  return tags.some(
    (tag: any) =>
      (tag.label || tag.name || tag) === BLOG_CONFIG.PINNED_TAG_LABEL
  );
}

/**
 * 自定义排序：按日期降序，但将置顶文章排在最后
 */
function sortPostsWithPinnedLast(
  posts: (ProcessedBlogPost & { isPinned: boolean })[]
): (ProcessedBlogPost & { isPinned: boolean })[] {
  return posts.sort((a, b) => {
    // 如果一个是置顶，一个不是，非置顶的排在前面
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? 1 : -1;
    }
    // 如果都是置顶或都不是置顶，按日期降序排列
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getRecentBlogPosts(maxCount: number = 4): ProcessedBlogPost[] {
  const items = getAllBlogItems();
  if (!items.length) return [];

  // 获取文章的完整元数据（包含标签信息）
  const allMetadata = getAllPostMetadata();
  const metadataMap = new Map<string, any>();
  allMetadata.forEach((meta) => {
    if (meta.permalink) {
      metadataMap.set(meta.permalink, meta);
    }
  });

  const postsWithMetadata = items
    .map((item: any) => {
      const permalink = item.permalink ?? item.metadata?.permalink;
      const metadata = metadataMap.get(permalink);
      const tags = metadata?.tags || [];

      return {
        title: item.title ?? item.metadata?.title,
        date: item.date ?? item.metadata?.date,
        permalink,
        isPinned: isPinnedPost(tags),
      };
    })
    .filter((post): post is ProcessedBlogPost & { isPinned: boolean } =>
      Boolean(post.permalink && post.title && post.date)
    );

  const sortedPosts = sortPostsWithPinnedLast(postsWithMetadata);

  return sortedPosts.slice(0, maxCount).map(({ isPinned, ...post }) => post); // 移除 isPinned 属性
}

/**
 * 返回所有文章数量
 */
export function getBlogPostCount(): number {
  return getAllBlogItems().length;
}

export function getArchiveByYear(): { year: number; count: number }[] {
  const items = getAllBlogItems();
  if (!items.length) return [];

  const counts = new Map<number, number>();
  items
    .filter((it: any) => {
      const link = it.permalink ?? it.metadata?.permalink;
      return link; // 移除硬编码排除，显示所有文章
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
 * 读取官方生成的标签列表，保持与 Docusaurus 默认顺序一致。
 */
let cachedOfficialTags: Array<{ label: string; permalink: string; count: number }> | null = null;

function loadOfficialTags(): Array<{ label: string; permalink: string; count: number }> {
  if (cachedOfficialTags) {
    return cachedOfficialTags;
  }

  try {
    const ctx = (require as any).context(
      '@generated/docusaurus-plugin-content-blog/default/p',
      false,
      /blog-tags-.*\.json$/
    );
    const candidates = ctx.keys();
    for (const key of candidates) {
      const mod = ctx(key);
      const data = (mod && (mod.tags ?? mod.default?.tags)) as
        | Array<{ label: string; permalink: string; count: number }>
        | undefined;
      if (Array.isArray(data)) {
        cachedOfficialTags = data;
        return cachedOfficialTags;
      }
    }
  } catch {
    // ignore if generated data unavailable during tests/SSR
  }

  cachedOfficialTags = [];
  return cachedOfficialTags;
}

export function getTagsOfficialOrder(limit?: number): Array<{
  label: string;
  permalink: string;
  count: number;
}> {
  const tags = loadOfficialTags();
  if (typeof limit === 'number') {
    return tags.slice(0, Math.max(0, limit));
  }
  return tags;
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
  const map = new Map<
    string,
    { label: string; permalink: string; count: number }
  >();
  metas.forEach((meta: any) => {
    const tags: any[] = meta.tags ?? [];
    tags.forEach((t) => {
      const label = t.label ?? t.name ?? String(t);
      const permalink =
        t.permalink ?? `/blog/tags/${(t.name || label).toLowerCase()}`;
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
