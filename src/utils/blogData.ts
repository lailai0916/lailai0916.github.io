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

type JsonModule<T> = { default?: T } | T | undefined;

function resolveJsonModule<T>(mod: JsonModule<T>): T | null {
  if (!mod) {
    return null;
  }
  if (typeof mod === 'object' && 'default' in mod && mod.default) {
    return mod.default as T;
  }
  return mod as T;
}

function globJsonModules<T>(pattern: string): T[] {
  const glob = (
    import.meta as unknown as {
      glob?: (
        pattern: string,
        options?: { eager?: boolean; import?: string }
      ) => Record<string, JsonModule<T>>;
    }
  ).glob;
  if (typeof glob !== 'function') {
    return [];
  }
  const modules = glob(pattern, { eager: true });
  return Object.values(modules)
    .map((mod) => resolveJsonModule<T>(mod) ?? null)
    .filter((value): value is T => value !== null);
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
        const resolved = resolveJsonModule<any>(mod);
        const items = resolved?.items ?? [];
        if (Array.isArray(items)) collected.push(...items);
      } catch {
        // ignore single file read error
      }
    });
  } catch {
    // context 不可用时（如非 Webpack/Rspack 环境），尝试使用 import.meta.glob
    const modules = globJsonModules<any>(
      '@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-*.json'
    );
    if (modules.length) {
      modules.forEach((mod) => {
        const items = mod?.items ?? [];
        if (Array.isArray(items)) {
          collected.push(...items);
        }
      });
    } else {
      const data = require('@generated/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json');
      if (data?.items) collected.push(...data.items);
    }
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
      const data = resolveJsonModule<any>(mod);
      if (data && data.permalink && Array.isArray(data.tags)) {
        list.push(data);
      }
    });
  } catch {
    // context 不可用时，使用 import.meta.glob 作为兼容实现
    const modules = globJsonModules<any>(
      '@generated/docusaurus-plugin-content-blog/default/site-blog-*.json'
    );
    modules.forEach((data) => {
      if (data && data.permalink && Array.isArray(data.tags)) {
        list.push(data);
      }
    });
  }
  return list;
}

export function getRecentBlogPosts(maxCount: number = 4): ProcessedBlogPost[] {
  const items = getAllBlogItems();

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
        isPinned: tags.some((tag) => tag.permalink === '/blog/tags/pinned'),
      };
    })
    .filter((post): post is ProcessedBlogPost & { isPinned: boolean } =>
      Boolean(post.permalink && post.title && post.date)
    );

  const sortedPosts = postsWithMetadata.sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? 1 : -1;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sortedPosts.slice(0, maxCount).map(({ isPinned, ...post }) => post); // 移除 isPinned 属性
}

export function getArchiveByYear(): { year: number; count: number }[] {
  const items = getAllBlogItems();

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
type TagAggregate = {
  label: string;
  permalink: string;
  count: number;
};

const cachedOfficialTags = new Map<string, TagAggregate[]>();

const getLocaleCacheKey = (locale?: string) =>
  (locale && locale.toLowerCase()) || 'default';

const getLocaleFilePrefix = (locale?: string) =>
  locale ? `${locale.toLowerCase().replace(/_/g, '-')}-` : '';

function loadOfficialTags(locale?: string): TagAggregate[] {
  const cacheKey = getLocaleCacheKey(locale);
  const cached = cachedOfficialTags.get(cacheKey);
  if (cached) {
    return cached;
  }

  const filePrefix = getLocaleFilePrefix(locale);
  const basePattern = new RegExp(
    `^\\.\/${filePrefix}blog-tags-[a-z0-9]+\\.json$`,
    'i'
  );

  try {
    const ctx = (require as any).context(
      '@generated/docusaurus-plugin-content-blog/default/p',
      false,
      /blog-tags-.*\.json$/
    );
    const candidates = ctx.keys();
    for (const key of candidates) {
      if (!basePattern.test(key)) {
        continue;
      }
      const mod = ctx(key);
      const data = (mod && (mod.tags ?? mod.default?.tags)) as
        | TagAggregate[]
        | undefined;
      if (Array.isArray(data)) {
        cachedOfficialTags.set(cacheKey, data);
        return data;
      }
    }
  } catch {
    // ignore if generated data unavailable during tests/SSR
  }

  if (locale) {
    const fallback = loadOfficialTags();
    cachedOfficialTags.set(cacheKey, fallback);
    return fallback;
  }

  cachedOfficialTags.set(cacheKey, []);
  return [];
}

export function getTagsOfficialOrder({
  limit,
  locale,
}: {
  limit?: number;
  locale?: string;
} = {}): TagAggregate[] {
  const tags = loadOfficialTags(locale);
  if (typeof limit === 'number') {
    return tags.slice(0, Math.max(0, limit));
  }
  return tags;
}
