import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>{title}</div>
      {children}
    </div>
  );
}

type ChipItem = {
  to: string;
  label: React.ReactNode;
  count?: React.ReactNode;
  active?: boolean;
};

interface TagChipListProps {
  items: ChipItem[];
}

export function TagChipList({
  items,
}: TagChipListProps): React.ReactElement | null {
  if (!items.length) {
    return null;
  }

  return (
    <div className={styles.tagList}>
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={clsx(styles.tagChip, {
            [styles.tagChipActive]: item.active,
          })}
        >
          <span className={styles.tagDot} />
          {item.label}
          {item.count !== undefined && (
            <span className={styles.tagCount}>{item.count}</span>
          )}
        </Link>
      ))}
    </div>
  );
}
