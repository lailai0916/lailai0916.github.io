// Install before the deferred tracker so its first request follows the same policy.
export function installAnalyticsPolicy() {
  type Payload = Record<string, unknown>;
  const host = window as Window & {
    lailaiAnalyticsUrl?: (value: unknown) => string | undefined;
    lailaiBeforeSend?: (type: string, payload: Payload) => Payload | null;
  };
  const campaigns = new Set([
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ]);
  let previousPage = '';

  function cleanUrl(value: unknown): string | undefined {
    if (typeof value !== 'string' || !value) return undefined;
    try {
      const url = new URL(value, window.location.href);
      const query = new URLSearchParams();
      for (const [key, item] of url.searchParams) {
        if (campaigns.has(key)) query.append(key, item.slice(0, 200));
      }
      url.search = query.toString();
      url.hash = '';
      url.username = '';
      url.password = '';
      return url.origin === window.location.origin ? url.pathname + url.search : url.href;
    } catch {
      return undefined;
    }
  }

  host.lailaiAnalyticsUrl = cleanUrl;
  host.lailaiBeforeSend = (type, payload) => {
    if (window.self !== window.top) return null;
    const url = cleanUrl(payload.url);
    const referrer = cleanUrl(payload.referrer);
    const next: Payload = { ...payload, url, referrer };
    if (url && /^\/(?:zh-Hans\/)?search\/?$/.test(new URL(url, window.location.href).pathname)) {
      next.title = url.startsWith('/zh-Hans/') ? "搜索 | lailai's Home" : "Search | lailai's Home";
    }
    // Queries and fragments are states of one page, not additional pageviews.
    if (type === 'event' && !payload.name && url) {
      const page = new URL(url, window.location.href).pathname.replace(/\/$/, '') || '/';
      if (page === previousPage) return null;
      previousPage = page;
    }
    return next;
  };
}
