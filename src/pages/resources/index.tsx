import { type CSSProperties, type ReactNode, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Layout from '@theme/Layout';

import { PageTitle, PageHeader, PageContent } from '@site/src/components/laikit/Page';
import DataCard from '@site/src/components/laikit/DataCard';
import Badge from '@site/src/components/laikit/Badge';
import Card from '@site/src/components/laikit/Card';
import LinkCard from '@site/src/components/laikit/LinkCard';
import clsx from 'clsx';

import IconBlock from '@site/src/components/laikit/IconBlock';
import Button from '@site/src/components/laikit/Button';
import DataState from '@site/src/components/laikit/DataState';
import { useMeasuredHeight } from '@site/src/hooks/useMeasuredHeight';

import { usePluralForm } from '@docusaurus/theme-common';
import {
  RESOURCE_LIST,
  type ResourceCategoryItem,
  type ResourceItem,
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
const SEARCH_PLACEHOLDER = translate({
  id: 'pages.resources.search.placeholder',
  message: 'Search Resources',
});
const CATEGORY_MENU_LABEL = translate({
  id: 'pages.resources.category.ariaLabel',
  message: 'Resource Categories',
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
      : categories.filter((category) => category.id === activeCategory);

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
  activeCategory,
  searchValue,
  onSearchChange,
  onCategoryClear,
}: {
  activeCategory: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCategoryClear: () => void;
}) {
  const activeCat = RESOURCE_LIST.find((category) => category.id === activeCategory);
  return (
    <div className={styles.filterBar}>
      <Card padding={0} className={styles.filterSurface}>
        <div className={styles.filterSearch}>
          <Icon icon="lucide:search" className={styles.filterSearchIcon} aria-hidden />
          {activeCat && (
            <Badge icon={activeCat.icon} className={styles.filterActiveCat}>
              {activeCat.title}
              <button
                type="button"
                className={styles.filterActiveCatClear}
                onClick={onCategoryClear}
                aria-label={translate({
                  id: 'pages.resources.category.clear',
                  message: 'Clear category',
                })}
              >
                <Icon icon="lucide:x" aria-hidden />
              </button>
            </Badge>
          )}
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={SEARCH_PLACEHOLDER}
            aria-label={SEARCH_PLACEHOLDER}
            className={styles.filterSearchInput}
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className={styles.filterControl}
              aria-label={CLEAR_SEARCH}
            >
              <Icon icon="lucide:x" aria-hidden />
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}

// A malformed href would otherwise throw out of render and blank the whole page;
// LinkCard falls back to its icon when there is no image.
function faviconUrl(href: string): string | undefined {
  try {
    return `https://www.google.com/s2/favicons?sz=64&domain=${new URL(href).hostname}`;
  } catch {
    return undefined;
  }
}

function ResourceCard({ resource }: { resource: ResourceItem }) {
  return (
    <LinkCard
      to={resource.href}
      title={resource.title}
      description={resource.description}
      image={faviconUrl(resource.href)}
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
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}

export default function Resources(): ReactNode {
  const [activeCategory, setActiveCategory] = useState('all');
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoryDisclosureRef = useRef<HTMLButtonElement>(null);
  const [categoriesRef, categoriesHeight] = useMeasuredHeight<HTMLDivElement>(RESOURCE_LIST);
  const [searchQuery, setSearchQuery] = useState('');
  const total = RESOURCE_LIST.reduce((sum, category) => sum + category.resources.length, 0);
  const filteredCategories = useMemo(
    () => filterResourceCategories(RESOURCE_LIST, activeCategory, searchQuery),
    [activeCategory, searchQuery]
  );
  const allLabel = translate({ id: 'pages.resources.category.all', message: 'All resources' });
  const selectCategory = (category: string) => {
    setActiveCategory(category);
    setCategoriesOpen(false);
    if (categoryDisclosureRef.current?.getClientRects().length) {
      categoryDisclosureRef.current.focus();
    }
  };

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageHeader
        aside={
          <DataCard
            value={total}
            label={translate({
              id: 'pages.resources.datacard.items',
              message: 'Resource|Resources',
            })}
            icon="lucide:database"
          />
        }
      >
        <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      </PageHeader>
      <PageContent>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <Card className={styles.categoryCard}>
              <h2 className={styles.sidebarTitle}>
                <span>{CATEGORY_MENU_LABEL}</span>
                <span className={styles.categoryTotal}>{RESOURCE_LIST.length}</span>
              </h2>
              <button
                ref={categoryDisclosureRef}
                type="button"
                className={styles.categoryDisclosure}
                aria-expanded={categoriesOpen}
                aria-controls="resource-categories"
                onClick={() => setCategoriesOpen((open) => !open)}
              >
                <span className={styles.categoryDisclosureLabel}>
                  {RESOURCE_LIST.find((category) => category.id === activeCategory)?.title ??
                    CATEGORY_MENU_LABEL}
                </span>
                {activeCategory === 'all' && (
                  <span className={styles.categoryTotal}>{RESOURCE_LIST.length}</span>
                )}
                <span
                  className={clsx(
                    styles.categoryChevron,
                    categoriesOpen && styles.categoryChevronOpen
                  )}
                  aria-hidden
                >
                  <Icon icon="lucide:chevron-down" />
                </span>
              </button>
              <div
                className={clsx(
                  styles.categoriesViewport,
                  categoriesOpen && styles.categoriesViewportOpen
                )}
                style={{ '--categories-height': `${categoriesHeight ?? 0}px` } as CSSProperties}
              >
                <div ref={categoriesRef}>
                  <nav
                    id="resource-categories"
                    className={styles.categories}
                    aria-label={CATEGORY_MENU_LABEL}
                  >
                    <button
                      type="button"
                      className={clsx(
                        styles.categoryButton,
                        activeCategory === 'all' && styles.categoryActive
                      )}
                      title={allLabel}
                      aria-pressed={activeCategory === 'all'}
                      onClick={() => selectCategory('all')}
                    >
                      <span className={styles.categoryIcon} aria-hidden>
                        <Icon icon="lucide:layout-grid" />
                      </span>
                      <span className={styles.categoryLabel}>{allLabel}</span>
                      <small>{total}</small>
                    </button>
                    {RESOURCE_LIST.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        className={clsx(
                          styles.categoryButton,
                          activeCategory === category.id && styles.categoryActive
                        )}
                        title={category.title}
                        aria-pressed={activeCategory === category.id}
                        onClick={() => selectCategory(category.id)}
                      >
                        <span className={styles.categoryIcon} aria-hidden>
                          <Icon icon={category.icon} />
                        </span>
                        <span className={styles.categoryLabel}>{category.title}</span>
                        <small>{category.resources.length}</small>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </Card>
          </aside>
          <div className={styles.collection}>
            <SearchBar
              activeCategory={activeCategory}
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              onCategoryClear={() => setActiveCategory('all')}
            />
            <div className={styles.results}>
              {filteredCategories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
              {filteredCategories.length === 0 && (
                <DataState
                  message={translate(
                    {
                      id: 'pages.resources.search.empty',
                      message: 'No resources found matching "{query}".',
                    },
                    { query: searchQuery }
                  )}
                  action={
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('all');
                      }}
                    >
                      {CLEAR_SEARCH}
                    </Button>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </PageContent>
    </Layout>
  );
}
