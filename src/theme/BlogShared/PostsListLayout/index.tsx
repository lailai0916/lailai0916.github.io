import { Fragment, type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
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
const PAGE_PARAM = 'page';

type PostListItem = BlogListPageProps['items'][number];

interface PostCardProps {
  item: PostListItem;
}

function PostCard({ item }: PostCardProps) {
  const { content: MDXPageContent } = item;
  const { metadata, frontMatter } = MDXPageContent;
  const image = frontMatter.image as string | undefined;

  const tagItems = metadata.tags.map((t) => ({ to: t.permalink, label: t.label }));

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
  pageUrl,
}: {
  page: number;
  totalPages: number;
  pageUrl: (page: number) => string;
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
        <Link to={pageUrl(page - 1)} className={styles.pageNav} aria-label={PrevLabel}>
          {'←'}
        </Link>
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
                  <Link to={pageUrl(p)} className={styles.pageNumber}>
                    {p}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>

      {hasNext ? (
        <Link to={pageUrl(page + 1)} className={styles.pageNav} aria-label={NextLabel}>
          {'→'}
        </Link>
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
  const { pathname, search } = useLocation();
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  // The current page lives in the URL rather than in component state, so back /
  // forward, reload, and a copied link all land on the page the reader was on.
  const requested = Number(new URLSearchParams(search).get(PAGE_PARAM));
  const page = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), totalPages) : 1;

  // Page 1 stays at the bare permalink — no `?page=1` noise, and no second URL
  // serving the same content.
  const pageUrl = (p: number) => (p === 1 ? pathname : `${pathname}?${PAGE_PARAM}=${p}`);

  const visibleItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <BlogScaffold title={title} description={description}>
      {topSlot}
      {visibleItems.map((item) => (
        <PostCard key={item.content.metadata.permalink} item={item} />
      ))}
      <Paginator page={page} totalPages={totalPages} pageUrl={pageUrl} />
    </BlogScaffold>
  );
}
