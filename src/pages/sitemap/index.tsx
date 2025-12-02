import React, { type ReactNode } from 'react';

import { SITEMAP_LIST } from '@site/src/data/sitemap';
import Link from '@docusaurus/Link';
import {
  DebugLayout,
  PageTitle,
  PageHeader,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TITLE = translate({ id: 'pages.sitemap.title', message: 'Sitemap' });
const DESCRIPTION = translate({
  id: 'pages.sitemap.description',
  message: 'Sitemap of lailai.one',
});
const MODIFICATION = translate({
  id: 'pages.sitemap.modification',
  message: 'Site<b>map</b>',
});

function SitemapHeader() {
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        value={SITEMAP_LIST.flatMap((category) => category.sitemaps).length}
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
  const groupsPerColumn = 2;
  const columns = [];
  for (let i = 0; i < SITEMAP_LIST.length; i += groupsPerColumn) {
    columns.push(SITEMAP_LIST.slice(i, i + groupsPerColumn));
  }

  return (
    <div className={styles.container}>
      {columns.map((column, colIndex) => (
        <div key={colIndex} className={styles.column}>
          {column.map((category) => (
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
      ))}
    </div>
  );
}

export default function Sitemap(): ReactNode {
  return (
    <DebugLayout title={TITLE} description={DESCRIPTION}>
      <SitemapHeader />
      <SitemapMain />
    </DebugLayout>
  );
}
