import type { ReactNode } from 'react';
import clsx from 'clsx';
import { PageMetadata } from '@docusaurus/theme-common';
import { useCurrentSidebarCategory } from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocCardList from '@theme/DocCardList';
import DocPaginator from '@theme/DocPaginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import Heading from '@theme/Heading';
import type { Props } from '@theme/DocCategoryGeneratedIndexPage';
import DocTopRow from '@site/src/theme/DocShared';
import sharedStyles from '@site/src/theme/DocShared/styles.module.css';
import styles from './styles.module.css';

function DocCategoryGeneratedIndexPageMetadata({ categoryGeneratedIndex }: Props): ReactNode {
  return (
    <PageMetadata
      title={categoryGeneratedIndex.title}
      description={categoryGeneratedIndex.description}
      keywords={categoryGeneratedIndex.keywords}
      image={useBaseUrl(categoryGeneratedIndex.image)}
    />
  );
}

function DocCategoryGeneratedIndexPageContent({ categoryGeneratedIndex }: Props): ReactNode {
  const category = useCurrentSidebarCategory();
  return (
    <div className="row">
      <div className={clsx('col', sharedStyles.docColumn)}>
        <DocVersionBanner />
        <DocTopRow />
        <DocVersionBadge />
        <header>
          <Heading as="h1" className={styles.title}>
            {categoryGeneratedIndex.title}
          </Heading>
          {categoryGeneratedIndex.description && <p>{categoryGeneratedIndex.description}</p>}
        </header>
        <article className="margin-top--lg">
          <DocCardList items={category.items} />
        </article>
        <footer className="margin-top--md">
          <DocPaginator
            previous={categoryGeneratedIndex.navigation.previous}
            next={categoryGeneratedIndex.navigation.next}
          />
        </footer>
      </div>
    </div>
  );
}

export default function DocCategoryGeneratedIndexPage(props: Props): ReactNode {
  return (
    <>
      <DocCategoryGeneratedIndexPageMetadata {...props} />
      <DocCategoryGeneratedIndexPageContent {...props} />
    </>
  );
}
