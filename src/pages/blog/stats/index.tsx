import { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import { ArchiveTabsNav } from '@site/src/theme/BlogShared/ArchiveTabs';
import DataCard from '@site/src/components/laikit/DataCard';
import {
  getAllBlogItems,
  getAllPostMetadata,
  loadOfficialTags,
} from '@site/src/utils/blogData';
import { MOMENT_LIST } from '@site/src/data/moments';
import { formatBeijingDate, formatCompact } from '@site/src/utils/format';
import MonthlyBars, { type MonthBucket } from './_components/MonthlyBars';
import styles from './styles.module.css';

const TITLE = translate({ id: 'pages.stats.title', message: 'Stats' });
const DESCRIPTION = translate({
  id: 'pages.stats.description',
  message: 'A by-the-numbers look at what I have written here.',
});

// Group posts into a continuous monthly timeline (gap months filled with 0).
function buildMonths(): MonthBucket[] {
  const map = new Map<string, number>();
  getAllBlogItems().forEach((it) => {
    const date = it.date ?? it.metadata?.date;
    if (!date) return;
    const month = formatBeijingDate(date).slice(0, 7); // YYYY-MM
    map.set(month, (map.get(month) ?? 0) + 1);
  });

  const keys = [...map.keys()].sort();
  if (keys.length === 0) return [];

  const months: MonthBucket[] = [];
  const [startY, startM] = keys[0].split('-').map(Number);
  const [endY, endM] = keys[keys.length - 1].split('-').map(Number);
  let y = startY;
  let m = startM;
  while (y < endY || (y === endY && m <= endM)) {
    const key = `${y}-${String(m).padStart(2, '0')}`;
    months.push({ key, year: y, month: m, total: map.get(key) ?? 0 });
    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }
  return months;
}

export default function BlogStats(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, defaultLocale } = i18n;
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;

  const months = buildMonths();
  const tagCount = loadOfficialTags(localeKey).length;
  const postCount = getAllBlogItems().length;
  // Reading time → word count, matching the blog sidebar's StatsCard (≈200 wpm).
  const readingMinutes = Math.round(
    getAllPostMetadata().reduce((sum, meta) => sum + (meta.readingTime ?? 0), 0)
  );
  const wordCount = readingMinutes * 200;

  const compact = (v: number) => formatCompact(v, currentLocale);
  const kpis = [
    {
      icon: 'lucide:newspaper',
      label: translate({ id: 'pages.stats.metric.posts', message: 'Posts' }),
      value: postCount,
    },
    {
      icon: 'lucide:file-text',
      label: translate({ id: 'pages.stats.metric.words', message: 'Words' }),
      value: wordCount,
    },
    {
      icon: 'lucide:tags',
      label: translate({ id: 'pages.stats.metric.tags', message: 'Tags' }),
      value: tagCount,
    },
    {
      icon: 'lucide:sparkles',
      label: translate({
        id: 'pages.stats.metric.moments',
        message: 'Moments',
      }),
      value: MOMENT_LIST.length,
    },
  ];

  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <ArchiveTabsNav activeTab="stats" />
      <div className={styles.kpiGrid}>
        {kpis.map((k) => (
          <DataCard
            key={k.label}
            icon={k.icon}
            value={k.value}
            label={k.label}
            format={compact}
          />
        ))}
      </div>
      <MonthlyBars data={months} />
    </BlogScaffold>
  );
}
