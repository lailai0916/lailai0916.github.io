import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from '../BlogListPage/styles.module.css';

type Meta = {
  page: number;
  totalPages: number;
  previousPage?: string;
  nextPage?: string;
  permalink: string;
};

export default function Paginator({meta}: {meta: Meta}) {
  if (!meta?.totalPages || meta.totalPages <= 1) return null;
  const {page: current, totalPages: total} = meta;
  const curPermalink = meta.permalink as string;
  const baseLink = current > 1 ? curPermalink.replace(/\/page\/\d+\/?$/, '') : curPermalink;
  const sample = meta.nextPage || meta.previousPage || '';
  const pageBase = sample ? sample.replace(/\/?\d+\/?$/, '') : `${baseLink.replace(/\/?$/, '')}/page`;
  const linkFor = (n: number) => (n === 1 ? baseLink : `${pageBase}/${n}`);

  const set = new Set<number>();
  const add = (n: number) => { if (n >= 1 && n <= total) set.add(n); };
  add(1); add(total); add(current - 1); add(current); add(current + 1);
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
          ← <Translate id="blog.newer">Newer</Translate>
        </Link>
      ) : (
        <span />
      )}

      <div className={styles.paginatorMid}>
        {items.map((it, idx) =>
          it === '…' ? (
            <span key={`ellipsis-${idx}`} className={styles.paginatorEllipsis}>…</span>
          ) : (
            <Link
              key={`page-${it}`}
              to={linkFor(it as number)}
              className={it === current ? `${styles.pageLink} ${styles.pageLinkActive}` : styles.pageLink}
              aria-current={it === current ? 'page' : undefined}
            >
              {it}
            </Link>
          ),
        )}
      </div>

      {meta.nextPage && (
        <Link className={`${styles.paginatorBtn} ${styles.paginatorNext}`} to={meta.nextPage}>
          <Translate id="blog.older">Older</Translate> →
        </Link>
      )}
    </nav>
  );
}

