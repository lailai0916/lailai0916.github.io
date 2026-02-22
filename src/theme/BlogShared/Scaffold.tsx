import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import type { TOCItem } from '@docusaurus/mdx-loader';
import { Icon } from '@iconify/react';

import { translate } from '@docusaurus/Translate';
import { getAllBlogItems, getAllPostMetadata } from '@site/src/utils/blogData';
import {
  BlogCard,
  TagChipList,
  formatLongNumber,
  useAnalytics,
  type ChipItem,
} from './Components';
import styles from './styles.module.css';

function AuthorCard() {
  const author = getAllPostMetadata()
    .flatMap((m) => m.authors)
    .find((a) => a.key === 'lailai');

  if (!author) return null;

  return (
    <BlogCard>
      <div className={styles.authorCard}>
        <img
          src={useBaseUrl(author.imageURL)}
          alt={author.name}
          width={96}
          height={96}
          className={styles.authorAvatar}
        />
        <div className={styles.authorName}>{author.name}</div>
        <div className={styles.authorDesc}>{author.title}</div>
      </div>
    </BlogCard>
  );
}

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    setProgress(scrollTop / scrollHeight);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return Math.min(1, Math.max(0, progress));
};

function TocCard({ toc }: { toc: readonly TOCItem[] }) {
  return (
    <div className={styles.tocContainer}>
      <BlogCard
        title={`${translate({
          id: 'blog.sidebar.toc.title',
          message: `Contents`,
        })} (${Math.round(ProgressBar() * 100)}%)`}
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

function InfoCard() {
  const d = new Date();
  const hhmm = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(d);
  const infoItems = [
    {
      key: 'location',
      label: translate({
        id: 'blog.sidebar.info.location',
        message: 'Location',
      }),
      value: 'Hangzhou, China',
      icon: 'lucide:map-pin',
      href: 'https://www.google.com/maps/search/?api=1&query=Hangzhou%2C%20China',
    },
    {
      key: 'time',
      label: translate({
        id: 'blog.sidebar.info.localTime',
        message: 'Local Time',
      }),
      value: `${hhmm} (UTC+08:00)`,
      icon: 'lucide:clock',
      href: 'https://time.is/UTC+8',
    },
    {
      key: 'fingerprint',
      label: translate({
        id: 'blog.sidebar.info.fingerprint',
        message: 'GPG Fingerprint',
      }),
      value: '91A7 EF5A 1391 223E',
      icon: 'lucide:key-round',
      href: 'https://github.com/lailai0916.gpg',
    },
  ];

  return (
    <BlogCard
      title={translate({
        id: 'blog.sidebar.info.title',
        message: 'Information',
      })}
    >
      <div className={styles.infoCard}>
        {infoItems.map((item) => (
          <Link key={item.key} href={item.href} className={styles.infoItem}>
            <span className={styles.infoItemIcon}>
              <Icon icon={item.icon} width="1.1em" height="1.1em" />
            </span>
            <span className={styles.infoItemText}>
              <span className={styles.infoItemLabel}>{item.label}</span>
              <span className={styles.infoItemValue}>{item.value}</span>
            </span>
            <Icon
              icon="lucide:chevron-right"
              width="0.95em"
              height="0.95em"
              className={styles.infoItemArrow}
            />
          </Link>
        ))}
      </div>
    </BlogCard>
  );
}

function StatsCard() {
  const { analytics, status } = useAnalytics();
  const readingMinutes = Math.round(
    getAllPostMetadata().reduce((sum, meta) => sum + meta.readingTime, 0)
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
              {formatLongNumber(item.value)}
            </span>
          </div>
        ))}
      </div>
    </BlogCard>
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
      label: translate({
        id: 'blog.sidebar.feed.rss',
        message: 'RSS Feed',
      }),
      href: useBaseUrl('/blog/rss.xml', { absolute: true }),
    },
    {
      label: translate({
        id: 'blog.sidebar.feed.atom',
        message: 'Atom Feed',
      }),
      href: useBaseUrl('/blog/atom.xml', { absolute: true }),
    },
    {
      label: translate({
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
        <main className={styles.main}>{children}</main>
        <aside className={styles.sidebar}>
          <AuthorCard />
          <>
            {toc?.length ? (
              <TocCard toc={toc} />
            ) : (
              <>
                <InfoCard />
                <StatsCard />
                <FeedCard />
                <TagsCard />
              </>
            )}
          </>
        </aside>
      </div>
    </Layout>
  );
}
