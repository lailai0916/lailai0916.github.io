import { Fragment, type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import Badge from '@site/src/components/laikit/Badge';
import styles from './styles.module.css';

export type MetaBarItem = {
  icon: string;
  label: ReactNode;
  dateTime?: string;
  pinned?: boolean;
};

export function MetaBar({ items }: { items: MetaBarItem[] }) {
  return (
    <div className={styles.postEyebrow}>
      {items.map((item, i) => (
        <Fragment key={item.icon}>
          {i > 0 && <span className={styles.eyebrowDot} aria-hidden="true" />}
          <span
            className={clsx(
              styles.eyebrowItem,
              item.pinned && styles.eyebrowItemPinned
            )}
          >
            <Icon icon={item.icon} width={13} height={13} />
            {item.dateTime ? (
              <time dateTime={item.dateTime}>{item.label}</time>
            ) : (
              item.label
            )}
          </span>
        </Fragment>
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
