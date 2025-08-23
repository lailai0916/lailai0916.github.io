import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';

import {
  PageTitle,
  PageContainer,
  PageHeader,
  PageFooter,
} from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import { TravelTimeline, TravelMap } from '@site/src/pages/travel/_components';
import { translate } from '@docusaurus/Translate';
import { TRAVEL_LIST } from '@site/src/data/travel';

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

function TravelFooter() {
  return <PageFooter>{FOOTER}</PageFooter>;
}

function TravelHeader() {
  const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;
  const CountryCount = new Set(
    TRAVEL_LIST.flatMap((i) => i.cardTitle.match(flagRegex) ?? [])
  ).size;

  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        items={[
          {
            value: `${CountryCount}`,
            label: translate({
              id: 'pages.travel.datacard.label1',
              message: 'Countries',
            }),
            icon: 'lucide:globe',
          },
          {
            value: `${new Date().getFullYear() - parseInt(TRAVEL_LIST[0].title.substring(0, 4))}`,
            label: translate({
              id: 'pages.travel.datacard.label2',
              message: 'Years',
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
      <PageContainer>
        <TravelHeader />
        <TravelMap />
        <TravelTimeline />
        <TravelFooter />
      </PageContainer>
    </Layout>
  );
}
