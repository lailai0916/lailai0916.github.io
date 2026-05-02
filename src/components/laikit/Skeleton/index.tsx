import React, { type CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  className?: string;
  style?: CSSProperties;
}

export default function Skeleton({
  width,
  height,
  radius,
  className,
  style,
}: SkeletonProps) {
  return (
    <div
      className={clsx(styles.skeleton, className)}
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}
