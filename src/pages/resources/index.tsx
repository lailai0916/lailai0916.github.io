import React, { useState, useMemo } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

import {
  RESOURCE_LIST,
  type ResourceCategoryItem,
} from '@site/src/data/resources';
import styles from './styles.module.css';

const TITLE = '资源';
const DESCRIPTION = '精选优质资源，为你的学习和开发提供助力';

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
        placeholder="搜索资源名称或描述..."
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

// 主要内容区域组件
function MainContent({ categories }: { categories: ResourceCategoryItem[] }) {
  const totalResources = categories.reduce(
    (sum, cat) => sum + cat.resources.length,
    0
  );

  return (
    <div className={styles.quickStats}>
      <div className={styles.quickStatsInner}>
        <div className={styles.leftContent}>
          <Heading as="h1" className={styles.mainTitle}>
            精选<span className={styles.highlight}>资源</span>
          </Heading>
          <p className={styles.mainDescription}>精心筛选的优质工具与平台</p>
        </div>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Icon icon="lucide:folder" width={20} height={20} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{categories.length}</div>
              <div className={styles.statLabel}>个分类</div>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Icon icon="lucide:database" width={20} height={20} />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statNumber}>{totalResources}</div>
              <div className={styles.statLabel}>项资源</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
          全部
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
          <Icon
            icon={category.icon}
            width={24}
            height={24}
            className={styles.categoryIcon}
          />
          {category.title}
        </h2>
        <div className={styles.categoryCount}>
          {category.resources.length} 项
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

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    return filterResourceCategories(RESOURCE_LIST, activeCategory, searchQuery);
  }, [activeCategory, searchQuery]);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className={styles.main}>
        <MainContent categories={RESOURCE_LIST} />
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
                <p>找不到匹配"{searchQuery}"的资源。</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className={styles.clearSearchButton}
                >
                  清空搜索
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
