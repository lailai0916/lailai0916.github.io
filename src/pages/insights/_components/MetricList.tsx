import { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TitleCard from '@site/src/components/laikit/TitleCard';
import Skeleton from '@site/src/components/laikit/Skeleton';
import { formatCompact } from '@site/src/utils/format';
import styles from './MetricList.module.css';

interface MetricRow {
  x: string;
  y: number;
}

interface MetricListProps {
  title: string;
  icon: string;
  items: MetricRow[];
  loading?: boolean;
  emptyText: string;
  renderLabel?: (x: string) => ReactNode;
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
  const format = formatValue ?? ((n: number) => formatCompact(n, i18n.currentLocale));
  const max = items.length > 0 ? Math.max(...items.map((i) => i.y), 1) : 1;

  return (
    <TitleCard
      size="sm"
      icon={icon}
      title={title}
      padding="1.5rem 1.25rem 1.25rem"
      className={styles.card}
    >
      {loading ? (
        <div className={styles.skeletonList}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} height={42} radius={8} />
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
                <div className={styles.bar} style={{ width: `${ratio * 100}%` }} />
                <span className={styles.label}>{renderLabel ? renderLabel(item.x) : item.x}</span>
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
    </TitleCard>
  );
}
