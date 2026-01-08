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
  getTotalReadingTime,
} from '@site/src/utils/blogData';
import {
  Card,
  TagChipList,
  formatLongNumber,
  useAnalytics,
  type ChipItem,
} from './Components';
import styles from './styles.module.css';

const authorId = 'lailai';
const shareUrl = `https://analytics.lailai.one/share/DDd09iBEYOQw2k9L`;

function AuthorCard() {
  const author = getAllPostMetadata()
    .flatMap((m) => m.authors)
    .find((a) => a.key === authorId);

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

function StatsCard() {
  const { analytics, status } = useAnalytics();
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
      value: getTotalReadingTime() * 200,
      label: translate({
        id: 'blog.sidebar.stats.words',
        message: 'Words',
      }),
      href: shareUrl,
    },
    {
      value: getTotalReadingTime(),
      label: translate({
        id: 'blog.sidebar.stats.minutes',
        message: 'Minutes',
      }),
      href: shareUrl,
    },
    {
      value: status === 'success' ? analytics.visitors : '–',
      label: translate({
        id: 'blog.sidebar.stats.visitors',
        message: 'Visitors',
      }),
      href: shareUrl,
    },
    {
      value: status === 'success' ? analytics.pageviews : '–',
      label: translate({
        id: 'blog.sidebar.stats.views',
        message: 'Views',
      }),
      href: shareUrl,
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
          <Link key={item.label} href={item.href} className={styles.statItem}>
            <div className={styles.statValue}>
              {formatLongNumber(item.value)}
            </div>
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

function Sidebar({ toc }: { toc?: readonly TOCItem[] }) {
  return (
    <aside className={styles.sidebar}>
      <AuthorCard />
      {toc?.length ? (
        <TocCard toc={toc} />
      ) : (
        <>
          <StatsCard />
          <FeedCard />
          <TagsCard />
        </>
      )}
    </aside>
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
        <main className={styles.main}>{children}</main>
        <Sidebar toc={toc} />
      </div>
    </DebugLayout>
  );
}
