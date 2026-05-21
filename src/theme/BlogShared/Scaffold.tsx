import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import type { TOCItem } from '@docusaurus/mdx-loader';
import { Icon } from '@iconify/react';

import { translate } from '@docusaurus/Translate';
import {
  getAllBlogItems,
  getAllPostMetadata,
  loadOfficialTags,
} from '@site/src/utils/blogData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { formatCompact } from '@site/src/utils/format';
import { BlogCard, BlogMenu, TagChipList, type ChipItem } from './Components';
import CalendarCard from './Calendar';
import styles from './styles.module.css';

type PopularTagItem = ChipItem & {
  count: number;
};

function AuthorCard() {
  const author = getAllPostMetadata()
    .flatMap((m) => m.authors ?? [])
    .find((a) => a.key === 'lailai');
  const authorImageUrl = useBaseUrl(author?.imageURL);

  if (!author) return null;

  return (
    <BlogCard>
      <div className={styles.authorCard}>
        <img
          src={authorImageUrl}
          alt={author.name}
          width={96}
          height={96}
          className={styles.authorAvatar}
        />
        <div className={styles.authorName}>{author.name}</div>
        <span className={styles.authorAccent} aria-hidden="true" />
        <div className={styles.authorDesc}>{author.title}</div>
      </div>
    </BlogCard>
  );
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return Math.min(1, Math.max(0, progress));
}

function useActiveHeading(toc: readonly TOCItem[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!toc.length) return undefined;
    const ids = toc.map((item) => item.id);

    const updateActive = () => {
      const offset = window.innerHeight * 0.25;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        } else {
          break;
        }
      }
      setActiveId(current ?? ids[0] ?? null);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [toc]);

  return activeId;
}

function TocProgress({ progress }: { progress: number }) {
  const pct = Math.round(progress * 100);
  return (
    <div
      className={styles.tocProgress}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={translate(
        {
          id: 'blog.sidebar.toc.progress',
          message: 'Reading progress: {percent}%',
        },
        { percent: String(pct) }
      )}
    >
      <div
        className={styles.tocProgressFill}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

function TocCard({
  toc,
  progress,
}: {
  toc: readonly TOCItem[];
  progress: number;
}) {
  const activeId = useActiveHeading(toc);

  return (
    <div className={styles.tocContainer}>
      <BlogCard>
        <div className={styles.tocHeader}>
          <span className={styles.tocHeaderTitle}>
            {translate({
              id: 'blog.sidebar.toc.title',
              message: 'Contents',
            })}
          </span>
          <span className={styles.tocHeaderPercent}>
            {Math.round(progress * 100)}%
          </span>
        </div>
        <TocProgress progress={progress} />
        {toc.length > 0 && (
          <ul className={styles.tocList}>
            {toc.map((item) => {
              const isActive = item.id === activeId;
              const level = Math.min(Math.max(item.level, 2), 6);
              return (
                <li
                  key={item.id}
                  className={clsx(
                    styles.tocItem,
                    styles[`tocItemL${level}`],
                    isActive && styles.tocItemActive
                  )}
                >
                  <Link
                    to={`#${item.id}`}
                    className={styles.tocLink}
                    aria-current={isActive ? 'true' : undefined}
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </BlogCard>
    </div>
  );
}

function StatsCard() {
  const { i18n } = useDocusaurusContext();
  const readingMinutes = Math.round(
    getAllPostMetadata().reduce((sum, meta) => sum + (meta.readingTime ?? 0), 0)
  );
  const statsItems = [
    {
      label: translate({
        id: 'blog.sidebar.stats.posts',
        message: 'Posts',
      }),
      icon: 'lucide:newspaper',
      value: getAllBlogItems().length,
    },
    {
      label: translate({
        id: 'blog.sidebar.stats.words',
        message: 'Words',
      }),
      icon: 'lucide:file-text',
      value: readingMinutes * 200,
    },
  ];
  const feeds = [
    {
      name: 'RSS',
      icon: 'lucide:rss',
      ariaLabel: translate({
        id: 'blog.sidebar.feed.rss',
        message: 'RSS Feed',
      }),
      href: useBaseUrl('/blog/rss.xml', { absolute: true }),
    },
    {
      name: 'Atom',
      icon: 'lucide:atom',
      ariaLabel: translate({
        id: 'blog.sidebar.feed.atom',
        message: 'Atom Feed',
      }),
      href: useBaseUrl('/blog/atom.xml', { absolute: true }),
    },
    {
      name: 'JSON',
      icon: 'lucide:braces',
      ariaLabel: translate({
        id: 'blog.sidebar.feed.json',
        message: 'JSON Feed',
      }),
      href: useBaseUrl('/blog/feed.json', { absolute: true }),
    },
  ];

  return (
    <BlogCard>
      <div className={styles.statsGrid}>
        {statsItems.map((item) => (
          <div key={item.label} className={styles.statTile}>
            <div className={styles.statHead}>
              <Icon
                icon={item.icon}
                width="1em"
                height="1em"
                className={styles.statIcon}
              />
              <span className={styles.statLabel}>{item.label}</span>
            </div>
            <span className={styles.statValue}>
              {formatCompact(item.value, i18n.currentLocale)}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.feedGrid}>
        {feeds.map((feed) => (
          <Link
            key={feed.href}
            href={feed.href}
            aria-label={feed.ariaLabel}
            className={styles.feedTile}
          >
            <Icon
              icon={feed.icon}
              width="1.2em"
              height="1.2em"
              className={styles.feedTileIcon}
            />
            <span className={styles.feedTileLabel}>{feed.name}</span>
          </Link>
        ))}
      </div>
    </BlogCard>
  );
}

function TagsCard() {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, defaultLocale } = i18n;
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;
  const tags = React.useMemo(
    () =>
      [...loadOfficialTags(localeKey)]
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)
        .map(
          (tag): PopularTagItem => ({
            to: tag.permalink,
            label: tag.label,
            count: tag.count,
          })
        ),
    [localeKey]
  );

  return (
    <BlogCard
      title={translate({
        id: 'blog.sidebar.tags.title',
        message: 'Popular Tags',
      })}
    >
      <TagChipList items={tags} />
    </BlogCard>
  );
}

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  toc?: readonly TOCItem[];
};

function ScaffoldWithProgress({ title, description, children, toc }: Props) {
  const isPostPage = toc !== undefined;
  const progress = useScrollProgress();
  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <main className={styles.main}>
          <BlogMenu />
          {children}
        </main>
        <aside className={styles.sidebar}>
          <AuthorCard />
          {isPostPage ? (
            <TocCard toc={toc} progress={progress} />
          ) : (
            <>
              <CalendarCard />
              <StatsCard />
              <TagsCard />
            </>
          )}
        </aside>
      </div>
    </Layout>
  );
}

export default function BlogScaffold(props: Props) {
  return <ScaffoldWithProgress {...props} />;
}
