import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Timeline from './_components/Timeline';

const TITLE = '旅行';
const DESCRIPTION = '纸上得来终觉浅，绝知此事要躬行';

// 统计数据
const travelStats = [
  {
    number: '20+',
    label: '国家/地区',
    icon: '🌍'
  },
  {
    number: '50+',
    label: '城市',
    icon: '🏙️'
  },
  {
    number: '14年',
    label: '足迹',
    icon: '👣'
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
function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  return (
    <div className="group h-full w-full">
      <article className="relative overflow-hidden p-6 w-full h-full flex flex-col bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-lg dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600">
        <div className="text-center space-y-3">
          <div className="text-3xl mb-2">{icon}</div>
          <div className="text-4xl lg:text-5xl font-bold transition-colors" style={{ color: 'var(--ifm-color-primary)' }}>
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

// Hero区域 - 采用Blog组件的布局模式，优化设计
function TravelHero() {
  return (
    <Section background={null}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5">
        <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
          {/* 左侧内容区 */}
          <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
            <div className="text-6xl lg:text-7xl mb-6 opacity-90">
              <span className="inline-block animate-bounce">✈️</span>
            </div>
            <h1 className="font-bold text-4xl lg:text-5xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
              {TITLE}
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed mb-6">
              {DESCRIPTION}
            </p>
            <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed mb-8">
              旅行不仅是脚步的延伸，更是心灵的拓展。每一次出发，都是对未知世界的好奇；
              每一次归来，都带着新的思考与感悟。从 2011 年开始的 14 年旅程，足迹遍布世界各地，
              记录下每一份珍贵的回忆。
            </p>
          </div>
          
          {/* 右侧统计区 */}
          <div className="w-full lg:w-6/12">
            <p className="uppercase tracking-wide font-bold text-sm text-gray-600 dark:text-neutral-400 flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z" />
              </svg>
              旅行数据
            </p>
            <div className="grid grid-cols-3 gap-4 my-8">
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

// 时间线区域 - 模仿Project组件的结构，优化布局
function TravelTimeline() {
  return (
    <Section background="alt">
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl lg:text-5xl text-gray-900 dark:text-neutral-100 leading-tight mb-6">
            旅行足迹
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
            记录每一次出发，珍藏每一份回忆。
          </p>
        </div>
        
        <div className="w-full">
          <BrowserOnly>
            {() => <Timeline />}
          </BrowserOnly>
        </div>
        
        {/* 底部说明文字 */}
        <div className="text-center mt-12 px-4">
          <p className="text-base text-gray-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            读万卷书，行万里路。路走多了，才能真正平视世界。既不仰望富裕国家，也不轻视贫穷之地。
            世界，不是新闻里的样子，也不是别人描述的样子，而是你亲眼所见、亲身所感。看得多了，眼界自开，格局亦变。
          </p>
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
