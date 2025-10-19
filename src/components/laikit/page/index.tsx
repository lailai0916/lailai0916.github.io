import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import type { Props } from '@theme/Layout';
import { useDebugMode } from '@site/src/hooks/useDebugMode';
import styles from './styles.module.css';

export function DebugLayout(props: Props) {
  const debugMode = useDebugMode();
  return (
    <div className={clsx(debugMode && styles.debug)}>
      <Layout {...props} />
    </div>
  );
}

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

export function PageFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.pageFooter}>
      <div className={styles.footerContent}>{children}</div>
    </div>
  );
}
