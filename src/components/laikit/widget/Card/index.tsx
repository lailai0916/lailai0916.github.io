import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type CardProps = {
  title?: string;
  children: React.ReactNode;
  padding?: React.CSSProperties['padding'];
  style?: React.CSSProperties;
  className?: string;
};

export default function Card({
  title,
  children,
  padding,
  style,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(styles.card, className)}
      style={
        padding == null
          ? style
          : ({
              ...style,
              '--card-padding': padding,
            } as React.CSSProperties)
      }
    >
      {title && <div className={styles.cardTitle}>{title}</div>}
      {children}
    </div>
  );
}
