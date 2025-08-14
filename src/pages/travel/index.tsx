import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageMain,
  PageHeader,
  PageFooter,
} from '@site/src/components/laikit/page';
import { DataCardList } from '@site/src/components/laikit/widget/DataCard';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Timeline from '@site/src/pages/travel/_components';
import { SectionHeader } from '@site/src/components/laikit/section';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TITLE = translate({
  id: 'pages.travel.title',
  message: 'Travel',
});
const DESCRIPTION = translate({
  id: 'pages.travel.description',
  message: 'Every trip brings new perspectives and insights',
});
const MODIFICATION = translate({
  id: 'pages.travel.modification',
  message: '<b>Travel</b> Record',
});
const FOOTER = translate({
  id: 'pages.travel.footer',
  message:
    'Read ten thousand books and travel ten thousand miles. Only by walking far can you truly look the world in the eye—neither looking up to wealthy nations nor looking down on poorer lands. The world is not what the news shows, nor what others tell you, but what you see with your own eyes and feel with your own heart. The more you see, the broader your vision and the greater your mind.',
});

function TravelTimeline() {
  return (
    <div className={styles.travelContainer}>
      <SectionHeader
        title={translate({
          id: 'pages.travel.timeline.title',
          message: 'Travel Footprint',
        })}
        description={translate({
          id: 'pages.travel.timeline.description',
          message: 'From what is gained on paper, understanding always feels shallow; to truly know it, you must experience it yourself.',
        })}
      />
      <BrowserOnly>{() => <Timeline />}</BrowserOnly>
    </div>
  );
}

function TravelFooter() {
  return <PageFooter>{FOOTER}</PageFooter>;
}

function TravelHeader() {
  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCardList
        items={[
          {
            value: '20+',
            label: translate({
              id: 'pages.travel.datacard.label1',
              message: 'Country/Region',
            }),
            icon: 'lucide:globe',
          },
          {
            value: `${new Date().getFullYear() - 2011}`,
            label: translate({
              id: 'pages.travel.datacard.label2',
              message: 'Years of Journey',
            }),
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
