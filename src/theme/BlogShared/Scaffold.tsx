import React from 'react';
import Layout from '@theme/Layout';
import { PageContainer } from '@site/src/components/laikit/page';
import styles from '../BlogShared/styles.module.css';
import Sidebar from './Sidebar';

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

export default function BlogScaffold({ title, description, children }: Props) {
  return (
    <Layout title={title} description={description}>
      <PageContainer>
        <div className={styles.container}>
          <aside className={styles.leftCol}>
            <Sidebar />
          </aside>
          <main className={styles.mainCol}>{children}</main>
        </div>
      </PageContainer>
    </Layout>
  );
}
