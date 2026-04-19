import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SectionContainerProps {
  children: React.ReactNode;
}

export interface SectionHeaderProps {
  title: string;
  description: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  title,
  description,
  align = 'center',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? styles.alignCenter : styles.alignLeft;

  return (
    <div className={clsx(styles.header, alignClass)}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default function SectionContainer({ children }: SectionContainerProps) {
  return (
    <div className={styles.sectionOuter}>
      <div className={styles.sectionInner}>{children}</div>
    </div>
  );
}
