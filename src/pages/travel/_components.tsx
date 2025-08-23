import React, { useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Chrono } from 'react-chrono';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
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

const MAP_FILE = './datamaps.world.json';

const ISO_COUNTRIES = {
  AFG: 'AF',
  ALA: 'AX',
  ALB: 'AL',
  DZA: 'DZ',
  ASM: 'AS',
  AND: 'AD',
  AGO: 'AO',
  AIA: 'AI',
  ATA: 'AQ',
  ATG: 'AG',
  ARG: 'AR',
  ARM: 'AM',
  ABW: 'AW',
  AUS: 'AU',
  AUT: 'AT',
  AZE: 'AZ',
  BHS: 'BS',
  BHR: 'BH',
  BGD: 'BD',
  BRB: 'BB',
  BLR: 'BY',
  BEL: 'BE',
  BLZ: 'BZ',
  BEN: 'BJ',
  BMU: 'BM',
  BTN: 'BT',
  BOL: 'BO',
  BIH: 'BA',
  BWA: 'BW',
  BVT: 'BV',
  BRA: 'BR',
  VGB: 'VG',
  IOT: 'IO',
  BRN: 'BN',
  BGR: 'BG',
  BFA: 'BF',
  BDI: 'BI',
  KHM: 'KH',
  CMR: 'CM',
  CAN: 'CA',
  CPV: 'CV',
  CYM: 'KY',
  CAF: 'CF',
  TCD: 'TD',
  CHL: 'CL',
  CHN: 'CN',
  HKG: 'HK',
  MAC: 'MO',
  CXR: 'CX',
  CCK: 'CC',
  COL: 'CO',
  COM: 'KM',
  COG: 'CG',
  COD: 'CD',
  COK: 'CK',
  CRI: 'CR',
  CIV: 'CI',
  HRV: 'HR',
  CUB: 'CU',
  CYP: 'CY',
  CZE: 'CZ',
  DNK: 'DK',
  DJI: 'DJ',
  DMA: 'DM',
  DOM: 'DO',
  ECU: 'EC',
  EGY: 'EG',
  SLV: 'SV',
  GNQ: 'GQ',
  ERI: 'ER',
  EST: 'EE',
  ETH: 'ET',
  FLK: 'FK',
  FRO: 'FO',
  FJI: 'FJ',
  FIN: 'FI',
  FRA: 'FR',
  GUF: 'GF',
  PYF: 'PF',
  ATF: 'TF',
  GAB: 'GA',
  GMB: 'GM',
  GEO: 'GE',
  DEU: 'DE',
  GHA: 'GH',
  GIB: 'GI',
  GRC: 'GR',
  GRL: 'GL',
  GRD: 'GD',
  GLP: 'GP',
  GUM: 'GU',
  GTM: 'GT',
  GGY: 'GG',
  GIN: 'GN',
  GNB: 'GW',
  GUY: 'GY',
  HTI: 'HT',
  HMD: 'HM',
  VAT: 'VA',
  HND: 'HN',
  HUN: 'HU',
  ISL: 'IS',
  IND: 'IN',
  IDN: 'ID',
  IRN: 'IR',
  IRQ: 'IQ',
  IRL: 'IE',
  IMN: 'IM',
  ISR: 'IL',
  ITA: 'IT',
  JAM: 'JM',
  JPN: 'JP',
  JEY: 'JE',
  JOR: 'JO',
  KAZ: 'KZ',
  KEN: 'KE',
  KIR: 'KI',
  PRK: 'KP',
  KOR: 'KR',
  KWT: 'KW',
  KGZ: 'KG',
  LAO: 'LA',
  LVA: 'LV',
  LBN: 'LB',
  LSO: 'LS',
  LBR: 'LR',
  LBY: 'LY',
  LIE: 'LI',
  LTU: 'LT',
  LUX: 'LU',
  MKD: 'MK',
  MDG: 'MG',
  MWI: 'MW',
  MYS: 'MY',
  MDV: 'MV',
  MLI: 'ML',
  MLT: 'MT',
  MHL: 'MH',
  MTQ: 'MQ',
  MRT: 'MR',
  MUS: 'MU',
  MYT: 'YT',
  MEX: 'MX',
  FSM: 'FM',
  MDA: 'MD',
  MCO: 'MC',
  MNG: 'MN',
  MNE: 'ME',
  MSR: 'MS',
  MAR: 'MA',
  MOZ: 'MZ',
  MMR: 'MM',
  NAM: 'NA',
  NRU: 'NR',
  NPL: 'NP',
  NLD: 'NL',
  ANT: 'AN',
  NCL: 'NC',
  NZL: 'NZ',
  NIC: 'NI',
  NER: 'NE',
  NGA: 'NG',
  NIU: 'NU',
  NFK: 'NF',
  MNP: 'MP',
  NOR: 'NO',
  OMN: 'OM',
  PAK: 'PK',
  PLW: 'PW',
  PSE: 'PS',
  PAN: 'PA',
  PNG: 'PG',
  PRY: 'PY',
  PER: 'PE',
  PHL: 'PH',
  PCN: 'PN',
  POL: 'PL',
  PRT: 'PT',
  PRI: 'PR',
  QAT: 'QA',
  REU: 'RE',
  ROU: 'RO',
  RUS: 'RU',
  RWA: 'RW',
  BLM: 'BL',
  SHN: 'SH',
  KNA: 'KN',
  LCA: 'LC',
  MAF: 'MF',
  SPM: 'PM',
  VCT: 'VC',
  WSM: 'WS',
  SMR: 'SM',
  STP: 'ST',
  SAU: 'SA',
  SEN: 'SN',
  SRB: 'RS',
  SYC: 'SC',
  SLE: 'SL',
  SGP: 'SG',
  SVK: 'SK',
  SVN: 'SI',
  SLB: 'SB',
  SOM: 'SO',
  ZAF: 'ZA',
  SGS: 'GS',
  SSD: 'SS',
  ESP: 'ES',
  LKA: 'LK',
  SDN: 'SD',
  SUR: 'SR',
  SJM: 'SJ',
  SWZ: 'SZ',
  SWE: 'SE',
  CHE: 'CH',
  SYR: 'SY',
  TWN: 'TW',
  TJK: 'TJ',
  TZA: 'TZ',
  THA: 'TH',
  TLS: 'TL',
  TGO: 'TG',
  TKL: 'TK',
  TON: 'TO',
  TTO: 'TT',
  TUN: 'TN',
  TUR: 'TR',
  TKM: 'TM',
  TCA: 'TC',
  TUV: 'TV',
  UGA: 'UG',
  UKR: 'UA',
  ARE: 'AE',
  GBR: 'GB',
  USA: 'US',
  UMI: 'UM',
  URY: 'UY',
  UZB: 'UZ',
  VUT: 'VU',
  VEN: 'VE',
  VNM: 'VN',
  VIR: 'VI',
  WLF: 'WF',
  ESH: 'EH',
  YEM: 'YE',
  ZMB: 'ZM',
  ZWE: 'ZW',
  XKX: 'XK',
};

