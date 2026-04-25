import React from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

interface IconBlockProps {
  icon: string;
  variant?: 'accent' | 'muted';
  size?: number;
  iconSize?: number;
  className?: string;
}

export default function IconBlock({
  icon,
  variant = 'accent',
  size = 40,
  iconSize,
  className,
}: IconBlockProps) {
  const resolvedIconSize = iconSize ?? Math.round(size * 0.5);
  return (
    <div
      className={clsx(styles.iconBlock, styles[variant], className)}
      style={{ '--icon-block-size': `${size}px` } as React.CSSProperties}
    >
      <Icon icon={icon} width={resolvedIconSize} height={resolvedIconSize} />
    </div>
  );
}
