export type AnalyticsSurface =
  | 'home'
  | 'about'
  | 'article'
  | 'moments'
  | 'resources'
  | 'friends'
  | 'friend_posts'
  | 'footer'
  | 'navbar'
  | 'sidebar'
  | 'insights'
  | 'settings'
  | 'travel'
  | 'overview'
  | 'playground'
  | 'search_modal'
  | 'search_page'
  | 'archive'
  | 'content';

type FeatureActions = {
  article: 'print_dialog';
  article_contents: 'open' | 'close' | 'navigate';
  article_summary: 'open' | 'close';
  avatar: 'drag';
  code_wrap: 'set';
  confetti: 'activate';
  data: 'retry';
  fourier_transform: 'reset' | 'clear' | 'pause' | 'resume';
  globe: 'reset_view' | 'toggle_rotation' | 'retry';
  image_gallery: 'previous' | 'next';
  image_viewer: 'open' | 'close';
  konami: 'activate';
  lorenz_attractor: 'reset' | 'pause' | 'resume' | 'set_parameter';
  mascot: 'show' | 'hide';
  mobile_navigation: 'open' | 'close';
  moments_feed: 'load_more';
  neural_network: 'reset' | 'clear' | 'preprocess' | 'run';
  popular_posts: 'retry';
};

type FeatureEvent = {
  [Feature in keyof FeatureActions]: {
    surface: AnalyticsSurface;
    feature: Feature;
    action: FeatureActions[Feature];
    item_id?: string;
    value?: string | number | boolean;
  };
}[keyof FeatureActions];

type EventData = {
  outbound_click: {
    surface: AnalyticsSurface;
    destination_host: string;
    item_id?: string;
    target_path?: string;
    from_search?: boolean;
  };
  copy_success: {
    surface: AnalyticsSurface;
    format: 'code' | 'markdown';
    language?: string;
  };
  feed_click: {
    surface: AnalyticsSurface;
    format: 'rss' | 'atom' | 'json';
  };
  contact_click: {
    surface: AnalyticsSurface;
    contact: string;
    item_id?: string;
  };
  search_completed: {
    surface: AnalyticsSurface;
    result_count: number;
    result_kind: 'records' | 'resources' | 'articles';
    scope?: string;
  };
  search_result_click: {
    surface: AnalyticsSurface;
    target_path: string;
    position?: number;
    result_kind: 'records' | 'resources' | 'articles';
    scope?: string;
  };
  preference_change: {
    surface: AnalyticsSurface;
    preference:
      | 'theme'
      | 'language'
      | 'accent_color'
      | 'font_family'
      | 'font_size'
      | 'line_height'
      | 'classic_design'
      | 'gray_mode'
      | 'debug_mode'
      | 'reset';
    value: string | number | boolean;
  };
  filter_change: {
    surface: AnalyticsSurface;
    filter: 'category' | 'year' | 'tag' | 'time_range';
    value: string | number | boolean;
  };
  feature_use: FeatureEvent;
};

const EVENT_FIELDS: Record<keyof EventData, readonly string[]> = {
  outbound_click: ['surface', 'destination_host', 'item_id', 'target_path', 'from_search'],
  copy_success: ['surface', 'format', 'language'],
  feed_click: ['surface', 'format'],
  contact_click: ['surface', 'contact', 'item_id'],
  search_completed: ['surface', 'result_count', 'result_kind', 'scope'],
  search_result_click: ['surface', 'target_path', 'position', 'result_kind', 'scope'],
  preference_change: ['surface', 'preference', 'value'],
  filter_change: ['surface', 'filter', 'value'],
  feature_use: ['surface', 'feature', 'action', 'item_id', 'value'],
};

type Payload = Record<string, unknown>;
type AnalyticsWindow = Window & {
  lailaiAnalyticsUrl?: (value: unknown) => string | undefined;
  umami?: {
    track: (callback: (payload: Payload) => Payload) => Promise<void> | void;
  };
};

interface PendingEvent {
  createdAt: number;
  name: keyof EventData;
  data: Record<string, string | number | boolean>;
  url: string;
  title: string;
  referrer?: string;
}

