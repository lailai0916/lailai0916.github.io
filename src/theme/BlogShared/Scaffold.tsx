import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { DebugLayout } from '@site/src/components/laikit/page';
import type { TOCItem } from '@docusaurus/mdx-loader';

import { translate } from '@docusaurus/Translate';
import {
  getAllBlogItems,
  getAllPostMetadata,
  getArchiveByYear,
} from '@site/src/utils/blogData';
import { Card, TagChipList, type ChipItem } from './Components';
import styles from './styles.module.css';

const fixedId = 'lailai';
const shareUrl = `https://analytics.lailai.one/share/DDd09iBEYOQw2k9L`;
const WEBSITE_ID = '69d3b7de-90e4-4be4-a355-633620ecefdb';
const ANALYTICS_BASE_URL = `https://analytics.lailai.one/api/websites/${WEBSITE_ID}/stats`;
const TOKEN =
  'Bearer mXASurmA0JxF4bm+aeWM458Rk3hKZJUoYm4aSFdVUp1LzlZ96vwe2RcV6b19yqwgwmPIo3q2jvqLlBqLhNrkW+AlPZ/CgTIfAkeMrg+NWpcYD9waQRngwntf5maKEt/oBwKm9C3wd3dCm7m0BSXddT8q8vDMYSRYeJ+tcwkcbEOCtsgAHs28V+qT30mGz6yCh02gctP3RrPDeIvq3A4az1n87MlUZDiLxI8YwX8aVhSOml6WKnKtFOWgqTCXt9si79sLuw8vWT+FySCkes47gl0JlgOz/gFGZPwCGa2LKP1N0evzma5tvUtKLJsQfcBp/JZVoxDRmMUp2B1PaKoUyAn4ELxQzLpaFkVyMdA/p1AO72N2vhlNHILC4/kI';

function AuthorCard() {
  const author = getAllPostMetadata()
    .flatMap((m) => m.authors)
    .find((a) => a.key === fixedId);

  return (
    <Card>
      <div className={styles.authorCardHeader}>
        <img
          src={useBaseUrl(author.imageURL)}
          className={styles.authorAvatar}
        />
        <div className={styles.authorName}>{author.name}</div>
        <div className={styles.authorDesc}>{author.title}</div>
      </div>
    </Card>
  );
}

function TocCard({ toc }: { toc: readonly TOCItem[] }) {
  const TITLE = translate({
    id: 'blog.sidebar.toc.title',
    message: 'Contents',
  });

  return (
    <Card title={TITLE}>
      <ul>
        {toc.map((item) => (
          <li key={item.id} className={styles.tocItem}>
            <Link
              href={`#${item.id}`}
              className={styles.tocLink}
              style={{ paddingLeft: `${item.level - 2}rem` }}
              dangerouslySetInnerHTML={{ __html: item.value }}
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

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

function StatsCard() {
  const [analytics, setAnalytics] = React.useState<{
    visitors?: number;
    pageviews?: number;
  }>({});
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  React.useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setStatus('loading');
        const res = await fetch(
          `${ANALYTICS_BASE_URL}?startAt=0&endAt=${Date.now()}`,
          {
            signal: controller.signal,
            headers: { Authorization: TOKEN },
          }
        );

        if (!res.ok) throw new Error(`Stats request failed: ${res.status}`);

        const statsData = await res.json();

        setAnalytics({
          visitors: statsData?.visitors?.value,
          pageviews: statsData?.pageviews?.value,
        });
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error('Failed to load analytics (external API)', error);
        setStatus('error');
      }
    })();

    return () => controller.abort();
  }, []);

  const statsItems = [
    {
      value: getAllBlogItems().length,
      label: translate({
        id: 'blog.sidebar.stats.posts',
        message: 'Posts',
      }),
      href: '/blog/archive',
    },
    {
      value: new Set(
        getAllPostMetadata().flatMap((meta) =>
          meta.tags.map((tag) => tag.permalink)
        )
      ).size,
      label: translate({
        id: 'blog.sidebar.stats.tags',
        message: 'Tags',
      }),
      href: '/blog/tags',
    },
    {
      value:
        status === 'success' ? formatLongNumber(analytics.visitors) : 'N/A',
      label: translate({
        id: 'blog.sidebar.stats.visitors',
        message: 'Visitors',
      }),
      href: shareUrl,
    },
    {
      value:
        status === 'success' ? formatLongNumber(analytics.pageviews) : 'N/A',
      label: translate({
        id: 'blog.sidebar.stats.views',
        message: 'Views',
      }),
      href: shareUrl,
    },
  ];
  const TITLE = translate({
    id: 'blog.sidebar.stats.title',
    message: 'Statistics',
  });

  return (
    <Card title={TITLE}>
      <div className={styles.authorStats}>
        {statsItems.map((item) => (
          <Link key={item.label} to={item.href} className={styles.statItem}>
            <div className={styles.statValue}>{item.value}</div>
            <div className={styles.statLabel}>{item.label}</div>
          </Link>
        ))}
      </div>
    </Card>
  );
}

