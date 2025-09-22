import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogArchivePageOriginal from '@theme-original/BlogArchivePage';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { useLocation, useHistory } from '@docusaurus/router';
import clsx from 'clsx';

import styles from '../BlogListPage/styles.module.css';
import BlogScaffold from '../BlogShared/Scaffold';

// page uses shared sidebars that fetch data; no direct utils here

import type { Props } from '@theme/BlogArchivePage';
import { formatDate } from '@site/src/utils/date';

export default function BlogArchivePage(props: Props): React.ReactElement {
  const { isNewLayout } = useTheme();
  const { archive } = props;
  const location = useLocation();
  const history = useHistory();
  const groups = React.useMemo(() => {
    const map = new Map<number, any[]>();
    const posts = (archive?.blogPosts ?? []) as any[];
    posts.forEach((p) => {
      const year = new Date(p.metadata.date).getUTCFullYear();
      map.set(year, [...(map.get(year) ?? []), p]);
    });
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [archive]);
  const yearList = React.useMemo(() => groups.map(([year]) => year), [groups]);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!yearList.length) {
      setSelectedYear(null);
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'auto' });
        });
      }
      return;
    }

    const hash = location.hash?.replace('#', '');
    const parsed = hash ? Number(hash) : NaN;

    const scrollToTop = () => {
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'auto' });
        });
      }
    };

    if (Number.isFinite(parsed) && yearList.includes(parsed)) {
      setSelectedYear((prev) => (prev === parsed ? prev : parsed));
      scrollToTop();
      return;
    }

    setSelectedYear((prev) =>
      prev && yearList.includes(prev) ? prev : yearList[0]
    );
    scrollToTop();
  }, [yearList, location.hash]);

  const handleYearChange = React.useCallback(
    (year: number) => {
      setSelectedYear((prev) => (prev === year ? prev : year));
      const targetHash = `#${year}`;
      if (location.hash !== targetHash) {
        history.replace({
          pathname: location.pathname,
          search: location.search,
          hash: targetHash,
        });
      }
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'auto' });
        });
      }
    },
    [history, location.hash, location.pathname, location.search]
  );

  const visibleGroups = React.useMemo(() => {
    if (selectedYear == null) {
      return [] as typeof groups;
    }
    return groups.filter(([year]) => year === selectedYear);
  }, [groups, selectedYear]);

  if (isNewLayout) {
    return (
      <BlogScaffold title="Archive" description="Archive of lailai's blog">
        {!!yearList.length && (
          <div className={styles.card}>
            <div className={styles.cardTitle}>
              <Translate id="theme.blog.archive.title">Archive</Translate>
            </div>
            <div className={styles.archiveFilter}>
              <span className={styles.archiveFilterLabel}>
                <Translate id="blog.pages.archive.yearSelect">Year</Translate>
              </span>
              <div className={styles.archiveFilterOptions}>
                {yearList.map((year) => (
                  <button
                    key={year}
                    type="button"
                    className={clsx(styles.archiveFilterButton, {
                      [styles.archiveFilterButtonActive]: year === selectedYear,
                    })}
                    onClick={() => handleYearChange(year)}
                    aria-pressed={year === selectedYear}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {visibleGroups.map(([year, posts]) => (
          <div key={year} className={styles.card} id={String(year)}>
            <div className={styles.cardTitle}>{year}</div>
            <ul className={styles.recentList}>
              {posts.map((p: any) => (
                <li key={p.metadata.permalink} className={styles.recentItem}>
                  <div className={styles.recentDate}>
                    {formatDate(p.metadata.date)}
                  </div>
                  <Link to={p.metadata.permalink} className={styles.recentLink}>
                    {p.metadata.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {selectedYear != null && !visibleGroups.length && (
          <div className={styles.card}>
            <div className={styles.mutedText}>
              <Translate id="blog.pages.archive.empty">No posts yet</Translate>
            </div>
          </div>
        )}
      </BlogScaffold>
    );
  }

  return <BlogArchivePageOriginal {...props} />;
}
