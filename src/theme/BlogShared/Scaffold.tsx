import React from 'react';
import Layout from '@theme/Layout';
import styles from '../BlogListPage/styles.module.css';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function BlogScaffold({
  title,
  description,
  children,
}: Props) {
  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <aside className={styles.leftCol}>
          <div className={styles.stickyCol}>
            <SidebarLeft />
          </div>
        </aside>
        <main className={styles.mainCol}>{children}</main>
        <aside className={styles.rightCol}>
          <div className={styles.stickyCol}>
            <SidebarRight />
          </div>
        </aside>
      </div>
    </Layout>
  );
}
