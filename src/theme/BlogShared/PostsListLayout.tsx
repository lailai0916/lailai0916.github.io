import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { Icon } from '@iconify/react';
import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';
import BlogScaffold from './Scaffold';

import { translate } from '@docusaurus/Translate';
import IconText from '@site/src/components/laikit/widget/IconText';
import MDXContent from '@theme/MDXContent';
import styles from './styles.module.css';

function Badge({ icon, label }) {
  return (
    <span className={clsx(styles.tagChip, styles.postInlineTag)}>
      <Icon icon={icon} />
      {label}
    </span>
  );
}

function PostCard({ item }) {
  const { content: MDXPageContent } = item;
  const { metadata, assets, frontMatter } = MDXPageContent;
  const image = assets.image ?? frontMatter.image;
  const firstTag = metadata.tags?.[0] ?? null;

  return (
    <article className={styles.card}>
      {image && (
        <Link to={metadata.permalink} className={styles.postCoverWrap}>
          <img src={image} alt={metadata.title} className={styles.postCover} />
        </Link>
      )}
      <div className={styles.postTitleRow}>
        <Badge
          icon={
            firstTag?.permalink === '/blog/tags/pinned'
              ? 'lucide:pin'
              : 'lucide:bookmark'
          }
          label={firstTag?.label ?? 'None'}
        />
        <h2 className={styles.postTitle}>
          <Link to={metadata.permalink} className={styles.postTitleLink}>
            {metadata.title}
          </Link>
        </h2>
      </div>
      <div className={styles.postExcerpt}>
        <MDXContent>
          <MDXPageContent />
        </MDXContent>
      </div>
      <div className={styles.postMeta}>
        <IconText icon="lucide:calendar" colorMode="monochrome">
          <time dateTime={metadata.date}>{metadata.date.slice(0, 10)}</time>
        </IconText>
        {metadata.readingTime && (
          <>
            <span className={styles.dot}>·</span>
            <IconText icon="lucide:file-text" colorMode="monochrome">
              {translate(
                {
                  id: 'blog.postcard.wordCount',
                  message: '{word} words',
                },
                {
                  word: Math.round(metadata.readingTime * 200),
                }
              )}
            </IconText>
            <span className={styles.dot}>·</span>
            <IconText icon="lucide:clock" colorMode="monochrome">
              {translate(
                {
                  id: 'blog.postcard.readingTime',
                  message: '{readingTime} min',
                },
                {
                  readingTime: Math.max(1, Math.round(metadata.readingTime)),
                }
              )}
            </IconText>
          </>
        )}
        {metadata.tags?.length > 0 && (
          <>
            <span className={styles.dot}>·</span>
            <IconText icon="lucide:tag" colorMode="monochrome">
              {metadata.tags?.map((tag, i) => (
                <React.Fragment key={tag.label}>
                  <Link
                    to={tag.permalink}
                    style={{
                      color: 'inherit',
                    }}
                  >
                    {tag.label}
                  </Link>
                  {i < metadata.tags.length - 1 && ' | '}
                </React.Fragment>
              ))}
            </IconText>
          </>
        )}
      </div>
    </article>
  );
}

function Paginator({ meta }: { meta: BlogPaginatedMetadata }) {
  if (!meta?.totalPages || meta.totalPages <= 1) return null;
  const { page, totalPages } = meta;
  const curPermalink = meta.permalink as string;
  const sample = meta.nextPage || meta.previousPage || '';
  // Derive pageBase and firstBase robustly for routes like:
  //  - /blog/page/3
  //  - /blog/tags/<tag>/page/3
  //  - /blog/authors/<id>/authors/3
  let pageBase: string;
  let firstBase: string;
  if (/(.*\/[^/]+)\/\d+\/?$/.test(sample)) {
    // sample looks like "/.../<segment>/<n>"
    pageBase = sample.replace(/\/\d+\/?$/, '');
    firstBase = pageBase.replace(/\/[^/]+$/, '');
  } else if (sample) {
    // sample is likely the first page (no trailing number)
    firstBase = sample;
    pageBase = `${firstBase.replace(/\/?$/, '')}/page`;
  } else {
    // no sample at all: infer from current permalink when possible
    const m2 = curPermalink.match(/(.*)\/page\/\d+\/?$/);
    firstBase = m2 ? m2[1] : curPermalink;
    pageBase = `${firstBase.replace(/\/?$/, '')}/page`;
  }

  const mid = Math.min(Math.max(page, 2), totalPages - 1);
  const pages = Array.from(
    new Set([1, mid - 1, mid, mid + 1, totalPages])
  ).filter((p) => p >= 1 && p <= totalPages);
  const items: { label: string; to?: string }[] = [];

  items.push({ label: '←', to: meta.previousPage });
  items.push({ label: `${pages[0]}`, to: `${firstBase}` });
  for (let i = 1; i < pages.length; i += 1) {
    if (pages[i] - pages[i - 1] > 1) items.push({ label: '…' });
    items.push({ label: `${pages[i]}`, to: `${pageBase}/${pages[i]}` });
  }
  items.push({ label: '→', to: meta.nextPage });

  return (
    <nav className={styles.paginator}>
      {items.map((item, idx) => (
        <Link
          key={idx}
          to={item.to}
          className={clsx(styles.pageLink, {
            [styles.pageLinkActive]: item.label === String(page),
          })}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default function PostsListLayout({
  title,
  description,
  items,
  meta,
  topSlot,
}: {
  title: string;
  description?: string;
  items: readonly any[];
  meta: BlogPaginatedMetadata;
  topSlot?: React.ReactNode;
}) {
  return (
    <BlogScaffold title={title} description={description}>
      {topSlot}
      {items.map((item) => (
        <PostCard key={item.content.metadata.permalink} item={item} />
      ))}
      <Paginator meta={meta} />
    </BlogScaffold>
  );
}
