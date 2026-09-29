import { type ReactNode } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import { PageContent } from '@lailai0916/ui/Page';
import { Changelog as ChangelogList } from './_components';
import styles from './styles.module.css';

const TITLE = translate({
  id: 'pages.changelog.title',
  message: 'Changelog',
});
const DESCRIPTION = translate({
  id: 'pages.changelog.description',
  message: "Changelog of lailai's Home",
});

export default function Changelog(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageContent className={styles.pageContent}>
        <div className={clsx('markdown', styles.layout)}>
          <h1 className={styles.title}>{TITLE}</h1>
          <ChangelogList />
        </div>
      </PageContent>
    </Layout>
  );
}
