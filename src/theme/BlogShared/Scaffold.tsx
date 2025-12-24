import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { DebugLayout } from '@site/src/components/laikit/page';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { TOCItem } from '@docusaurus/mdx-loader';

import { translate } from '@docusaurus/Translate';
import { getAllBlogItems, getAllPostMetadata } from '@site/src/utils/blogData';
import { Card, TagChipList, useAnalytics, type ChipItem } from './Components';
import styles from './styles.module.css';

const authorId = 'lailai';
const shareUrl = `https://analytics.lailai.one/share/DDd09iBEYOQw2k9L`;

function AuthorCard() {
  const author = getAllPostMetadata()
    .flatMap((m) => m.authors)
    .find((a) => a.key === authorId);

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
  const TITLE = translate({
    id: 'blog.sidebar.toc.title',
    message: 'Contents',
  });

  return (
    <div className={styles.tocContainer}>
      <Card title={TITLE}>
        <ul className={styles.tocList}>
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
    </div>
  );
}

function formatLongNumber(value) {
  const { i18n } = useDocusaurusContext();
  const n = Number(value);
  if (Number.isNaN(n)) return value;
  return new Intl.NumberFormat(i18n.currentLocale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumSignificantDigits: 3,
  }).format(n);
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
  const TITLE = translate({
    id: 'blog.sidebar.stats.title',
    message: 'Statistics',
  });

  return (
    <Card title={TITLE}>
      <div className={styles.authorStats}>
        {statsItems.map((item) => (
          <Link key={item.label} to={item.href} className={styles.statItem}>
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
      <ul className={styles.menuList}>
        {page.map((item) => (
          <li key={item.href} className={styles.menuListItem}>
            <Link to={item.href} className={styles.menuLink}>
              <span className={styles.menuLinkLabel}>{item.label}</span>→
            </Link>
          </li>
        ))}
      </ul>
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
        <main className={styles.main}>
          <MenuCard />
          {children}
        </main>
        <Sidebar toc={toc} />
      </div>
    </DebugLayout>
  );
}
