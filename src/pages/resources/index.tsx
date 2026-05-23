import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
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

import IconBlock from '@site/src/components/laikit/IconBlock';
import Button from '@site/src/components/laikit/Button';
import Card from '@site/src/components/laikit/Card';
import Badge from '@site/src/components/laikit/Badge';

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
const CLEAR_SEARCH = translate({
  id: 'pages.resources.search.clear',
  message: 'Clear search',
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
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeCat = useMemo(
    () => categories.find((c) => c.title === activeCategory) ?? null,
    [categories, activeCategory]
  );

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  return (
    <div className={styles.filterBar} ref={wrapperRef}>
      <Card
        padding={0}
        className={clsx(styles.filterSurface, {
          [styles.filterSurfaceOpen]: open,
        })}
      >
        <div className={styles.filterSearch}>
          <Icon icon="lucide:search" className={styles.filterSearchIcon} />
          {activeCat && (
            <Badge icon={activeCat.icon} className={styles.filterActiveCat}>
              {activeCat.title}
              <button
                type="button"
                className={styles.filterActiveCatClear}
                onClick={(e) => {
                  e.stopPropagation();
                  onCategoryChange('all');
                }}
                aria-label={translate({
                  id: 'pages.resources.category.clear',
                  message: 'Clear category',
                })}
              >
                <Icon icon="lucide:x" />
              </button>
            </Badge>
          )}
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setOpen(true)}
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
              aria-label={CLEAR_SEARCH}
            >
              <Icon icon="lucide:x" />
            </button>
          )}
        </div>
      </Card>
      {open && (
        <div className={styles.filterPanel}>
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
        </div>
      )}
    </div>
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
      <header className={styles.categoryHeader}>
        <IconBlock icon={category.icon} variant="accent" size={40} />
        <h2 className={styles.categoryTitle}>{category.title}</h2>
        <span className={styles.categoryCount}>
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
        </span>
      </header>

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
                id: 'pages.resources.datacard.categories',
                message: 'Categories',
              }),
              icon: 'lucide:folder',
            },
            {
              value: RESOURCE_LIST.flatMap((cat) => cat.resources).length,
              label: translate({
                id: 'pages.resources.datacard.items',
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
                  id: 'pages.resources.search.empty',
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
              {CLEAR_SEARCH}
            </Button>
          </div>
        )}
      </PageContent>
    </Layout>
  );
}
