interface BlogAuthorSummary {
  key: string;
  name?: string;
  title?: string;
  imageURL?: string;
}

interface BlogTagSummary {
  label?: string;
  permalink?: string;
}

interface BlogPostMetadataSummary {
  permalink: string;
  title: string;
  date: string;
  frontMatter?: { pinned?: boolean };
  unlisted?: boolean;
  tags: BlogTagSummary[];
  authors?: BlogAuthorSummary[];
  readingTime?: number;
}

type JsonModule<T> = { default?: T } | T;

function resolveJsonModule<T extends object>(mod: JsonModule<T>): T {
  if (typeof mod === 'object' && 'default' in mod && mod.default) {
    return mod.default as T;
  }
  return mod as T;
}

/**
 * Read every BlogPostMetadata (including tags) via the `~blog` alias.
 * The official plugin writes these as `createData(hash).json` while building routes.
 */
export function getAllPostMetadata(): BlogPostMetadataSummary[] {
  const list: BlogPostMetadataSummary[] = [];
  const ctx = (require as any).context('~blog/default', false, /\.json$/);
  ctx.keys().forEach((key: string) => {
    const mod = ctx(key);
    const data = resolveJsonModule<BlogPostMetadataSummary>(mod);
    if (data && data.permalink && data.title && data.date && Array.isArray(data.tags)) {
      list.push(data);
    }
  });
  return list;
}

/** The generated list-prop file can be empty outside the blog list route. */
export function getAllBlogItems(locale?: string): BlogPostMetadataSummary[] {
  const prefix = locale ? `/${locale}/blog/` : '/blog/';
  return getAllPostMetadata().filter((post) => post.permalink.startsWith(prefix) && !post.unlisted);
}

/**
 * Read the official tag list, preserving Docusaurus' default ordering.
 */
type TagAggregate = {
  label: string;
  permalink: string;
  count: number;
};

const cachedOfficialTags = new Map<string, TagAggregate[]>();

const getLocaleCacheKey = (locale?: string) => locale?.toLowerCase() ?? 'default';

const getLocaleFilePrefix = (locale?: string) =>
  locale ? `${locale.toLowerCase().replace(/_/g, '-')}-` : '';

export function loadOfficialTags(locale?: string): TagAggregate[] {
  const cacheKey = getLocaleCacheKey(locale);
  const cached = cachedOfficialTags.get(cacheKey);
  if (cached) return cached;

  const filePrefix = getLocaleFilePrefix(locale);
  const basePattern = new RegExp(`^\\./${filePrefix}blog-tags-[a-z0-9]+\\.json$`, 'i');

  const ctx = (require as any).context(
    '@generated/docusaurus-plugin-content-blog/default/p',
    false,
    /blog-tags-.*\.json$/
  );
  for (const key of ctx.keys()) {
    if (!basePattern.test(key)) continue;
    const mod = ctx(key);
    const data = (mod && (mod.tags ?? mod.default?.tags)) as TagAggregate[] | undefined;
    if (Array.isArray(data)) {
      cachedOfficialTags.set(cacheKey, data);
      return data;
    }
  }

  if (locale) {
    const fallback = loadOfficialTags();
    cachedOfficialTags.set(cacheKey, fallback);
    return fallback;
  }

  cachedOfficialTags.set(cacheKey, []);
  return [];
}

type AuthorAggregate = {
  key: string;
  name?: string;
  page?: { permalink: string };
  count: number;
};

const cachedOfficialAuthors = new Map<string, AuthorAggregate[]>();

export function loadOfficialAuthors(locale?: string): AuthorAggregate[] {
  const cacheKey = getLocaleCacheKey(locale);
  const cached = cachedOfficialAuthors.get(cacheKey);
  if (cached) return cached;

  const filePrefix = getLocaleFilePrefix(locale);
  const basePattern = new RegExp(`^\\./${filePrefix}blog-authors-[a-z0-9]+\\.json$`, 'i');

  const ctx = (require as any).context(
    '@generated/docusaurus-plugin-content-blog/default/p',
    false,
    /blog-authors-.*\.json$/
  );
  for (const key of ctx.keys()) {
    if (!basePattern.test(key)) continue;
    const mod = ctx(key);
    const data = (mod && (mod.authors ?? mod.default?.authors)) as AuthorAggregate[] | undefined;
    if (Array.isArray(data)) {
      cachedOfficialAuthors.set(cacheKey, data);
      return data;
    }
  }

  if (locale) {
    const fallback = loadOfficialAuthors();
    cachedOfficialAuthors.set(cacheKey, fallback);
    return fallback;
  }

  cachedOfficialAuthors.set(cacheKey, []);
  return [];
}
