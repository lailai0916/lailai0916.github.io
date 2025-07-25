import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import { useDebugMode } from '@site/src/hooks/useDebugMode';

import BrowserOnly from '@docusaurus/BrowserOnly';
import PageHeader from '@site/src/components/laiKit/page/PageHeader';
import PageTitle from '@site/src/components/laiKit/page/PageTitle';
import PageFooter from '@site/src/components/laiKit/page/PageFooter';
import { DataCardList } from '@site/src/components/laiKit/widget/DataCard';
import IconText from '@site/src/components/laiKit/widget/IconText';
import Timeline from '@site/src/pages/travel/_components';
import { Section, SectionHeader } from '@site/src/components/laiKit/common';
import styles from './styles.module.css';

const TITLE = '旅行';
const DESCRIPTION = '每一次旅行都能带来新的视野和感悟。';

function TravelTimeline() {
  return (
    <div className={styles.travelContainer}>
      <SectionHeader
        title="旅行足迹"
        description="纸上得来终觉浅，绝知此事要躬行"
      />
      <div className={styles.timelineWrapper}>
        <BrowserOnly>{() => <Timeline />}</BrowserOnly>
      </div>
    </div>
  );
}

function TravelFooter() {
  return (
    <PageFooter>
      <IconText icon="lucide:plane">
        读万卷书，行万里路。路走多了，才能真正平视世界。既不仰望富裕国家，也不轻视贫穷之地。世界，不是新闻里的样子，也不是别人描述的样子，而是你亲眼所见、亲身所感。看得多了，眼界自开，格局亦变。
      </IconText>
    </PageFooter>
  );
}

function TravelHeader() {
  return (
    <PageHeader>
      <PageTitle
        title={
          <>
            <b>旅行</b>记录
          </>
        }
        description={DESCRIPTION}
      />
      <DataCardList
        items={[
          {
            value: '20+',
            label: '国家/地区',
            icon: 'lucide:globe',
          },
          {
            value: '50+',
            label: '城市',
            icon: 'lucide:map-pin',
          },
          {
            value: `${new Date().getFullYear() - 2011}`,
            label: '年历程',
            icon: 'lucide:route',
          },
        ]}
      />
    </PageHeader>
  );
}

export default function Travel(): ReactNode {
  const debugMode = useDebugMode();
  return (
    <Layout
      title={TITLE}
      description={DESCRIPTION}
      wrapperClassName={debugMode && 'debug'}
    >
      <main>
        <TravelHeader />
        <TravelTimeline />
        <TravelFooter />
      </main>
    </Layout>
  );
}
