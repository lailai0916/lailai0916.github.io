import { compareInstantsDescending, parseInstant } from '@site/src/utils/dateTime';

export interface FriendPost {
  siteUrl: string;
  title: string;
  url: string;
  publishedAt: string;
}

export interface FriendFeedData {
  updatedAt: string;
  posts: FriendPost[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function parseFriendFeed(value: unknown, siteUrls: ReadonlySet<string>): FriendFeedData {
  if (
    !isRecord(value) ||
    typeof value.updatedAt !== 'string' ||
    !Number.isFinite(parseInstant(value.updatedAt).getTime()) ||
    !Array.isArray(value.posts)
  ) {
    throw new Error('Invalid friend feed response');
  }

  const seen = new Set<string>();
  const posts: FriendPost[] = [];
  for (const post of value.posts) {
    if (
      !isRecord(post) ||
      typeof post.siteUrl !== 'string' ||
      !siteUrls.has(post.siteUrl) ||
      typeof post.title !== 'string' ||
      !post.title.trim() ||
      !isHttpUrl(post.url) ||
      typeof post.publishedAt !== 'string'
    ) {
      continue;
    }
    const timestamp = parseInstant(post.publishedAt).getTime();
    if (!Number.isFinite(timestamp) || timestamp > Date.now() + 300_000 || seen.has(post.url)) {
      continue;
    }
    seen.add(post.url);
    posts.push({
      siteUrl: post.siteUrl,
      title: post.title.trim(),
      url: post.url,
      publishedAt: post.publishedAt,
    });
  }

  posts.sort((a, b) => compareInstantsDescending(a.publishedAt, b.publishedAt));
  return { updatedAt: value.updatedAt, posts };
}