const pendingEvents: PendingEvent[] = [];
let waitingForTracker = false;

const WEBSITE_HOSTS = new Set([
  'lailai.one',
  'www.lailai.one',
  'lailai0916.com',
  'www.lailai0916.com',
  'lailai0916.github.io',
  'lailaislisqahvs2hhcibshrsnt4hfuoxcsmgasclnh73zy3efy4syqd.onion',
]);

export function isWebsiteHost(hostname: string): boolean {
  return (
    WEBSITE_HOSTS.has(hostname.toLowerCase()) ||
    (typeof window !== 'undefined' && hostname === window.location.hostname)
  );
}

export function normalizeContentPath(value: string): string {
  try {
    const pathname = new URL(value, 'https://lailai.one').pathname;
    return pathname.replace(/^\/zh-Hans(?=\/|$)/, '').replace(/\/$/, '') || '/';
  } catch {
    return '/';
  }
}

export function getAnalyticsTracker() {
  if (typeof window === 'undefined' || window.self !== window.top) return undefined;
  // A development preview must never send its tests to the production website.
  if (
    !document.querySelector('script[data-website-id][src="https://analytics.lailai.one/script.js"]')
  ) {
    return undefined;
  }
  return (window as AnalyticsWindow).umami;
}

function sendEvent(event: PendingEvent): void {
  const tracker = getAnalyticsTracker();
  if (!tracker) return;
  void Promise.resolve(
    tracker.track((payload) => ({
      ...payload,
      url: event.url,
      title: event.title,
      ...(event.referrer === undefined ? {} : { referrer: event.referrer }),
      name: event.name,
      data: event.data,
    }))
  ).catch(() => {});
}

function waitForTracker(): void {
  if (waitingForTracker) return;
  const script = document.querySelector<HTMLScriptElement>(
    'script[data-website-id][src="https://analytics.lailai.one/script.js"]'
  );
  if (!script) return;
  waitingForTracker = true;
  script.addEventListener(
    'load',
    () => {
      waitingForTracker = false;
      const now = Date.now();
      for (const event of pendingEvents.splice(0)) {
        if (now - event.createdAt < 15000) {
          try {
            sendEvent(event);
          } catch {
            // Failed analytics requests are not retried or persisted.
          }
        }
      }
    },
    { once: true }
  );
  script.addEventListener(
    'error',
    () => {
      pendingEvents.length = 0;
    },
    { once: true }
  );
}

export function trackEvent<Name extends keyof EventData>(name: Name, data: EventData[Name]): void {
  try {
    if (typeof window === 'undefined' || window.self !== window.top) return;
    if (
      !document.querySelector(
        'script[data-website-id][src="https://analytics.lailai.one/script.js"]'
      )
    )
      return;
    const path = window.location.pathname;
    const tracker = getAnalyticsTracker();
    const details: Record<string, string | number | boolean> = {
      event_version: 1,
      locale: /^\/zh-Hans(?:\/|$)/.test(path) ? 'zh-Hans' : 'en',
      content_path: normalizeContentPath(path),
    };
    for (const [key, value] of Object.entries(data)) {
      if (!EVENT_FIELDS[name].includes(key)) continue;
      if (typeof value === 'string') details[key] = value.slice(0, 200);
      else if (typeof value === 'boolean') details[key] = value;
      else if (typeof value === 'number' && Number.isFinite(value)) details[key] = value;
    }
    const event: PendingEvent = {
      createdAt: Date.now(),
      name,
      data: details,
      url: (window as AnalyticsWindow).lailaiAnalyticsUrl?.(window.location.href) ?? path,
      title: /^\/(?:zh-Hans\/)?search\/?$/.test(path) ? 'Search' : document.title,
      ...(!tracker && {
        referrer: (window as AnalyticsWindow).lailaiAnalyticsUrl?.(document.referrer) ?? '',
      }),
    };
    if (tracker) sendEvent(event);
    else {
      // Retain only a short, bounded in-memory buffer while the deferred script loads.
      pendingEvents.push(event);
      if (pendingEvents.length > 40) pendingEvents.shift();
      waitForTracker();
    }
  } catch {
    // Content blockers and unavailable analytics must not interrupt the action.
  }
}
