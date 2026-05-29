import React, { type ReactNode } from 'react';
import clsx from 'clsx';
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
  className?: string;
}

export default function TitleCard({
  title,
  icon,
  description,
  children,
  padding = '1.5rem',
  bodyAlign = 'top',
  className,
}: TitleCardProps) {
  return (
    <Card padding={padding} className={clsx(styles.titleCard, className)}>
      <div className={styles.header}>
        {icon && <IconBlock icon={icon} variant="accent" />}
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
