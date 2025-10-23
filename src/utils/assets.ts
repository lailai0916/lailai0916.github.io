// 纯函数：把 pathname/baseUrl/locale 归一化为“镜像目录”，再拼 CDN URL
export type AssetsCtx = {
  pathname: string;
  assetsCdnBase: string;
  baseUrl?: string;
  locale?: string;
};

const trimSlashes = (s: string) => s.replace(/^\/+|\/+$/g, '');
const joinUrl = (...parts: string[]) =>
  parts
    .filter(Boolean)
    .map((p, i) => (i === 0 ? p.replace(/\/+$/, '') : trimSlashes(p)))
    .join('/');

export function normalizeLogicalPath(
  pathname: string,
  baseUrl = '/',
  locale = ''
): string {
  // 去 baseUrl
  let p = pathname;
  if (baseUrl !== '/' && p.startsWith(baseUrl)) p = p.slice(baseUrl.length - 1);

  // 去 i18n 前缀
  const pref = `/${locale}`;
  if (p === pref) return '/';
  if (p.startsWith(`${pref}/`)) {
    p = p.slice(pref.length);
  }

  // 去 .html 与末尾斜杠
  if (p.endsWith('.html')) p = p.replace(/\.html$/, '');
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

// 生成资源完整 URL
export function assets(file: string, ctx: AssetsCtx): string {
  const { pathname, assetsCdnBase, baseUrl = '/', locale = '' } = ctx;
  const logical = normalizeLogicalPath(pathname, baseUrl, locale); // 例：/blog/event/paintboard
  const fileClean = file.replace(/^\/+/, '');
  return joinUrl(assetsCdnBase, logical === '/' ? '' : logical, fileClean);
}
