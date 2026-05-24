import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react';

import type { Props as BlogPostPageProps } from '@theme/BlogPostPage';
import { formatLocalizedDate } from '@site/src/utils/format';
import Card from '@site/src/components/laikit/Card';
import { MetaBar, TagChipList } from './Components';
import { usePostMetaItems } from './PostMeta';
import CopyMarkdownButton from './CopyMarkdownButton';
import Author from './PostAuthor';
import styles from './styles.module.css';

type PostMetadata = BlogPostPageProps['content']['metadata'];

// ----- PostHeader -----

interface PostHeaderProps {
  metadata: PostMetadata;
  frontMatter: Record<string, unknown>;
}

export function PostHeader({ metadata, frontMatter }: PostHeaderProps) {
  const lightImage = frontMatter.image as string | undefined;
  const darkImage =
    (frontMatter.image_dark as string | undefined) ?? lightImage;
  const themed = !!darkImage && darkImage !== lightImage;

  const metaItems = usePostMetaItems({
    permalink: metadata.permalink,
    date: metadata.date,
    readingTime: metadata.readingTime,
    pinned: frontMatter.pinned === true,
  });

  // Hide the author block when this post is by the site owner alone.
  // Frontmatter `authors:` is still preserved (for RSS / JSON-LD / future
  // guest posts). Multi-author or non-`lailai` posts will surface naturally.
  const allAuthors = (metadata.authors ?? []).filter((a) => !!a.name);
  const isSoloOwner = allAuthors.length === 1 && allAuthors[0].key === 'lailai';
  const authors = isSoloOwner ? [] : allAuthors;

  const hasSource = !!metadata.source;
  const hasEdit = !!metadata.editUrl;
  const editLabel = translate({
    id: 'blog.post.editPage',
    message: 'Edit this page',
  });

  return (
    <header className={styles.articleHeader}>
      {lightImage && (
        <div className={styles.articleCoverWrap} aria-hidden="true">
          {themed ? (
            <>
              <img
                src={lightImage}
                alt=""
                className={clsx(styles.articleCover, styles.postCoverLight)}
                loading="eager"
              />
              <img
                src={darkImage}
                alt=""
                className={clsx(styles.articleCover, styles.postCoverDark)}
                loading="eager"
              />
            </>
          ) : (
            <img
              src={lightImage}
              alt=""
              className={styles.articleCover}
              loading="eager"
            />
          )}
        </div>
      )}

      <div className={styles.articleHeaderInfoRow}>
        <MetaBar items={metaItems} />
        {(hasSource || hasEdit) && (
          <div className={styles.articleHeaderActions}>
            {hasSource && <CopyMarkdownButton source={metadata.source!} />}
            {hasEdit && (
              <Link
                href={metadata.editUrl!}
                aria-label={editLabel}
                title={editLabel}
                className={clsx(
                  styles.articleFooterMetaItem,
                  styles.articleFooterMetaLink,
                  styles.articleFooterMetaIconBtn
                )}
              >
                <Icon icon="lucide:pencil" width={16} height={16} />
              </Link>
            )}
          </div>
        )}
      </div>

      <h1 className={styles.articleTitle}>{metadata.title}</h1>

      {authors.length > 0 && (
        <div className={styles.articleAuthors}>
          {authors.map((author, i) => (
            <Author key={author.key ?? author.name ?? i} author={author} />
          ))}
        </div>
      )}
    </header>
  );
}

// ----- PostFooter -----

interface PostFooterProps {
  metadata: PostMetadata;
}

export function PostFooter({ metadata }: PostFooterProps) {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  const tagItems = (metadata.tags ?? [])
    .filter((t) => !!t.label && !!t.permalink)
    .map((t) => ({ to: t.permalink, label: t.label }));
  const hasTags = tagItems.length > 0;
  const hasUpdated = !!metadata.lastUpdatedAt;
  if (!hasTags && !hasUpdated) return null;

  return (
    <footer className={styles.articleFooter}>
      <div className={styles.articleFooterMeta}>
        {hasTags && <TagChipList items={tagItems} />}
        {hasUpdated && (
          <span
            className={clsx(
              styles.articleFooterMetaItem,
              styles.articleFooterMetaUpdated
            )}
          >
            <Icon icon="lucide:history" width={14} height={14} />
            <time dateTime={new Date(metadata.lastUpdatedAt!).toISOString()}>
              {translate(
                {
                  id: 'blog.post.lastUpdated',
                  message: 'Last updated on {date}',
                },
                {
                  date: formatLocalizedDate(
                    new Date(metadata.lastUpdatedAt!).toISOString(),
                    currentLocale
                  ),
                }
              )}
            </time>
          </span>
        )}
      </div>
    </footer>
  );
}

// ----- PostPaginator -----

interface PaginatorItem {
  title: string;
  permalink: string;
}

interface PostPaginatorProps {
  prevItem?: PaginatorItem;
  nextItem?: PaginatorItem;
}

type Direction = 'left' | 'right';

function PaginatorCard({
  item,
  label,
  direction,
}: {
  item: PaginatorItem;
  label: string;
  direction: Direction;
}) {
  const isRight = direction === 'right';
  const arrow = (
    <Icon
      icon={isRight ? 'lucide:arrow-right' : 'lucide:arrow-left'}
      width={14}
      height={14}
    />
  );
  return (
    <Card to={item.permalink} padding="0.85rem 1.1rem">
      <div
        className={clsx(
          styles.articlePaginatorLabel,
          isRight && styles.articlePaginatorLabelRight
        )}
      >
        {!isRight && arrow}
        <span>{label}</span>
        {isRight && arrow}
      </div>
      <div
        className={clsx(
          styles.articlePaginatorTitle,
          isRight && styles.articlePaginatorTitleRight
        )}
      >
        {item.title}
      </div>
    </Card>
  );
}

export function PostPaginator({ prevItem, nextItem }: PostPaginatorProps) {
  if (!prevItem && !nextItem) return null;

  const newerLabel = translate({
    id: 'blog.post.paginator.newer',
    message: 'Newer post',
  });
  const olderLabel = translate({
    id: 'blog.post.paginator.older',
    message: 'Older post',
  });

  return (
    <nav
      className={styles.articlePaginator}
      aria-label={translate({
        id: 'blog.post.paginator.ariaLabel',
        message: 'Blog post navigation',
      })}
    >
      <div
        className={clsx(
          styles.articlePaginatorSlot,
          !prevItem && styles.articlePaginatorSlotEmpty
        )}
      >
        {prevItem && (
          <PaginatorCard item={prevItem} label={newerLabel} direction="left" />
        )}
      </div>
      <div
        className={clsx(
          styles.articlePaginatorSlot,
          styles.articlePaginatorSlotRight,
          !nextItem && styles.articlePaginatorSlotEmpty
        )}
      >
        {nextItem && (
          <PaginatorCard item={nextItem} label={olderLabel} direction="right" />
        )}
      </div>
    </nav>
  );
}
