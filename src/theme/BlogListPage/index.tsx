import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

import {
  getRecentBlogPosts,
  getArchiveByYear,
  getBlogPostCount,
  getAllBlogItems,
  getTopTags,
  getAllTagCount,
} from '@site/src/utils/blogData';

// Docusaurus will inject correct props at runtime; keep type permissive
type BlogListPageProps = any;

function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toISOString().slice(0, 10);
  } catch {
    return dateString;
  }
}

// AuthorCard 的实现会在 BlogListPage 内部定义，使其能读取列表页 items

type SimpleTag = { label: string; permalink: string; count: number };

function HotTagsCard({ tags }: { tags: SimpleTag[] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <Translate id="blog.tags.hot">Popular Tags</Translate>
      </div>
      <div className={styles.tagList}>
        {tags && tags.length ? (
          tags.map((t) => (
            <Link key={t.permalink} to={t.permalink} className={styles.tagChip}>
              <span className={styles.tagDot} />
              {t.label}
              <span className={styles.tagCount}>{t.count}</span>
            </Link>
          ))
        ) : (
          <div className={styles.mutedText}>
            <Translate id="blog.tags.empty">No tags yet</Translate>
          </div>
        )}
      </div>
    </div>
  );
}

function RecentPostsCard() {
  const posts = getRecentBlogPosts(3);
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <Translate id="blog.recent">Recent Posts</Translate>
      </div>
      <ul className={styles.recentList}>
        {posts.map((p) => (
          <li key={p.permalink} className={styles.recentItem}>
            <div className={styles.recentDate}>{formatDate(p.date)}</div>
            <Link to={p.permalink} className={styles.recentLink}>
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArchiveCard() {
  const years = getArchiveByYear();
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <Translate id="blog.archive">Archive</Translate>
      </div>
      <ul className={styles.archiveList}>
        {years.map((y) => (
          <li key={y.year} className={styles.archiveItem}>
            <Link to={`/blog/archive#${y.year}`} className={styles.archiveLink}>
              {y.year}
            </Link>
            <span className={styles.archiveCount}>{y.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PostCard({ item }: { item: any }) {
  const { content } = item;
  const { metadata, frontMatter } = content;
  const image = frontMatter?.image || content?.assets?.image;
  // 兼容不同版本的 readingTime 结构
  const readingTimeValue: number | null = (() => {
    const rt = (metadata as any)?.readingTime;
    if (typeof rt === 'number') return rt;
    if (rt && typeof rt === 'object') {
      const v = (rt.minutes ?? rt.value ?? rt.readingTime) as
        | number
        | undefined;
      if (typeof v === 'number') return v;
    }
    return null;
  })();

  return (
    <article className={styles.postCard}>
      {image ? (
        <Link to={metadata.permalink} className={styles.postCoverWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={metadata.title} className={styles.postCover} />
        </Link>
      ) : null}
      <div className={styles.postBody}>
        <Link to={metadata.permalink} className={styles.postTitleLink}>
          <h2 className={styles.postTitle}>{metadata.title}</h2>
        </Link>
        <p className={styles.postExcerpt}>
          {metadata.description ?? content.excerpt}
        </p>
        <div className={styles.postMeta}>
          <time dateTime={metadata.date} className={styles.postDate}>
            {formatDate(metadata.date)}
          </time>
          {readingTimeValue !== null && <span className={styles.dot}>·</span>}
          {readingTimeValue !== null && (
            <span className={styles.reading}>
              {translate(
                {
                  id: 'blog.readingTime',
                  message: '{time} min read',
                },
                { time: Math.max(1, Math.round(readingTimeValue)) }
              )}
            </span>
          )}
          {metadata.tags?.length ? (
            <>
              <span className={styles.dot}>·</span>
              <span className={styles.tags}>
                {metadata.tags.slice(0, 2).map((t: any) => (
                  <Link
                    key={t.permalink}
                    to={t.permalink}
                    className={styles.tagSmall}
                  >
                    {t.label}
                  </Link>
                ))}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function BlogListPage(props: BlogListPageProps) {
  const { metadata, items } = props;
  const title = metadata?.title ?? 'Blog';
  const description = metadata?.description ?? '';

  // 聚合当前已加载页面中的标签，避免依赖生成产物路径
  const tags: SimpleTag[] = React.useMemo(() => getTopTags(12), []);

  // 将作者解析逻辑直接放进 AuthorCard 中，不再传入作者参数
  function AuthorCard() {
    const AUTHOR_ID = 'lailai';
    const authorFromPage = React.useMemo(() => {
      try {
        const list = (items ?? []).flatMap(
          (it: any) => (it?.content?.metadata?.authors ?? []) as any[]
        );
        return list.find((a: any) => (a?.key || a?.name) === AUTHOR_ID) || null;
      } catch {
        return null;
      }
    }, [items]);

    const tagsCount = React.useMemo(() => getAllTagCount(), []);

    return (
      <div className={styles.card}>
        <div className={styles.authorCardHeader}>
          <img
            src={useBaseUrl(authorFromPage.imageURL)}
            alt="avatar"
            className={styles.authorAvatar}
            width={96}
            height={96}
          />
          <div className={styles.authorName}>{authorFromPage.name}</div>
          <div className={styles.authorDesc}>{authorFromPage.title}</div>
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
    );
  }

  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        {/* Left Column */}
        <aside className={styles.leftCol}>
          <div className={styles.stickyCol}>
            <AuthorCard />
            <HotTagsCard tags={tags} />
          </div>
        </aside>

        {/* Main Column */}
        <main className={styles.mainCol}>
          {items.map((it: any) => (
            <PostCard key={it.content.metadata.permalink} item={it} />
          ))}
          {/* Paginator */}
          {metadata?.totalPages && metadata.totalPages > 1 ? (
            <nav className={styles.paginator} aria-label="Pagination">
              {/* Left: Newer */}
              {metadata.previousPage ? (
                <Link className={styles.paginatorBtn} to={metadata.previousPage}>
                  ← <Translate id="blog.newer">Newer</Translate>
                </Link>
              ) : (
                <span />
              )}

              {/* Middle: Numbered pages with ellipsis */}
              <div className={styles.paginatorMid}>
                {(() => {
                  const current = metadata.page as number;
                  const total = metadata.totalPages as number;

                  const curPermalink = metadata.permalink as string;
                  const baseLink = current > 1
                    ? curPermalink.replace(/\/page\/\d+\/?$/, '')
                    : curPermalink;
                  const sample = metadata.nextPage || metadata.previousPage || '';
                  const pageBase = sample
                    ? sample.replace(/\/?\d+\/?$/, '')
                    : `${baseLink.replace(/\/?$/, '')}/page`;
                  const linkFor = (n: number) => (n === 1 ? baseLink : `${pageBase}/${n}`);

                  // Build the set {1, total, current-1, current, current+1} within bounds
                  const set = new Set<number>();
                  const add = (n: number) => {
                    if (n >= 1 && n <= total) set.add(n);
                  };
                  add(1);
                  add(total);
                  add(current - 1);
                  add(current);
                  add(current + 1);

                  const pages = Array.from(set).sort((a, b) => a - b);

                  // Insert ellipsis between non-consecutive pages
                  const items: Array<number | '…'> = [];
                  for (let i = 0; i < pages.length; i += 1) {
                    const n = pages[i];
                    if (i > 0 && n - pages[i - 1] > 1) items.push('…');
                    items.push(n);
                  }

                  return items.map((it, idx) =>
                    it === '…' ? (
                      <span key={`ellipsis-${idx}`} className={styles.paginatorEllipsis}>
                        …
                      </span>
                    ) : (
                      <Link
                        key={`page-${it}`}
                        to={linkFor(it as number)}
                        className={
                          it === current ? `${styles.pageLink} ${styles.pageLinkActive}` : styles.pageLink
                        }
                        aria-current={it === current ? 'page' : undefined}
                      >
                        {it}
                      </Link>
                    ),
                  );
                })()}
              </div>

              {/* Right: Older */}
              {metadata.nextPage && (
                <Link
                  className={`${styles.paginatorBtn} ${styles.paginatorNext}`}
                  to={metadata.nextPage}
                >
                  <Translate id="blog.older">Older</Translate> →
                </Link>
              )}
            </nav>
          ) : null}
        </main>

        {/* Right Column */}
        <aside className={styles.rightCol}>
          <div className={styles.stickyCol}>
            <RecentPostsCard />
            <ArchiveCard />
          </div>
        </aside>
      </div>
    </Layout>
  );
}
