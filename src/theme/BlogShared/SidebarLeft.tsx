import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate from '@docusaurus/Translate';
import styles from '../BlogListPage/styles.module.css';
import Link from '@docusaurus/Link';
import { getBlogPostCount, getTopTags, getAllTagCount, getAllPostMetadata } from '@site/src/utils/blogData';

export default function SidebarLeft() {
  // 组件内部汇总全站作者并固定选择 'lailai'
  const author = React.useMemo(() => {
    try {
      const fixedId = 'lailai';
      // 组件内自取作者集合：读取全量博文元数据（包含 authors）并聚合
      const metas = getAllPostMetadata();
      const source = metas.flatMap((m: any) => (m?.authors ?? []) as any[]);

      return (source as readonly any[]).find(
        (a: any) => (a?.key || a?.name) === fixedId
      ) as any;
    } catch {
      return null;
    }
  }, []);

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
            <div className={styles.statValue}>{getAllTagCount()}</div>
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
