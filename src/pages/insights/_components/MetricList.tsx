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

// The row shell — the single source of truth for a row's box. Both the loaded
// rows and the loading placeholders render through it, so the skeleton is the
// same height as real data by construction, not by a tuned number.
function Row({ to, children }: { to?: string | null; children: ReactNode }) {
  return (
    <li className={styles.rowItem}>
      {to ? (
        <Link to={to} className={styles.row}>
          {children}
        </Link>
      ) : (
        <div className={styles.row}>{children}</div>
      )}
    </li>
  );
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
  const max = Math.max(...items.map((i) => i.y), 1);

  return (
    <TitleCard
      size="sm"
      icon={icon}
      title={title}
      padding="1.5rem 1.25rem 1.25rem"
      className={styles.card}
    >
      {loading ? (
        <ol className={styles.list}>
          {Array.from({ length: 8 }).map((_, i) => (
            <Row key={i}>
              <Skeleton className={styles.skeletonBar} radius={8}>
                &nbsp;
              </Skeleton>
            </Row>
          ))}
        </ol>
      ) : items.length === 0 ? (
        <p className={styles.empty}>{emptyText}</p>
      ) : (
        <ol className={styles.list}>
          {items.map((item, i) => (
            <Row key={`${item.x}-${i}`} to={href?.(item.x)}>
              <div className={styles.bar} style={{ width: `${(item.y / max) * 100}%` }} />
              <span className={styles.label}>{renderLabel ? renderLabel(item.x) : item.x}</span>
              <span className={styles.value}>{format(item.y)}</span>
            </Row>
          ))}
        </ol>
      )}
    </TitleCard>
  );
}
