import React from 'react';
import { Icon } from '@iconify/react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/Card';
import { formatCompact } from '@site/src/utils/format';
import styles from './MetricList.module.css';

export interface MetricRow {
  x: string;
  y: number;
}

interface MetricListProps {
  title: string;
  icon: string;
  items: MetricRow[];
  loading?: boolean;
  emptyText: string;
  renderLabel?: (x: string) => React.ReactNode;
  formatValue?: (y: number) => string;
  href?: (x: string) => string | null | undefined;
}

export default function MetricList({
  title,
  icon,
  items,
  loading,
  emptyText,
  renderLabel,
  formatValue,
  href,
}: MetricListProps) {
  const { i18n } = useDocusaurusContext();
  const format =
    formatValue ?? ((n: number) => formatCompact(n, i18n.currentLocale));
  const max = items.length > 0 ? Math.max(...items.map((i) => i.y), 1) : 1;

  return (
    <Card padding="1.5rem 1.25rem 1.25rem" className={styles.card}>
      <header className={styles.head}>
        <Icon icon={icon} className={styles.icon} />
        <h3 className={styles.title}>{title}</h3>
      </header>
      <div className={styles.body}>
        {loading ? (
          <div className={styles.skeletonList}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.skeletonRow} />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className={styles.empty}>{emptyText}</p>
        ) : (
          <ol className={styles.list}>
            {items.map((item, i) => {
              const ratio = item.y / max;
              const url = href?.(item.x);
              const inner = (
                <>
                  <div
                    className={styles.bar}
                    style={{ width: `${ratio * 100}%` }}
                  />
                  <span className={styles.label}>
                    {renderLabel ? renderLabel(item.x) : item.x}
                  </span>
                  <span className={styles.value}>{format(item.y)}</span>
                </>
              );
              return (
                <li key={`${item.x}-${i}`} className={styles.rowItem}>
                  {url ? (
                    <Link to={url} className={styles.row}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={styles.row}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </Card>
  );
}
