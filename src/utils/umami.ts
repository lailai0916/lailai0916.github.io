const UMAMI_BASE = 'https://analytics.lailai.one';
const UMAMI_SHARE_SLUG = 'DDd09iBEYOQw2k9L';

const SESSION_STORAGE_KEY = 'umami_share_session_v1';
const SESSION_TTL_MS = 60 * 60 * 1000;

export interface ShareSession {
  token: string;
  websiteId: string;
}

interface CachedSession {
  data: ShareSession;
  expiresAt: number;
}

let pendingSession: Promise<ShareSession> | null = null;

function readSessionCache(): ShareSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw) as CachedSession;
    if (
      !cached ||
      typeof cached.expiresAt !== 'number' ||
      cached.expiresAt <= Date.now() ||
      !cached.data?.token ||
      !cached.data?.websiteId
    ) {
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

function writeSessionCache(data: ShareSession): void {
  if (typeof window === 'undefined') return;
  try {
    const cached: CachedSession = {
      data,
      expiresAt: Date.now() + SESSION_TTL_MS,
    };
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(cached));
  } catch {
    // sessionStorage may be unavailable
  }
}

async function fetchShareSession(): Promise<ShareSession> {
  const res = await fetch(
    `${UMAMI_BASE}/api/share/${encodeURIComponent(UMAMI_SHARE_SLUG)}`
  );
  if (!res.ok) {
    throw new Error(`Umami share session request failed: ${res.status}`);
  }
  const data = (await res.json()) as Partial<ShareSession>;
  if (!data.token || !data.websiteId) {
    throw new Error('Umami share session response missing token or websiteId');
  }
  const session: ShareSession = {
    token: data.token,
    websiteId: data.websiteId,
  };
  writeSessionCache(session);
  return session;
}

export async function getShareSession(): Promise<ShareSession> {
  const cached = readSessionCache();
  if (cached) return cached;
  if (pendingSession) return pendingSession;

  pendingSession = fetchShareSession().finally(() => {
    pendingSession = null;
  });
  return pendingSession;
}

type SearchParamValue = string | number | boolean | undefined | null;

function buildSearch(params?: Record<string, SearchParamValue>): string {
  if (!params) return '';
  const entries = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== ''
  );
  if (entries.length === 0) return '';
  const usp = new URLSearchParams();
  for (const [k, v] of entries) {
    usp.set(k, String(v));
  }
  return `?${usp.toString()}`;
}

export async function umamiFetch(
  pathTemplate: string,
  params?: Record<string, SearchParamValue>,
  init?: Omit<RequestInit, 'headers'>
): Promise<Response> {
  const session = await getShareSession();
  const path = pathTemplate.replace('{id}', session.websiteId);
  const url = `${UMAMI_BASE}${path}${buildSearch(params)}`;

  return fetch(url, {
    ...init,
    headers: {
      'x-umami-share-token': session.token,
      'x-umami-share-context': '1',
    },
  });
}

export async function umamiFetchJson<T>(
  pathTemplate: string,
  params?: Record<string, SearchParamValue>,
  init?: Omit<RequestInit, 'headers'>
): Promise<T> {
  const res = await umamiFetch(pathTemplate, params, init);
  if (!res.ok) {
    throw new Error(`Umami request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}
