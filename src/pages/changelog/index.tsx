import { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import DataCard from '@site/src/components/laikit/DataCard';
import { PageContent, PageHeader, PageTitle } from '@site/src/components/laikit/Page';
import { CHANGELOG_LIST } from '@site/src/data/changelog';
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
const MODIFICATION = translate({
  id: 'pages.changelog.modification',
  message: 'Site <b>Changelog</b>',
});
const ENTRY_LABEL = translate({
  id: 'pages.changelog.datacard.entries',
  message: 'Entry|Entries',
});

export default function Changelog(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageHeader>
        <PageTitle title={MODIFICATION} description={DESCRIPTION} />
        <DataCard value={CHANGELOG_LIST.length} label={ENTRY_LABEL} icon="lucide:history" />
      </PageHeader>
      <PageContent>
        <div className={`markdown ${styles.layout}`}>
          <ChangelogList />
        </div>
      </PageContent>
    </Layout>
  );
}
