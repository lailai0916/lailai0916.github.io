import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import styles from '../BlogListPage/styles.module.css';
import { getTagsOfficialOrder } from '@site/src/utils/blogData';

interface TagSelectorProps {
  activePermalink?: string;
  limit?: number;
}

export default function TagSelector({
  activePermalink,
  limit = 30,
}: TagSelectorProps) {
  const tags = React.useMemo(() => getTagsOfficialOrder(limit), [limit]);

  if (!tags.length) {
    return null;
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <Translate id="blog.tags.select">Tags</Translate>
      </div>
      <div className={styles.tagList}>
        {tags.map((tag) => (
          <Link
            key={tag.permalink}
            to={tag.permalink}
            className={clsx(styles.tagChip, {
              [styles.tagChipActive]: tag.permalink === activePermalink,
            })}
          >
            <span className={styles.tagDot} />
            {tag.label}
            <span className={styles.tagCount}>{tag.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
