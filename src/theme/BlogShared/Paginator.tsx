import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';
import styles from '../BlogListPage/styles.module.css';

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
  const items: Array<number> = [];
  for (let i = 0; i < pages.length; i += 1) {
    if (i > 0 && pages[i] - pages[i - 1] > 1) items.push(0);
    items.push(pages[i]);
  }

  return (
    <nav className={styles.paginator}>
      {meta.previousPage && (
        <Link className={styles.pageLink} to={meta.previousPage}>
          ←
        </Link>
      )}
      {items.map((it, idx) =>
        it ? (
          <Link
            key={`page-${it}`}
            to={it === 1 ? firstBase : `${pageBase}/${it}`}
            className={clsx(
              styles.pageLink,
              it === current && styles.pageLinkActive
            )}
          >
            {it}
          </Link>
        ) : (
          <span key={`ellipsis-${idx}`} className={styles.paginatorEllipsis}>
            …
          </span>
        )
      )}
      {meta.nextPage && (
        <Link className={styles.pageLink} to={meta.nextPage}>
          →
        </Link>
      )}
    </nav>
  );
}
