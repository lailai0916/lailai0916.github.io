import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import Badge from '@site/src/components/laikit/Badge';
import styles from './styles.module.css';

export { useAnalytics } from '@site/src/hooks/useAnalytics';
export type {
  AnalyticsData,
  AnalyticsStatus,
} from '@site/src/hooks/useAnalytics';

export type MetaBarItem = {
  icon: string;
  label: React.ReactNode;
  dateTime?: string;
  className?: string;
};

export function MetaBar({ items }: { items: MetaBarItem[] }) {
  return (
    <div className={styles.postEyebrow}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className={styles.eyebrowDot} aria-hidden="true" />}
          <span className={clsx(styles.eyebrowItem, item.className)}>
            <Icon icon={item.icon} width={13} height={13} />
            {item.dateTime ? (
              <time dateTime={item.dateTime}>{item.label}</time>
            ) : (
              item.label
            )}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

export type ChipItem = {
  to: string;
  label: string;
  count?: number;
  active?: boolean;
};

function TagChip({ item }: { item: ChipItem }) {
  return (
    <Link to={item.to} className={styles.tagChipLink}>
      <Badge active={item.active} hoverable={!item.active} count={item.count}>
        {item.label}
      </Badge>
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
