import React from 'react';
import Layout from '@theme/Layout';
import styles from '../BlogListPage/styles.module.css';
import Sidebar from './Sidebar';

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function BlogScaffold({ title, description, children }: Props) {
  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <aside className={styles.leftCol}>
          <div className={styles.sidebarStack}>
            <Sidebar />
          </div>
        </aside>
        <main className={styles.mainCol}>{children}</main>
      </div>
    </Layout>
  );
}
