import React from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export function PageTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className={styles.headerContent}>
      <Heading
        as="h1"
        className={styles.mainTitle}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className={styles.mainDescription}>{description}</p>
    </div>
  );
}

export function PageHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.headerSection}>
      <div className={styles.headerInner}>{children}</div>
    </div>
  );
}
