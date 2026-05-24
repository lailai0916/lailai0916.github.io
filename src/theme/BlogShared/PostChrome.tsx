import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react';

import type { Props as BlogPostPageProps } from '@theme/BlogPostPage';
import { formatLocalizedDate } from '@site/src/utils/format';
import Card from '@site/src/components/laikit/Card';
import { MetaBar, TagChipList } from './Components';
import { usePostMetaItems } from './PostMeta';
import CopyMarkdownButton from './CopyMarkdownButton';
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

  const authors = (metadata.authors ?? []).filter((a) => !!a.name);
  const tagItems = (metadata.tags ?? [])
    .filter((t) => !!t.label && !!t.permalink)
    .map((t) => ({ to: t.permalink, label: t.label }));

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

      {tagItems.length > 0 && (
        <div className={styles.articleHeaderTags}>
          <TagChipList items={tagItems} />
        </div>
      )}

      <MetaBar items={metaItems} />

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

function Author({ author }: { author: PostMetadata['authors'][number] }) {
  const avatarUrl = useBaseUrl(author.imageURL);
  // Match Docusaurus's official link-resolution priority chain:
  // page (auto-generated author page) → url → mailto:email → no link.
  const link =
    author.page?.permalink ||
    author.url ||
    (author.email ? `mailto:${author.email}` : undefined);
  const inner = (
    <>
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt=""
          className={styles.articleAuthorAvatar}
          width={36}
          height={36}
          loading="lazy"
        />
      )}
      <span className={styles.articleAuthorMeta}>
        <span className={styles.articleAuthorName}>{author.name}</span>
        {author.title && (
          <span className={styles.articleAuthorTitle}>{author.title}</span>
        )}
      </span>
    </>
  );
  return link ? (
    <Link
      href={link}
      className={clsx(styles.articleAuthor, styles.articleAuthorLink)}
    >
      {inner}
    </Link>
  ) : (
    <span className={styles.articleAuthor}>{inner}</span>
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

  const hasUpdated = !!metadata.lastUpdatedAt;
  const hasEdit = !!metadata.editUrl;
  const hasSource = !!metadata.source;
  if (!hasUpdated && !hasEdit && !hasSource) return null;

  const editLabel = translate({
    id: 'blog.post.editPage',
    message: 'Edit this page',
  });

  return (
    <footer className={styles.articleFooter}>
      <div className={styles.articleFooterMeta}>
        {hasUpdated && (
          <span className={styles.articleFooterMetaItem}>
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
        {(hasSource || hasEdit) && (
          <div className={styles.articleFooterMetaActions}>
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
          <Card to={prevItem.permalink} padding="0.85rem 1.1rem">
            <div className={styles.articlePaginatorLabel}>
              <Icon icon="lucide:arrow-left" width={14} height={14} />
              <span>{newerLabel}</span>
            </div>
            <div className={styles.articlePaginatorTitle}>{prevItem.title}</div>
          </Card>
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
          <Card to={nextItem.permalink} padding="0.85rem 1.1rem">
            <div
              className={clsx(
                styles.articlePaginatorLabel,
                styles.articlePaginatorLabelRight
              )}
            >
              <span>{olderLabel}</span>
              <Icon icon="lucide:arrow-right" width={14} height={14} />
            </div>
            <div
              className={clsx(
                styles.articlePaginatorTitle,
                styles.articlePaginatorTitleRight
              )}
            >
              {nextItem.title}
            </div>
          </Card>
        )}
      </div>
    </nav>
  );
}
