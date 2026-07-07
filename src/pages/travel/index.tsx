import { useEffect, useState, type ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { PageTitle, PageHeader, PageContent } from '@site/src/components/laikit/Page';
import DataCard from '@site/src/components/laikit/DataCard';
import Quote from '@site/src/components/laikit/Quote';
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
const QUOTE_TEXT = translate({
  id: 'pages.travel.quote.content',
  message:
    'From what is gained on paper, understanding always feels shallow; to truly know it, you must experience it yourself.',
});
const QUOTE_AUTHOR = translate({
  id: 'pages.travel.quote.author',
  message: 'Lu You',
});
const QUOTE_SOURCE = translate({
  id: 'pages.travel.quote.source',
  message: 'Reading on a Winter Night, to Show My Son Ziyu',
});

export default function Travel(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const startYear = parseInt(TRAVEL_LIST[0].date.substring(0, 4));
  const countryCount = new Set(getTravelCountryCodes(TRAVEL_LIST)).size;
  // Seed from build time so SSR and hydration agree; correct to the real
  // current year after mount (matters only across a year boundary).
  const [currentYear, setCurrentYear] = useState(() =>
    new Date(String(siteConfig.customFields?.buildTime ?? '')).getFullYear()
  );
  useEffect(() => setCurrentYear(new Date().getFullYear()), []);
  const yearCount = currentYear - startYear;

  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageHeader>
        <PageTitle title={MODIFICATION} description={DESCRIPTION} />
        <DataCard
          items={[
            {
              value: countryCount,
              label: translate({
                id: 'pages.travel.datacard.countries',
                message: 'Country|Countries',
              }),
              icon: 'lucide:globe',
            },
            {
              value: yearCount,
              label: translate({
                id: 'pages.travel.datacard.years',
                message: 'Year|Years',
              }),
              icon: 'lucide:calendar-days',
            },
          ]}
        />
      </PageHeader>
      <PageContent>
        <TravelMap />
        <TravelTimeline />
        <Quote author={QUOTE_AUTHOR} source={QUOTE_SOURCE}>
          {QUOTE_TEXT}
        </Quote>
      </PageContent>
    </Layout>
  );
}
