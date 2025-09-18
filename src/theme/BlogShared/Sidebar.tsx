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

const baseurl = 'https://analytics.lailai.one';
const website_id = '69d3b7de-90e4-4be4-a355-633620ecefdb';
const ANALYTICS_BASE_URL = `${baseurl}/api/websites/${website_id}/stats?startAt=0`;

const ANALYTICS_HEADERS = {
  Authorization:
    'Bearer mXASurmA0JxF4bm+aeWM458Rk3hKZJUoYm4aSFdVUp1LzlZ96vwe2RcV6b19yqwgwmPIo3q2jvqLlBqLhNrkW+AlPZ/CgTIfAkeMrg+NWpcYD9waQRngwntf5maKEt/oBwKm9C3wd3dCm7m0BSXddT8q8vDMYSRYeJ+tcwkcbEOCtsgAHs28V+qT30mGz6yCh02gctP3RrPDeIvq3A4az1n87MlUZDiLxI8YwX8aVhSOml6WKnKtFOWgqTCXt9si79sLuw8vWT+FySCkes47gl0JlgOz/gFGZPwCGa2LKP1N0evzma5tvUtKLJsQfcBp/JZVoxDRmMUp2B1PaKoUyAn4ELxQzLpaFkVyMdA/p1AO72N2vhlNHILC4/kI',
};

export default function Sidebar() {
  // 组件内部汇总全站作者并固定选择 'lailai'
  const author = React.useMemo(() => {
    try {
      const fixedId = 'lailai';
      // 组件内自取作者集合：读取全量博文元数据（包含 authors）并聚合
      const metas = getAllPostMetadata();
      const source = metas.flatMap((m: any) => (m?.authors ?? []) as any[]);

      return (source as readonly any[]).find(
        (a: any) => (a?.key || a?.name) === fixedId
      ) as any;
    } catch {
      return null;
    }
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

  const formatStatValue = React.useCallback((value?: number) => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return '--';
    }
    if (value < 1000) {
      return value.toLocaleString();
    }
    if (value < 1_000_000) {
      return `${(value / 1000).toFixed(2)}k`;
    }
    return `${(value / 1_000_000).toFixed(2)}M`;
  }, []);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.authorCardHeader}>
          {author?.imageURL && (
            <img
              src={useBaseUrl(author.imageURL)}
              alt="avatar"
              className={styles.authorAvatar}
              width={96}
              height={96}
            />
          )}
          <div className={styles.authorName}>{author?.name}</div>
          {author?.title ? (
            <div className={styles.authorDesc}>{author.title}</div>
          ) : null}
        </div>
        {/* 个人信息卡片已不再包含统计 */}
      </div>

      {/* 合并文章数量 + 标签数量为一个统计块 */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Translate id="blog.stats.overview">Statistics</Translate>
        </div>
        <div className={styles.authorStats}>
          <Link
            to="/blog/archive"
            className={[styles.statItem, styles.statItemLink].join(' ')}
          >
            <div className={styles.statValue}>{getBlogPostCount()}</div>
            <div className={styles.statLabel}>
              <Translate id="blog.stats.posts">Posts</Translate>
            </div>
          </Link>
          <Link
            to="/blog/tags"
            className={[styles.statItem, styles.statItemLink].join(' ')}
          >
            <div className={styles.statValue}>{getAllTagCount()}</div>
            <div className={styles.statLabel}>
              <Translate id="blog.stats.tags">Tags</Translate>
            </div>
          </Link>
          <div className={styles.statItem}>
            <div className={styles.statValue}>
              {analyticsLoaded && !analyticsError
                ? formatStatValue(analytics?.pageviews)
                : '...'}
            </div>
            <div className={styles.statLabel}>
              <Translate id="blog.analytics.pageviews">Views</Translate>
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>
              {analyticsLoaded && !analyticsError
                ? formatStatValue(analytics?.visitors)
                : '...'}
            </div>
            <div className={styles.statLabel}>
              <Translate id="blog.analytics.visitors">Visitors</Translate>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Translate id="blog.tags.hot">Popular Tags</Translate>
        </div>
        <div className={styles.tagList}>
          {hotTags.map((t) => (
            <Link key={t.permalink} to={t.permalink} className={styles.tagChip}>
              <span className={styles.tagDot} />
              {t.label}
              <span className={styles.tagCount}>{t.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Translate id="theme.blog.archive.title">Archive</Translate>
        </div>
        <ul className={styles.archiveList}>
          {archiveYears.map((y) => (
            <li key={y.year} className={styles.archiveItem}>
              <Link
                to={`/blog/archive#${y.year}`}
                className={styles.archiveLink}
              >
                <span className={styles.archiveYear}>{y.year}</span>
                <span className={styles.archiveCount}>{y.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
