import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export function Card({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.card}>
      {title && <div className={styles.cardTitle}>{title}</div>}
      {children}
    </div>
  );
}

export type ChipItem = {
  to: string;
  label: string;
  count?: number;
  active?: boolean;
};

export function TagChip({ item }: { item: ChipItem }) {
  return (
    <Link
      to={item.to}
      className={clsx(styles.tagChip, {
        [styles.tagChipActive]: item.active,
      })}
    >
      <span className={styles.tagDot} />
      {item.label}
      {item.count !== undefined && <span>{item.count}</span>}
    </Link>
  );
}

export function TagChipList({ items }: { items: ChipItem[] }) {
  return (
    <div className={styles.tagList}>
      {items.map((item) => (
        <TagChip key={item.to} item={item} />
      ))}
    </div>
  );
}
