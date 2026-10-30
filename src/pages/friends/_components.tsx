import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import AvatarFallbackIcon from 'lucide-static/icons/user-round.svg';
import Button from '@lailai0916/ui/Button';
import DataState from '@lailai0916/ui/DataState';
import Skeleton from '@lailai0916/ui/Skeleton';
import { useImageStatus } from '@lailai0916/ui';
import { FRIEND_LIST } from '@site/src/data/friends';
import { useFetch } from '@site/src/hooks/useFetch';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { formatLocalDate, formatLocalTime } from '@site/src/utils/dateTime';
import { parseFriendFeed, type FriendFeedData } from './_feed';
import styles from './styles.module.css';

export function FriendAvatar({
  src,
  className,
  loading,
}: {
  src?: string;
  className: string;
  loading?: 'lazy';
}): ReactNode {
  const { imgRef, status, onLoad, onError } = useImageStatus(src);

  return (
    <span className={className} aria-hidden="true">
      <AvatarFallbackIcon
        className={clsx(styles.avatarFallback, status === 'loaded' && styles.avatarFallbackHidden)}
      />
      {src && status !== 'error' && (
        <img
          ref={imgRef}
          src={src}
          alt=""
          className={clsx(styles.avatarImage, status === 'loaded' && styles.avatarImageLoaded)}
          loading={loading}
          decoding="async"
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </span>
  );
}

const FEED_TITLE = translate({
  id: 'pages.friends.feed.title',
  message: 'Friends’ Posts',
});
const FEED_EMPTY = translate({
  id: 'pages.friends.feed.empty',
  message: 'No posts yet',
});
const FEED_LOADING = translate({
  id: 'pages.friends.feed.loading',
  message: 'Loading friends’ posts',
});
const FEED_ERROR = translate({
  id: 'pages.friends.feed.error',
  message: 'Could not load friends’ posts.',
});
const FEED_RETRY = translate({
  id: 'pages.friends.feed.retry',
  message: 'Retry',
});

const POST_LIMIT = 12;
const FEED_URL = 'https://lailai.one/api/friends/posts';
const FEED_SITE_URLS = new Set(FRIEND_LIST.filter(({ rss }) => rss).map(({ href }) => href));

async function fetchFriendFeed(signal: AbortSignal): Promise<FriendFeedData> {
  const response = await fetch(FEED_URL, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Friend feed request failed: ${response.status}`);
  return parseFriendFeed(await response.json(), FEED_SITE_URLS);
}

export function FriendFeed(): ReactNode {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const timeZone = useVisitorTimeZone();
  const { data, status, isInitialLoading, retry } = useFetch<FriendFeedData | null>(
    fetchFriendFeed,
    [],
    null
  );
  const posts = (data?.posts ?? []).flatMap((post) => {
    const friend = FRIEND_LIST.find(({ href }) => href === post.siteUrl);
    return friend ? [{ ...post, friend }] : [];
  });

  return (
    <section
      id="friend-activity"
      className={styles.feed}
      aria-labelledby="friend-activity-title"
      aria-busy={isInitialLoading}
    >
      <header className={styles.feedHeader}>
        <h2 id="friend-activity-title" className={styles.feedTitle}>
          {FEED_TITLE}
        </h2>
        {data && (
          <p className={styles.feedUpdated}>
            {translate(
              { id: 'pages.friends.feed.updated', message: 'Last updated {date}' },
              {
                date: `${formatLocalDate(data.updatedAt, currentLocale, timeZone)} ${formatLocalTime(data.updatedAt, currentLocale, timeZone)}`,
              }
            )}
          </p>
        )}
      </header>
      {isInitialLoading ? (
        <div role="status" aria-label={FEED_LOADING}>
          <ul className={styles.feedList} aria-hidden="true">
            {Array.from({ length: POST_LIMIT }, (_, index) => (
              <li key={index} className={styles.feedItem}>
                <div className={styles.feedLink}>
                  <Skeleton
                    className={styles.feedPlaceholderAvatar}
                    width="40px"
                    height="40px"
                    radius={9}
                  />
                  <div className={styles.feedPlaceholderContent}>
                    <Skeleton width="90%" height="1rem" />
                    <Skeleton width="55%" height="0.75rem" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : status === 'error' && !data ? (
        <DataState
          message={FEED_ERROR}
          action={
            <Button variant="secondary" size="sm" onClick={retry}>
              {FEED_RETRY}
            </Button>
          }
        />
      ) : posts.length === 0 ? (
        <DataState message={FEED_EMPTY} />
      ) : (
        <ul className={styles.feedList}>
          {posts.slice(0, POST_LIMIT).map((post) => (
            <li key={post.url} className={styles.feedItem}>
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.feedLink}
              >
                <FriendAvatar
                  src={post.friend.avatar}
                  className={clsx(styles.avatar, styles.feedAvatar)}
                  loading="lazy"
                />
                <div className={styles.feedContent}>
                  <h3 className={styles.feedPostTitle}>{post.title}</h3>
                  <div className={styles.feedMeta}>
                    <span className={styles.feedAuthor}>{post.friend.title}</span>
                    <span aria-hidden="true">·</span>
                    <time
                      dateTime={post.publishedAt}
                      title={`${formatLocalDate(post.publishedAt, currentLocale, timeZone)} ${formatLocalTime(post.publishedAt, currentLocale, timeZone)}`}
                    >
                      {formatLocalDate(post.publishedAt, currentLocale, timeZone)}
                    </time>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
