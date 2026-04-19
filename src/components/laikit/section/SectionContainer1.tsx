import React from 'react';
import styles from './styles.module.css';

export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.sectionOuter}>
      <div className={styles.sectionInner}>{children}</div>
    </div>
  );
}
