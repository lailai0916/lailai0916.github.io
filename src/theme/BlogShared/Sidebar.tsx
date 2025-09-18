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
        const shareUrl = new URL(
          'https://analytics.lailai.one/api/share/DDd09iBEYOQw2k9L'
        );
        shareUrl.searchParams.set('type', 'stats');
        shareUrl.searchParams.set('startAt', '0');
        shareUrl.searchParams.set('endAt', String(endAt));

        const res = await fetch(shareUrl.toString(), {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
          credentials: 'omit',
          mode: 'cors',
        });

        if (!res.ok) {
          throw new Error(`Share stats request failed with status ${res.status}`);
        }

        const data = await res.json();

        const visitorsRaw =
          data?.visitors?.value ?? data?.visitors ?? data?.sessions?.value ?? data?.sessions;
        const pageviewsRaw = data?.pageviews?.value ?? data?.pageviews;

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
        console.error('Failed to load analytics (share API)', error);
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
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value.toLocaleString();
    }
    return '--';
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

      {(analyticsLoaded || !analyticsError) && (
        <div className={styles.card}>
          <div className={styles.cardTitle}>
            <Translate id="blog.analytics.title">Traffic Overview</Translate>
          </div>
          <div className={styles.authorStats}>
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
            <div className={styles.statItem}>
              <div className={styles.statValue}>
                {analyticsLoaded && !analyticsError
                  ? formatStatValue(analytics?.pageviews)
                  : '...'}
              </div>
              <div className={styles.statLabel}>
                <Translate id="blog.analytics.pageviews">Pageviews</Translate>
              </div>
            </div>
          </div>
        </div>
      )}

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
