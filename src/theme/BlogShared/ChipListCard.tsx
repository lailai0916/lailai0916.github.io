import React from 'react';
import Link from '@docusaurus/Link';
import styles from '../BlogListPage/styles.module.css';

type Item = {
  to: string;
  label: React.ReactNode;
  count?: React.ReactNode;
};

export default function ChipListCard({
  title,
  items,
}: {
  title: React.ReactNode;
  items: Item[];
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.tagList}>
        {items.map((it) => (
          <Link key={it.to} to={it.to} className={styles.tagChip}>
            <span className={styles.tagDot} />
            {it.label}
            {it.count !== undefined && (
              <span className={styles.tagCount}>{it.count}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

