import React, { type ReactNode, useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import Layout from '@theme/Layout';

import { PageTitle, PageHeader } from '@site/src/components/laikit/Page';
import DataCard from '@site/src/components/laikit/DataCard';
import LinkCard from '@site/src/components/laikit/LinkCard';
import IconText from '@site/src/components/laikit/IconText';
import Button from '@site/src/components/laikit/Button';

import { usePluralForm } from '@docusaurus/theme-common';
import {
  RESOURCE_LIST,
  type ResourceCategoryItem,
} from '@site/src/data/resources';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TITLE = translate({
  id: 'pages.resources.title',
  message: 'Resources',
});
const DESCRIPTION = translate({
  id: 'pages.resources.description',
  message: 'High-quality tools and platforms',
});
const MODIFICATION = translate({
  id: 'pages.resources.modification',
  message: 'Selected <b>Resources</b>',
});

function filterResourceCategories(
  categories: readonly ResourceCategoryItem[],
  activeCategory: string,
  searchQuery: string
): ResourceCategoryItem[] {
  const query = searchQuery.toLowerCase().trim();

  const filteredByCategory =
    activeCategory === 'all'
      ? [...categories]
      : categories.filter((cat) => cat.title === activeCategory);

  if (!query) return filteredByCategory;

  return filteredByCategory
    .map((category) => ({
      ...category,
      resources: category.resources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.href.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query)
      ),
    }))
    .filter((category) => category.resources.length > 0);
}

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder={translate({
          id: 'pages.resources.search.placeholder',
          message: 'Search Resources',
        })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchBar}
      />
      <Icon icon="lucide:search" className={styles.searchIcon} />
    </div>
  );
}

function CategoryNav({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: ResourceCategoryItem[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <nav className={styles.categoryNav}>
      <div className={styles.categoryNavContent}>
        <Button
          variant="secondary"
          size="sm"
          rounded
          active={activeCategory === 'all'}
          onClick={() => onCategoryChange('all')}
        >
          {translate({
            id: 'pages.resources.category.all',
            message: 'All',
          })}
        </Button>
        {categories.map((category) => (
          <Button
            key={category.title}
            variant="secondary"
            size="sm"
            rounded
            active={activeCategory === category.title}
            onClick={() => onCategoryChange(category.title)}
          >
            {category.title}
          </Button>
        ))}
      </div>
    </nav>
  );
}

function ResourceCard({
  resource,
}: {
  resource: { title: string; description: string; href: string };
}) {
  const iconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${new URL(resource.href).hostname}`;
  return (
    <LinkCard
      to={resource.href}
      title={resource.title}
      description={resource.description}
      image={iconUrl}
      fallbackIcon="lucide:globe"
    />
  );
}

function CategorySection({ category }: { category: ResourceCategoryItem }) {
  const { selectMessage } = usePluralForm();

  return (
    <section className={styles.categorySection}>
      <div className={styles.categoryHeader}>
        <h2 className={styles.categoryTitle}>
          <IconText icon={category.icon}>{category.title}</IconText>
        </h2>
        <div className={styles.categoryCount}>
          {selectMessage(
            category.resources.length,
            translate(
              {
                id: 'pages.resources.category.count',
                message: '{count} item|{count} items',
              },
              { count: category.resources.length }
            )
          )}
        </div>
      </div>

      <div className={styles.resourceGrid}>
        {category.resources.map((resource) => (
          <ResourceCard key={resource.title} resource={resource} />
        ))}
      </div>
    </section>
  );
}

function ResourcesHeader() {
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        items={[
          {
            value: RESOURCE_LIST.length,
            label: translate({
              id: 'pages.resources.datacard.label1',
              message: 'Categories',
            }),
            icon: 'lucide:folder',
          },
          {
            value: RESOURCE_LIST.flatMap((cat) => cat.resources).length,
            label: translate({
              id: 'pages.resources.datacard.label2',
              message: 'Resources',
            }),
            icon: 'lucide:database',
          },
        ]}
      />
    </PageHeader>
  );
}

function ResourcesMain() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return filterResourceCategories(RESOURCE_LIST, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  return (
    <div className={styles.container}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <CategoryNav
        categories={RESOURCE_LIST}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <CategorySection key={category.title} category={category} />
        ))
      ) : (
        <div className={styles.noResults}>
          <p>
            {translate(
              {
                id: 'pages.resources.noresults.description',
                message: 'No resources found matching "{query}".',
              },
              { query: searchQuery }
            )}
          </p>
          <Button
            variant="primary"
            rounded
            onClick={() => setSearchQuery('')}
          >
            {translate({
              id: 'pages.resources.noresults.clear',
              message: 'Clear Search',
            })}
          </Button>
        </div>
      )}
    </div>
  );
}

export default function Resources(): ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <ResourcesHeader />
      <ResourcesMain />
    </Layout>
  );
}
