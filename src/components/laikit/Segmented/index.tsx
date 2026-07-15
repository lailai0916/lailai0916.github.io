import { useRef, type CSSProperties, type KeyboardEvent } from 'react';
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
  /** Inline style applied to the item's button/link element. */
  style?: CSSProperties;
}

interface SegmentedProps<T> {
  value: T;
  items: SegmentedItem<T>[];
  /** Required only when at least one item is button-style (no href). */
  onChange?: (value: T) => void;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  /**
   * Accessible name for the group. Applied to the radiogroup in button mode;
   * href (navigation) mode ignores it since each link names itself.
   */
  ariaLabel?: string;
}

export default function Segmented<T>({
  value,
  items,
  onChange,
  orientation = 'vertical',
  className,
  ariaLabel,
}: SegmentedProps<T>) {
  // href items are navigation (aria-current); button items are a single-select
  // radiogroup (aria-checked + roving tabindex + arrow-key movement).
  const isNav = items.some((item) => item.href != null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeExists = items.some((item) => item.value === value);

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const [next, prev] =
      orientation === 'horizontal' ? ['ArrowRight', 'ArrowLeft'] : ['ArrowDown', 'ArrowUp'];
    const dir = event.key === next ? 1 : event.key === prev ? -1 : 0;
    if (dir === 0) return;
    event.preventDefault();
    const n = items.length;
    const target = (index + dir + n) % n;
    onChange?.(items[target].value);
    buttonRefs.current[target]?.focus();
  };

  return (
    <div
      className={clsx(
        styles.segmented,
        orientation === 'horizontal' && styles.horizontal,
        className
      )}
      role={isNav ? undefined : 'radiogroup'}
      aria-label={isNav ? undefined : ariaLabel}
      aria-orientation={isNav ? undefined : orientation}
    >
      {items.map((item, index) => {
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
              style={item.style}
              aria-current={isActive ? 'page' : undefined}
            >
              {inner}
            </Link>
          );
        }

        return (
          <button
            key={key}
            ref={(el) => {
              buttonRefs.current[index] = el;
            }}
            type="button"
            className={itemClass}
            style={item.style}
            onClick={() => onChange?.(item.value)}
            onKeyDown={(e) => moveFocus(e, index)}
            role="radio"
            aria-checked={isActive}
            // Roving tabindex: only the checked radio is in the tab order (fall
            // back to the first when the current value matches no item).
            tabIndex={isActive || (!activeExists && index === 0) ? 0 : -1}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}
