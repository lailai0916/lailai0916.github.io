import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import IconBlock from '@site/src/components/laikit/IconBlock';
import styles from './styles.module.css';

interface TitleCardProps {
  title: string;
  icon?: string;
  description?: string;
  children: ReactNode;
  padding?: React.CSSProperties['padding'];
  bodyAlign?: 'top' | 'bottom';
  /**
   * Header scale.
   * - `md` (default): IconBlock accent chip + 1.25rem title. Settings-tile style.
   * - `sm`: inline primary-tinted icon + 0.95rem title. Compact panel header used
   *   by the Insights cards (chart, metric lists, runtime snapshot).
   * - `plain`: bold body-size (1rem/700) title, no icon — the former `BlogCard`
   *   look used by the blog sidebar/archive/selector panels.
   */
  size?: 'md' | 'sm' | 'plain';
  className?: string;
}

export default function TitleCard({
  title,
  icon,
  description,
  children,
  padding = '1.5rem',
  bodyAlign = 'top',
  size = 'md',
  className,
}: TitleCardProps) {
  return (
    <Card
      padding={padding}
      className={clsx(
        styles.titleCard,
        size === 'sm' && styles.sm,
        size === 'plain' && styles.plain,
        className
      )}
    >
      <div className={styles.header}>
        {icon &&
          (size === 'sm' ? (
            <Icon icon={icon} className={styles.icon} aria-hidden="true" />
          ) : (
            <IconBlock icon={icon} variant="accent" />
          ))}
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>{title}</h3>
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
      </div>
      <div
        className={clsx(
          styles.body,
          bodyAlign === 'bottom' && styles.bodyBottom
        )}
      >
        {children}
      </div>
    </Card>
  );
}
