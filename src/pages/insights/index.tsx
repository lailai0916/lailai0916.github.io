import React, { type ReactNode, useState } from 'react';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import * as countries from 'i18n-iso-countries';
import countriesEn from 'i18n-iso-countries/langs/en.json';
import countriesZh from 'i18n-iso-countries/langs/zh.json';
import {
  PageTitle,
  PageHeader,
  PageContent,
} from '@site/src/components/laikit/Page';
import Card from '@site/src/components/laikit/Card';
import Segmented, {
  type SegmentedItem,
} from '@site/src/components/laikit/Segmented';
import {
  useUmamiStats,
  type InsightsRange,
  type UmamiStats,
} from '@site/src/hooks/useUmamiStats';
import { useUmamiPageviewsSeries } from '@site/src/hooks/useUmamiPageviewsSeries';
import { useUmamiMetric } from '@site/src/hooks/useUmamiMetric';
import { useAnimatedNumber } from '@site/src/hooks/useAnimatedNumber';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { formatCompact } from '@site/src/utils/format';
import { Icon } from '@iconify/react';
import Sparkline from './_components/Sparkline';
import MetricList from './_components/MetricList';
import metricListStyles from './_components/MetricList.module.css';
import UptimeSection from './_components/UptimeSection';
import styles from './styles.module.css';

countries.registerLocale(countriesEn);
countries.registerLocale(countriesZh);

const TITLE = translate({
  id: 'pages.insights.title',
  message: 'Insights',
});
const DESCRIPTION = translate({
  id: 'pages.insights.description',
  message: 'Live numbers from this site, refreshed each visit.',
});
const MODIFICATION = translate({
  id: 'pages.insights.modification',
  message: 'Live <b>Insights</b>',
});

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) return '0s';
  const s = Math.round(seconds);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  if (m < 60) return rem === 0 ? `${m}m` : `${m}m ${rem}s`;
  const h = Math.floor(m / 60);
  const remM = m % 60;
  return remM === 0 ? `${h}h` : `${h}h ${remM}m`;
}

function formatPercent(n: number): string {
  if (!Number.isFinite(n)) return '–';
  return `${(n * 100).toFixed(1)}%`;
}

function deltaPercent(curr: number, prev: number): number | null {
  if (!Number.isFinite(curr) || !Number.isFinite(prev) || prev === 0)
    return null;
  return (curr - prev) / prev;
}

interface MetricSpec {
  key: keyof UmamiStats | 'bounceRate' | 'avgVisit';
  label: string;
  format: (n: number) => string;
  invertDelta?: boolean;
}

function deriveMetric(
  spec: MetricSpec,
  data: UmamiStats | null | undefined
): number {
  if (!data) return 0;
  switch (spec.key) {
    case 'bounceRate':
      return data.visits > 0 ? data.bounces / data.visits : 0;
    case 'avgVisit':
      return data.visits > 0 ? data.totaltime / data.visits : 0;
    default:
      return data[spec.key as keyof UmamiStats] ?? 0;
  }
}

function HeroMetric({
  spec,
  current,
  previous,
  loading,
}: {
  spec: MetricSpec;
  current: number;
  previous: number;
  loading: boolean;
}) {
  const animated = useAnimatedNumber(loading ? null : current);
  const delta = deltaPercent(current, previous);
  const sign =
    delta == null
      ? null
      : Math.abs(delta) < 0.001
        ? 'flat'
        : delta > 0
          ? 'up'
          : 'down';
  const positive =
    sign === 'flat' ? null : spec.invertDelta ? sign === 'down' : sign === 'up';

  return (
    <Card padding="1.5rem 1.5rem 1.25rem" className={styles.heroTile}>
      <span className={styles.heroLabel}>{spec.label}</span>
      <span
        className={
          loading
            ? `${styles.heroValue} ${styles.skeletonText}`
            : styles.heroValue
        }
      >
        {loading ? '     ' : spec.format(animated)}
      </span>
      {loading ? (
        <span className={styles.heroDeltaFlat}>&nbsp;</span>
      ) : delta != null && sign !== 'flat' ? (
        <span className={positive ? styles.heroDeltaUp : styles.heroDeltaDown}>
          {sign === 'up' ? '↑' : '↓'} {Math.abs(delta * 100).toFixed(1)}%
        </span>
      ) : (
        <span className={styles.heroDeltaFlat}>—</span>
      )}
    </Card>
  );
}

function HeroGrid({ range }: { range: InsightsRange }) {
  const { data, status } = useUmamiStats(range);
  const { i18n } = useDocusaurusContext();
  const loading = status === 'loading';
  const errored = status === 'error';

  const compact = (n: number) => formatCompact(n, i18n.currentLocale);

  const specs: MetricSpec[] = [
    {
      key: 'pageviews',
      label: translate({
        id: 'pages.insights.metric.pageviews',
        message: 'Pageviews',
      }),
      format: compact,
    },
    {
      key: 'visitors',
      label: translate({
        id: 'pages.insights.metric.visitors',
        message: 'Visitors',
      }),
      format: compact,
    },
    {
      key: 'visits',
      label: translate({
        id: 'pages.insights.metric.visits',
        message: 'Visits',
      }),
      format: compact,
    },
    {
      key: 'avgVisit',
      label: translate({
        id: 'pages.insights.metric.avgVisit',
        message: 'Avg. Visit',
      }),
      format: formatDuration,
    },
    {
      key: 'bounceRate',
      label: translate({
        id: 'pages.insights.metric.bounceRate',
        message: 'Bounce Rate',
      }),
      format: formatPercent,
      invertDelta: true,
    },
  ];

  return (
    <div className={styles.heroGrid}>
      {specs.map((spec) => {
        const current = deriveMetric(spec, data);
        const previous = deriveMetric(spec, data?.comparison ?? null);
        return (
          <HeroMetric
            key={spec.key}
            spec={spec}
            current={current}
            previous={previous}
            loading={loading || errored}
          />
        );
      })}
    </div>
  );
}

