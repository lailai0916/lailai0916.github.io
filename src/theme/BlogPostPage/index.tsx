import React, { type ReactNode } from 'react';
import BlogScaffold from '../BlogShared/Scaffold';
import SidebarRight from '../BlogShared/SidebarRight';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {
  BlogPostProvider,
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostItem from '@theme/BlogPostItem';

import styles from '../BlogListPage/styles.module.css';

import {
  getBlogPostCount,
  getTopTags,
  getAllTagCount,
} from '@site/src/utils/blogData';

import type { Props } from '@theme/BlogPostPage';

// right sidebar is provided by shared SidebarRight

function LeftSidebar() {
  const { metadata } = useBlogPost();
  const AUTHOR_ID = 'lailai';
  const author =
    (metadata.authors ?? []).find(
      (a: any) => (a?.key || a?.name) === AUTHOR_ID
    ) || null;
  const tagsCount = React.useMemo(() => getAllTagCount(), []);
  const name = author?.name ?? AUTHOR_ID;
  const title = author?.title ?? '';
  const imageUrl = author?.imageURL ?? '/img/avatar/lailai.png';
  return (
    <div className={styles.stickyCol}>
      <div className={styles.card}>
        <div className={styles.authorCardHeader}>
          <img
            src={useBaseUrl(imageUrl)}
            alt="avatar"
            className={styles.authorAvatar}
            width={96}
            height={96}
          />
          <div className={styles.authorName}>{name}</div>
          {title ? <div className={styles.authorDesc}>{title}</div> : null}
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
          {getTopTags(12).map((t) => (
            <Link key={t.permalink} to={t.permalink} className={styles.tagChip}>
              <span className={styles.tagDot} />
              {t.label}
              <span className={styles.tagCount}>{t.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Use the official BlogPostItem to render content and metadata

export default function BlogPostPage(props: Props): ReactNode {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={`${ThemeClassNames.wrapper.blogPages} ${ThemeClassNames.page.blogPostPage}`}
      >
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <BlogScaffold
          title={props.content.metadata.title}
          description={props.content.metadata.description}
          left={<LeftSidebar />}
          right={<SidebarRight />}
        >
          <BlogPostItem>
            <BlogPostContent />
          </BlogPostItem>
          {(props.content.metadata.nextItem ||
            props.content.metadata.prevItem) && (
            <BlogPostPaginator
              nextItem={props.content.metadata.nextItem}
              prevItem={props.content.metadata.prevItem}
            />
          )}
        </BlogScaffold>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
