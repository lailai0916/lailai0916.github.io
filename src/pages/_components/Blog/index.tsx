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

interface BlogPost {
  title: string;
  date: string;
  url: string;
  icon: string;
}

function BlogCard({ title, date, url, icon }: BlogPost) {
  return (
    <Link
      to={url}
      className="block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:outline focus-visible:outline-blue-500 focus:outline-offset-2"
    >
      <div className="justify-between p-5 sm:p-5 cursor-pointer w-full h-full flex flex-col flex-1 shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50/80 active:bg-gray-100/80 hover:dark:bg-gray-800/50 active:dark:bg-gray-700/50 rounded-2xl text-xl text-gray-900 dark:text-gray-100 leading-relaxed transition-colors duration-200">
        <div className="flex flex-row gap-3 w-full">
          <h2 className="font-semibold flex-1 text-2xl hover:underline leading-snug mb-4">
            {title}
          </h2>
        </div>
        <div>
          <div className="flex flex-row justify-start gap-2 items-center text-base text-gray-600 dark:text-gray-400">
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-400"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.7101 56.3758C13.0724 56.7251 13.6324 57 14.3887 57H57.6113C58.3676 57 58.9276 56.7251 59.2899 56.3758C59.6438 56.0346 59.8987 55.5407 59.9086 54.864C59.9354 53.022 59.9591 50.7633 59.9756 48H12.0244C12.0409 50.7633 12.0645 53.022 12.0914 54.864C12.1013 55.5407 12.3562 56.0346 12.7101 56.3758ZM12.0024 42H59.9976C59.9992 41.0437 60 40.0444 60 39C60 29.5762 59.9327 22.5857 59.8589 17.7547C59.8359 16.2516 58.6168 15 56.9938 15L15.0062 15C13.3832 15 12.1641 16.2516 12.1411 17.7547C12.0673 22.5857 12 29.5762 12 39C12 40.0444 12.0008 41.0437 12.0024 42ZM65.8582 17.6631C65.7843 12.8227 61.8348 9 56.9938 9H15.0062C10.1652 9 6.21572 12.8227 6.1418 17.6631C6.06753 22.5266 6 29.5477 6 39C6 46.2639 6.03988 51.3741 6.09205 54.9515C6.15893 59.537 9.80278 63 14.3887 63H57.6113C62.1972 63 65.8411 59.537 65.9079 54.9515C65.9601 51.3741 66 46.2639 66 39C66 29.5477 65.9325 22.5266 65.8582 17.6631ZM39 21C37.3431 21 36 22.3431 36 24C36 25.6569 37.3431 27 39 27H51C52.6569 27 54 25.6569 54 24C54 22.3431 52.6569 21 51 21H39ZM36 33C36 31.3431 37.3431 30 39 30H51C52.6569 30 54 31.3431 54 33C54 34.6569 52.6569 36 51 36H39C37.3431 36 36 34.6569 36 33ZM24 33C27.3137 33 30 30.3137 30 27C30 23.6863 27.3137 21 24 21C20.6863 21 18 23.6863 18 27C18 30.3137 20.6863 33 24 33Z"
                fill="currentColor"
              />
            </svg>
            {date}
          </div>
        </div>
      </div>
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

function Header({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-4xl lg:text-5xl text-gray-900 dark:text-gray-100 leading-tight mb-6">
      {children}
    </h2>
  );
}

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      {children}
    </p>
  );
}

function CTA({ children, href, icon, color = 'blue' }: { children: React.ReactNode; href: string; icon: string; color?: string }) {
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
              最新文章
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
