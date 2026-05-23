import { type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export default function Skeleton({
  width,
  height,
  radius,
  className,
  style,
  children,
}: SkeletonProps) {
  return (
    <div
      className={clsx(styles.skeleton, className)}
      style={{
        width,
        height,
        borderRadius: radius,
        ...(children !== undefined && { color: 'transparent' }),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
