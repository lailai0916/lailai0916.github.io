import React, { type ReactNode, useState, useMemo } from 'react';
import Layout from '@theme/Layout';

import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

import {
  PageTitle,
  PageContainer,
  PageHeader,
} from '@site/src/components/laikit/page';
import { DataCardList } from '@site/src/components/laikit/widget/DataCard';
import IconText from '@site/src/components/laikit/widget/IconText';

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

/**
 * 根据分类和搜索查询过滤资源数据
 */
function filterResourceCategories(
  categories: readonly ResourceCategoryItem[],
  activeCategory: string,
  searchQuery: string
): ResourceCategoryItem[] {
  const query = searchQuery.toLowerCase().trim();

  // 按分类过滤
  const filteredByCategory =
    activeCategory === 'all'
      ? [...categories]
      : categories.filter((cat) => cat.title === activeCategory);

  // 如果没有搜索查询，直接返回
  if (!query) return filteredByCategory;

  // 按搜索关键词过滤
  return filteredByCategory
    .map((category) => ({
      ...category,
      resources: category.resources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query)
      ),
    }))
    .filter((category) => category.resources.length > 0);
}

// 搜索栏组件
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
          message: 'Search for resources by name or description...',
        })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchBar}
      />
      <Icon icon="lucide:search" className={styles.searchIcon} />
    </div>
  );
}

// 获取网站图标
function getFavicon(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?sz=64&domain=${urlObj.hostname}`;
  } catch {
    return null;
  }
}

// 分类导航组件
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
        <button
          className={clsx(
            styles.categoryButton,
            activeCategory === 'all' && styles.categoryButtonActive
          )}
          onClick={() => onCategoryChange('all')}
        >
          {translate({
            id: 'pages.resources.category.all',
            message: 'All',
          })}
        </button>
        {categories.map((category) => (
          <button
            key={category.title}
            className={clsx(
              styles.categoryButton,
              activeCategory === category.title && styles.categoryButtonActive
            )}
            onClick={() => onCategoryChange(category.title)}
          >
            {category.title}
          </button>
        ))}
      </div>
    </nav>
  );
}

// 资源卡片组件
function ResourceCard({
  resource,
}: {
  resource: { title: string; description: string; href: string };
}) {
  const iconUrl = getFavicon(resource.href);

  return (
    <Link to={resource.href} className={styles.resourceCard}>
      <div className={styles.resourceCardContent}>
        <div className={styles.resourceCardIcon}>
          {iconUrl && (
            <img
              src={iconUrl}
              alt={resource.title}
              className={styles.resourceCardImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget
                  .nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          )}
          <div
            className={clsx(
              styles.resourceCardFallback,
              !iconUrl && styles.resourceCardFallbackVisible
            )}
          >
            <Icon icon="lucide:globe" width={24} height={24} />
          </div>
        </div>
        <div className={styles.resourceCardBody}>
          <h3 className={styles.resourceCardTitle}>{resource.title}</h3>
          <p className={styles.resourceCardDescription}>
            {resource.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

// 分类区块组件
function CategorySection({ category }: { category: ResourceCategoryItem }) {
  return (
    <section className={styles.categorySection}>
      <div className={styles.categoryHeader}>
        <h2 className={styles.categoryTitle}>
          <IconText icon={category.icon}>{category.title}</IconText>
        </h2>
        <div className={styles.categoryCount}>
          {translate(
            {
              id: 'pages.resources.category.count',
              message: '{count} items',
            },
            { count: category.resources.length }
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
  const totalResources = RESOURCE_LIST.reduce(
    (sum, cat) => sum + cat.resources.length,
    0
  );
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCardList
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
            value: totalResources,
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

export default function Resources(): ReactNode {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return filterResourceCategories(RESOURCE_LIST, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageContainer>
        <ResourcesHeader />
        <div className={styles.container}>
          <div className={styles.stickyControls}>
            <CategoryNav
              categories={RESOURCE_LIST}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className={styles.content}>
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
                <button
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearchButton}
                >
                  {translate({
                    id: 'pages.resources.noresults.clear',
                    message: 'Clear Search',
                  })}
                </button>
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </Layout>
  );
}
