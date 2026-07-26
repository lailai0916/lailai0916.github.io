import { useMemo } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Card from '@site/src/components/laikit/Card';
import TitleCard from '@site/src/components/laikit/TitleCard';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { getDateKey } from '@site/src/utils/dateTime';
import styles from './styles.module.css';

type PostLike = {
  metadata: {
    date: string;
    permalink: string;
    title: string;
    tags?: ReadonlyArray<{
      label: string;
      permalink: string;
    }>;
  };
};

export function BlogArchiveList({ posts }: { posts: readonly PostLike[] }) {
  const timeZone = useVisitorTimeZone();
  const groups = useMemo(() => {
    const map = new Map<number, PostLike[]>();

    posts.forEach((p) => {
      const year = Number(getDateKey(p.metadata.date, timeZone).slice(0, 4));
      const arr = map.get(year);
      if (arr) arr.push(p);
      else map.set(year, [p]);
    });

    return Array.from(map.entries()).sort((a, b) => b[0] - a[0]);
  }, [posts, timeZone]);

  if (!groups.length) {
    return (
      <Card>
        <Translate id="blog.post.empty">
          No posts yet, please look forward to more content...
        </Translate>
      </Card>
    );
  }

  return (
    <>
      {groups.map(([year, yearPosts]) => (
        <TitleCard
          key={year}
          size="plain"
          padding="1rem"
          title={String(year)}
          count={yearPosts.length}
        >
          <ul className={styles.recentList}>
            {yearPosts.map((post) => (
              <li key={post.metadata.permalink} className={styles.recentItem}>
                <div className={styles.recentDate}>
                  {getDateKey(post.metadata.date, timeZone).slice(5, 10)}
                </div>
                <Link to={post.metadata.permalink} className={styles.recentLink}>
                  {post.metadata.title}
                </Link>
                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className={styles.recentTags}>
                    {post.metadata.tags.map((tag) => (
                      <Link key={tag.permalink} to={tag.permalink} className={styles.recentTag}>
                        #{tag.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </TitleCard>
      ))}
    </>
  );
}
