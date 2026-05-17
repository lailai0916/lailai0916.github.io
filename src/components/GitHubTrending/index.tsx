import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

type Item = {
  repo: { name: string; description: string | null };
  stars: number;
};

function Loading() {
  return <span className={styles.loading}>Loading…</span>;
}

function ErrorMsg({ text }: { text: string }) {
  return <span className={styles.error}>error: {text}</span>;
}

function Inner() {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(
      'https://api.ossinsight.io/v1/trends/repos/?period=past_24_hours&language=All'
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(`${r.status}`)))
      .then((j) => {
        const rows: { repo_name: string; description?: string; stars: string }[] =
          j?.data?.rows ?? [];
        setItems(
          rows
            .slice(0, 10)
            .map((r) => ({
              repo: { name: r.repo_name, description: r.description ?? null },
              stars: Number(r.stars),
            }))
            .sort((a, b) => b.stars - a.stars)
        );
      })
      .catch((e) => setError(String(e)));
  }, []);
  if (error) return <ErrorMsg text={error} />;
  if (!items) return <Loading />;
  return (
    <ol className={styles.list}>
      {items.map((it, i) => (
        <li key={it.repo.name} className={styles.item}>
          <span className={styles.index}>{i + 1}</span>
          <a
            className={styles.link}
            href={`https://github.com/${it.repo.name}`}
            target="_blank"
            rel="noreferrer"
          >
            <strong>{it.repo.name}</strong>
            {it.repo.description && ` — ${it.repo.description.slice(0, 60)}`}
          </a>
          <span className={styles.meta}>★ {it.stars}</span>
        </li>
      ))}
    </ol>
  );
}

export default function GitHubTrending() {
  return <BrowserOnly fallback={<Loading />}>{() => <Inner />}</BrowserOnly>;
}
