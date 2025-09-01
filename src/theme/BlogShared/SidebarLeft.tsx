import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import styles from '../BlogListPage/styles.module.css';
import Link from '@docusaurus/Link';
import {
  getBlogPostCount,
  getTopTags,
  getAllTagCount,
} from '@site/src/utils/blogData';

type Props = {
  items?: readonly any[]; // list pages items
  authors?: readonly any[]; // authors array from a post page if available
  authorId?: string; // default 'lailai'
};

export default function SidebarLeft({
  items,
  authors,
  authorId = 'lailai',
}: Props) {
  const author = React.useMemo(() => {
    try {
      const listAuthors = (items ?? []).flatMap(
        (it: any) => (it?.content?.metadata?.authors ?? []) as any[]
      );
      const source = (authors ?? listAuthors) as readonly any[];
      return source.find((a) => (a?.key || a?.name) === authorId) || null;
    } catch {
      return null;
    }
  }, [items, authors, authorId]);

  const tagsCount = React.useMemo(() => getAllTagCount(), []);
  const hotTags = React.useMemo(() => getTopTags(12), []);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.authorCardHeader}>
          {author?.imageURL && (
            <img
              src={useBaseUrl(author.imageURL)}
              alt="avatar"
              className={styles.authorAvatar}
              width={96}
              height={96}
            />
          )}
          <div className={styles.authorName}>{author?.name}</div>
          {author?.title ? (
            <div className={styles.authorDesc}>{author.title}</div>
          ) : null}
        </div>
        {/* 个人信息卡片已不再包含统计 */}
      </div>

      {/* 合并文章数量 + 标签数量为一个统计块 */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Translate id="blog.stats.overview">Statistics</Translate>
        </div>
        <div className={styles.authorStats}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{getBlogPostCount()}</div>
            <div className={styles.statLabel}>
              <Translate id="blog.stats.posts">Posts</Translate>
            </div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{tagsCount}</div>
            <div className={styles.statLabel}>
              <Translate id="blog.stats.tags">Tags</Translate>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>
          <Translate id="blog.tags.hot">Popular Tags</Translate>
        </div>
        <div className={styles.tagList}>
          {hotTags.map((t) => (
            <Link key={t.permalink} to={t.permalink} className={styles.tagChip}>
              <span className={styles.tagDot} />
              {t.label}
              <span className={styles.tagCount}>{t.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
