import React from 'react';
import Link from '@docusaurus/Link';

// 动态导入博客数据
let blogListData: any = null;
try {
  // 尝试从生成的数据文件导入博客列表
  blogListData = require('@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json');
} catch (error) {
  console.warn('无法加载博客数据，使用默认数据');
}

interface BlogPost {
  title: string;
  permalink: string;
  unlisted: boolean;
  date: string;
}

// 格式化日期为中文格式
function formatDateToChinese(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

function BlogCard({ title, date, permalink }: { title: string; date: string; permalink: string }) {
  return (
    <Link
      to={permalink}
      className="group block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 no-underline hover:no-underline"
      style={{ textDecoration: 'none' }}
    >
      <article className="relative overflow-hidden p-6 cursor-pointer w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-md dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
        <div className="flex-1 space-y-4">
          <header>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-neutral-100 leading-snug transition-colors duration-200">
              <span 
                className="group-hover:transition-colors group-hover:duration-200"
                style={{
                  color: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--ifm-color-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'inherit';
                }}
              >
                {title}
              </span>
            </h3>
          </header>
          <footer className="pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-neutral-400">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H17V12H7V10ZM7 14H14V16H7V14Z" />
              </svg>
              <time style={{ textDecoration: 'none' }}>{date}</time>
            </div>
          </footer>
        </div>
      </article>
    </Link>
  );
}

function Section({ children, background = null }: { children: React.ReactNode; background?: string | null }) {
  return (
    <div
      className={`mx-auto flex flex-col w-full ${
        background === null ? 'max-w-7xl' : ''
      } ${
        background === 'right-card'
          ? 'border-t border-gray-200/30 dark:border-neutral-700/30'
          : ''
      }`}
      style={{ 
        contain: 'content',
        backgroundColor: background === 'right-card' ? 'var(--ifm-color-emphasis-100)' : undefined
      }}
    >
      <div className="flex-col gap-2 flex grow w-full my-16 lg:my-24 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-6">
      {children}
    </h2>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed mb-6">
      {children}
    </p>
  );
}

function CTA({ children, href, icon, color = 'blue' }: { children: React.ReactNode; href: string; icon: string; color?: string }) {
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-lg hover:shadow-xl',
    gray: 'bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 dark:text-neutral-100 border border-gray-200 dark:border-neutral-700 shadow-md hover:shadow-lg',
  };

  return (
    <Link
      to={href}
      className={`group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 no-underline hover:no-underline ${colorClasses[color]}`}
    >
      {icon === 'news' && (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM10 6H18V8H10V6ZM10 10H16V12H10V10ZM10 14H18V16H10V14Z" />
        </svg>
      )}
      <span>{children}</span>
      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.59 16.58L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.58Z" />
      </svg>
    </Link>
  );
}

export default function Blog() {
  let recentPosts: Array<{title: string; date: string; permalink: string}> = [];
  
  if (blogListData && blogListData.items) {
    recentPosts = blogListData.items
      .filter((post: BlogPost) => !post.unlisted && post.permalink !== "/blog/welcome") // 过滤掉置顶欢迎文章
      .slice(0, 4)
      .map((post: BlogPost) => ({
        title: post.title,
        date: formatDateToChinese(post.date),
        permalink: post.permalink,
      }));
  }

  return (
    <Section background="right-card">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5">
        <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
          <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
            <Header>持续学习，拥抱未来</Header>
            <Para>
              技术发展日新月异，我们需要保持敏锐的学习能力。每一次新技术的掌握，
              都是对未来的投资。通过不断的实践和总结，将知识转化为真正的技能。
            </Para>
            <div className="order-last pt-5">
              <Para>
                在这个快速变化的时代，保持好奇心和学习热情是最宝贵的品质。
                只有经过实践验证的技术和方法，才能真正帮助我们解决实际问题。
              </Para>
              <div className="hidden lg:flex justify-start w-full">
                <CTA color="gray" icon="news" href="/blog">
                  查看更多文章
                </CTA>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <p className="uppercase tracking-wide font-bold text-sm text-gray-600 dark:text-neutral-400 flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.58L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.58Z" />
              </svg>
              最新文章
            </p>
            <div className="flex-col sm:flex-row flex-wrap flex gap-6 text-start my-8">
              {recentPosts.length > 0 ? (
                <>
                  <div className="flex-1 min-w-[280px] text-start">
                    <BlogCard {...recentPosts[0]} />
                  </div>
                  {recentPosts.length > 1 && (
                    <div className="flex-1 min-w-[280px] text-start">
                      <BlogCard {...recentPosts[1]} />
                    </div>
                  )}
                  {recentPosts.length > 2 && (
                    <div className="flex-1 min-w-[280px] text-start">
                      <BlogCard {...recentPosts[2]} />
                    </div>
                  )}
                  {recentPosts.length > 3 && (
                    <div className="hidden sm:flex-1 sm:block sm:min-w-[280px]">
                      <BlogCard {...recentPosts[3]} />
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full text-center py-12">
                  <p className="text-gray-500 dark:text-neutral-400 text-lg">
                    暂无文章，敬请期待更多精彩内容...
                  </p>
                </div>
              )}
            </div>
            <div className="flex lg:hidden justify-start w-full">
              <CTA color="gray" icon="news" href="/blog">
                查看更多文章
              </CTA>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
