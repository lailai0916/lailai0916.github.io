import React from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { assets as buildUrl } from '@site/src/utils/assets';

type ImgProps = Omit<React.ComponentPropsWithoutRef<'img'>, 'src'> & {
  file: string;
};

export default function Assets({ file, ...props }: ImgProps) {
  const { pathname } = useLocation();
  const { siteConfig, i18n } = useDocusaurusContext();
  const cdnBase = 'https://raw.githubusercontent.com/lailai0916/assets/main';

  const src = buildUrl(file, {
    pathname,
    baseUrl: siteConfig.baseUrl,
    locale: i18n.currentLocale,
    assetsCdnBase: cdnBase,
  });

  return <img src={src} {...props} />;
}
