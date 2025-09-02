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
  items?: readonly any[]; // list pages items (用于推断作者)
  authors?: readonly any[]; // 明确传入作者数组（优先级更高）
  authorId?: string; // 指定作者 key/name（可选）
};

export default function SidebarLeft({ items, authors, authorId }: Props) {
  const author = React.useMemo(() => {
    try {
      const listAuthors = (items ?? []).flatMap(
        (it: any) => (it?.content?.metadata?.authors ?? []) as any[]
      );
      const source = (authors ?? listAuthors) as readonly any[];
      // 当未指定 authorId 时，优先取列表/传入的第一个作者
      if (!authorId) return (source[0] as any) || null;
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
          <Link
            to="/blog/archive"
            className={[styles.statItem, styles.statItemLink].join(' ')}
          >
            <div className={styles.statValue}>{getBlogPostCount()}</div>
            <div className={styles.statLabel}>
              <Translate id="blog.stats.posts">Posts</Translate>
            </div>
          </Link>
          <Link
            to="/blog/tags"
            className={[styles.statItem, styles.statItemLink].join(' ')}
          >
            <div className={styles.statValue}>{tagsCount}</div>
            <div className={styles.statLabel}>
              <Translate id="blog.stats.tags">Tags</Translate>
            </div>
          </Link>
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
