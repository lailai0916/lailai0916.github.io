import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

export { useAnalytics } from '@site/src/hooks/useAnalytics';
export type {
  AnalyticsData,
  AnalyticsStatus,
} from '@site/src/hooks/useAnalytics';

export function BlogCard({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      {title && <div className={styles.cardTitle}>{title}</div>}
      {children}
    </Card>
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

export function formatLongNumber(
  value: number | string,
  locale: string
): number | string {
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumSignificantDigits: 3,
  }).format(n);
}
