import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogArchivePageOriginal from '@theme-original/BlogArchivePage';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';

import styles from '../BlogShared/styles.module.css';
import BlogScaffold from '../BlogShared/Scaffold';
import { Card } from '../BlogShared/Components';

// page uses shared sidebars that fetch data; no direct utils here

import type { Props } from '@theme/BlogArchivePage';

const TITLE = translate({
  id: 'theme.blog.archive.title',
  message: 'Archive',
});
const DESCRIPTION = "Archive of lailai's blog";

export default function BlogArchivePage(props: Props): React.ReactElement {
  const { isOriginalLayout } = useTheme();
  if (isOriginalLayout) return <BlogArchivePageOriginal {...props} />;

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
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      {groups.map(([year, posts]) => (
        <Card key={year} title={String(year)}>
          <ul className={styles.recentList}>
            {posts.map((p: any) => (
              <li key={p.metadata.permalink} className={styles.recentItem}>
                <div className={styles.recentDate}>
                  {p.metadata.date.slice(5, 10)}
                </div>
                <Link to={p.metadata.permalink} className={styles.recentLink}>
                  {p.metadata.title}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ))}
      {!groups.length && (
        <Card>
          <Translate id="blog.pages.archive.empty">No posts yet</Translate>
        </Card>
      )}
    </BlogScaffold>
  );
}
