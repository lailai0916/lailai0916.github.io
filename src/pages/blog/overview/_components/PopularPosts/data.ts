import { getAllPostMetadata, type getAllBlogItems } from '@site/src/utils/blogData';
import { compareInstantsDescending } from '@site/src/utils/dateTime';
import { umamiFetchJson } from '@site/src/utils/umami';

export const POPULAR_POST_LIMIT = 5;
const PAGE_SIZE = 500;

export type BlogItems = ReturnType<typeof getAllBlogItems>;

export interface PopularPost {
  title: string;
  date: string;
  permalink: string;
  views: number;
}

export async function loadPopularPosts(
  items: BlogItems,
  blogPath: string,
  signal: AbortSignal
): Promise<PopularPost[]> {
  const pinnedPaths = new Set(
    getAllPostMetadata()
      .filter((post) => post.frontMatter?.pinned === true)
      .map((post) => post.permalink)
  );
  const posts = new Map<string, Omit<PopularPost, 'views'>>();
  for (const item of items) {
    const title = item.title ?? item.metadata?.title;
    const date = item.date ?? item.metadata?.date;
    const permalink = item.permalink ?? item.metadata?.permalink;
    if (title && date && permalink && !pinnedPaths.has(permalink)) {
      posts.set(permalink, { title, date, permalink });
    }
  }
  if (posts.size === 0) return [];

  const ranked = new Map<string, PopularPost>();
  const endAt = Date.now();
  // Expanded metrics include pageviews; the basic endpoint counts visitors.
  // Fetch every page because the API orders rows by visitors, not pageviews.
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const rows = await umamiFetchJson<unknown>(
      '/api/websites/{id}/metrics/expanded',
      { startAt: 0, endAt, type: 'path', search: blogPath, limit: PAGE_SIZE, offset },
      { signal }
    );
    if (!Array.isArray(rows)) throw new Error('Invalid popular posts response');

    for (const row of rows) {
      if (
        !row ||
        typeof row.name !== 'string' ||
        !['number', 'string'].includes(typeof row.pageviews) ||
        row.pageviews === '' ||
        !Number.isFinite(Number(row.pageviews)) ||
        Number(row.pageviews) < 0
      ) {
        throw new Error('Invalid popular posts metric');
      }
      const post = posts.get(row.name);
      const views = Number(row.pageviews);
      if (post && views > 0) ranked.set(post.permalink, { ...post, views });
    }
    if (rows.length < PAGE_SIZE) break;
  }

  return [...ranked.values()]
    .sort(
      (a, b) =>
        b.views - a.views ||
        compareInstantsDescending(a.date, b.date) ||
        a.permalink.localeCompare(b.permalink)
    )
    .slice(0, POPULAR_POST_LIMIT);
}
