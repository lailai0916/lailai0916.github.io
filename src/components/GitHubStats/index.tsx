import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { Icon } from '@iconify/react';
import styles from './styles.module.css';

const USERNAME = 'lailai0916';

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  followers: number;
  following: number;
  created_at: string;
};

function Loading() {
  return <span className={styles.loading}>Loading…</span>;
}

function ErrorMsg({ text }: { text: string }) {
  return <span className={styles.error}>error: {text}</span>;
}

function Inner() {
  const [data, setData] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(`${r.status}`)))
      .then(setData)
      .catch((e) => setError(String(e)));
  }, []);
  if (error) return <ErrorMsg text={error} />;
  if (!data) return <Loading />;

  const joined = new Date(data.created_at).toLocaleDateString('en', {
    year: 'numeric',
    month: 'short',
  });
  const blogHref = data.blog
    ? data.blog.startsWith('http')
      ? data.blog
      : `https://${data.blog}`
    : null;
  const blogLabel = data.blog?.replace(/^https?:\/\//, '');

  return (
    <div className={styles.card}>
      <a
        className={styles.avatarLink}
        href={data.html_url}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={data.avatar_url}
          alt={data.login}
          className={styles.avatar}
          loading="lazy"
        />
      </a>
      <div className={styles.main}>
        <div className={styles.nameRow}>
          {data.name && <span className={styles.name}>{data.name}</span>}
          <a
            className={styles.handle}
            href={data.html_url}
            target="_blank"
            rel="noreferrer"
          >
            @{data.login}
          </a>
        </div>
        {data.bio && <p className={styles.bio}>{data.bio}</p>}
        <div className={styles.meta}>
          {data.location && (
            <span className={styles.metaItem}>
              <Icon icon="lucide:map-pin" width={14} height={14} />
              {data.location}
            </span>
          )}
          {data.company && (
            <span className={styles.metaItem}>
              <Icon icon="lucide:building-2" width={14} height={14} />
              {data.company}
            </span>
          )}
          {blogHref && (
            <a
              className={styles.metaItem}
              href={blogHref}
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon="lucide:link" width={14} height={14} />
              {blogLabel}
            </a>
          )}
          {data.twitter_username && (
            <a
              className={styles.metaItem}
              href={`https://x.com/${data.twitter_username}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon="simple-icons:x" width={12} height={12} />@
              {data.twitter_username}
            </a>
          )}
        </div>
        <div className={styles.social}>
          <strong>{data.followers}</strong> followers ·{' '}
          <strong>{data.following}</strong> following · Joined {joined}
        </div>
      </div>
    </div>
  );
}

export default function GitHubStats() {
  return <BrowserOnly fallback={<Loading />}>{() => <Inner />}</BrowserOnly>;
}
