import React from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import clsx from 'clsx';
import { useDebugMode } from '@site/src/hooks/useDebugMode';
import styles from './styles.module.css';

export function DebugLayout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const debugMode = useDebugMode();
  return (
    <Layout title={title} description={description}>
      <div className={clsx(debugMode && styles.debug)}>{children}</div>
    </Layout>
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
        dangerouslySetInnerHTML={{
          __html: title,
        }}
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
