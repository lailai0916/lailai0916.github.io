import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

import styles from './styles.module.css';
import { Card } from './Components';

type PostLike = {
  metadata: {
    date: string;
    permalink: string;
    title: string;
  };
};

export function BlogArchiveList({ posts }: { posts: PostLike[] }) {
  const groups = React.useMemo(() => {
    const map = new Map<number, PostLike[]>();

    posts.forEach((p) => {
      const year = new Date(p.metadata.date).getUTCFullYear();
      const arr = map.get(year);
      if (arr) arr.push(p);
      else map.set(year, [p]);
    });

    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [posts]);

  if (!groups.length) {
    return (
      <Card>
        <Translate id="blog.pages.archive.empty">
          No posts yet, please look forward to more content...
        </Translate>
      </Card>
    );
  }

  return (
    <>
      {groups.map(([year, yearPosts]) => (
        <Card key={year} title={`${year} (${yearPosts.length})`}>
          <ul className={styles.recentList}>
            {yearPosts.map((post) => (
              <li key={post.metadata.permalink} className={styles.recentItem}>
                <div className={styles.recentDate}>
                  {post.metadata.date.slice(5, 10)}
                </div>
                <Link
                  to={post.metadata.permalink}
                  className={styles.recentLink}
                >
                  {post.metadata.title}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </>
  );
}
