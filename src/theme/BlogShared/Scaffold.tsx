import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import type { TOCItem } from '@docusaurus/mdx-loader';

import { translate } from '@docusaurus/Translate';
import { getAllBlogItems, getAllPostMetadata } from '@site/src/utils/blogData';
import {
  Card,
  TagChipList,
  formatLongNumber,
  useAnalytics,
  type ChipItem,
} from './Components';
import styles from './styles.module.css';
import IconText from '@site/src/components/laikit/widget/IconText';

function AuthorCard() {
  const author = getAllPostMetadata()
    .flatMap((m) => m.authors)
    .find((a) => a.key === 'lailai');

  if (!author) return null;

  return (
    <Card>
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
    </Card>
  );
}

function TocCard({ toc }: { toc: readonly TOCItem[] }) {
  return (
    <div className={styles.tocContainer}>
      <Card
        title={translate({
          id: 'blog.sidebar.toc.title',
          message: 'Contents',
        })}
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
      </Card>
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
      label: 'Hangzhou, China',
      icon: 'lucide:map-pin',
      href: 'https://www.google.com/maps/search/?api=1&query=Hangzhou%2C%20China',
    },
    {
      label: `${hhmm} (UTC+08:00)`,
      icon: 'lucide:clock',
      href: 'https://time.is/UTC+8',
    },
    {
      label: '91A7 EF5A 1391 223E',
      icon: 'lucide:key-round',
      href: 'https://github.com/lailai0916.gpg',
    },
  ];

  return (
    <Card
      title={translate({
        id: 'blog.sidebar.info.title',
        message: 'Information',
      })}
    >
      <div className={styles.infoStats}>
        {infoItems.map((item) => (
          <Link key={item.label} href={item.href} style={{ color: 'inherit' }}>
            <IconText icon={item.icon}>{item.label}</IconText>
          </Link>
        ))}
      </div>
    </Card>
  );
}

function StatsCard() {
  const { analytics, status } = useAnalytics();
  const readintTime = getAllPostMetadata().reduce(
    (sum, meta) => sum + meta.readingTime,
    0
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
        id: 'blog.sidebar.stats.tags',
        message: 'Tags',
      }),
      icon: 'lucide:tag',
      value: new Set(
        getAllPostMetadata().flatMap((meta) =>
          meta.tags.map((tag) => tag.permalink)
        )
      ).size,
    },
    {
      label: translate({
        id: 'blog.sidebar.stats.words',
        message: 'Words',
      }),
      icon: 'lucide:file-text',
      value: readintTime * 200,
    },
    {
      label: translate({
        id: 'blog.sidebar.stats.minutes',
        message: 'Minutes',
      }),
      icon: 'lucide:timer',
      value: readintTime,
    },
    {
      label: translate({
        id: 'blog.sidebar.stats.visitors',
        message: 'Visitors',
      }),
      icon: 'lucide:users',
      value: status === 'success' ? analytics.visitors : '–',
    },
    {
      label: translate({
        id: 'blog.sidebar.stats.views',
        message: 'Views',
      }),
      icon: 'lucide:eye',
      value: status === 'success' ? analytics.pageviews : '–',
    },
  ];

  return (
    <Card
      title={translate({
        id: 'blog.sidebar.stats.title',
        message: 'Statistics',
      })}
    >
      <div className={styles.authorStats}>
        {statsItems.map((item) => (
          <div key={item.label} className={styles.statItem}>
            <IconText icon={item.icon}>{item.label}</IconText>
            <span className={styles.statValue}>
              {formatLongNumber(item.value)}
            </span>
          </div>
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

  return (
    <Card
      title={translate({
        id: 'blog.sidebar.tags.title',
        message: 'Popular Tags',
      })}
    >
      <TagChipList items={tags} />
    </Card>
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
    <Card
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
