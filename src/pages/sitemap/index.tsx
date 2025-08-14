import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import { SITEMAP_LIST } from '@site/src/data/sitemap';
import Link from '@docusaurus/Link';
import {
  PageTitle,
  PageMain,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TITLE = translate({ id: 'pages.sitemap.title', message: 'Sitemap' });
const DESCRIPTION = translate({
  id: 'pages.sitemap.description',
  message: "Sitemap of lailai's Home",
});
const MODIFICATION = translate({
  id: 'pages.sitemap.modification',
  message: 'Site <b>Map</b>',
});

function SitemapHeader() {
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        value={10}
        label={translate({
          id: 'pages.sitemap.datacard.label',
          message: 'Pages',
        })}
        icon="lucide:list"
      />
    </PageHeader>
  );
}

function SitemapMain() {
  return (
    <div className={styles.container}>
      {SITEMAP_LIST.map((category) => (
        <div key={category.title}>
          <h3>{category.title}</h3>
          <ul>
            {category.sitemaps.map((sitemap) => (
              <li key={sitemap.title}>
                <Link to={sitemap.href}>{sitemap.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Sitemap(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMain>
        <SitemapHeader />
        <SitemapMain />
      </PageMain>
    </Layout>
  );
}
