import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  getBlogPostCount,
  getTopTags,
  getAllTagCount,
  getAllPostMetadata,
  getArchiveByYear,
} from '@site/src/utils/blogData';
import TagChipList from './TagChipList';
import styles from '../BlogListPage/styles.module.css';

type Author = {
  name?: string;
  title?: string;
  imageURL?: string;
};

type StatsItem = {
  value: number | string;
  label: string;
  href: string;
};

function formatLongNumber(value: number) {
  const n = Number(value);

  if (n >= 1000000000) {
    return `${(n / 1000000).toFixed(1)}b`;
  }
  if (n >= 1000000) {
    return `${(n / 1000000).toFixed(1)}m`;
  }
  if (n >= 100000) {
    return `${(n / 1000).toFixed(0)}k`;
  }
  if (n >= 10000) {
    return `${(n / 1000).toFixed(1)}k`;
  }
  if (n >= 1000) {
    return `${(n / 1000).toFixed(2)}k`;
  }

  return String(n);
}

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
          return (
            <Link key={item.label} to={item.href} className={styles.statItem}>
              <div className={styles.statValue}>{item.value}</div>
              <div className={styles.statLabel}>{item.label}</div>
            </Link>
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
        <Translate id="blog.sidebar.tags.title">Popular Tags</Translate>
      </div>
      <TagChipList
        items={tags.map((t) => ({
          to: t.permalink,
          label: t.label,
          count: t.count,
        }))}
      />
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
const shareurl = `${baseurl}/share/DDd09iBEYOQw2k9L`;
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
      value: getBlogPostCount(),
      label: translate({
        id: 'blog.sidebar.stats.posts',
        message: 'Posts',
      }),
      href: '/blog/archive',
    },
    {
      value: getAllTagCount(),
      label: translate({
        id: 'blog.sidebar.stats.tags',
        message: 'Tags',
      }),
      href: '/blog/tags',
    },
    {
      value:
        analyticsLoaded && !analyticsError
          ? formatLongNumber(analytics?.pageviews)
          : 'N/A',
      label: translate({
        id: 'blog.sidebar.stats.views',
        message: 'Views',
      }),
      href: shareurl,
    },
    {
      value:
        analyticsLoaded && !analyticsError
          ? formatLongNumber(analytics?.visitors)
          : 'N/A',
      label: translate({
        id: 'blog.sidebar.stats.visitors',
        message: 'Visitors',
      }),
      href: shareurl,
    },
  ];

  return (
    <>
      <AuthorCard author={author} />
      <StatsCard items={statsItems} />
      <PopularTagsCard tags={hotTags} />
      <ArchiveCard years={archiveYears} />
    </>
  );
}
