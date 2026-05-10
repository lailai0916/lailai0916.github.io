import React, { useMemo, useState } from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogArchivePageOriginal from '@theme-original/BlogArchivePage';
import { translate } from '@docusaurus/Translate';
import Badge from '@site/src/components/laikit/Badge';
import { BlogArchiveList } from '../BlogShared/ArchiveList';
import { BlogCard } from '../BlogShared/Components';
import BlogScaffold from '../BlogShared/Scaffold';
import { formatBeijingDate } from '@site/src/utils/format';
import type { Props } from '@theme/BlogArchivePage';
import styles from './styles.module.css';

const TITLE = translate({ id: 'blog.pages.archive.title', message: 'Archive' });
const DESCRIPTION = "Archive of lailai's blog";
const YEAR_SELECT_TITLE = translate({
  id: 'blog.pages.archive.yearSelect',
  message: 'Years',
});

type PostLike = {
  metadata: {
    date: string;
    permalink: string;
    title: string;
  };
};

function getPostYear(post: PostLike): number {
  return Number(formatBeijingDate(post.metadata.date).slice(0, 4));
}

function YearSelector({
  years,
  activeYear,
  onYearChange,
}: {
  years: { year: number; count: number }[];
  activeYear: number | null;
  onYearChange: (year: number | null) => void;
}) {
  if (!years.length) return null;

  return (
    <BlogCard title={`${YEAR_SELECT_TITLE} (${years.length})`}>
      <div className={styles.yearList}>
        {years.map(({ year, count }) => {
          const isActive = year === activeYear;
          return (
            <button
              key={year}
              type="button"
              onClick={() => onYearChange(isActive ? null : year)}
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
  );
}

export default function BlogArchivePage(props: Props): React.ReactElement {
  const { isOriginalLayout } = useTheme();
  if (isOriginalLayout) return <BlogArchivePageOriginal {...props} />;

  const posts = (props.archive?.blogPosts ?? []) as readonly PostLike[];

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
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <YearSelector
        years={years}
        activeYear={activeYear}
        onYearChange={setActiveYear}
      />
      <BlogArchiveList posts={filteredPosts} />
    </BlogScaffold>
  );
}