const MAP_THEME = {
  visited: 'var(--ifm-color-primary)',
  visitedHover: 'var(--ifm-color-primary-dark)',
  unvisited: 'var(--ifm-color-emphasis-200)',
  stroke: 'var(--ifm-color-emphasis-300)',
  background: 'var(--ifm-background-surface-color)',
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

  function flagEmojiToISO2(flag: string): string | null {
    const chars = Array.from(flag);
    if (chars.length < 2) return null;
    const a = chars[0].codePointAt(0)!;
    const b = chars[1].codePointAt(0)!;
    // 区域指示符范围 U+1F1E6..U+1F1FF
    if (a < 0x1f1e6 || a > 0x1f1ff || b < 0x1f1e6 || b > 0x1f1ff) return null;
    return (
      String.fromCharCode(65 + (a - 0x1f1e6)) +
      String.fromCharCode(65 + (b - 0x1f1e6))
    );
  }

  // 从“国旗数组”得到去重后的 ISO2 列表
  function flagsToISO2(flags: string[]): string[] {
    return [
      ...new Set(flags.map(flagEmojiToISO2).filter((x): x is string => !!x)),
    ];
  }

  // 获取访问过的国家
  const visitedCountries = useMemo(() => {
    const flagRegex = /[\u{1F1E6}-\u{1F1FF}]{2}/gu;
    const countries = TRAVEL_LIST.flatMap(
      (i) => i.cardTitle.match(flagRegex) ?? []
    );
    return flagsToISO2(countries);
  }, []);

  const getFillColor = (code: string) => {
    if (code === 'AQ') return;

    if (visitedCountries.includes(code)) {
      return MAP_THEME.visited;
    }

    return MAP_THEME.unvisited;
  };

  const getOpacity = (code: string) => {
    return code === 'AQ' ? 0 : 1;
  };

  const handleMouseEnter = (country: string) => {
    setTooltip(country);
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
          <ComposableMap projection="geoMercator">
            <ZoomableGroup zoom={0.8} minZoom={0.7} center={[0, 40]}>
              <Geographies geography={MAP_FILE}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const code = ISO_COUNTRIES[geo.id];
                    const country = geo.properties.name;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getFillColor(code)}
                        stroke={MAP_THEME.stroke}
                        opacity={getOpacity(code)}
                        style={{
                          default: { outline: 'none' },
                          hover: {
                            outline: 'none',
                            fill: MAP_THEME.visitedHover,
                          },
                          pressed: { outline: 'none' },
                        }}
                        onMouseEnter={() => handleMouseEnter(country)}
                        onMouseLeave={handleMouseLeave}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          {tooltip && <div className="travel-map-tooltip">{tooltip}</div>}
        </div>
        <div className={styles.mapLegend}>
          {/* 图例内容，可自定义 */}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginRight: '1rem',
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                background: 'var(--ifm-color-primary)',
                borderRadius: 4,
                display: 'inline-block',
                marginRight: 6,
              }}
            ></span>
            Visited
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              style={{
                width: 16,
                height: 16,
                background: '#e0e7ef',
                borderRadius: 4,
                display: 'inline-block',
                marginRight: 6,
              }}
            ></span>
            Not visited
          </span>
        </div>
      </div>
    </SectionContainer>
  );
}
