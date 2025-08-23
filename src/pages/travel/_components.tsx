import React, { useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Chrono } from 'react-chrono';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { TRAVEL_LIST } from '@site/src/data/travel';
import BrowserOnly from '@docusaurus/BrowserOnly';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const LAYOUT_CONSTANTS = {
  BREAKPOINT_MOBILE: 768,
  CARD_WIDTH: 400,
  CARD_HEIGHT: 160,
  CONTENT_HEIGHT: 120,
  LINE_WIDTH: 3,
  POINT_SIZE: 18,
} as const;

// 使用更稳定的地图数据源 - 参考 Umami 实现
const MAP_FILE = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// 从旅行数据中提取国家代码的辅助函数
const extractCountryFromFlag = (flag: string): string | null => {
  const flagToCode: Record<string, string> = {
    '🇨🇳': 'CHN',
    '🇯🇵': 'JPN',
    '🇻🇳': 'VNM',
    '🇦🇹': 'AUT',
    '🇸🇬': 'SGP',
    '🇹🇭': 'THA',
    '🇰🇷': 'KOR',
    '🇵🇭': 'PHL',
    '🇲🇾': 'MYS',
    '🇮🇩': 'IDN',
    '🇰🇭': 'KHM',
    '🇱🇦': 'LAO',
    '🇲🇲': 'MMR',
    '🇹🇼': 'TWN',
    '🇭🇰': 'HKG',
    '🇲🇴': 'MAC',
  };
  return flagToCode[flag] || null;
};

// 从旅行数据中提取访问过的国家（基于旅行记录自动生成）
const extractVisitedCountries = (): Set<string> => {
  const countryMap: Record<string, string> = {
    '🇨🇳': 'CHN',
    '🇯🇵': 'JPN',
    '🇻🇳': 'VNM',
    '🇦🇹': 'AUT',
    '🇸🇰': 'SVK',
    '🇭🇺': 'HUN',
    '🇨🇿': 'CZE',
    '🇸🇮': 'SVN',
    '🇩🇪': 'DEU',
    '🇹🇷': 'TUR',
    '🇸🇬': 'SGP',
    '🇦🇺': 'AUS',
    '🇮🇹': 'ITA',
    '🇻🇦': 'VAT',
    '🇨🇭': 'CHE',
    '🇫🇷': 'FRA',
    '🇲🇻': 'MDV',
    '🇰🇷': 'KOR',
    '🇲🇾': 'MYS',
    '🇭🇰': 'HKG',
  };

  const visited = new Set<string>();
  TRAVEL_LIST.forEach((item) => {
    Object.keys(countryMap).forEach((flag) => {
      if (item.cardTitle.includes(flag)) {
        visited.add(countryMap[flag]);
      }
    });
  });

  return visited;
};

const VISITED_COUNTRIES = extractVisitedCountries();

/**
 * 地图颜色主题配置 - 参考 Umami 风格
 */
const MAP_THEME = {
  visited: 'var(--ifm-color-primary)',
  visitedHover: 'var(--ifm-color-primary-dark)',
  unvisited: 'var(--ifm-color-emphasis-200)',
  stroke: 'var(--ifm-color-emphasis-300)',
  background: 'var(--ifm-background-surface-color)',
} as const;

/**
 * 获取国家显示名称
 */
const getCountryName = (geo: any): string => {
  return geo.properties?.NAME || geo.properties?.name || 'Unknown';
};

/**
 * 检查国家是否已访问
 */
const isCountryVisited = (geo: any): boolean => {
  const code = geo.properties?.ISO_A3 || geo.properties?.ADM0_A3 || '';
  return VISITED_COUNTRIES.has(code);
};

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

/**
 * 旅行时间线组件
 */
export function TravelTimeline() {
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

/**
 * 旅行地图组件 - 参考 Umami 实现
 */
export function TravelMap() {
  const [tooltip, setTooltip] = useState<string>('');

  // 获取访问过的国家
  const visitedCountries = useMemo(() => {
    const countries = new Set<string>();
    TRAVEL_LIST.forEach((item) => {
      const flag = item.cardTitle.split(' ')[0]; // 提取旗帜表情符号
      const countryCode = extractCountryFromFlag(flag);
      if (countryCode) {
        countries.add(countryCode);
      }
    });
    return countries;
  }, []);

  // 获取填充颜色
  const getFillColor = (properties: any) => {
    const countryCode = properties?.ISO_A3 || properties?.ADM0_A3 || '';
    
    if (visitedCountries.has(countryCode)) {
      return MAP_THEME.visited;
    }
    
    return MAP_THEME.unvisited;
  };

  // 获取透明度
  const getOpacity = (properties: any) => {
    const countryCode = properties?.ISO_A3 || properties?.ADM0_A3 || '';
    return countryCode === 'ATA' ? 0 : 1; // 隐藏南极洲
  };

  // 处理鼠标悬停
  const handleMouseEnter = (properties: any) => {
    const countryName = properties?.NAME || properties?.name || 'Unknown';
    const countryCode = properties?.ISO_A3 || properties?.ADM0_A3 || '';
    const isVisited = visitedCountries.has(countryCode);
    
    setTooltip(isVisited ? `✈️ ${countryName}` : countryName);
  };

  const handleMouseLeave = () => {
    setTooltip('');
  };

  return (
    <SectionContainer>
      <SectionHeader
        title={translate({
          id: 'pages.travel.map.title',
          message: 'Travel Map',
        })}
        description={translate({
          id: 'pages.travel.map.description',
          message:
            'Interactive map showing countries I have visited around the world',
        })}
      />

      <div className={styles.mapOuter}>
        <div className={styles.mapInner}>
          <BrowserOnly
            fallback={
              <div
                style={{
                  textAlign: 'center',
                  padding: '3rem',
                  fontSize: '1.1rem',
                  color: '#6c757d',
                }}
              >
                正在加载地图...
              </div>
            }
          >
            {() => (
              <ComposableMap
                projection="geoMercator"
                style={{ width: '100%', height: '100%' }}
              >
                <ZoomableGroup zoom={1} center={[0, 30]}>
                  <Geographies geography={MAP_FILE}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const { properties } = geo;
                        
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={getFillColor(properties)}
                            stroke={MAP_THEME.stroke}
                            opacity={getOpacity(properties)}
                            style={{
                              default: { outline: 'none' },
                              hover: { 
                                outline: 'none', 
                                fill: MAP_THEME.visitedHover 
                              },
                              pressed: { outline: 'none' },
                            }}
                            onMouseEnter={() => handleMouseEnter(properties)}
                            onMouseLeave={handleMouseLeave}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            )}
          </BrowserOnly>
        </div>
        <div className={styles.mapLegend}>
          {/* 图例内容，可自定义 */}
          <span style={{display:'inline-flex',alignItems:'center',marginRight:'1rem'}}>
            <span style={{width:16,height:16,background:'#007bff',borderRadius:4,display:'inline-block',marginRight:6}}></span>Visited
          </span>
          <span style={{display:'inline-flex',alignItems:'center'}}>
            <span style={{width:16,height:16,background:'#e0e7ef',borderRadius:4,display:'inline-block',marginRight:6}}></span>Not visited
          </span>
        </div>
      </div>

      {/* 悬浮提示 */}
      {tooltip && (
        <div className="travel-map-tooltip">
          {tooltip}
        </div>
      )}
    </SectionContainer>
  );
}
