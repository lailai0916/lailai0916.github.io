import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';

import BlogScaffold from './Scaffold';
import PostCard from './PostCard';
import styles from '../BlogShared/styles.module.css';

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
  const pages = Array.from(new Set([1, mid - 1, mid, mid + 1, totalPages]));
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
      {items.map((it, idx) => (
        <Link
          key={idx}
          to={it.to}
          className={clsx(
            styles.pageLink,
            it.label === String(page) && styles.pageLinkActive
          )}
        >
          {it.label}
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
      {items.map((it: any) => (
        <PostCard key={it.content.metadata.permalink} item={it} />
      ))}
      <Paginator meta={meta} />
    </BlogScaffold>
  );
}
