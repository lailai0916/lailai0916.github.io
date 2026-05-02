import React from 'react';
import { Icon } from '@iconify/react';
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
}

export default function MetricList({
  title,
  icon,
  items,
  loading,
  emptyText,
  renderLabel,
  formatValue,
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
              return (
                <li key={`${item.x}-${i}`} className={styles.row}>
                  <div
                    className={styles.bar}
                    style={{ width: `${ratio * 100}%` }}
                  />
                  <span className={styles.label}>
                    {renderLabel ? renderLabel(item.x) : item.x}
                  </span>
                  <span className={styles.value}>{format(item.y)}</span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </Card>
  );
}
