import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { getRecentBlogPosts, BLOG_CONFIG, type ProcessedBlogPost } from '../../../utils/blogData';
import Section from '../common/Section';
import { TEXT_COLORS } from '../common';

// 统一的卡片样式常量
const CARD_STYLES = "group block h-full w-full rounded-2xl outline-none focus:outline-none no-underline hover:no-underline focus:ring-2 focus:ring-[var(--ifm-color-primary)]";
const CARD_ARTICLE_STYLES = "relative overflow-hidden p-6 cursor-pointer w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-md dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600";

interface BlogCardProps {
  title: string;
  date: string;
  permalink: string;
}

function BlogCard({ title, date, permalink }: BlogCardProps) {
  return (
    <Link
      to={permalink}
      className={CARD_STYLES}
      style={{ textDecoration: 'none' }}
    >
      <article className={CARD_ARTICLE_STYLES}>
        <div className="flex-1 space-y-4">
          <header>
            <h3 className={`font-semibold text-lg ${TEXT_COLORS.PRIMARY} leading-snug group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200`}>
              {title}
            </h3>
          </header>
          <footer className="pt-2">
            <div className={`flex items-center gap-2 text-sm ${TEXT_COLORS.SECONDARY}`}>
              <Icon icon="lucide:calendar" width={16} height={16} />
              <time className="no-underline">{date}</time>
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

interface ViewMoreButtonProps {
  className?: string;
}

function ViewMoreButton({ className = "" }: ViewMoreButtonProps) {
  return (
    <div className={`flex justify-start w-full mt-10 ${className}`}>
      <Link 
        to="/blog" 
        className="block text-decoration-none"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--ifm-color-primary)] bg-[var(--ifm-card-background-color)] border-2 border-[var(--ifm-color-emphasis-200)] rounded-xl px-7 py-3 text-base font-normal text-[var(--ifm-font-color-base)] min-w-[125px] whitespace-nowrap leading-tight">
          <Icon 
            icon="lucide:feather" 
            width={24} 
            height={24} 
            className="text-[var(--ifm-color-primary)] flex-shrink-0"
          />
          查看更多文章
        </div>
      </Link>
    </div>
  );
}

export default function Blog() {
  const recentPosts = getRecentBlogPosts();

  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5 py-16 w-full items-center">
        <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
          <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
            <h2 className={`font-bold text-4xl ${TEXT_COLORS.PRIMARY} leading-tight mb-8 flex items-center gap-3`}>
              <Icon 
                icon="lucide:graduation-cap" 
                width={40} 
                height={40} 
                className="text-[var(--ifm-color-primary)]"
              />
              持续学习，拥抱未来
            </h2>
            <p className="leading-relaxed mb-6">
              技术发展日新月异，我们需要保持敏锐的学习能力。每一次新技术的掌握，
              都是对未来的投资。通过不断的实践和总结，将知识转化为真正的技能。
            </p>
            <div className="order-last pt-5">
              <p className="leading-relaxed mb-6">
                在这个快速变化的时代，保持好奇心和学习热情是最宝贵的品质。
                只有经过实践验证的技术和方法，才能真正帮助我们解决实际问题。
              </p>
              <ViewMoreButton className="hidden lg:flex" />
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <p className={`uppercase tracking-wide font-bold text-sm ${TEXT_COLORS.SECONDARY} flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full`}>
              <Icon icon="lucide:chevron-right" width={16} height={16} />
              最新文章
            </p>
            <div className="flex-col sm:flex-row flex-wrap flex gap-6 text-start my-8">
              <BlogCardList posts={recentPosts} />
            </div>
            <ViewMoreButton className="lg:hidden" />
          </div>
        </div>
      </div>
    </Section>
  );
}
