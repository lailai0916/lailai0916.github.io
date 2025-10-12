import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from '../BlogShared/styles.module.css';
import { formatDate } from '@site/src/utils/date';
import IconText from '@site/src/components/laikit/widget/IconText';

export default function PostCard({ item }: { item: any }) {
  const { content } = item;
  const { metadata, frontMatter } = content;
  const image = frontMatter?.image || content?.assets?.image;

  const readingTimeValue: number | null = (() => {
    const rt = (metadata as any)?.readingTime;
    if (typeof rt === 'number') return rt;
    if (rt && typeof rt === 'object') {
      const v = (rt.minutes ?? rt.value ?? rt.readingTime) as
        | number
        | undefined;
      if (typeof v === 'number') return v;
    }
    return null;
  })();

  return (
    <article className={styles.postCard}>
      {image && (
        <Link to={metadata.permalink} className={styles.postCoverWrap}>
          <img src={image} alt={metadata.title} className={styles.postCover} />
        </Link>
      )}
      <div className={styles.postBody}>
        <div className={styles.postTitleRow}>
          <span className={`${styles.tagChip} ${styles.postInlineTag}`}>
            {metadata.tags[0].label}
          </span>
          <Link to={metadata.permalink} className={styles.postTitleLink}>
            <h2 className={styles.postTitle}>{metadata.title}</h2>
          </Link>
        </div>
        <p className={styles.postExcerpt}>
          {metadata.description ?? content.excerpt}
        </p>
        <div className={styles.postMeta}>
          <IconText icon="lucide:calendar" colorMode="monochrome">
            <time dateTime={metadata.date} className={styles.postDate}>
              {formatDate(metadata.date)}
            </time>
          </IconText>
          {readingTimeValue !== null && <span className={styles.dot}>·</span>}
          {readingTimeValue !== null && (
            <span className={styles.reading}>
              {translate(
                {
                  id: 'theme.blog.post.readingTime.plurals',
                  message: '{readingTime} min read',
                },
                {
                  readingTime: Math.max(1, Math.round(readingTimeValue)),
                }
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
