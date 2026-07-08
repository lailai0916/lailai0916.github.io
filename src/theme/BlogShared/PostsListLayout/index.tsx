import { Fragment, useEffect, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';
import type { Props as BlogListPageProps } from '@theme/BlogListPage';
import BlogScaffold from '../Scaffold';
import Card from '@site/src/components/laikit/Card';
import { MetaBar, TagChipList } from '../BlogUI';
import { usePostMetaItems } from '../PostMeta';

import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react';
import MDXContent from '@theme/MDXContent';
import styles from './styles.module.css';

const READ_MORE_LABEL = translate({
  id: 'blog.postcard.readMore',
  message: 'Read more',
});

const PAGE_SIZE = 10;

type PostListItem = BlogListPageProps['items'][number];

interface PostCardProps {
  item: PostListItem;
}

function PostCard({ item }: PostCardProps) {
  const { content: MDXPageContent } = item;
  const { metadata, frontMatter } = MDXPageContent;
  const image = frontMatter.image as string | undefined;

  const tagItems = (metadata.tags ?? [])
    .filter((t) => !!t.label && !!t.permalink)
    .map((t) => ({ to: t.permalink, label: t.label }));

  const metaItems = usePostMetaItems({
    permalink: metadata.permalink,
    date: metadata.date,
    readingTime: metadata.readingTime,
    pinned: (frontMatter as Record<string, unknown>).pinned === true,
    lid: (frontMatter as Record<string, unknown>).lid as string | undefined,
  });

  return (
    <article className={styles.postCard}>
      <Card>
        {image && (
          <Link
            to={metadata.permalink}
            className={styles.postCoverWrap}
            tabIndex={-1}
            aria-hidden="true"
          >
            <img src={image} alt="" className={styles.postCover} loading="lazy" />
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

        <div className={styles.postFooter}>
          {tagItems.length > 0 && <TagChipList items={tagItems} />}
          <Link
            to={metadata.permalink}
            className={styles.postFooterReadMore}
            aria-label={READ_MORE_LABEL}
          >
            <span>{READ_MORE_LABEL}</span>
            <Icon icon="lucide:arrow-right" width={14} height={14} />
          </Link>
        </div>
      </Card>
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
  const pages = Array.from(new Set([1, mid - 1, mid, mid + 1, totalPages])).filter(
    (p) => p >= 1 && p <= totalPages
  );

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
        <span className={clsx(styles.pageNav, styles.pageNavDisabled)} aria-label={PrevLabel}>
          {'←'}
        </span>
      )}

      <ol className={styles.pageList}>
        {pages.map((p, i) => {
          const showEllipsis = i > 0 && p - pages[i - 1] > 1;
          return (
            <Fragment key={p}>
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
            </Fragment>
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
        <span className={clsx(styles.pageNav, styles.pageNavDisabled)} aria-label={NextLabel}>
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
  topSlot?: ReactNode;
}) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const [page, setPage] = useState(1);

  // Reset to page 1 whenever the underlying item list changes
  // (e.g. switching tags / authors via the in-card chip selectors).
  useEffect(() => {
    setPage(1);
  }, [items]);

  const safePage = Math.min(page, totalPages);
  const visibleItems = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <BlogScaffold title={title} description={description}>
      {topSlot}
      {visibleItems.map((item) => (
        <PostCard key={item.content.metadata.permalink} item={item} />
      ))}
      <Paginator page={safePage} totalPages={totalPages} onPageChange={setPage} />
    </BlogScaffold>
  );
}
