import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

import styles from '../BlogListPage/styles.module.css';
import BlogScaffold from '../BlogShared/Scaffold';
import SidebarLeft from '../BlogShared/SidebarLeft';
import SidebarRight from '../BlogShared/SidebarRight';

// page uses shared sidebars that fetch data; no direct utils here

import type { Props } from '@theme/BlogArchivePage';
import { formatDate } from '@site/src/utils/date';

export default function BlogArchivePage(props: Props) {
  const { archive } = props;
  const groups = React.useMemo(() => {
    const map = new Map<number, any[]>();
    const posts = (archive?.blogPosts ?? []) as any[];
    posts.forEach((p) => {
      const year = new Date(p.metadata.date).getUTCFullYear();
      map.set(year, [...(map.get(year) ?? []), p]);
    });
    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [archive]);

  return (
    <BlogScaffold
      title="Archive"
      left={<SidebarLeft />}
      right={<SidebarRight />}
    >
      {groups.map(([year, posts]) => (
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
      {!groups.length && (
        <div className={styles.card}>
          <div className={styles.mutedText}>
            <Translate id="blog.archive.empty">No posts yet</Translate>
          </div>
        </div>
      )}
    </BlogScaffold>
  );
}
