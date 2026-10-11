export function getFaviconUrl(href: string): string | undefined {
  try {
    const url = new URL(href);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined;
    return `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(url.hostname)}`;
  } catch {
    return undefined;
  }
}
