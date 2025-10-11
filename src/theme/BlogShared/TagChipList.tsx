import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from '../BlogShared/styles.module.css';

type ChipItem = {
  to: string;
  label: React.ReactNode;
  count?: React.ReactNode;
  active?: boolean;
};

interface TagChipListProps {
  items: ChipItem[];
  className?: string;
}

export default function TagChipList({
  items,
  className,
}: TagChipListProps): React.ReactElement | null {
  if (!items.length) {
    return null;
  }

  return (
    <div className={clsx(styles.tagList, className)}>
      {items.map(({ to, label, count, active }) => (
        <Link
          key={to}
          to={to}
          className={clsx(styles.tagChip, {
            [styles.tagChipActive]: active,
          })}
        >
          <span className={styles.tagDot} />
          {label}
          {count !== undefined && (
            <span className={styles.tagCount}>{count}</span>
          )}
        </Link>
      ))}
    </div>
  );
}
