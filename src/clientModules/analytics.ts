import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { isWebsiteHost, trackEvent, type AnalyticsSurface } from '@site/src/utils/analytics';

function inherited(anchor: Element, name: string): string | undefined {
  return (
    anchor.closest(`[data-analytics-${name}]`)?.getAttribute(`data-analytics-${name}`) ?? undefined
  );
}

function surfaceOf(anchor: Element): AnalyticsSurface {
  const explicit = inherited(anchor, 'surface');
  if (explicit) return explicit as AnalyticsSurface;
  if (anchor.closest('footer')) return 'footer';
  if (anchor.closest('.navbar')) return 'navbar';
  if (anchor.closest('aside, .menu')) return 'sidebar';
  if (anchor.closest('.markdown')) return 'article';
  return 'content';
}

function onLinkActivation(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    (event.type === 'auxclick' ? event.button !== 1 : event.button !== 0)
  )
    return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const anchor = target.closest<HTMLAnchorElement>('a[href]');
  if (!anchor || inherited(anchor, 'ignore') === 'true') return;
  let url: URL;
  try {
    url = new URL(anchor.href);
  } catch {
    return;
  }
  const surface = surfaceOf(anchor);
  const item_id = inherited(anchor, 'id');
  const eventName = inherited(anchor, 'event');
  if (eventName === 'contact_click' || url.protocol === 'mailto:' || url.protocol === 'tel:') {
    trackEvent('contact_click', {
      surface,
      contact: item_id ?? (url.protocol === 'tel:' ? 'phone' : 'email'),
      ...(item_id && { item_id }),
    });
    return;
  }
  const format = inherited(anchor, 'format');
  if (eventName === 'feed_click' && (format === 'rss' || format === 'atom' || format === 'json')) {
    trackEvent('feed_click', { surface, format });
    return;
  }
  if (!['http:', 'https:'].includes(url.protocol) || isWebsiteHost(url.hostname)) return;
  trackEvent('outbound_click', {
    surface,
    destination_host: url.hostname,
    ...(item_id && { item_id }),
    ...(inherited(anchor, 'from-search') !== undefined && {
      from_search: inherited(anchor, 'from-search') === 'true',
    }),
    // Friend posts are public article URLs; other destinations expose only their host.
    ...(surface === 'friend_posts' && { target_path: url.pathname }),
  });
}

if (ExecutionEnvironment.canUseDOM) {
  const host = window as Window & { lailaiLinkAnalytics?: (event: MouseEvent) => void };
  if (host.lailaiLinkAnalytics) {
    document.removeEventListener('click', host.lailaiLinkAnalytics);
    document.removeEventListener('auxclick', host.lailaiLinkAnalytics);
  }
  host.lailaiLinkAnalytics = onLinkActivation;
  document.addEventListener('click', onLinkActivation);
  document.addEventListener('auxclick', onLinkActivation);
}
