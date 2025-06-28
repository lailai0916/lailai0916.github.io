import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import { getRecentBlogPosts, BLOG_CONFIG, type ProcessedBlogPost } from '../../../utils/blogData';
import Section from '../common/Section';
import { TEXT_COLORS } from '../common';

const CARD_STYLES = "group block h-full w-full rounded-2xl outline-none focus:outline-none no-underline hover:no-underline focus:ring-2 focus:ring-[var(--ifm-color-primary)]";
const CARD_ARTICLE_STYLES = "relative overflow-hidden p-6 cursor-pointer w-full h-36 flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-md dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600";

/**
 * 根据当前语言环境格式化日期 - 使用Docusaurus官方推荐方法
 * @param dateString ISO格式的日期字符串
 * @param locale 语言环境
 * @returns 格式化后的日期字符串
 */
function formatDateByLocale(dateString: string, locale: string): string {
  const date = new Date(dateString);
  
  // 使用浏览器内置的Intl.DateTimeFormat，根据locale自动格式化
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  };
  
  return date.toLocaleDateString(locale, options);
}

interface BlogCardProps {
  title: string;
  date: string;
  permalink: string;
}

function BlogCard({ title, date, permalink }: BlogCardProps) {
  const { i18n } = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;
  const formattedDate = formatDateByLocale(date, currentLocale);
  return (
    <Link
      to={permalink}
      className={CARD_STYLES}
      style={{ textDecoration: 'none' }}
    >
      <article className={CARD_ARTICLE_STYLES}>
        <div className="flex flex-col justify-between h-full">
          <header className="flex-1">
            <h3 
              className={`font-semibold text-lg ${TEXT_COLORS.PRIMARY} leading-snug group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200`}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '1.375',
                height: '2.75em',
              }}
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
}

interface BlogCardListProps {
  posts: ProcessedBlogPost[];
}

function BlogCardList({ posts }: BlogCardListProps) {
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
      {posts.slice(0, 4).map((post, index) => (
        <div 
          key={post.permalink}
          className={`flex-1 min-w-[280px] text-start ${
            index === 3 ? 'hidden sm:flex-1 sm:block sm:min-w-[280px]' : ''
          }`}
        >
          <BlogCard {...post} />
        </div>
      ))}
    </>
  );
}



export default function Blog() {
  const recentPosts = getRecentBlogPosts();

  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5 w-full items-center">
        <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
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
            <Link to="/blog" >
              <Translate id="blog.viewMore">View More Posts →</Translate>
            </Link>
          </div>
          <div className="w-full lg:w-6/12">
            <p className={`uppercase tracking-wide font-bold text-sm ${TEXT_COLORS.SECONDARY} flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full`}>
              <Icon icon="lucide:chevron-right" width={16} height={16} />
              <Translate id="blog.latestPosts">Latest Posts</Translate>
            </p>
            <div className="flex-col sm:flex-row flex-wrap flex gap-6 text-start my-8">
              <BlogCardList posts={recentPosts} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
