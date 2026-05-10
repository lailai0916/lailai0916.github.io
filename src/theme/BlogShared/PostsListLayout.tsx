import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';
import type { Props as BlogListPageProps } from '@theme/BlogListPage';
import BlogScaffold from './Scaffold';
import { BlogCard, TagChipList, useAnalytics } from './Components';

import { translate } from '@docusaurus/Translate';
import { formatBeijingDate } from '@site/src/utils/format';
import MDXContent from '@theme/MDXContent';
import styles from './styles.module.css';

type PostListItem = BlogListPageProps['items'][number];

interface PostCardProps {
  item: PostListItem;
}

type PaginationItem = {
  label: string;
  to?: string;
};

function PostCard({ item }: PostCardProps) {
  const { content: MDXPageContent } = item;
  const { metadata, frontMatter } = MDXPageContent;
  const rawImage = frontMatter.image as
    | string
    | { light?: string; dark?: string }
    | undefined;
  const isObj = !!rawImage && typeof rawImage === 'object';
  const lightImage = isObj
    ? (rawImage.light ?? rawImage.dark)
    : (rawImage as string | undefined);
  const darkImage = isObj
    ? (rawImage.dark ?? rawImage.light)
    : (rawImage as string | undefined);
  const themed = lightImage && darkImage && lightImage !== darkImage;
  const { analytics, status } = useAnalytics(metadata.permalink);

  const tagItems = (metadata.tags ?? [])
    .filter((t) => !!t.label && !!t.permalink)
    .map((t) => ({ to: t.permalink, label: t.label }));

  return (
    <article className={styles.postCard}>
      <BlogCard>
        {lightImage && (
          <Link
            to={metadata.permalink}
            className={styles.postCoverWrap}
            tabIndex={-1}
            aria-hidden="true"
          >
            {themed ? (
              <>
                <img
                  src={lightImage}
                  alt=""
                  className={clsx(styles.postCover, styles.postCoverLight)}
                  loading="lazy"
                />
                <img
                  src={darkImage}
                  alt=""
                  className={clsx(styles.postCover, styles.postCoverDark)}
                  loading="lazy"
                />
              </>
            ) : (
              <img
                src={lightImage}
                alt=""
                className={styles.postCover}
                loading="lazy"
              />
            )}
          </Link>
        )}

        <div className={styles.postEyebrow}>
          <span className={styles.eyebrowItem}>
            <Icon icon="lucide:calendar" width={13} height={13} />
            <time dateTime={metadata.date}>
              {formatBeijingDate(metadata.date)}
            </time>
          </span>
          {!!metadata.readingTime && (
            <>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span className={styles.eyebrowItem}>
                <Icon icon="lucide:file-text" width={13} height={13} />
                {translate(
                  {
                    id: 'blog.postcard.wordCount',
                    message: '{word} words',
                  },
                  {
                    word: Math.round(metadata.readingTime * 200),
                  }
                )}
              </span>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span className={styles.eyebrowItem}>
                <Icon icon="lucide:timer" width={13} height={13} />
                {translate(
                  {
                    id: 'blog.postcard.readingTime',
                    message: '{readingTime} min',
                  },
                  {
                    readingTime: Math.max(1, Math.round(metadata.readingTime)),
                  }
                )}
              </span>
            </>
          )}
          {status === 'success' && (
            <>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              <span className={styles.eyebrowItem}>
                <Icon icon="lucide:eye" width={13} height={13} />
                {translate(
                  {
                    id: 'blog.postcard.viewCount',
                    message: '{viewCount} views',
                  },
                  {
                    viewCount: analytics.pageviews ?? '–',
                  }
                )}
              </span>
            </>
          )}
        </div>

        <h2 className={styles.postTitle}>
          <Link to={metadata.permalink} className={styles.postTitleLink}>
            {metadata.title}
          </Link>
        </h2>

        <div className={styles.postExcerpt}>
          <MDXContent>
            <MDXPageContent />
          </MDXContent>
        </div>

        {tagItems.length > 0 && (
          <div className={styles.postFooter}>
            <TagChipList items={tagItems} />
          </div>
        )}
      </BlogCard>
    </article>
  );
}

export function Paginator({ meta }: { meta: BlogPaginatedMetadata }) {
  if (meta.totalPages <= 1) return null;
  const { page, totalPages } = meta;
  const sample = meta.nextPage || meta.previousPage || '';
  // Derive pageBase / firstBase across blog routes that use a trailing number,
  // e.g. /blog/page/3, /blog/tags/<tag>/page/3, /blog/authors/<id>/authors/3.
  let pageBase: string;
  let firstBase: string;
  if (/(.*\/[^/]+)\/\d+\/?$/.test(sample)) {
    pageBase = sample.replace(/\/\d+\/?$/, '');
    firstBase = pageBase.replace(/\/[^/]+$/, '');
  } else if (sample) {
    firstBase = sample;
    pageBase = `${firstBase.replace(/\/?$/, '')}/page`;
  } else {
    const m2 = meta.permalink.match(/(.*)\/page\/\d+\/?$/);
    firstBase = m2 ? m2[1] : meta.permalink;
    pageBase = `${firstBase.replace(/\/?$/, '')}/page`;
  }

  const mid = Math.min(Math.max(page, 2), totalPages - 1);
  const pages = Array.from(
    new Set([1, mid - 1, mid, mid + 1, totalPages])
  ).filter((p) => p >= 1 && p <= totalPages);
  const items: PaginationItem[] = [];

  items.push({ label: '←', to: meta.previousPage });
  items.push({ label: `${pages[0]}`, to: firstBase });
  for (let i = 1; i < pages.length; i += 1) {
    if (pages[i] - pages[i - 1] > 1) items.push({ label: '...' });
    items.push({ label: `${pages[i]}`, to: `${pageBase}/${pages[i]}` });
  }
  items.push({ label: '→', to: meta.nextPage });

  return (
    <nav className={styles.paginator}>
      {items.map((item, idx) =>
        item.to ? (
          <Link
            key={idx}
            to={item.to}
            className={clsx(styles.pageLink, {
              [styles.pageLinkActive]: item.label === String(page),
            })}
          >
            {item.label}
          </Link>
        ) : (
          <span key={idx} className={styles.pageLink}>
            {item.label}
          </span>
        )
      )}
    </nav>
  );
}

export default function PostsListLayout({
  title,
  description,
  items,
  meta,
  topSlot,
}: {
  title: string;
  description?: string;
  items: readonly PostListItem[];
  meta: BlogPaginatedMetadata;
  topSlot?: React.ReactNode;
}) {
  return (
    <BlogScaffold title={title} description={description}>
      {topSlot}
      {items.map((item) => (
        <PostCard key={item.content.metadata.permalink} item={item} />
      ))}
      <Paginator meta={meta} />
    </BlogScaffold>
  );
}
