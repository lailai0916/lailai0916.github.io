import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Timeline from './_components/Timeline';
import { BaseCard, Section, SectionHeader, GridLayout, GridConfigs } from '../_components/common';

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

// 统计卡片组件 - 采用与主页Project卡片一致的设计
function StatCard({ number, label, icon }: { number: string; label: string; icon: string }) {
  return (
    <BaseCard isClickable={false} className="p-6 items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-4xl lg:text-5xl font-bold transition-colors" style={{ color: 'var(--ifm-color-primary)' }}>
          {number}
        </div>
        <h3 className="font-semibold text-lg text-gray-900 dark:text-neutral-100 uppercase tracking-wider">
          {label}
        </h3>
      </div>
    </BaseCard>
  );
}

// Hero区域 - 采用Blog组件的布局模式，保持设计一致性
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
              读万卷书，行万里路。路走多了，才能真正平视世界。既不仰望富裕国家，也不轻视贫穷之地。
              世界，不是新闻里的样子，也不是别人描述的样子，而是你亲眼所见、亲身所感。看得多了，眼界自开，格局亦变。
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
            <GridLayout columns={GridConfigs.stats} gap="gap-4" className="my-8">
              {travelStats.map((stat, idx) => (
                <div key={idx} className="h-full">
                  <StatCard {...stat} />
                </div>
              ))}
            </GridLayout>
          </div>
        </div>
      </div>
    </Section>
  );
}

// 时间线区域 - 采用Project组件的结构，保持布局一致性
function TravelTimeline() {
  return (
    <Section background="alt">
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader 
          title="旅行足迹"
          description="记录每一次出发，珍藏每一份回忆。"
        />
        
        <div className="w-full">
          <BrowserOnly>
            {() => <Timeline />}
          </BrowserOnly>
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
