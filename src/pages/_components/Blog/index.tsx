import React from 'react';
import Link from '@docusaurus/Link';

const recentPosts = [
  {
    title: 'TypeScript 进阶实践',
    date: '2025年5月28日',
    url: '/blog/welcome',
    icon: 'blog',
  },
  {
    title: 'React 19 新特性解析',
    date: '2025年5月25日',
    url: '/blog/welcome',
    icon: 'blog',
  },
  {
    title: '前端性能优化指南',
    date: '2025年5月22日',
    url: '/blog/welcome',
    icon: 'blog',
  },
  {
    title: 'Docker 容器化实战',
    date: '2025年5月20日',
    url: '/blog/welcome',
    icon: 'blog',
  },
];

function BlogCard({ title, date, url, icon }) {
  return (
    <Link
      to={url}
      className="block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:outline focus-visible:outline-blue-500 focus:outline-offset-2"
    >
      <div className="justify-between p-5 cursor-pointer w-full h-full flex flex-col flex-1 shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50/80 active:bg-gray-100/80 hover:dark:bg-gray-800/50 active:dark:bg-gray-700/50 rounded-2xl text-xl text-gray-900 dark:text-gray-100 leading-relaxed transition-colors duration-200">
        <div className="flex flex-row gap-3 w-full">
          <h3 className="font-semibold flex-1 text-xl lg:text-2xl hover:underline leading-snug mb-4">
            {title}
          </h3>
        </div>
        <div className="flex flex-row justify-start gap-2 items-center text-base text-gray-600 dark:text-gray-400">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM7 10H17V12H7V10ZM7 14H14V16H7V14Z"
              fill="currentColor"
            />
          </svg>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}

function Section({ children, background = null }) {
  return (
    <div
      className={`mx-auto flex flex-col w-full ${
        background === null ? 'max-w-7xl' : ''
      } ${
        background === 'right-card'
          ? 'bg-gradient-to-br from-blue-50/40 via-purple-50/20 to-pink-50/40 dark:from-gray-900/60 dark:via-blue-900/20 dark:to-purple-900/20 border-t border-gray-200/30 dark:border-gray-700/30'
          : ''
      }`}
      style={{ contain: 'content' }}
    >
      <div className="flex-col gap-2 flex grow w-full my-16 lg:my-24 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}

function Header({ children }) {
  return (
    <h2 className="font-bold text-4xl lg:text-6xl text-gray-900 dark:text-gray-100 leading-tight mb-6">
      {children}
    </h2>
  );
}

function Para({ children }) {
  return (
    <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      {children}
    </p>
  );
}

function CTA({ children, href, icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    gray: 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100',
  };

  return (
    <Link
      to={href}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${colorClasses[color]}`}
    >
      {icon === 'news' && (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM10 6H18V8H10V6ZM10 10H16V12H10V10ZM10 14H18V16H10V14Z" />
        </svg>
      )}
      {children}
    </Link>
  );
}

export default function Blog() {
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
            <p className="uppercase tracking-wide font-bold text-sm text-gray-600 dark:text-gray-400 flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.58L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.58Z" />
              </svg>
              最新技术分享
            </p>
            <div className="flex-col sm:flex-row flex-wrap flex gap-5 text-start my-5">
              <div className="flex-1 min-w-[40%] text-start">
                <BlogCard {...recentPosts[0]} />
              </div>
              <div className="flex-1 min-w-[40%] text-start">
                <BlogCard {...recentPosts[1]} />
              </div>
              <div className="flex-1 min-w-[40%] text-start">
                <BlogCard {...recentPosts[2]} />
              </div>
              <div className="hidden sm:flex-1 sm:inline">
                <BlogCard {...recentPosts[3]} />
              </div>
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
