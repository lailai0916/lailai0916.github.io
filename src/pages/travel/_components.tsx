import React, { useMemo } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Chrono } from 'react-chrono';
import { TRAVEL_LIST } from '@site/src/data/travel';
import './styles.module.css';

// Timeline配置常量
const TIMELINE_CONFIG = {
  // 布局和尺寸
  cardWidth: 400,
  cardHeight: 160,
  contentDetailsHeight: 120,
  lineWidth: 3,
  timelinePointDimension: 18,
  responsiveBreakPoint: 768,

  // 交互配置
  hideControls: true,
  useReadMore: false,
  disableClickOnCircle: false,
  disableNavOnKey: false,
  enableBreakPoint: true,
  highlightCardsOnHover: false,
  borderLessCards: true,
  disableToolbar: true,
  showAllCardsHorizontal: false,
  parseDetailsAsHTML: false,

  // 媒体设置
  mediaSettings: {
    align: 'center' as const,
    fit: 'cover' as const,
  },

  // 可访问性
  semanticTags: {
    cardTitle: 'h3' as const,
  },
} as const;

// 主题配置 - 遵循网站设计理念：统一·简约·现代
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
  buttonActiveIconColor: '#ffffff',
  buttonBorderColor: 'var(--ifm-color-emphasis-300)',
  buttonHoverBorderColor: 'var(--ifm-color-primary-lighter)',
  buttonActiveBorderColor: 'var(--ifm-color-primary)',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  glowColor: 'var(--ifm-color-primary-lightest)',
} as const;

// 字体大小配置
const FONT_SIZES = {
  cardText: '0.875rem',
  cardTitle: '1.125rem',
  title: '0.75rem',
} as const;

// 样式类名配置
const CLASS_NAMES = {
  card: 'travel-timeline-card',
  cardMedia: 'travel-timeline-card-media',
  cardText: 'travel-timeline-card-text',
  cardTitle: 'travel-timeline-card-title',
  title: 'travel-timeline-title',
} as const;

/**
 * 格式化 YYYY-MM 日期为 "Month Year"
 */
const formatTravelDate = (dateStr: string, locale: string): string => {
  if (!/^\d{4}-\d{2}$/.test(dateStr)) {
    return dateStr; // 格式不符，直接返回原字符串
  }
  const [year, month] = dateStr.split('-');
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
};

/**
 * 旅行时间线组件
 */
export default function Timeline() {
  const { i18n } = useDocusaurusContext();
  const items = useMemo(
    () =>
      [...TRAVEL_LIST].reverse().map((item) => ({
        ...item,
        title: formatTravelDate(item.title, i18n.currentLocale),
      })),
    [TRAVEL_LIST]
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Chrono
        // 数据和模式
        items={items}
        mode="VERTICAL_ALTERNATING"
        // 主题和样式
        theme={TIMELINE_THEME}
        fontSizes={FONT_SIZES}
        classNames={CLASS_NAMES}
        // 布局配置
        {...TIMELINE_CONFIG}
        // 时间轴点样式
        timelinePointShape="circle"
      />
    </div>
  );
}
