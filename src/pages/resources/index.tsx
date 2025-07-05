import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { Icon } from '@iconify/react';

import { resourceData, type ResourceCategory } from '@site/src/data/resources';
import styles from './styles.module.css';

const TITLE = '资源';
const DESCRIPTION = '精选优质资源，为你的学习和开发提供助力';

// 新增：搜索栏组件
function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className={styles.searchBarContainer}>
      <input type="text" placeholder="搜索资源名称或描述..." value={value} onChange={(e) => onChange(e.target.value)} className={styles.searchBar} />
      <Icon icon="lucide:search" className={styles.searchIcon} />
    </div>
  );
}

// 工具函数：从 URL 生成 Google Favicon 图标链接
function getFavicon(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return `https://www.google.com/s2/favicons?sz=64&domain=${urlObj.hostname}`;
  } catch (error) {
    // 静默处理URL解析错误
    return null;
  }
}

// 主要内容区域组件
function MainContent({ categories }: { categories: ResourceCategory[] }) {
  const totalResources = categories.reduce((sum, cat) => sum + cat.resources.length, 0);

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
function CategoryNav({ categories, activeCategory, onCategoryChange }: { categories: ResourceCategory[]; activeCategory: string; onCategoryChange: (category: string) => void }) {
  return (
    <nav className={styles.categoryNav}>
      <div className={styles.categoryNavContent}>
        <button className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.categoryButtonActive : ''}`} onClick={() => onCategoryChange('all')}>
          全部
        </button>
        {categories.map((category) => (
          <button key={category.name} className={`${styles.categoryButton} ${activeCategory === category.name ? styles.categoryButtonActive : ''}`} onClick={() => onCategoryChange(category.name)}>
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  );
}

// 资源卡片组件
function ResourceCard({ resource }: { resource: { name: string; description: string; href: string } }) {
  const iconUrl = getFavicon(resource.href);

  return (
    <Link to={resource.href} className={styles.resourceCard} style={{ textDecoration: 'none' }}>
      <div className={styles.resourceCardContent}>
        <div className={styles.resourceCardIcon}>
          {iconUrl ? (
            <>
              <img
                src={iconUrl}
                alt={resource.name}
                className={styles.resourceCardImage}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className={styles.resourceCardFallback}>
                <Icon icon="lucide:globe" width={24} height={24} />
              </div>
            </>
          ) : (
            <div className={styles.resourceCardFallback} style={{ display: 'flex' }}>
              <Icon icon="lucide:globe" width={24} height={24} />
            </div>
          )}
        </div>
        <div className={styles.resourceCardBody}>
          <h3 className={styles.resourceCardTitle}>{resource.name}</h3>
          <p className={styles.resourceCardDescription}>{resource.description}</p>
        </div>
      </div>
    </Link>
  );
}

// 分类区块组件
function CategorySection({ category, isVisible }: { category: ResourceCategory; isVisible: boolean }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(`.${styles.resourceCard}`);
    const getColumnsCount = () => {
      if (window.innerWidth <= 480) return 1;
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3; // 默认3列，基于CSS grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))
    };

    const applyAnimationDelays = () => {
      const columnsCount = getColumnsCount();
      cards.forEach((card, index) => {
        const row = Math.floor(index / columnsCount);
        const col = index % columnsCount;
        const delay = row * 0.1 + col * 0.05; // 按行优先，每行0.1s，同行内每列0.05s
        (card as HTMLElement).style.animationDelay = `${delay}s`;
      });
    };

    // 初始设置
    applyAnimationDelays();

    // 监听窗口大小变化
    const handleResize = () => {
      applyAnimationDelays();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isVisible, category.resources.length]);

  if (!isVisible) return null;

  return (
    <section className={styles.categorySection}>
      <div className={styles.categoryHeader}>
        <h2 className={styles.categoryTitle}>
          <Icon icon={category.icon} width={24} height={24} className={styles.categoryIcon} />
          {category.name}
        </h2>
        <div className={styles.categoryCount}>{category.resources.length} 项</div>
      </div>
      <div className={styles.resourceGrid} ref={gridRef}>
        {category.resources.map((resource) => (
          <ResourceCard key={resource.name} resource={resource} />
        ))}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase();

    let categories = resourceData;

    // 先按分类过滤
    if (activeCategory !== 'all') {
      categories = categories.filter((cat) => cat.name === activeCategory);
    }

    // 如果没有搜索查询，直接返回分类过滤结果
    if (!query) {
      return categories;
    }

    // 在分类过滤的基础上，再按搜索查询过滤
    return (
      categories
        .map((category) => {
          const filteredResources = category.resources.filter((resource) => resource.name.toLowerCase().includes(query) || resource.description.toLowerCase().includes(query));
          // 返回新的分类对象，只包含过滤后的资源
          return { ...category, resources: filteredResources };
        })
        // 最后，过滤掉那些在搜索后资源列表变为空的分类
        .filter((category) => category.resources.length > 0)
    );
  }, [activeCategory, searchQuery]);

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className={styles.main}>
        <MainContent categories={resourceData} />
        <div className={styles.container}>
          <div className={styles.stickyControls}>
            <CategoryNav categories={resourceData} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className={styles.content}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => <CategorySection key={category.name} category={category} isVisible={true} />)
            ) : (
              <div className={styles.noResults}>
                <p>找不到匹配"{searchQuery}"的资源。</p>
                <button onClick={() => setSearchQuery('')} className={styles.clearSearchButton}>
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
