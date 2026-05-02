import React from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

export interface SegmentedItem<T> {
  value: T;
  label: string;
  icon?: string;
}

interface SegmentedProps<T> {
  value: T;
  items: SegmentedItem<T>[];
  onChange: (value: T) => void;
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
      {items.map((item) => (
        <button
          key={String(item.value ?? '__null__')}
          type="button"
          className={clsx(
            styles.item,
            value === item.value && styles.itemActive
          )}
          onClick={() => onChange(item.value)}
          aria-pressed={value === item.value}
        >
          {item.icon && <Icon icon={item.icon} className={styles.icon} />}
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
