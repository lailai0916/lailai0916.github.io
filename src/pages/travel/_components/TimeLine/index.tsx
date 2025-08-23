import React, { useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Chrono } from 'react-chrono';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { TRAVEL_LIST } from '@site/src/data/travel';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import { translate } from '@docusaurus/Translate';
import './styles.module.css';

const LAYOUT_CONSTANTS = {
  BREAKPOINT_MOBILE: 768,
  CARD_WIDTH: 400,
  CARD_HEIGHT: 160,
  CONTENT_HEIGHT: 120,
  LINE_WIDTH: 3,
  POINT_SIZE: 18,
} as const;

const TIMELINE_CONFIG = {
  cardWidth: LAYOUT_CONSTANTS.CARD_WIDTH,
  cardHeight: LAYOUT_CONSTANTS.CARD_HEIGHT,
  contentDetailsHeight: LAYOUT_CONSTANTS.CONTENT_HEIGHT,
  lineWidth: LAYOUT_CONSTANTS.LINE_WIDTH,
  timelinePointDimension: LAYOUT_CONSTANTS.POINT_SIZE,
  responsiveBreakPoint: LAYOUT_CONSTANTS.BREAKPOINT_MOBILE,

  hideControls: true,
  useReadMore: false,
  enableBreakPoint: true,
  borderLessCards: true,
  disableToolbar: true,

  mediaSettings: {
    align: 'center' as const,
    fit: 'cover' as const,
  },

  semanticTags: {
    cardTitle: 'h3' as const,
  },
} as const;

const TIMELINE_THEME = {
  primary: 'var(--ifm-color-primary)',
  secondary: 'var(--ifm-color-primary-light)',
  cardBgColor: 'var(--ifm-card-background-color)',
  cardTitleColor: 'var(--ifm-color-emphasis-800)',
  cardDetailsColor: 'var(--ifm-color-emphasis-700)',
  titleColor: 'var(--ifm-color-emphasis-700)',
  titleColorActive: 'var(--ifm-color-primary)',
  toolbarBgColor: 'var(--ifm-background-surface-color)',
  toolbarBtnBgColor: 'var(--ifm-button-background-color)',
  toolbarTextColor: 'var(--ifm-color-emphasis-800)',
  iconColor: 'var(--ifm-color-primary-light)',
  buttonHoverBgColor: 'var(--ifm-color-emphasis-200)',
  buttonActiveBgColor: 'var(--ifm-color-primary)',
  buttonActiveIconColor: 'var(--ifm-color-content-inverse)',
  buttonBorderColor: 'var(--ifm-color-emphasis-300)',
  buttonHoverBorderColor: 'var(--ifm-color-primary-lighter)',
  buttonActiveBorderColor: 'var(--ifm-color-primary)',
  shadowColor: 'var(--ifm-global-shadow-lw)',
  glowColor: 'var(--ifm-color-primary-lightest)',
} as const;

const CLASS_NAMES = {
  card: 'travel-timeline-card',
  cardMedia: 'travel-timeline-card-media',
  cardText: 'travel-timeline-card-text',
  cardTitle: 'travel-timeline-card-title',
  title: 'travel-timeline-title',
} as const;

/**
 * 格式化 YYYY-MM 日期为 "Month Year"
 * @param dateStr - 日期字符串，格式为 YYYY-MM
 * @param locale - 语言环境
 * @returns 格式化后的日期字符串
 */

const formatTravelDate = (dateStr: string, locale: string): string => {
  // 验证日期格式
  if (!/^\d{4}-\d{2}$/.test(dateStr)) {
    console.warn(`Invalid date format: ${dateStr}. Expected format: YYYY-MM`);
    return dateStr;
  }

  try {
    const [year, month] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1);

    // 验证日期是否有效
    if (isNaN(date.getTime())) {
      throw new Error(`Invalid date: ${dateStr}`);
    }

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    });
  } catch (error) {
    console.error(`Error formatting date ${dateStr}:`, error);
    return dateStr; // 降级处理，返回原始字符串
  }
};

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
      <SectionHeader
        title={translate({
          id: 'pages.travel.timeline.title',
          message: 'Travel Footprint',
        })}
        description={translate({
          id: 'pages.travel.timeline.description',
          message:
            'From what is gained on paper, understanding always feels shallow; to truly know it, you must experience it yourself.',
        })}
      />
      <BrowserOnly>
        {() => (
          <Chrono
            items={items}
            mode="VERTICAL_ALTERNATING"
            theme={TIMELINE_THEME}
            classNames={CLASS_NAMES}
            {...TIMELINE_CONFIG}
          />
        )}
      </BrowserOnly>
    </SectionContainer>
  );
}
