import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import Timeline from './_components/Timeline';

const TITLE = '旅行';
const DESCRIPTION = '纸上得来终觉浅，绝知此事要躬行';

// 统计数据
const travelStats = [
  {
    number: '20+',
    label: '国家地区'
  },
  {
    number: '50+',
    label: '城市'
  },
  {
    number: '14年',
    label: '足迹'
  }
];

// Section组件 - 与主页保持一致
function Section({ children, background = null }: { children: React.ReactNode; background?: string | null }) {
  return (
    <div
      className={`mx-auto flex flex-col w-full ${
        background === null ? 'max-w-7xl' : ''
      } ${
        background === 'alt'
          ? 'border-t border-gray-200/30 dark:border-neutral-700/30'
          : ''
      }`}
      style={{ 
        contain: 'content',
        backgroundColor: background === 'alt' ? 'var(--ifm-color-emphasis-100)' : undefined
      }}
    >
      <div className="flex-col gap-2 flex grow w-full my-16 lg:my-24 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}

// 统计卡片组件 - 模仿Project组件的卡片风格
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="group h-full w-full">
      <article className="relative overflow-hidden p-6 w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
        <div className="text-center space-y-3">
          <div className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 transition-colors group-hover:text-blue-700 dark:group-hover:text-blue-300">
            {number}
          </div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-neutral-100 uppercase tracking-wider">
            {label}
          </h3>
        </div>
      </article>
    </div>
  );
}

// Hero区域 - 采用Blog组件的布局模式
function TravelHero() {
  return (
    <Section background={null}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5">
        <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
          {/* 左侧内容区 - 模仿Blog组件布局 */}
          <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
            <div className="text-6xl lg:text-7xl mb-6 opacity-90">
              <span className="inline-block animate-bounce">✈️</span>
            </div>
            <h1 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed mb-6">
              {DESCRIPTION}
            </p>
            <div className="order-last pt-5">
              <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed mb-6">
                旅行不仅是脚步的延伸，更是心灵的拓展。每一次出发，都是对未知世界的好奇；
                每一次归来，都带着新的思考与感悟。
              </p>
              <div className="flex justify-start w-full">
                <Link
                  to="/blog"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 no-underline hover:no-underline bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600 dark:text-neutral-100 border border-gray-200 dark:border-neutral-700 shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM10 6H18V8H10V6ZM10 10H16V12H10V10ZM10 14H18V16H10V14Z" />
                  </svg>
                  <span>查看旅行博客</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.58L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.58Z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* 右侧统计区 */}
          <div className="w-full lg:w-6/12">
            <p className="uppercase tracking-wide font-bold text-sm text-gray-600 dark:text-neutral-400 flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.59 16.58L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.58Z" />
              </svg>
              旅行数据
            </p>
            <div className="grid grid-cols-1 gap-4 my-8">
              {travelStats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// 时间线区域 - 模仿Project组件的结构
function TravelTimeline() {
  return (
    <Section background="alt">
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <div className="text-center mb-12">
          <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
            旅行足迹
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            记录每一次出发，珍藏每一份回忆。从2011年开始的14年旅程，足迹遍布世界各地
          </p>
        </div>
        
        <div className="w-full">
          <Timeline />
        </div>
      </div>
    </Section>
  );
}

export default function TravelPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main>
        <TravelHero />
        <TravelTimeline />
      </main>
    </Layout>
  );
}
