import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import type { TOCItem } from '@docusaurus/mdx-loader';
import { Icon } from '@iconify/react';

import { translate } from '@docusaurus/Translate';
import { getAllBlogItems, getAllPostMetadata } from '@site/src/utils/blogData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { formatCompact } from '@site/src/utils/format';
import {
  BlogCard,
  BlogMenu,
  TagChipList,
  useAnalytics,
  type ChipItem,
} from './Components';
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return Math.min(1, Math.max(0, progress));
}

function TocCard({ toc }: { toc: readonly TOCItem[] }) {
  const progress = useScrollProgress();

  return (
    <div className={styles.tocContainer}>
      <BlogCard
        title={`${translate({
          id: 'blog.sidebar.toc.title',
          message: `Contents`,
        })} (${Math.round(progress * 100)}%)`}
      >
        <ul className={styles.tocList}>
          {toc.map((item) => (
            <li key={item.id}>
              <Link
                to={`#${item.id}`}
                className={styles.tocLink}
                style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}
                dangerouslySetInnerHTML={{ __html: item.value }}
              />
            </li>
          ))}
        </ul>
      </BlogCard>
    </div>
  );
}

function StatsCard() {
  const { i18n } = useDocusaurusContext();
  const { analytics, status } = useAnalytics();
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
    {
      label: translate({
        id: 'blog.sidebar.stats.visitors',
        message: 'Visitors',
      }),
      icon: 'lucide:users',
      value: status === 'success' ? (analytics.visitors ?? '–') : '–',
    },
    {
      label: translate({
        id: 'blog.sidebar.stats.views',
        message: 'Views',
      }),
      icon: 'lucide:eye',
      value: status === 'success' ? (analytics.pageviews ?? '–') : '–',
    },
  ];

  return (
    <BlogCard
      title={translate({
        id: 'blog.sidebar.stats.title',
        message: 'Statistics',
      })}
    >
      <div className={styles.statsGrid}>
        {statsItems.map((item) => (
          <div key={item.label} className={styles.statTile}>
            <div className={styles.statHead}>
              <span className={styles.statIcon}>
                <Icon icon={item.icon} width="1em" height="1em" />
              </span>
              <span className={styles.statLabel}>{item.label}</span>
            </div>
            <span className={styles.statValue}>
              {typeof item.value === 'number'
                ? formatCompact(item.value, i18n.currentLocale)
                : item.value}
            </span>
          </div>
        ))}
      </div>
    </BlogCard>
  );
}

function TagsCard() {
  const map = new Map<string, PopularTagItem>();
  getAllPostMetadata().forEach((meta) => {
    meta.tags.forEach((tag) => {
      if (!tag.label || !tag.permalink) {
        return;
      }

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

function FeedCard() {
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
    <BlogCard
      title={translate({
        id: 'blog.sidebar.feed.title',
        message: 'Subscribe',
      })}
    >
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
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <main className={styles.main}>
          <BlogMenu />
          {children}
        </main>
        <aside className={styles.sidebar}>
          <AuthorCard />
          <>
            {toc?.length ? (
              <TocCard toc={toc} />
            ) : (
              <>
                <CalendarCard />
                <StatsCard />
                <TagsCard />
                <FeedCard />
              </>
            )}
          </>
        </aside>
      </div>
    </Layout>
  );
}
