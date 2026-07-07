import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

export interface PaginatorItem {
  title: string;
  permalink: string;
  label: string;
}

type Props = {
  prevItem?: PaginatorItem;
  nextItem?: PaginatorItem;
  ariaLabel: string;
  className?: string;
};

function PaginatorCard({ item, direction }: { item: PaginatorItem; direction: 'left' | 'right' }) {
  const isRight = direction === 'right';
  const arrow = (
    <Icon icon={isRight ? 'lucide:arrow-right' : 'lucide:arrow-left'} width={15} height={15} />
  );
  return (
    <Card
      to={item.permalink}
      padding="0.85rem 1rem"
      wrapperClassName={styles.cardWrap}
      className={styles.cardSurface}
    >
      <span className={clsx(styles.label, isRight && styles.labelRight)}>
        {!isRight && arrow}
        <span>{item.label}</span>
        {isRight && arrow}
      </span>
      <span className={clsx(styles.title, isRight && styles.titleRight)}>{item.title}</span>
    </Card>
  );
}

export default function Paginator({ prevItem, nextItem, ariaLabel, className }: Props) {
  if (!prevItem && !nextItem) return null;

  return (
    <nav className={clsx(styles.paginator, className)} aria-label={ariaLabel}>
      {prevItem ? (
        <PaginatorCard item={prevItem} direction="left" />
      ) : (
        <div className={styles.empty} aria-hidden="true" />
      )}
      {nextItem ? (
        <PaginatorCard item={nextItem} direction="right" />
      ) : (
        <div className={styles.empty} aria-hidden="true" />
      )}
    </nav>
  );
}
