import React, { useEffect, useMemo, useState } from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import Segmented from '@site/src/components/laikit/Segmented';
import Badge from '@site/src/components/laikit/Badge';
import { formatBeijingDate } from '@site/src/utils/format';
import { BlogCard, TagChipList } from './Components';
import BlogScaffold from './Scaffold';
import { BlogArchiveList } from './ArchiveList';
import styles from './ArchiveTabs.module.css';

export type ArchiveTab = 'year' | 'tags' | 'authors';

type PostLike = {
  metadata: {
    date: string;
    permalink: string;
    title: string;
    tags?: ReadonlyArray<{ label: string; permalink: string }>;
  };
};

export type ArchiveTagItem = {
  label: string;
  permalink: string;
  count: number;
};
export type ArchiveAuthorItem = {
  label: string;
  permalink: string;
  count: number;
};

const TABS: ArchiveTab[] = ['year', 'tags', 'authors'];

const PAGE_TITLE = translate({
  id: 'blog.pages.archive.title',
  message: 'Archive',
});
const PAGE_DESCRIPTION = "Archive of lailai's blog";
const YEAR_SELECT_TITLE = translate({
  id: 'blog.pages.archive.yearSelect',
  message: 'Years',
});
const TAGS_TITLE = translate({ id: 'blog.pages.tags.title', message: 'Tags' });
const AUTHORS_TITLE = translate({
  id: 'blog.pages.authors.title',
  message: 'Authors',
});

const TAB_LABEL_YEAR = translate({
  id: 'blog.archive.tab.year',
  message: 'By Year',
});
const TAB_LABEL_TAGS = translate({
  id: 'blog.archive.tab.tags',
  message: 'By Tag',
});
const TAB_LABEL_AUTHORS = translate({
  id: 'blog.archive.tab.authors',
  message: 'By Author',
});

function getPostYear(post: PostLike): number {
  return Number(formatBeijingDate(post.metadata.date).slice(0, 4));
}

function parseHash(hash: string): ArchiveTab | null {
  const v = hash.replace(/^#/, '') as ArchiveTab;
  return (TABS as string[]).includes(v) ? v : null;
}

function useHashTab(
  initial: ArchiveTab
): [ArchiveTab, (t: ArchiveTab) => void] {
  const [tab, setTab] = useState<ArchiveTab>(initial);

  // Sync from initial hash on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fromHash = parseHash(window.location.hash);
    if (fromHash && fromHash !== tab) setTab(fromHash);
    const onHashChange = () => {
      const next = parseHash(window.location.hash);
      if (next) setTab(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (next: ArchiveTab) => {
    setTab(next);
    if (typeof window !== 'undefined') {
      const url = `${window.location.pathname}${window.location.search}#${next}`;
      window.history.replaceState(null, '', url);
    }
  };

  return [tab, update];
}

function YearView({ posts }: { posts: readonly PostLike[] }) {
  const years = useMemo(() => {
    const map = new Map<number, number>();
    posts.forEach((p) => {
      const y = getPostYear(p);
      map.set(y, (map.get(y) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([year, count]) => ({ year, count }));
  }, [posts]);

  const [activeYear, setActiveYear] = useState<number | null>(null);

  const filteredPosts = useMemo(
    () =>
      activeYear === null
        ? posts
        : posts.filter((p) => getPostYear(p) === activeYear),
    [posts, activeYear]
  );

  return (
    <>
      {years.length > 0 && (
        <BlogCard title={`${YEAR_SELECT_TITLE} (${years.length})`}>
          <div className={styles.yearList}>
            {years.map(({ year, count }) => {
              const isActive = year === activeYear;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => setActiveYear(isActive ? null : year)}
                  className={styles.yearChipButton}
                >
                  <Badge active={isActive} hoverable={!isActive} count={count}>
                    {year}
                  </Badge>
                </button>
              );
            })}
          </div>
        </BlogCard>
      )}
      <BlogArchiveList posts={filteredPosts} />
    </>
  );
}

function TagsView({ tags }: { tags: readonly ArchiveTagItem[] }) {
  const sorted = useMemo(
    () => [...tags].sort((a, b) => b.count - a.count),
    [tags]
  );
  return (
    <BlogCard title={`${TAGS_TITLE} (${sorted.length})`}>
      <TagChipList
        items={sorted.map((t) => ({
          to: t.permalink,
          label: t.label,
          count: t.count,
        }))}
      />
    </BlogCard>
  );
}

function AuthorsView({ authors }: { authors: readonly ArchiveAuthorItem[] }) {
  return (
    <BlogCard title={`${AUTHORS_TITLE} (${authors.length})`}>
      <TagChipList
        items={authors.map((a) => ({
          to: a.permalink,
          label: a.label,
          count: a.count,
        }))}
      />
    </BlogCard>
  );
}

interface ArchiveTabsProps {
  initialTab: ArchiveTab;
  posts: readonly PostLike[];
  tags: readonly ArchiveTagItem[];
  authors: readonly ArchiveAuthorItem[];
}

export default function ArchiveTabs({
  initialTab,
  posts,
  tags,
  authors,
}: ArchiveTabsProps) {
  const [tab, setTab] = useHashTab(initialTab);
  const canonical = useBaseUrl('/blog/archive');

  return (
    <BlogScaffold title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>
      <Segmented<ArchiveTab>
        value={tab}
        onChange={setTab}
        orientation="horizontal"
        items={[
          { value: 'year', label: TAB_LABEL_YEAR },
          { value: 'tags', label: TAB_LABEL_TAGS },
          { value: 'authors', label: TAB_LABEL_AUTHORS },
        ]}
      />
      {tab === 'year' && <YearView posts={posts} />}
      {tab === 'tags' && <TagsView tags={tags} />}
      {tab === 'authors' && <AuthorsView authors={authors} />}
    </BlogScaffold>
  );
}
