import React from 'react';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import { getRecentBlogPosts, BLOG_CONFIG, type ProcessedBlogPost } from '../../../utils/blogData';
import Section from '../common/Section';

function BlogCard({ title, date, permalink }: { title: string; date: string; permalink: string }) {
  return (
    <Link
      to={permalink}
      className="group block h-full w-full rounded-2xl outline-none focus:outline-none no-underline hover:no-underline"
      style={{ 
        textDecoration: 'none',
        '--focus-ring-color': 'var(--ifm-color-primary)'
      } as React.CSSProperties}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 2px var(--ifm-color-primary)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <article className="relative overflow-hidden p-6 cursor-pointer w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-md dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
        <div className="flex-1 space-y-4">
          <header>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-neutral-100 leading-snug group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200">
              {title}
            </h3>
          </header>
          <footer className="pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400">
              <Icon icon="lucide:calendar" width={16} height={16} />
              <time className="no-underline">{date}</time>
            </div>
          </footer>
        </div>
      </article>
    </Link>
  );
}





// 博客卡片列表组件
function BlogCardList({ posts }: { posts: ProcessedBlogPost[] }) {
  if (!posts.length) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-gray-500 dark:text-neutral-400 text-lg">
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

// 查看更多文章按钮组件 - 使用HeroBanner相同风格
function ViewMoreButton({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-start w-full mt-10 ${className}`}>
      <Link 
        to="/blog" 
        className="block text-decoration-none"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div 
          className="flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--ifm-color-primary)]"
          style={{
            background: 'var(--ifm-card-background-color)',
            border: '2px solid var(--ifm-color-emphasis-200)',
            borderRadius: '12px',
            padding: '0.85rem 1.7rem',
            fontSize: '1rem',
            fontWeight: 'normal',
            color: 'var(--ifm-font-color-base)',
            minWidth: '125px',
            whiteSpace: 'nowrap',
            lineHeight: '1.2',
          }}
        >
          <Icon 
            icon="lucide:feather" 
            width={24} 
            height={24} 
            style={{ 
              color: 'var(--ifm-color-primary)',
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              verticalAlign: 'middle',
              lineHeight: 1
            }}
          />
          查看更多文章
        </div>
      </Link>
    </div>
  );
}

export default function Blog() {
  // 直接获取博客数据，无需useMemo包装
  const recentPosts = getRecentBlogPosts();

  return (
    <Section background="alt">
      <div 
        className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5"
        style={{ padding: '4rem 0', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
          <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
            <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-8 flex items-center gap-3">
              <Icon 
                icon="lucide:graduation-cap" 
                width={40} 
                height={40} 
                style={{ color: 'var(--ifm-color-primary)' }}
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
            <p className="uppercase tracking-wide font-bold text-sm text-gray-600 dark:text-neutral-400 flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full">
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
