import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { mergeSearchStrings, useHistorySelector } from '@docusaurus/theme-common';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import Hint from '@lailai0916/ui/Hint';
import styles from './styles.module.css';

interface Props {
  queryString?: string;
  onClick?: () => void;
}

export default function NavbarLanguageToggle({ queryString, onClick }: Props): ReactNode {
  const {
    siteConfig,
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const { createUrl } = useAlternatePageUtils();
  const search = useHistorySelector((history) => history.location.search);
  const hash = useHistorySelector((history) => history.location.hash);

  if (locales.length < 2) return null;

  const nextLocale = locales[(locales.indexOf(currentLocale) + 1) % locales.length];
  const nextConfig = localeConfigs[nextLocale];
  const fullyQualified = nextConfig.url !== siteConfig.url;
  const pathname = createUrl({ locale: nextLocale, fullyQualified });
  const to = `${fullyQualified ? '' : 'pathname://'}${pathname}${mergeSearchStrings(
    [search, queryString],
    'append'
  )}${hash}`;
  const label = translate(
    {
      id: 'components.navbar.language.ariaLabel',
      message: 'Current language: {currentLanguage}. Switch to {nextLanguage}',
    },
    {
      currentLanguage: localeConfigs[currentLocale].label,
      nextLanguage: nextConfig.label,
    }
  );

  return (
    <Hint label={label}>
      <Link
        className={clsx('navbar-control', styles.language)}
        data-locale={currentLocale}
        to={to}
        target="_self"
        autoAddBaseUrl={false}
        hrefLang={nextConfig.htmlLang}
        aria-label={label}
        onClick={onClick}
      >
        <span aria-hidden="true">{currentLocale === 'zh-Hans' ? '中' : 'EN'}</span>
      </Link>
    </Hint>
  );
}