function TagsCard() {
  const map = new Map<string, ChipItem>();
  getAllPostMetadata().forEach((meta) => {
    meta.tags.forEach((tag) => {
      const prev = map.get(tag.label) ?? {
        to: tag.permalink,
        label: tag.label,
        count: 0,
      };
      prev.count += 1;
      map.set(tag.label, prev);
    });
  });
  const tags = Array.from(map.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const TITLE = translate({
    id: 'blog.sidebar.tags.title',
    message: 'Popular Tags',
  });

  return (
    <Card title={TITLE}>
      <TagChipList items={tags} />
    </Card>
  );
}

function ArchiveCard() {
  const years = React.useMemo(() => getArchiveByYear(), []);
  const TITLE = translate({
    id: 'theme.blog.archive.title',
    message: 'Archive',
  });

  return (
    <Card title={TITLE}>
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
    </Card>
  );
}

function FeedCard() {
  const feeds = [
    { label: 'RSS Feed', href: 'https://lailai.one/blog/rss.xml' },
    { label: 'Atom Feed', href: 'https://lailai.one/blog/atom.xml' },
    { label: 'JSON Feed', href: 'https://lailai.one/blog/feed.json' },
  ];
  const TITLE = translate({
    id: 'blog.sidebar.feed.title',
    message: 'Subscribe',
  });

  return (
    <Card title={TITLE}>
      <div className={styles.feedButtonGroup}>
        {feeds.map((feed) => (
          <Link
            key={feed.href}
            href={feed.href}
            className={clsx(styles.tagChip, styles.postInlineTag)}
          >
            {feed.label}
          </Link>
        ))}
      </div>
    </Card>
  );
}

function MenuCard() {
  const page = [
    { label: 'Blog', href: '/blog' },
    { label: 'Archive', href: '/blog/archive' },
    { label: 'Authors', href: '/blog/authors' },
    { label: 'Tags', href: '/blog/tags' },
  ];

  return (
    <Card>
      <div className={styles.feedButtonGroup}>
        {page.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={clsx(styles.tagChip, styles.postInlineTag)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </Card>
  );
}

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  toc?: readonly TOCItem[];
};

export default function BlogScaffold({
  title,
  description,
  children,
  toc,
}: Props) {
  return (
    <DebugLayout title={title} description={description}>
      <div className={styles.container}>
        <aside className={styles.mainCol}>
          <AuthorCard />
          {toc && toc.length > 0 ? (
            <TocCard toc={toc} />
          ) : (
            <>
              <StatsCard />
              <FeedCard />
              <TagsCard />
              <ArchiveCard />
            </>
          )}
        </aside>
        <main className={styles.mainCol}>
          <MenuCard />
          {children}
        </main>
      </div>
    </DebugLayout>
  );
}
