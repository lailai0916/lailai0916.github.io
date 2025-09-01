import React from 'react';
import Layout from '@theme/Layout';
import styles from '../BlogListPage/styles.module.css';

type Props = {
  title?: string;
  description?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
};

export default function BlogScaffold({
  title,
  description,
  left,
  right,
  children,
}: Props) {
  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        {left && (
          <aside className={styles.leftCol}>
            <div className={styles.stickyCol}>{left}</div>
          </aside>
        )}
        <main className={styles.mainCol}>{children}</main>
        {right && (
          <aside className={styles.rightCol}>
            <div className={styles.stickyCol}>{right}</div>
          </aside>
        )}
      </div>
    </Layout>
  );
}
