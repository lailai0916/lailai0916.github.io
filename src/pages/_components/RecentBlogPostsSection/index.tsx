import React from 'react';
import clsx from 'clsx'; // 导入 clsx
import styles from '../../styles.module.css';
import Link from '@docusaurus/Link';

const blogPosts = [
  {
    title: '文章一',
    date: '2025-05-10',
    excerpt: 'This is a test.',
    link: '/blog/welcome',
  },
  {
    title: '文章二',
    date: '2025-05-15',
    excerpt: 'This is a test.',
    link: '/blog/welcome',
  },
  {
    title: '文章三',
    date: '2025-05-18',
    excerpt: 'This is a test.',
    link: '/blog/welcome',
  },
];

export default function RecentBlogPostsSection() {
  return (
    <div className={clsx(styles.section, styles.sectionAlt)}> {/* 应用 styles.sectionAlt 并移除内联 style */}
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 style={{textAlign: 'center', marginBottom: '2rem'}}>最新博客</h2>
          </div>
        </div>
        <div className="row">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="col col--4" style={{marginBottom: '1.5rem'}}>
              <div className="card shadow--md">
                <div className="card__header">
                  <h3>{post.title}</h3>
                  <small>{post.date}</small>
                </div>
                <div className="card__body">
                  <p>{post.excerpt}</p>
                </div>
                <div className="card__footer">
                  <Link
                    className="button button--secondary button--block"
                    to={post.link}>
                    阅读更多
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
