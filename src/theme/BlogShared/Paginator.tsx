import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';
import styles from '../BlogListPage/styles.module.css';

type PageItem = {
  label: string;
  to?: string;
};

export default function Paginator({ meta }: { meta: BlogPaginatedMetadata }) {
  if (!meta?.totalPages || meta.totalPages <= 1) return null;
  const { page: current, totalPages } = meta;
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

  const set = new Set<number>();
  const add = (n: number) => {
    if (n >= 1 && n <= totalPages) set.add(n);
  };
  add(1);
  add(current - 1);
  add(current);
  add(current + 1);
  add(totalPages);
  const pages = Array.from(set).sort((a, b) => a - b);
  const items: PageItem[] = [];

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
            it.label === `${current}` && styles.pageLinkActive
          )}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
