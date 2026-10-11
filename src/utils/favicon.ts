export function getFaviconUrl(href: string): string | undefined {
  try {
    const url = new URL(href);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined;
    // Use the resume's retained immutable favicon instead of Google's cached fallback.
    if (url.hostname === 'resume.lailai.one') {
      return 'https://resume.lailai.one/assets/favicon.7423c7ab24d5.svg';
    }
    return `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(url.hostname)}`;
  } catch {
    return undefined;
  }
}
