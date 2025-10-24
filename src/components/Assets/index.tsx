import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { assets as buildUrl } from '@site/src/utils/assets';

const cdnBase = 'https://raw.githubusercontent.com/lailai0916/assets/main';

interface AssetsProps {
  file: string;
  path?: string;
  type?: 'image' | 'video';
  [key: string]: any;
}

export default function Assets({
  file,
  path,
  type = 'image',
  ...props
}: AssetsProps) {
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
    <img src={src} {...props} />
  );
}
