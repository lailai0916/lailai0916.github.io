import { useMemo } from 'react';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluralForm } from '@docusaurus/theme-common';
import Card from '@lailai0916/ui/Card';
import Hint from '@lailai0916/ui/Hint';
import TitleCard from '@lailai0916/ui/TitleCard';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { compareInstantsDescending, getDateKey } from '@site/src/utils/dateTime';
import { TagChipList } from '../BlogUI';
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
  const { i18n } = useDocusaurusContext();
  const { selectMessage } = usePluralForm();
  const countFormatter = new Intl.NumberFormat(i18n.currentLocale);
  const timeZone = useVisitorTimeZone();
  const groups = useMemo(() => {
    const map = new Map<number, PostLike[]>();

    // Archive chronology must not depend on generated metadata order.
    const chronologicalPosts = [...posts].sort((a, b) =>
      compareInstantsDescending(a.metadata.date, b.metadata.date)
    );

    chronologicalPosts.forEach((p) => {
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
          aside={selectMessage(
            yearPosts.length,
            translate(
              { id: 'blog.archive.postCount', message: '{count} post|{count} posts' },
              { count: countFormatter.format(yearPosts.length) }
            )
          )}
        >
          <ul className={styles.recentList}>
            {yearPosts.map((post) => (
              <li key={post.metadata.permalink} className={styles.recentItem}>
                <div className={styles.recentDate}>
                  {getDateKey(post.metadata.date, timeZone).slice(5, 10)}
                </div>
                <Hint label={post.metadata.title} onlyWhenTruncated>
                  <Link to={post.metadata.permalink} className={styles.recentLink}>
                    {post.metadata.title}
                  </Link>
                </Hint>
                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className={styles.recentTags}>
                    <TagChipList
                      items={post.metadata.tags.map((tag) => ({
                        to: tag.permalink,
                        label: tag.label,
                      }))}
                    />
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
