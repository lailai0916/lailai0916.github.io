import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import Skeleton from '@site/src/components/laikit/Skeleton';
import { useImageStatus } from '@site/src/hooks/useImageStatus';
import { formatCompact } from '@site/src/utils/format';
import styles from './styles.module.css';

const ERROR_LABEL = translate({
  id: 'components.github.error',
  message: 'Failed to load GitHub data',
});
const NO_DESCRIPTION_LABEL = translate({
  id: 'components.github.noDescription',
  message: 'No description provided',
});
const STARS_LABEL = translate({
  id: 'components.github.stars',
  message: 'Stars',
});
const FORKS_LABEL = translate({
  id: 'components.github.forks',
  message: 'Forks',
});
const LICENSE_LABEL = translate({
  id: 'components.github.license',
  message: 'License',
});
const LANGUAGE_LABEL = translate({
  id: 'components.github.language',
  message: 'Primary language',
});

// GitHub linguist colors for common primary languages; unknown ones keep the neutral dot.
const LANGUAGE_COLORS: Record<string, string> = {
  C: '#555555',
  'C#': '#178600',
  'C++': '#f34b7d',
  CSS: '#663399',
  Dart: '#00b4ab',
  Go: '#00add8',
  HTML: '#e34c26',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  'Jupyter Notebook': '#da5b0b',
  Kotlin: '#a97bff',
  MDX: '#fcb32c',
  PHP: '#4f5d95',
  Python: '#3572a5',
  Ruby: '#701516',
  Rust: '#dea584',
  Shell: '#89e051',
  Swift: '#f05138',
  TeX: '#3d6117',
  TypeScript: '#3178c6',
  Vue: '#41b883',
};

type GitHubProps = {
  /** owner/repo */
  repo: string;
  className?: string;
};

// The subset of the GitHub repo API response we read.
type GitHubRepoApi = {
  description?: string | null;
  language?: string | null;
  stargazers_count?: number;
  forks_count?: number;
  license?: { spdx_id?: string | null } | null;
  owner?: { avatar_url?: string | null } | null;
};

type GitHubRepoData = {
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  license: string | null;
  avatarUrl: string | null;
};

type CachedRepo = {
  data: GitHubRepoData;
  expiresAt: number;
};

const CACHE_KEY_PREFIX = 'github_repo_v1:';
const CACHE_TTL_MS = 60 * 60 * 1000;

// In-flight requests, deduped per repo across every card on the page.
const pendingRepos = new Map<string, Promise<GitHubRepoData>>();

