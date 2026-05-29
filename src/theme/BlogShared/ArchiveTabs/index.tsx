import React, { useMemo, useState } from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import Segmented from '@site/src/components/laikit/Segmented';
import Badge from '@site/src/components/laikit/Badge';
import { formatBeijingDate } from '@site/src/utils/format';
import TitleCard from '@site/src/components/laikit/TitleCard';
import { TagChipList } from '../BlogUI';
import BlogScaffold from '../Scaffold';
import { BlogArchiveList } from '../ArchiveList';
import styles from './styles.module.css';

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

/**
 * Link-based segmented bar shared by archive list pages and tag/author
 * detail pages. Each tab navigates to its canonical landing URL; the active
 * state is driven by `activeTab` (derived from the current page's context).
 */
export function ArchiveTabsNav({ activeTab }: { activeTab: ArchiveTab }) {
  const yearHref = useBaseUrl('/blog/archive');
  const tagsHref = useBaseUrl('/blog/tags');
  const authorsHref = useBaseUrl('/blog/authors');

  return (
    <Segmented<ArchiveTab>
      value={activeTab}
      orientation="horizontal"
      items={[
        { value: 'year', label: TAB_LABEL_YEAR, href: yearHref },
        { value: 'tags', label: TAB_LABEL_TAGS, href: tagsHref },
        { value: 'authors', label: TAB_LABEL_AUTHORS, href: authorsHref },
      ]}
    />
  );
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
        <TitleCard
          padding="1rem"
          title={`${YEAR_SELECT_TITLE} (${years.length})`}
        >
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
        </TitleCard>
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
    <TitleCard padding="1rem" title={`${TAGS_TITLE} (${sorted.length})`}>
      <TagChipList
        items={sorted.map((t) => ({
          to: t.permalink,
          label: t.label,
          count: t.count,
        }))}
      />
    </TitleCard>
  );
}

function AuthorsView({ authors }: { authors: readonly ArchiveAuthorItem[] }) {
  return (
    <TitleCard padding="1rem" title={`${AUTHORS_TITLE} (${authors.length})`}>
      <TagChipList
        items={authors.map((a) => ({
          to: a.permalink,
          label: a.label,
          count: a.count,
        }))}
      />
    </TitleCard>
  );
}

interface ArchiveTabsProps {
  activeTab: ArchiveTab;
  posts: readonly PostLike[];
  tags: readonly ArchiveTagItem[];
  authors: readonly ArchiveAuthorItem[];
}

export default function ArchiveTabs({
  activeTab,
  posts,
  tags,
  authors,
}: ArchiveTabsProps) {
  const canonical = useBaseUrl('/blog/archive');

  return (
    <BlogScaffold title={PAGE_TITLE} description={PAGE_DESCRIPTION}>
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>
      <ArchiveTabsNav activeTab={activeTab} />
      {activeTab === 'year' && <YearView posts={posts} />}
      {activeTab === 'tags' && <TagsView tags={tags} />}
      {activeTab === 'authors' && <AuthorsView authors={authors} />}
    </BlogScaffold>
  );
}
