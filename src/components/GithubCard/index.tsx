// @ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.css';

export type GithubCardProps = {
  /** owner/repo */
  repo: string;
  className?: string;
  style?: React.CSSProperties;
  /** open link target, default: _blank */
  target?: React.HTMLAttributeAnchorTarget;
  /** whether to show language badge, default: true */
  showLanguage?: boolean;
  /**
   * Optional custom fetch function (e.g., call your proxy to avoid rate limit)
   * Must return a JSON compatible with GitHub repo API (subset used below)
   */
  fetcher?: (repo: string, signal: AbortSignal) => Promise<GithubRepoData>;
};

export type GithubRepoData = {
  description?: string | null;
  language?: string | null;
  forks?: number;
  stargazers_count?: number;
  license?: { spdx_id?: string | null } | null;
  owner?: { avatar_url?: string | null } | null;
};

function compactNumber(n?: number) {
  if (typeof n !== 'number' || Number.isNaN(n)) return '0';
  try {
    // remove narrow no-break space like original
    return Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    })
      .format(n)
      .replace(/\u202f/g, '');
  } catch {
    return String(n);
  }
}

function stripGithubEmojiShortcodes(text?: string | null) {
  if (!text) return '';
  // Convert :emoji_name: to empty string, keep readable description
  return text.replace(/:[a-zA-Z0-9_]+:/g, '').trim();
}

async function defaultFetcher(repo: string, signal: AbortSignal): Promise<GithubRepoData> {
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    signal,
    // align with original implementation behaviour
    referrerPolicy: 'no-referrer',
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export default function GithubCard(props: GithubCardProps) {
  const { repo, className, style, target = '_blank', showLanguage = true, fetcher } = props;

  const [data, setData] = useState<GithubRepoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [owner, repoName] = useMemo(() => {
    const parts = (repo || '').split('/');
    return [parts[0] || '', parts[1] || ''];
  }, [repo]);

  useEffect(() => {
    if (!owner || !repoName) {
      setError('Invalid repo format, expected "owner/repo"');
      setLoading(false);
      return;
    }
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchImpl = fetcher ?? defaultFetcher;
        const json = await fetchImpl(`${owner}/${repoName}`, ac.signal);
        setData(json);
      } catch (e: any) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [owner, repoName, fetcher]);

  const href = `https://github.com/${owner}/${repoName}`;
  const description = stripGithubEmojiShortcodes(data?.description) || 'Description not set';
  const stars = compactNumber(data?.stargazers_count || 0);
  const forks = compactNumber(data?.forks || 0);
  const license = data?.license?.spdx_id || 'no-license';
  const language = data?.language || '';
  const avatarUrl = data?.owner?.avatar_url || undefined;

  const classes = [
    styles.card,
    loading ? styles.loading : '',
    error ? styles.error : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      className={classes}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      style={style}
      aria-label={`Open ${owner}/${repoName} on GitHub`}
    >
      <div className={styles.titleBar}>
        <div className={styles.titleLeft}>
          <div className={styles.owner}>
            <div
              className={styles.avatar}
              style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : undefined}
              aria-hidden="true"
            />
            <div className={styles.user}>{owner}</div>
          </div>
          <div className={styles.divider}>/</div>
          <div className={styles.repo}>{repoName}</div>
        </div>
        <div className={styles.githubLogo} aria-hidden="true" />
      </div>

      <div className={styles.description}>{description}</div>

      <div className={styles.infoBar}>
        <div className={styles.stars} title="Stars">
          {stars}
        </div>
        <div className={styles.forks} title="Forks">
          {forks}
        </div>
        <div className={styles.license} title="License">
          {license}
        </div>
        {showLanguage && language && (
          <span className={styles.language} title="Primary language">
            {language}
          </span>
        )}
      </div>

      {error && (
        <div className={styles.errorText} aria-live="polite">
          Failed to load GitHub data
        </div>
      )}
    </a>
  );
}
