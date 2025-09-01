import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from '../BlogListPage/styles.module.css';
import {getRecentBlogPosts, getArchiveByYear} from '@site/src/utils/blogData';

function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toISOString().slice(0, 10);
  } catch {
    return dateString;
  }
}

export default function SidebarRight() {
  const posts = getRecentBlogPosts(5);
  const years = getArchiveByYear();
  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardTitle}><Translate id="blog.recent">Recent Posts</Translate></div>
        <ul className={styles.recentList}>
          {posts.map((p) => (
            <li key={p.permalink} className={styles.recentItem}>
              <div className={styles.recentDate}>{formatDate(p.date)}</div>
              <Link to={p.permalink} className={styles.recentLink}>{p.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.card}>
        <div className={styles.cardTitle}><Translate id="blog.archive">Archive</Translate></div>
        <ul className={styles.archiveList}>
          {years.map((y) => (
            <li key={y.year} className={styles.archiveItem}>
              <Link to={`/blog/archive#${y.year}`} className={styles.archiveLink}>{y.year}</Link>
              <span className={styles.archiveCount}>{y.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

