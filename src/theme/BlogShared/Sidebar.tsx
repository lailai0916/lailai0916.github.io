import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import styles from '../BlogListPage/styles.module.css';
import Link from '@docusaurus/Link';
import {
  getBlogPostCount,
  getTopTags,
  getAllTagCount,
  getAllPostMetadata,
  getArchiveByYear,
} from '@site/src/utils/blogData';

type Author = {
  name?: string;
  title?: string;
  imageURL?: string;
};

type StatsItem = {
  key: string;
  value: React.ReactNode;
  label: React.ReactNode;
  link?: string;
};

const formatStatValue = (value?: number) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return 'N/A';
  }
  if (value < 1000) {
    return value.toLocaleString();
  }
  if (value < 1000000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return `${(value / 1000000).toFixed(2)}M`;
};

function AuthorCard({ author }: { author: Author }) {
  return (
    <div className={styles.card}>
      <div className={styles.authorCardHeader}>
        <img
          src={useBaseUrl(author.imageURL)}
          alt="avatar"
          className={styles.authorAvatar}
          width={96}
          height={96}
        />
        <div className={styles.authorName}>{author.name}</div>
        <div className={styles.authorDesc}>{author.title}</div>
      </div>
    </div>
  );
}

function StatsCard({ items }: { items: StatsItem[] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <Translate id="blog.sidebar.stats.title">Statistics</Translate>
      </div>
      <div className={styles.authorStats}>
        {items.map((item) => {
          const content = (
            <>
              <div className={styles.statValue}>{item.value}</div>
              <div className={styles.statLabel}>{item.label}</div>
            </>
          );

          if (item.link) {
            return (
              <Link
                key={item.key}
                to={item.link}
                className={[styles.statItem, styles.statItemLink].join(' ')}
              >
                {content}
              </Link>
            );
          }

          return (
            <div key={item.key} className={styles.statItem}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PopularTagsCard({ tags }: { tags: readonly any[] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <Translate id="blog.sidebar.tags.titlet">Popular Tags</Translate>
      </div>
      <div className={styles.tagList}>
        {tags.map((t) => (
          <Link key={t.permalink} to={t.permalink} className={styles.tagChip}>
            <span className={styles.tagDot} />
            {t.label}
            <span className={styles.tagCount}>{t.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ArchiveCard({
  years,
}: {
  years: Array<{ year: number; count: number }>;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <Translate id="theme.blog.archive.title">Archive</Translate>
      </div>
      <ul className={styles.archiveList}>
        {years.map((y) => (
          <li key={y.year} className={styles.archiveItem}>
            <Link to={`/blog/archive#${y.year}`} className={styles.archiveLink}>
              <span className={styles.archiveYear}>{y.year}</span>
              <span className={styles.archiveCount}>{y.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const fixedId = 'lailai';
const baseurl = 'https://analytics.lailai.one';
const website_id = '69d3b7de-90e4-4be4-a355-633620ecefdb';
const ANALYTICS_BASE_URL = `${baseurl}/api/websites/${website_id}/stats?startAt=0`;
const ANALYTICS_HEADERS = {
  Authorization:
    'Bearer mXASurmA0JxF4bm+aeWM458Rk3hKZJUoYm4aSFdVUp1LzlZ96vwe2RcV6b19yqwgwmPIo3q2jvqLlBqLhNrkW+AlPZ/CgTIfAkeMrg+NWpcYD9waQRngwntf5maKEt/oBwKm9C3wd3dCm7m0BSXddT8q8vDMYSRYeJ+tcwkcbEOCtsgAHs28V+qT30mGz6yCh02gctP3RrPDeIvq3A4az1n87MlUZDiLxI8YwX8aVhSOml6WKnKtFOWgqTCXt9si79sLuw8vWT+FySCkes47gl0JlgOz/gFGZPwCGa2LKP1N0evzma5tvUtKLJsQfcBp/JZVoxDRmMUp2B1PaKoUyAn4ELxQzLpaFkVyMdA/p1AO72N2vhlNHILC4/kI',
};

export default function Sidebar() {
  const author = React.useMemo(() => {
    const metas = getAllPostMetadata();
    const source = metas.flatMap((m: any) => (m?.authors ?? []) as any[]);

    return (source as readonly any[]).find(
      (a: any) => (a?.key || a?.name) === fixedId
    ) as any;
  }, []);

  const hotTags = React.useMemo(() => getTopTags(8), []);
  const archiveYears = React.useMemo(() => getArchiveByYear(), []);
  const [analytics, setAnalytics] = React.useState<{
    visitors?: number;
    pageviews?: number;
  } | null>(null);
  const [analyticsLoaded, setAnalyticsLoaded] = React.useState(false);
  const [analyticsError, setAnalyticsError] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const controller = new AbortController();
    let didCancel = false;

    async function loadAnalytics() {
      try {
        const endAt = Date.now();
        const url = `${ANALYTICS_BASE_URL}&endAt=${endAt}&unit=month&timezone=Asia%2FShanghai&compare=false`;

        const res = await fetch(url, {
          signal: controller.signal,
          headers: {
            ...ANALYTICS_HEADERS,
            Accept: 'application/json',
          },
          credentials: 'omit',
          mode: 'cors',
        });

        if (!res.ok) {
          throw new Error(
            `Share stats request failed with status ${res.status}`
          );
        }

        const statsData = await res.json();

        const visitorsRaw =
          statsData?.visitors?.value ??
          statsData?.visitors ??
          statsData?.sessions?.value ??
          statsData?.sessions;
        const pageviewsRaw =
          statsData?.pageviews?.value ?? statsData?.pageviews;

        const visitors = Number.isFinite(Number(visitorsRaw))
          ? Number(visitorsRaw)
          : undefined;
        const pageviews = Number.isFinite(Number(pageviewsRaw))
          ? Number(pageviewsRaw)
          : undefined;

        if (!didCancel) {
          setAnalytics({ visitors, pageviews });
          setAnalyticsLoaded(true);
        }
      } catch (error) {
        if (controller.signal.aborted || didCancel) {
          return;
        }
        console.error('Failed to load analytics (external API)', error);
        setAnalyticsError(true);
        setAnalyticsLoaded(true);
      }
    }

    loadAnalytics();

    return () => {
      didCancel = true;
      controller.abort();
    };
  }, []);

  const statsItems: StatsItem[] = [
    {
      key: 'posts',
      value: getBlogPostCount(),
      label: <Translate id="blog.sidebar.stats.posts">Posts</Translate>,
      link: '/blog/archive',
    },
    {
      key: 'tags',
      value: getAllTagCount(),
      label: <Translate id="blog.sidebar.stats.tags">Tags</Translate>,
      link: '/blog/tags',
    },
    {
      key: 'views',
      value:
        analyticsLoaded && !analyticsError
          ? formatStatValue(analytics?.pageviews)
          : '...',
      label: <Translate id="blog.sidebar.stats.views">Views</Translate>,
    },
    {
      key: 'visitors',
      value:
        analyticsLoaded && !analyticsError
          ? formatStatValue(analytics?.visitors)
          : '...',
      label: <Translate id="blog.sidebar.stats.visitors">Visitors</Translate>,
    },
  ];

  return (
    <>
      <AuthorCard author={author ?? undefined} />
      <StatsCard items={statsItems} />
      <PopularTagsCard tags={hotTags} />
      <ArchiveCard years={archiveYears} />
    </>
  );
}
