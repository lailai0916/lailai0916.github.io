import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface BadgeProps {
  icon?: string;
  count?: number;
  active?: boolean;
  hoverable?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function Badge({
  icon,
  count,
  active,
  hoverable,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        styles.badge,
        {
          [styles.badgeActive]: active,
          [styles.badgeHoverable]: hoverable,
        },
        className
      )}
    >
      {icon && <Icon icon={icon} className={styles.badgeIcon} />}
      {children !== undefined && (
        <span className={styles.badgeLabel}>{children}</span>
      )}
      {count !== undefined && (
        <span className={styles.badgeCount}>{count}</span>
      )}
    </span>
  );
}
