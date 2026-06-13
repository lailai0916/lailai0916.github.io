import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';

import type { Props as BlogPostPageProps } from '@theme/BlogPostPage';
import Paginator from '@site/src/components/laikit/Paginator';
import Actions from '@site/src/components/Article/Actions';
import MetaFooter from '@site/src/components/Article/MetaFooter';
import { MetaBar } from '../BlogUI';
import { usePostMetaItems } from '../PostMeta';
import Author from '../PostAuthor';
import styles from './styles.module.css';
import shared from '../styles.module.css';

type PostMetadata = BlogPostPageProps['content']['metadata'];

// PostHeader

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

  return (
    <header className={styles.articleHeader}>
      {lightImage && (
        <div className={styles.articleCoverWrap} aria-hidden="true">
          {themed ? (
            <>
              <img
                src={lightImage}
                alt=""
                className={clsx(styles.articleCover, shared.postCoverLight)}
                loading="eager"
              />
              <img
                src={darkImage}
                alt=""
                className={clsx(styles.articleCover, shared.postCoverDark)}
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
        <Actions source={metadata.source} editUrl={metadata.editUrl} />
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

// PostFooter

interface PostFooterProps {
  metadata: PostMetadata;
}

export function PostFooter({ metadata }: PostFooterProps) {
  const tagItems = (metadata.tags ?? [])
    .filter((t) => !!t.label && !!t.permalink)
    .map((t) => ({ to: t.permalink, label: t.label }));

  return <MetaFooter tags={tagItems} lastUpdatedAt={metadata.lastUpdatedAt} />;
}

// PostPaginator

interface PostPaginatorItem {
  title: string;
  permalink: string;
}

interface PostPaginatorProps {
  prevItem?: PostPaginatorItem;
  nextItem?: PostPaginatorItem;
}

export function PostPaginator({ prevItem, nextItem }: PostPaginatorProps) {
  const newerLabel = translate({
    id: 'blog.post.paginator.newer',
    message: 'Newer post',
  });
  const olderLabel = translate({
    id: 'blog.post.paginator.older',
    message: 'Older post',
  });

  return (
    <Paginator
      prevItem={prevItem && { ...prevItem, label: newerLabel }}
      nextItem={nextItem && { ...nextItem, label: olderLabel }}
      ariaLabel={translate({
        id: 'blog.post.paginator.ariaLabel',
        message: 'Blog post navigation',
      })}
    />
  );
}
