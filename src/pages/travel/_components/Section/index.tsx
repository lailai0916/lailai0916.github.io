import React, { type ReactNode } from 'react';
import styles from './styles.module.css';

export function TravelSection({ children }: { children: ReactNode }) {
  return (
    <div className={styles.sectionOuter}>
      <div className={styles.sectionInner}>{children}</div>
    </div>
  );
}

interface TravelSectionHeaderProps {
  title: string;
  description: string;
}

export function TravelSectionHeader({
  title,
  description,
}: TravelSectionHeaderProps) {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
