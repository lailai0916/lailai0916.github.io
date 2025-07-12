import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Icon } from '@iconify/react';
import Timeline from '@site/src/pages/travel/_components';
import {
  BaseCard,
  Section,
  SectionHeader,
  GridLayout,
  GridConfigs,
} from '@site/src/pages/home/_components/common';
import { TRAVEL_STAT_LIST, TravelStatItem } from '@site/src/data/travel';

// 页面常量
const PAGE_CONFIG = {
  title: '旅行',
  description:
    '读万卷书，行万里路。路走多了，才能真正平视世界。既不仰望富裕国家，也不轻视贫穷之地。世界，不是新闻里的样子，也不是别人描述的样子，而是你亲眼所见、亲身所感。看得多了，眼界自开，格局亦变。',
} as const;

/**
 * 统计卡片组件 - 采用与主页Project卡片一致的设计
 */
const StatCard = React.memo<TravelStatItem>(({ number, title, icon }) => (
  <BaseCard isClickable={false} className="p-6 items-center justify-center">
    <div className="text-center space-y-3">
      <div className="text-3xl mb-2">
        <Icon icon={icon} />
      </div>
      <div
        className="text-4xl lg:text-5xl font-bold transition-colors"
        style={{ color: 'var(--ifm-color-primary)' }}
      >
        {number}
      </div>
      <h3 className="font-semibold text-lg text-gray-900 dark:text-neutral-100 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  </BaseCard>
));

StatCard.displayName = 'StatCard';

/**
 * Hero区域 - 采用Blog组件的布局模式，保持设计一致性
 */
const TravelHero = React.memo(() => (
  <Section background={null}>
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5">
      <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
        {/* 左侧内容区 */}
        <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
          <div className="text-6xl lg:text-7xl mb-6 opacity-90">
            <Icon icon="material-symbols:flight" />
          </div>
          <h1 className="font-bold text-4xl lg:text-5xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
            {PAGE_CONFIG.title}
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed mb-6">
            {PAGE_CONFIG.description}
          </p>
        </div>

        {/* 右侧统计区 */}
        <div className="w-full lg:w-6/12">
          <p className="uppercase tracking-wide font-bold text-sm text-gray-600 dark:text-neutral-400 flex flex-row gap-2 items-center mt-5 lg:-mt-2 w-full mb-6">
            <Icon icon="material-symbols:trending-up" className="w-4 h-4" />
            旅行数据
          </p>
          <GridLayout columns={GridConfigs.stats} gap="gap-4" className="my-8">
            {TRAVEL_STAT_LIST.map((stat, idx) => (
              <div key={idx} className="h-full">
                <StatCard {...stat} />
              </div>
            ))}
          </GridLayout>
        </div>
      </div>
    </div>
  </Section>
));

TravelHero.displayName = 'TravelHero';

/**
 * 时间线区域 - 采用Project组件的结构，保持布局一致性
 */
const TravelTimeline = React.memo(() => (
  <Section background="alt">
    <div className="max-w-7xl mx-auto flex flex-col px-5">
      <SectionHeader
        title="旅行足迹"
        description="纸上得来终觉浅，绝知此事要躬行"
      />
      <div className="w-full">
        <BrowserOnly>{() => <Timeline />}</BrowserOnly>
      </div>
    </div>
  </Section>
));

TravelTimeline.displayName = 'TravelTimeline';

/**
 * 旅行页面主组件
 */
export default function TravelPage() {
  return (
    <Layout title={PAGE_CONFIG.title} description={PAGE_CONFIG.description}>
      <main>
        <TravelHero />
        <TravelTimeline />
      </main>
    </Layout>
  );
}
