import { type ReactNode, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Layout from '@theme/Layout';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import * as countries from 'i18n-iso-countries';
import countriesEn from 'i18n-iso-countries/langs/en.json';
import countriesZh from 'i18n-iso-countries/langs/zh.json';
import { PageTitle, PageHeader, PageContent } from '@site/src/components/laikit/Page';
import Card from '@site/src/components/laikit/Card';
import Skeleton from '@site/src/components/laikit/Skeleton';
import Chart from '@site/src/components/laikit/Chart';
import Segmented, { type SegmentedItem } from '@site/src/components/laikit/Segmented';
import { useUmamiStats, type InsightsRange, type UmamiStats } from '@site/src/hooks/useUmamiStats';
import { useUmamiPageviewsSeries } from '@site/src/hooks/useUmamiPageviewsSeries';
import { useUmamiMetric } from '@site/src/hooks/useUmamiMetric';
import { useAnimatedNumber } from '@site/src/hooks/useAnimatedNumber';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { formatCompact } from '@site/src/utils/format';
import { toPageviewsData } from './_components/seriesFormat';
import MetricList from './_components/MetricList';
import metricListStyles from './_components/MetricList.module.css';
import UptimeSection from './_components/UptimeSection';
import SysStatusCard from './_components/SysStatusCard';
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
const METRIC_LIST_EMPTY = translate({
  id: 'pages.insights.metricList.empty',
  message: 'No Data Yet',
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
  if (!Number.isFinite(curr) || !Number.isFinite(prev) || prev === 0) return null;
  return (curr - prev) / prev;
}

interface MetricSpec {
  key: keyof UmamiStats | 'bounceRate' | 'avgVisit';
  label: string;
  icon: string;
  format: (n: number) => string;
  invertDelta?: boolean;
}

function deriveMetric(spec: MetricSpec, data: UmamiStats | null | undefined): number {
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
  const sign = delta == null ? null : Math.abs(delta) < 0.001 ? 'flat' : delta > 0 ? 'up' : 'down';
  const positive = sign === 'flat' ? null : spec.invertDelta ? sign === 'down' : sign === 'up';

  return (
    <Card padding="1.4rem 1.4rem 1.25rem" className={styles.heroTile}>
      <div className={styles.heroHead}>
        <Icon icon={spec.icon} className={styles.heroIcon} aria-hidden="true" />
        <span className={styles.heroLabel}>{spec.label}</span>
      </div>
      {loading ? (
        <Skeleton className={styles.heroValue} radius="8px">
          {'     '}
        </Skeleton>
      ) : (
        <span className={styles.heroValue}>{spec.format(animated)}</span>
      )}
      {loading ? (
        <Skeleton
          className={styles.heroDeltaSkeleton}
          width="3rem"
          height="1.3rem"
          radius="999px"
        />
      ) : delta != null && sign !== 'flat' ? (
        <span
          className={clsx(styles.heroDelta, positive ? styles.heroDeltaUp : styles.heroDeltaDown)}
        >
          <Icon
            icon={sign === 'up' ? 'lucide:arrow-up-right' : 'lucide:arrow-down-right'}
            className={styles.heroDeltaIcon}
            aria-hidden="true"
          />
          {Math.abs(delta * 100).toFixed(1)}%
        </span>
      ) : (
        <span className={clsx(styles.heroDelta, styles.heroDeltaFlat)}>—</span>
      )}
    </Card>
  );
}

function HeroGrid({ range }: { range: InsightsRange }) {
  const { data, status } = useUmamiStats(range);
  const { i18n } = useDocusaurusContext();
  const loading = status === 'loading';
  const errored = status === 'error';

  // Round before formatting so a count-up frame never shows more decimals than
  // its final value (e.g. an integer total of 23 must not flash "11.5").
  const compact = (n: number) => formatCompact(Math.round(n), i18n.currentLocale);

  const specs: MetricSpec[] = [
    {
      key: 'visitors',
      label: translate({
        id: 'pages.insights.metric.visitors',
        message: 'Visitors',
      }),
      icon: 'lucide:users',
      format: compact,
    },
    {
      key: 'visits',
      label: translate({
        id: 'pages.insights.metric.visits',
        message: 'Visits',
      }),
      icon: 'lucide:log-in',
      format: compact,
    },
    {
      key: 'pageviews',
      label: translate({
        id: 'pages.insights.metric.pageviews',
        message: 'Pageviews',
      }),
      icon: 'lucide:eye',
      format: compact,
    },
    {
      key: 'bounceRate',
      label: translate({
        id: 'pages.insights.metric.bounceRate',
        message: 'Bounce Rate',
      }),
      icon: 'lucide:undo-2',
      format: formatPercent,
      invertDelta: true,
    },
    {
      key: 'avgVisit',
      label: translate({
        id: 'pages.insights.metric.avgVisit',
        message: 'Avg. Visit',
      }),
      icon: 'lucide:timer',
      format: formatDuration,
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

function PageviewsChart({ range }: { range: InsightsRange }) {
  const { data, status } = useUmamiPageviewsSeries(range);
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { selectMessage } = usePluralForm();
  const series = data?.pageviews ?? [];
  const loading = status === 'loading';
  const unit = range === 1 ? 'hour' : range === 7 ? '6h' : range === 30 ? 'day' : 'week';
  const pageviewsLabel = (v: number) =>
    selectMessage(
      v,
      translate(
        {
          id: 'pages.insights.unit.pageviews',
          message: '{count} pageview|{count} pageviews',
        },
        { count: formatCompact(v, currentLocale) }
      )
    );

  return (
    <Chart
      type="line"
      icon="lucide:line-chart"
      title={translate({
        id: 'pages.insights.chart.title',
        message: 'Pageviews Over Time',
      })}
      data={toPageviewsData(series, unit, currentLocale)}
      loading={loading || series.length === 0}
      formatValue={pageviewsLabel}
      className={styles.chartCard}
    />
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
          message: 'Top Pages',
        })}
        icon="lucide:file-text"
        items={pages.items}
        loading={pages.status === 'loading'}
        emptyText={METRIC_LIST_EMPTY}
        renderLabel={(p) => <span title={p}>{p === '/' ? '/' : p}</span>}
        href={(p) => p}
      />
      <MetricList
        title={translate({
          id: 'pages.insights.metricList.referrers.title',
          message: 'Top Referrers',
        })}
        icon="lucide:link"
        items={referrers.items}
        loading={referrers.status === 'loading'}
        emptyText={METRIC_LIST_EMPTY}
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
        href={(r) => (r ? (/^https?:\/\//.test(r) ? r : `https://${r}`) : null)}
      />
      <MetricList
        title={translate({
          id: 'pages.insights.metricList.countries',
          message: 'Top Countries',
        })}
        icon="lucide:globe"
        items={countriesMetric.items}
        loading={countriesMetric.status === 'loading'}
        emptyText={METRIC_LIST_EMPTY}
        renderLabel={(code) => (
          <>
            <img
              className={metricListStyles.flag}
              src={`https://analytics.lailai.one/images/country/${code.toLowerCase()}.png`}
              alt=""
              aria-hidden="true"
              loading="lazy"
            />
            <span>{countries.getName(code, lang) ?? code}</span>
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
        <SysStatusCard />
      </PageContent>
    </Layout>
  );
}
