import React, { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Chrono } from 'react-chrono';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { TRAVEL_LIST } from '@site/src/data/travel';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TIMELINE_CONFIG = {
  cardWidth: 360,
  cardHeight: 120,
  contentDetailsHeight: 120,
  lineWidth: 3,
  timelinePointDimension: 18,
  // react-chrono v2 uses verticalBreakPoint for VERTICAL_ALTERNATING auto-switch
  verticalBreakPoint: 768,

  hideControls: true,
  useReadMore: false,
  enableBreakPoint: true,
  borderLessCards: true,
} as const;

const TIMELINE_THEME = {
  primary: 'var(--ifm-color-primary)',
  secondary: 'var(--ifm-color-primary-light)',
  cardBgColor: 'var(--ifm-card-background-color)',
  cardTitleColor: 'var(--ifm-color-emphasis-800)',
  cardSubtitleColor: 'var(--ifm-color-emphasis-700)',
  cardDetailsColor: 'var(--ifm-color-emphasis-700)',
  titleColor: 'var(--ifm-color-emphasis-700)',
  titleColorActive: 'var(--ifm-color-primary)',
  iconBackgroundColor: 'var(--ifm-color-primary)',
} as const;

const CLASS_NAMES = {
  card: 'travel-timeline-card',
  cardSubTitle: 'travel-timeline-card-subtitle',
  cardText: 'travel-timeline-card-text',
  cardTitle: 'travel-timeline-card-title',
  title: 'travel-timeline-title',
} as const;

const formatTravelDate = (dateStr: string, locale: string): string => {
  const [year, month] = dateStr.split('-');
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
};

const TITLE = translate({
  id: 'pages.travel.timeline.title',
  message: 'Travel Timeline',
});
const DESCRIPTION = translate({
  id: 'pages.travel.timeline.description',
  message:
    'From what is gained on paper, understanding always feels shallow; to truly know it, you must experience it yourself.',
});

export default function TravelTimeline() {
  const { i18n } = useDocusaurusContext();
  const items = useMemo(
    () =>
      [...TRAVEL_LIST].reverse().map((item) => ({
        ...item,
        title: formatTravelDate(item.title, i18n.currentLocale),
      })),
    [i18n.currentLocale]
  );

  return (
    <SectionContainer>
      <SectionHeader title={TITLE} description={DESCRIPTION} />
      <BrowserOnly>
        {() => (
          <div className={styles.wrapper}>
            <Chrono
              items={items}
              mode="VERTICAL_ALTERNATING"
              theme={TIMELINE_THEME}
              classNames={CLASS_NAMES}
              {...TIMELINE_CONFIG}
            />
          </div>
        )}
      </BrowserOnly>
    </SectionContainer>
  );
}
