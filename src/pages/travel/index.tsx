import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import {
  PageTitle,
  PageHeader,
  PageContent,
} from '@site/src/components/laikit/Page';
import DataCard from '@site/src/components/laikit/DataCard';
import TravelTimeline from '@site/src/pages/travel/_components/Timeline';
import TravelMap from '@site/src/pages/travel/_components/Map';
import { translate } from '@docusaurus/Translate';
import { TRAVEL_LIST } from '@site/src/data/travel';
import { getTravelCountryCodes } from '@site/src/utils/travelGlobe';

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

export default function Travel(): ReactNode {
  const countryCount = new Set(getTravelCountryCodes(TRAVEL_LIST)).size;
  const yearCount =
    new Date().getFullYear() - parseInt(TRAVEL_LIST[0].title.substring(0, 4));

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
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
      <PageContent>
        <TravelMap />
        <TravelTimeline />
      </PageContent>
    </Layout>
  );
}
