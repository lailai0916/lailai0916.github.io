import React from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface IconBlockProps {
  icon?: string;
  variant?: 'accent' | 'muted';
  size?: number;
  iconSize?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function IconBlock({
  icon,
  variant = 'accent',
  size = 40,
  iconSize,
  className,
  children,
}: IconBlockProps) {
  const resolvedIconSize = iconSize ?? Math.round(size * 0.5);
  return (
    <div
      className={clsx(styles.iconBlock, styles[variant], className)}
      style={{ '--icon-block-size': `${size}px` } as React.CSSProperties}
    >
      {icon ? (
        <Icon icon={icon} width={resolvedIconSize} height={resolvedIconSize} />
      ) : (
        children
      )}
    </div>
  );
}
