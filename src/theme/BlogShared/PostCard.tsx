import React from 'react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import styles from '../BlogListPage/styles.module.css';
import { formatDate } from '@site/src/utils/date';

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
      {image ? (
        <Link to={metadata.permalink} className={styles.postCoverWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={metadata.title} className={styles.postCover} />
        </Link>
      ) : null}
      <div className={styles.postBody}>
        <Link to={metadata.permalink} className={styles.postTitleLink}>
          <h2 className={styles.postTitle}>{metadata.title}</h2>
        </Link>
        <p className={styles.postExcerpt}>
          {metadata.description ?? content.excerpt}
        </p>
        <div className={styles.postMeta}>
          <time dateTime={metadata.date} className={styles.postDate}>
            {formatDate(metadata.date)}
          </time>
          {readingTimeValue !== null && <span className={styles.dot}>·</span>}
          {readingTimeValue !== null && (
            <span className={styles.reading}>
              {translate(
                { id: 'blog.readingTime', message: '{time} min read' },
                {
                  time: Math.max(1, Math.round(readingTimeValue)),
                }
              )}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
