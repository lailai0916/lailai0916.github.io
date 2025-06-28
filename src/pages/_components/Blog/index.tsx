import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import { getRecentBlogPosts, BLOG_CONFIG, type ProcessedBlogPost } from '../../../utils/blogData';
import Section from '../common/Section';
import { TEXT_COLORS } from '../common';

// 常量定义
const RESPONSIVE_BREAKPOINT = 3; // 第4个卡片在小屏幕隐藏
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long', 
  day: 'numeric',
  timeZone: 'UTC'
} as const;

// 样式常量 - 简化并提升可读性
const CARD_STYLES = {
  container: [
    'group block h-full w-full rounded-2xl outline-none focus:outline-none',
    'no-underline hover:no-underline',
    'focus:ring-2 focus:ring-[var(--ifm-color-primary)]'
  ].join(' '),
  
  article: [
    'relative overflow-hidden p-6 cursor-pointer w-full h-36 flex flex-col',
    'bg-white dark:bg-neutral-900',
    'hover:bg-gray-50 dark:hover:bg-neutral-800/50',
    'rounded-2xl transition-all duration-200 ease-out',
    'shadow-sm hover:shadow-md dark:shadow-none',
    'border border-gray-200 dark:border-neutral-700',
    'hover:border-gray-300 dark:hover:border-neutral-600'
  ].join(' '),
  
  title: [
    'font-semibold text-lg leading-snug',
    'group-hover:text-[var(--ifm-color-primary)]',
    'transition-colors duration-200'
  ].join(' ')
} as const;

// 标题截断样式
const TITLE_CLAMP_STYLE: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: '1.375',
  height: '2.75em'
};

/**
 * 优化的日期格式化函数
 */
const formatDate = (dateString: string, locale: string): string => {
  return new Date(dateString).toLocaleDateString(locale, DATE_FORMAT_OPTIONS);
};

/**
 * 获取响应式卡片样式
 */
const getCardWrapperClass = (index: number): string => {
  const baseClass = 'flex-1 min-w-[280px] text-start';
  const hiddenOnSmall = index === RESPONSIVE_BREAKPOINT ? 'hidden sm:flex-1 sm:block sm:min-w-[280px]' : '';
  return `${baseClass} ${hiddenOnSmall}`.trim();
};

// 类型定义
interface BlogCardProps extends ProcessedBlogPost {
  locale: string;
}

interface BlogCardListProps {
  posts: ProcessedBlogPost[];
  locale: string;
}

/**
 * 博客卡片组件 - 使用React.memo优化性能
 */
const BlogCard = React.memo<BlogCardProps>(({ title, date, permalink, locale }) => {
  const formattedDate = useMemo(() => formatDate(date, locale), [date, locale]);
  
  return (
    <Link to={permalink} className={CARD_STYLES.container} style={{ textDecoration: 'none' }}>
      <article className={CARD_STYLES.article}>
        <div className="flex flex-col justify-between h-full">
          <header className="flex-1">
            <h3 
              className={`${CARD_STYLES.title} ${TEXT_COLORS.PRIMARY}`}
              style={TITLE_CLAMP_STYLE}
            >
              {title}
            </h3>
          </header>
          <footer className="mt-auto pt-2">
            <div className={`flex items-center gap-2 text-sm ${TEXT_COLORS.SECONDARY}`}>
              <Icon icon="lucide:calendar" width={16} height={16} />
              <time className="no-underline" dateTime={date}>{formattedDate}</time>
            </div>
          </footer>
        </div>
      </article>
    </Link>
  );
});

BlogCard.displayName = 'BlogCard';

/**
 * 博客卡片列表组件 - 使用React.memo优化性能
 */
const BlogCardList = React.memo<BlogCardListProps>(({ posts, locale }) => {
  if (!posts.length) {
    return (
      <div className="w-full text-center py-12">
        <p className={`${TEXT_COLORS.MUTED} text-lg`}>
          {BLOG_CONFIG.EMPTY_STATE_MESSAGE}
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.slice(0, BLOG_CONFIG.MAX_POSTS).map((post, index) => (
        <div key={post.permalink} className={getCardWrapperClass(index)}>
          <BlogCard {...post} locale={locale} />
        </div>
      ))}
    </>
  );
});

BlogCardList.displayName = 'BlogCardList';

/**
 * 博客主组件
 */
export default function Blog() {
  const { i18n } = useDocusaurusContext();
  const recentPosts = useMemo(() => getRecentBlogPosts(), []);

  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5 w-full items-center">
        <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
          {/* 左侧描述区域 */}
          <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
            <h2 className={`font-bold text-4xl ${TEXT_COLORS.PRIMARY} leading-tight mb-8 flex items-center gap-3`}>
              <Icon 
                icon="lucide:graduation-cap" 
                width={40} 
                height={40} 
                className="text-[var(--ifm-color-primary)]"
              />
              <Translate id="blog.title">Learning & Practice</Translate>
            </h2>
            <p className="leading-relaxed mb-6">
              <Translate id="blog.description.first">
                Technology evolves rapidly, and we need to maintain keen learning abilities and curiosity.
                Every mastery of new technology is an investment in the future.
                Here we record thoughts and summaries in the learning process, sharing methods and experiences for solving problems.
              </Translate>
            </p>
            <p className="leading-relaxed mb-6">
              <Translate id="blog.description.second">
                Through continuous practice and summarization, we transform knowledge into real skills.
                Only through practice-verified technologies and methods can truly help us solve real problems.
                You can find algorithm solutions, technical notes, and project practices here.
              </Translate>
            </p>
            <Link to="/blog">
              <strong>
                <Translate id="blog.viewMore">View More Posts →</Translate>
              </strong>
            </Link>
          </div>
          
          {/* 右侧博客卡片区域 */}
          <div className="w-full lg:w-6/12">
            <p className={`uppercase tracking-wide font-bold text-sm ${TEXT_COLORS.SECONDARY} flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full`}>
              <Icon icon="lucide:chevron-right" width={16} height={16} />
              <Translate id="blog.latestPosts">Latest Posts</Translate>
            </p>
            <div className="flex-col sm:flex-row flex-wrap flex gap-6 text-start my-8">
              <BlogCardList posts={recentPosts} locale={i18n.currentLocale} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
