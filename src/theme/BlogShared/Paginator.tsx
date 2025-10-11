import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import styles from '../BlogListPage/styles.module.css';

type Meta = {
  page: number;
  totalPages: number;
  previousPage?: string;
  nextPage?: string;
  permalink: string;
};

export default function Paginator({ meta }: { meta: Meta }) {
  if (!meta?.totalPages || meta.totalPages <= 1) return null;
  const { page: current, totalPages: total } = meta;
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
  const linkFor = (n: number) => (n === 1 ? firstBase : `${pageBase}/${n}`);

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
  const items: Array<number | '…'> = [];
  for (let i = 0; i < pages.length; i += 1) {
    const n = pages[i];
    if (i > 0 && n - pages[i - 1] > 1) items.push('…');
    items.push(n);
  }

  return (
    <nav className={styles.paginator} aria-label="Pagination">
      {meta.previousPage ? (
        <Link className={styles.paginatorBtn} to={meta.previousPage}>
          ← <Translate id="theme.blog.paginator.newerEntries">Newer</Translate>
        </Link>
      ) : (
        <span />
      )}

      <div className={styles.paginatorMid}>
        {items.map((it, idx) =>
          it === '…' ? (
            <span key={`ellipsis-${idx}`} className={styles.paginatorEllipsis}>
              …
            </span>
          ) : (
            <Link
              key={`page-${it}`}
              to={linkFor(it as number)}
              className={clsx(
                styles.pageLink,
                it === current && styles.pageLinkActive
              )}
            >
              {it}
            </Link>
          )
        )}
      </div>

      {meta.nextPage && (
        <Link className={styles.paginatorBtn} to={meta.nextPage}>
          <Translate id="theme.blog.paginator.olderEntries">Older</Translate> →
        </Link>
      )}
    </nav>
  );
}