function readRepoCache(repo: string): GitHubRepoData | null {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY_PREFIX + repo);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedRepo;
    if (!cached || typeof cached.expiresAt !== 'number' || cached.expiresAt <= Date.now()) {
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function writeRepoCache(repo: string, data: GitHubRepoData): void {
  try {
    const cached: CachedRepo = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    window.sessionStorage.setItem(CACHE_KEY_PREFIX + repo, JSON.stringify(cached));
  } catch {
    // sessionStorage may be unavailable
  }
}

function stripEmojiShortcodes(text: string | null | undefined): string {
  if (!text) return '';
  return text
    .replace(/:[a-zA-Z0-9_+-]+:/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeRepo(api: GitHubRepoApi): GitHubRepoData {
  const spdxId = api.license?.spdx_id;
  return {
    description: stripEmojiShortcodes(api.description) || null,
    language: api.language ?? null,
    stars: api.stargazers_count ?? 0,
    forks: api.forks_count ?? 0,
    license: spdxId && spdxId !== 'NOASSERTION' ? spdxId : null,
    avatarUrl: api.owner?.avatar_url ?? null,
  };
}

// The unauthenticated GitHub API allows 60 requests/hour per IP, so cache
// responses for the session (17+ cards across the site) instead of refetching.
function fetchRepo(repo: string): Promise<GitHubRepoData> {
  const cached = readRepoCache(repo);
  if (cached) return Promise.resolve(cached);
  let pending = pendingRepos.get(repo);
  if (!pending) {
    pending = fetch(`https://api.github.com/repos/${repo}`, { referrerPolicy: 'no-referrer' })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json() as Promise<GitHubRepoApi>;
      })
      .then((api) => {
        const data = normalizeRepo(api);
        writeRepoCache(repo, data);
        return data;
      })
      .finally(() => {
        pendingRepos.delete(repo);
      });
    pendingRepos.set(repo, pending);
  }
  return pending;
}

export default function GitHub({ repo, className }: GitHubProps) {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const [data, setData] = useState<GitHubRepoData | null>(null);
  const [failed, setFailed] = useState(false);

  const [owner, repoName = ''] = useMemo(() => repo.split('/'), [repo]);

  useEffect(() => {
    if (!owner || !repoName) {
      setFailed(true);
      return;
    }
    let alive = true;
    setData(null);
    setFailed(false);
    fetchRepo(`${owner}/${repoName}`).then(
      (result) => alive && setData(result),
      () => alive && setFailed(true)
    );
    return () => {
      alive = false;
    };
  }, [owner, repoName]);

  const avatar = useImageStatus(data?.avatarUrl ?? undefined);

  const loading = !data && !failed;
  const languageColor = data?.language ? LANGUAGE_COLORS[data.language] : undefined;

  return (
    <Card
      href={`https://github.com/${owner}/${repoName}`}
      target="_blank"
      rel="noopener noreferrer"
      wrapperClassName={styles.wrapper}
      className={clsx(styles.card, className)}
      aria-busy={loading || undefined}
    >
      <div className={styles.titleBar}>
        <div className={styles.titleLeft}>
          <span className={styles.owner}>
            {loading ? (
              <Skeleton className={styles.avatar} />
            ) : data?.avatarUrl && avatar.status !== 'error' ? (
              <img
                ref={avatar.imgRef}
                src={data.avatarUrl}
                alt=""
                className={clsx(styles.avatar, styles.avatarImg)}
                onLoad={avatar.onLoad}
                onError={avatar.onError}
              />
            ) : (
              <span className={clsx(styles.avatar, styles.avatarFallback)} aria-hidden="true">
                {owner.charAt(0).toUpperCase()}
              </span>
            )}
            <span className={styles.ownerName}>{owner}</span>
          </span>
          <span className={styles.divider} aria-hidden="true">
            /
          </span>
          <span className={styles.repo}>{repoName}</span>
        </div>
        <Icon icon="octicon:mark-github-16" className={styles.mark} aria-hidden="true" />
      </div>

      {failed ? (
        <div className={styles.errorNote}>
          <Icon icon="octicon:alert-16" className={styles.errorIcon} aria-hidden="true" />
          {ERROR_LABEL}
        </div>
      ) : (
        <>
          <div
            className={clsx(
              styles.description,
              data && !data.description && styles.descriptionEmpty
            )}
          >
            {data ? (
              (data.description ?? NO_DESCRIPTION_LABEL)
            ) : (
              <Skeleton className={styles.descriptionGhost} radius={6} />
            )}
          </div>
          <div className={styles.meta}>
            {data ? (
              <>
                <span className={styles.metaItem} title={STARS_LABEL}>
                  <Icon icon="octicon:star-16" className={styles.metaIcon} aria-hidden="true" />
                  {formatCompact(data.stars, currentLocale)}
                  <span className={styles.srOnly}>{STARS_LABEL}</span>
                </span>
                <span className={styles.metaItem} title={FORKS_LABEL}>
                  <Icon
                    icon="octicon:repo-forked-16"
                    className={styles.metaIcon}
                    aria-hidden="true"
                  />
                  {formatCompact(data.forks, currentLocale)}
                  <span className={styles.srOnly}>{FORKS_LABEL}</span>
                </span>
                {data.license && (
                  <span className={styles.metaItem} title={LICENSE_LABEL}>
                    <Icon icon="octicon:law-16" className={styles.metaIcon} aria-hidden="true" />
                    {data.license}
                    <span className={styles.srOnly}>{LICENSE_LABEL}</span>
                  </span>
                )}
                {data.language && (
                  <span className={styles.metaItem} title={LANGUAGE_LABEL}>
                    <span
                      className={styles.languageDot}
                      style={languageColor ? { backgroundColor: languageColor } : undefined}
                      aria-hidden="true"
                    />
                    <span className={styles.languageName}>{data.language}</span>
                    <span className={styles.srOnly}>{LANGUAGE_LABEL}</span>
                  </span>
                )}
              </>
            ) : (
              <>
                <Skeleton className={styles.metaGhost} radius={6} />
                <Skeleton className={styles.metaGhost} radius={6} />
                <Skeleton className={clsx(styles.metaGhost, styles.metaGhostWide)} radius={6} />
              </>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
