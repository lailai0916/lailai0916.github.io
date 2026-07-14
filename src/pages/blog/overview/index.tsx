import { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import { ArchiveTabsNav } from '@site/src/theme/BlogShared/ArchiveTabs';
import DataCard from '@site/src/components/laikit/DataCard';
import { getAllBlogItems, getAllPostMetadata, loadOfficialTags } from '@site/src/utils/blogData';
import { MOMENT_LIST } from '@site/src/data/moments';
import { formatBeijingDate, formatCompact } from '@site/src/utils/format';
import Chart, { type ChartDatum } from '@site/src/components/laikit/Chart';
import styles from './styles.module.css';

const TITLE = translate({ id: 'pages.overview.title', message: 'Overview' });
const DESCRIPTION = translate({
  id: 'pages.overview.description',
  message: 'A by-the-numbers look at what I have written here.',
});
const MONTHLY_TITLE = translate({
  id: 'pages.overview.chart.monthly.title',
  message: 'Posts per Month',
});
const CUMULATIVE_TITLE = translate({
  id: 'pages.overview.chart.cumulative.title',
  message: 'Cumulative Posts',
});
const CHART_EMPTY = translate({
  id: 'pages.overview.chart.empty',
  message: 'No posts yet',
});

// Continuous monthly timeline (gap months filled with 0); year ticks on January.
function buildMonths(items: ReturnType<typeof getAllBlogItems>, locale: string): ChartDatum[] {
  const map = new Map<string, number>();
  items.forEach((it) => {
    const date = it.date ?? it.metadata?.date;
    if (!date) return;
    const month = formatBeijingDate(date).slice(0, 7); // YYYY-MM
    map.set(month, (map.get(month) ?? 0) + 1);
  });

  const keys = [...map.keys()].sort();
  if (keys.length === 0) return [];

  const out: ChartDatum[] = [];
  const [startY, startM] = keys[0].split('-').map(Number);
  const [endY, endM] = keys[keys.length - 1].split('-').map(Number);
  let y = startY;
  let m = startM;
  while (y < endY || (y === endY && m <= endM)) {
    const key = `${y}-${String(m).padStart(2, '0')}`;
    out.push({
      key,
      value: map.get(key) ?? 0,
      tooltipLabel: new Date(y, m - 1, 1).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
      }),
      axisLabel: m === 1 ? String(y) : undefined,
    });
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  return out;
}

// Running total over the same monthly timeline.
function toCumulative(months: ChartDatum[]): ChartDatum[] {
  let sum = 0;
  return months.map((d) => {
    sum += d.value;
    return { ...d, value: sum };
  });
}

export default function BlogStats(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, defaultLocale } = i18n;
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;

  const items = getAllBlogItems();
  const monthData = buildMonths(items, currentLocale);
  const cumulativeData = toCumulative(monthData);
  const tagCount = loadOfficialTags(localeKey).length;
  const postCount = items.length;
  // Reading time → word count, matching the blog sidebar's StatsCard (≈200 wpm).
  const readingMinutes = Math.round(
    getAllPostMetadata().reduce((sum, meta) => sum + (meta.readingTime ?? 0), 0)
  );
  const wordCount = readingMinutes * 200;

  const compact = (v: number) => formatCompact(v, currentLocale);
  const { selectMessage } = usePluralForm();
  const postsLabel = (v: number) =>
    selectMessage(
      v,
      translate(
        {
          id: 'pages.overview.unit.posts',
          message: '{count} post|{count} posts',
        },
        { count: formatCompact(v, currentLocale) }
      )
    );
  const kpis = [
    {
      icon: 'lucide:newspaper',
      label: translate({
        id: 'pages.overview.metric.posts',
        message: 'Post|Posts',
      }),
      value: postCount,
    },
    {
      icon: 'lucide:file-text',
      label: translate({
        id: 'pages.overview.metric.words',
        message: 'Word|Words',
      }),
      value: wordCount,
    },
    {
      icon: 'lucide:tags',
      label: translate({
        id: 'pages.overview.metric.tags',
        message: 'Tag|Tags',
      }),
      value: tagCount,
    },
    {
      icon: 'lucide:aperture',
      label: translate({
        id: 'pages.overview.metric.moments',
        message: 'Moment|Moments',
      }),
      value: MOMENT_LIST.length,
    },
  ];

  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <ArchiveTabsNav activeTab="overview" />
      <div className={styles.kpiGrid}>
        {kpis.map((k) => (
          <DataCard key={k.label} icon={k.icon} value={k.value} label={k.label} format={compact} />
        ))}
      </div>
      <Chart
        type="bar"
        title={MONTHLY_TITLE}
        icon="lucide:bar-chart-3"
        data={monthData}
        emptyText={CHART_EMPTY}
        formatValue={postsLabel}
      />
      <Chart
        type="line"
        title={CUMULATIVE_TITLE}
        icon="lucide:trending-up"
        data={cumulativeData}
        emptyText={CHART_EMPTY}
        formatValue={postsLabel}
      />
    </BlogScaffold>
  );
}
