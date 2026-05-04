import React, { type ReactNode, useState, useMemo } from 'react';
import { Icon } from '@iconify/react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageHeader,
  PageContent,
} from '@site/src/components/laikit/Page';
import DataCard from '@site/src/components/laikit/DataCard';
import LinkCard from '@site/src/components/laikit/LinkCard';
import clsx from 'clsx';

import IconText from '@site/src/components/laikit/IconText';
import Button from '@site/src/components/laikit/Button';
import Card from '@site/src/components/laikit/Card';

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

function FilterBar({
  categories,
  activeCategory,
  onCategoryChange,
  searchValue,
  onSearchChange,
}: {
  categories: ResourceCategoryItem[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <Card padding={0} className={styles.filterBar}>
      <div className={styles.filterSearch}>
        <Icon icon="lucide:search" className={styles.filterSearchIcon} />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={translate({
            id: 'pages.resources.search.placeholder',
            message: 'Search Resources',
          })}
          className={styles.filterSearchInput}
        />
        {searchValue && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className={styles.filterSearchClear}
            aria-label={translate({
              id: 'pages.resources.search.clear',
              message: 'Clear search',
            })}
          >
            <Icon icon="lucide:x" />
          </button>
        )}
      </div>
      <div className={styles.filterRail}>
        {categories.map((category) => {
          const isActive = activeCategory === category.title;
          return (
            <button
              key={category.title}
              type="button"
              onClick={() =>
                onCategoryChange(isActive ? 'all' : category.title)
              }
              className={clsx(styles.filterRailItem, {
                [styles.filterRailItemActive]: isActive,
              })}
            >
              <Icon
                icon={category.icon}
                className={styles.filterRailItemIcon}
              />
              <span className={styles.filterRailItemLabel}>
                {category.title}
              </span>
              <span className={styles.filterRailItemCount}>
                {category.resources.length}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
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

export default function Resources(): ReactNode {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return filterResourceCategories(RESOURCE_LIST, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
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
      <PageContent className={styles.layout}>
        <FilterBar
          categories={RESOURCE_LIST}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
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
      </PageContent>
    </Layout>
  );
}
