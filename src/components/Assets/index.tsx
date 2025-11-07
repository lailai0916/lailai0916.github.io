import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

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

function normalizeLogicalPath(
  pathname: string,
  baseUrl = '/',
  locale = ''
): string {
  let p = pathname;
  if (baseUrl !== '/' && p.startsWith(baseUrl)) p = p.slice(baseUrl.length - 1);

  const pref = `/${locale}`;
  if (p === pref) return '/';
  if (p.startsWith(`${pref}/`)) {
    p = p.slice(pref.length);
  }

  if (p.endsWith('.html')) p = p.replace(/\.html$/, '');
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p || '/';
}

function buildUrl(file: string, ctx: AssetsCtx): string {
  const { pathname, assetsCdnBase, baseUrl = '/', locale = '' } = ctx;
  const logical = normalizeLogicalPath(pathname, baseUrl, locale);
  const fileClean = file.replace(/^\/+/, '');
  return joinUrl(assetsCdnBase, logical === '/' ? '' : logical, fileClean);
}

const cdnBase = 'https://raw.githubusercontent.com/lailai0916/assets/main';

export default function Assets({ file, path, type = 'image', ...props }) {
  const { pathname } = useLocation();
  const { siteConfig, i18n } = useDocusaurusContext();

  const src = buildUrl(file, {
    pathname: path ?? pathname,
    baseUrl: siteConfig.baseUrl,
    locale: i18n.currentLocale,
    assetsCdnBase: cdnBase,
  });

  return type === 'video' ? (
    <video src={src} {...props} />
  ) : (
    <img src={src} loading="lazy" {...props} />
  );
}
