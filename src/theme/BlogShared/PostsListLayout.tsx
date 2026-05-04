import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';
import type { Props as BlogListPageProps } from '@theme/BlogListPage';
import BlogScaffold from './Scaffold';
import { BlogCard, useAnalytics } from './Components';

import { translate } from '@docusaurus/Translate';
import IconText from '@site/src/components/laikit/IconText';
import { formatBeijingDate } from '@site/src/utils/format';
import MDXContent from '@theme/MDXContent';
import styles from './styles.module.css';

type PostListItem = BlogListPageProps['items'][number];

interface IconDataProps {
  icon: string;
  children: React.ReactNode;
}

interface PostCardProps {
  item: PostListItem;
}

type PaginationItem = {
  label: string;
  to?: string;
};

function IconData({ icon, children }: IconDataProps) {
  return (
    <>
      <span className={styles.dot}>|</span>
      <IconText icon={icon} monochrome>
        {children}
      </IconText>
    </>
  );
}

function PostCard({ item }: PostCardProps) {
  const { content: MDXPageContent } = item;
  const { metadata, assets, frontMatter } = MDXPageContent;
  const image = assets.image ?? frontMatter.image;
  const { analytics, status } = useAnalytics(metadata.permalink);

  return (
    <BlogCard>
      {image && (
        <Link to={metadata.permalink} className={styles.postCoverWrap}>
          <img src={image} alt={metadata.title} className={styles.postCover} />
        </Link>
      )}
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
      <div className={styles.postMeta}>
        <IconText icon="lucide:calendar" monochrome>
          <time dateTime={metadata.date}>
            {formatBeijingDate(metadata.date)}
          </time>
        </IconText>
        {!!metadata.readingTime && (
          <>
            <IconData icon="lucide:file-text">
              {translate(
                {
                  id: 'blog.postcard.wordCount',
                  message: '{word} words',
                },
                {
                  word: Math.round(metadata.readingTime * 200),
                }
              )}
            </IconData>
            <IconData icon="lucide:timer">
              {translate(
                {
                  id: 'blog.postcard.readingTime',
                  message: '{readingTime} min',
                },
                {
                  readingTime: Math.max(1, Math.round(metadata.readingTime)),
                }
              )}
            </IconData>
          </>
        )}
        {status === 'success' && (
          <IconData icon="lucide:eye">
            {translate(
              {
                id: 'blog.postcard.viewCount',
                message: '{viewCount} views',
              },
              {
                viewCount: analytics.pageviews ?? '–',
              }
            )}
          </IconData>
        )}
        {metadata.tags?.length > 0 && (
          <IconData icon="lucide:tag">
            {metadata.tags?.map((tag, i) => (
              <React.Fragment key={tag.label}>
                <Link to={tag.permalink} style={{ color: 'inherit' }}>
                  {tag.label}
                </Link>
                {i < metadata.tags.length - 1 && ' / '}
              </React.Fragment>
            ))}
          </IconData>
        )}
      </div>
    </BlogCard>
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