function RangeBar({
  range,
  onChange,
}: {
  range: InsightsRange;
  onChange: (r: InsightsRange) => void;
}) {
  const items: SegmentedItem<InsightsRange>[] = [
    {
      value: 1,
      label: translate({
        id: 'pages.insights.range.24h',
        message: '24 hours',
      }),
    },
    {
      value: 7,
      label: translate({
        id: 'pages.insights.range.7d',
        message: '7 days',
      }),
    },
    {
      value: 30,
      label: translate({
        id: 'pages.insights.range.30d',
        message: '30 days',
      }),
    },
    {
      value: 365,
      label: translate({
        id: 'pages.insights.range.1y',
        message: '1 year',
      }),
    },
  ];
  return (
    <div className={styles.rangeBar}>
      <Segmented<InsightsRange>
        value={range}
        items={items}
        onChange={onChange}
        orientation="horizontal"
      />
    </div>
  );
}

const COUNTRY_NAME_OVERRIDES: Record<string, Record<string, string>> = {
  TW: { en: 'Taiwan', zh: '台湾' },
};

function countryName(code: string, lang: string): string {
  return (
    COUNTRY_NAME_OVERRIDES[code]?.[lang] ??
    countries.getName(code, lang) ??
    code
  );
}

function flagImageUrl(code: string): string {
  return `https://analytics.lailai.one/images/country/${code.toLowerCase()}.png`;
}

function PageviewsChart({ range }: { range: InsightsRange }) {
  const { data, status } = useUmamiPageviewsSeries(range);
  const series = data?.pageviews ?? [];
  const loading = status === 'loading';

  return (
    <Card padding="1.5rem 1.25rem 1.25rem" className={styles.chartCard}>
      <header className={metricListStyles.head}>
        <Icon icon="lucide:line-chart" className={metricListStyles.icon} />
        <h3 className={metricListStyles.title}>
          {translate({
            id: 'pages.insights.chart.title',
            message: 'Pageviews over time',
          })}
        </h3>
      </header>
      <Sparkline
        data={series}
        loading={loading}
        unit={
          range === 1
            ? 'hour'
            : range === 7
              ? '6h'
              : range === 30
                ? 'day'
                : 'week'
        }
      />
    </Card>
  );
}

function MetricsGrid({ range }: { range: InsightsRange }) {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const lang = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  const pages = useUmamiMetric('path', range);
  const referrers = useUmamiMetric('referrer', range);
  const countriesMetric = useUmamiMetric('country', range);

  return (
    <section className={styles.metricsGrid}>
      <MetricList
        title={translate({
          id: 'pages.insights.metricList.pages',
          message: 'Top pages',
        })}
        icon="lucide:file-text"
        items={pages.items}
        loading={pages.status === 'loading'}
        emptyText={translate({
          id: 'pages.insights.metricList.empty',
          message: 'No data yet',
        })}
        renderLabel={(p) => <span title={p}>{p === '/' ? '/' : p}</span>}
      />
      <MetricList
        title={translate({
          id: 'pages.insights.metricList.referrers',
          message: 'Top referrers',
        })}
        icon="lucide:link"
        items={referrers.items}
        loading={referrers.status === 'loading'}
        emptyText={translate({
          id: 'pages.insights.metricList.empty',
          message: 'No data yet',
        })}
        renderLabel={(r) =>
          r ? (
            <span title={r}>{r}</span>
          ) : (
            <span className={styles.muted}>
              {translate({
                id: 'pages.insights.metricList.referrers.direct',
                message: 'Direct',
              })}
            </span>
          )
        }
      />
      <MetricList
        title={translate({
          id: 'pages.insights.metricList.countries',
          message: 'Top countries',
        })}
        icon="lucide:globe"
        items={countriesMetric.items}
        loading={countriesMetric.status === 'loading'}
        emptyText={translate({
          id: 'pages.insights.metricList.empty',
          message: 'No data yet',
        })}
        renderLabel={(code) => (
          <>
            <img
              className={metricListStyles.flag}
              src={flagImageUrl(code)}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <span>{countryName(code, lang)}</span>
          </>
        )}
      />
    </section>
  );
}

export default function Insights(): ReactNode {
  const [range, setRange] = useState<InsightsRange>(1);
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <PageHeader>
        <PageTitle title={MODIFICATION} description={DESCRIPTION} />
        <RangeBar range={range} onChange={setRange} />
      </PageHeader>
      <PageContent className={styles.layout}>
        <HeroGrid range={range} />
        <PageviewsChart range={range} />
        <MetricsGrid range={range} />
        <UptimeSection />
      </PageContent>
    </Layout>
  );
}
