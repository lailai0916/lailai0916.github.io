import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';
import type { Props as BlogListPageProps } from '@theme/BlogListPage';
import BlogScaffold from './Scaffold';
import { BlogCard, MetaBar, TagChipList } from './Components';
import { usePostMetaItems } from './PostMeta';

import { translate } from '@docusaurus/Translate';
import MDXContent from '@theme/MDXContent';
import styles from './styles.module.css';

const PAGE_SIZE = 10;

type PostListItem = BlogListPageProps['items'][number];

interface PostCardProps {
  item: PostListItem;
}

function PostCard({ item }: PostCardProps) {
  const { content: MDXPageContent } = item;
  const { metadata, frontMatter } = MDXPageContent;
  const lightImage = frontMatter.image as string | undefined;
  const darkImage =
    ((frontMatter as Record<string, unknown>).image_dark as
      | string
      | undefined) ?? lightImage;
  const themed = !!darkImage && darkImage !== lightImage;

  const tagItems = (metadata.tags ?? [])
    .filter((t) => !!t.label && !!t.permalink)
    .map((t) => ({ to: t.permalink, label: t.label }));

  const metaItems = usePostMetaItems({
    permalink: metadata.permalink,
    date: metadata.date,
    readingTime: metadata.readingTime,
    pinned: (frontMatter as Record<string, unknown>).pinned === true,
  });

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

        <MetaBar items={metaItems} />

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

export function Paginator({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const mid = Math.min(Math.max(page, 2), totalPages - 1);
  const pages = Array.from(
    new Set([1, mid - 1, mid, mid + 1, totalPages])
  ).filter((p) => p >= 1 && p <= totalPages);

  const PrevLabel = translate({
    id: 'blog.pagination.prev',
    message: 'Previous',
  });
  const NextLabel = translate({
    id: 'blog.pagination.next',
    message: 'Next',
  });
  const PaginationLabel = translate({
    id: 'blog.pagination.ariaLabel',
    message: 'Pagination',
  });

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  return (
    <nav className={styles.paginator} aria-label={PaginationLabel}>
      {hasPrev ? (
        <button
          type="button"
          className={styles.pageNav}
          onClick={() => onPageChange(page - 1)}
          aria-label={PrevLabel}
        >
          {'←'}
        </button>
      ) : (
        <span
          className={clsx(styles.pageNav, styles.pageNavDisabled)}
          aria-label={PrevLabel}
        >
          {'←'}
        </span>
      )}

      <ol className={styles.pageList}>
        {pages.map((p, i) => {
          const showEllipsis = i > 0 && p - pages[i - 1] > 1;
          return (
            <React.Fragment key={p}>
              {showEllipsis && (
                <li className={styles.pageEllipsis} aria-hidden="true">
                  {'…'}
                </li>
              )}
              <li>
                {p === page ? (
                  <span
                    className={clsx(styles.pageNumber, styles.pageNumberActive)}
                    aria-current="page"
                  >
                    {p}
                  </span>
                ) : (
                  <button
                    type="button"
                    className={styles.pageNumber}
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </button>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>

      {hasNext ? (
        <button
          type="button"
          className={styles.pageNav}
          onClick={() => onPageChange(page + 1)}
          aria-label={NextLabel}
        >
          {'→'}
        </button>
      ) : (
        <span
          className={clsx(styles.pageNav, styles.pageNavDisabled)}
          aria-label={NextLabel}
        >
          {'→'}
        </span>
      )}
    </nav>
  );
}

export default function PostsListLayout({
  title,
  description,
  items,
  meta: _meta,
  topSlot,
}: {
  title: string;
  description?: string;
  items: readonly PostListItem[];
  meta: BlogPaginatedMetadata;
  topSlot?: React.ReactNode;
}) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever the underlying item list changes
  // (e.g. switching tags / authors via the in-card chip selectors).
  useEffect(() => {
    setPage(1);
  }, [items]);

  const safePage = Math.min(page, totalPages);
  const visibleItems = items.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  return (
    <BlogScaffold title={title} description={description}>
      {topSlot}
      {visibleItems.map((item) => (
        <PostCard key={item.content.metadata.permalink} item={item} />
      ))}
      <Paginator
        page={safePage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </BlogScaffold>
  );
}
