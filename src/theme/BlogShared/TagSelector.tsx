import React from 'react';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from '../BlogShared/styles.module.css';
import { getTagsOfficialOrder } from '@site/src/utils/blogData';
import TagChipList from './TagChipList';

interface TagSelectorProps {
  activePermalink?: string;
  limit?: number;
}

export default function TagSelector({
  activePermalink,
  limit = 30,
}: TagSelectorProps) {
  const {
    i18n: { currentLocale, defaultLocale },
  } = useDocusaurusContext();
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;

  const tags = React.useMemo(
    () => getTagsOfficialOrder({ limit, locale: localeKey }),
    [limit, localeKey]
  );

  if (!tags.length) {
    return null;
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <Translate id="blog.pages.tags.tagSelect">Tags</Translate>
      </div>
      <TagChipList
        items={tags.map((tag) => ({
          to: tag.permalink,
          label: tag.label,
          count: tag.count,
          active: tag.permalink === activePermalink,
        }))}
      />
    </div>
  );
}
