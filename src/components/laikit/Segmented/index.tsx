import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export interface SegmentedItem<T> {
  value: T;
  label: string;
  icon?: string;
  /**
   * If provided, this item renders as a navigation Link instead of a button.
   * `onChange` is not invoked for href items — navigation drives the next value.
   */
  href?: string;
}

interface SegmentedProps<T> {
  value: T;
  items: SegmentedItem<T>[];
  /** Required only when at least one item is button-style (no href). */
  onChange?: (value: T) => void;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export default function Segmented<T>({
  value,
  items,
  onChange,
  orientation = 'vertical',
  className,
}: SegmentedProps<T>) {
  return (
    <div
      className={clsx(
        styles.segmented,
        orientation === 'horizontal' && styles.horizontal,
        className
      )}
    >
      {items.map((item) => {
        const isActive = value === item.value;
        const itemClass = clsx(styles.item, isActive && styles.itemActive);
        const inner = (
          <>
            {item.icon && <Icon icon={item.icon} className={styles.icon} />}
            <span className={styles.label}>{item.label}</span>
          </>
        );
        const key = String(item.value ?? '__null__');

        if (item.href) {
          return (
            <Link
              key={key}
              to={item.href}
              className={itemClass}
              aria-current={isActive ? 'page' : undefined}
            >
              {inner}
            </Link>
          );
        }

        return (
          <button
            key={key}
            type="button"
            className={itemClass}
            onClick={() => onChange?.(item.value)}
            aria-pressed={isActive}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}
