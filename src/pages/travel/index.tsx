import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageMain,
  PageHeader,
  PageFooter,
} from '@site/src/components/laiKit/page';
import { DataCardList } from '@site/src/components/laiKit/widget/DataCard';
import IconText from '@site/src/components/laiKit/widget/IconText';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Timeline from '@site/src/pages/travel/_components';
import { SectionHeader } from '@site/src/components/laiKit/common';
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
      <BrowserOnly>{() => <Timeline />}</BrowserOnly>
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
      <PageTitle description={DESCRIPTION}>
        <b>旅行</b>记录
      </PageTitle>
      <DataCardList
        items={[
          {
            value: '20+',
            label: '国家/地区',
            icon: 'lucide:globe',
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
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageMain>
        <TravelHeader />
        <TravelTimeline />
        <TravelFooter />
      </PageMain>
    </Layout>
  );
}
