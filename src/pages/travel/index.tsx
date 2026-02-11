import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import { PageTitle, PageHeader } from '@site/src/components/laikit/page';
import DataCard from '@site/src/components/laikit/widget/DataCard';
import TravelTimeline from '@site/src/pages/travel/_components/Timeline';
import TravelMap from '@site/src/pages/travel/_components/Map';
import { translate } from '@docusaurus/Translate';
import { TRAVEL_LIST } from '@site/src/data/travel';
import { iso2FromText } from '@site/src/pages/travel/_components/Map';

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

function TravelHeader() {
  const countryCount = new Set(
    TRAVEL_LIST.flatMap((i) => iso2FromText(i.cardTitle))
  ).size;
  const yearCount =
    new Date().getFullYear() - parseInt(TRAVEL_LIST[0].title.substring(0, 4));

  return (
    <PageHeader>
      <PageTitle title={MODIFICATION} description={DESCRIPTION} />
      <DataCard
        items={[
          {
            value: countryCount,
            label: translate({
              id: 'pages.travel.datacard.label1',
              message: 'Countries',
            }),
            icon: 'lucide:globe',
          },
          {
            value: yearCount,
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
      <TravelHeader />
      <TravelMap />
      <TravelTimeline />
    </Layout>
  );
}
