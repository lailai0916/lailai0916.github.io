import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';
import { mergeSearchStrings } from '@docusaurus/theme-common';
import { useAlternatePageUtils, useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import Hint from '@lailai0916/ui/Hint';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import NavbarLogo from '@theme/Navbar/Logo';
import { useMobileNavbarItems } from '../items';
import styles from './styles.module.css';

function LanguageCycleButton({ queryString }: { queryString?: string }): ReactNode {
  const {
    siteConfig,
    i18n: { currentLocale, locales, localeConfigs },
  } = useDocusaurusContext();
  const { createUrl } = useAlternatePageUtils();
  const { search, hash } = useLocation();
  const mobileSidebar = useNavbarMobileSidebar();

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
        className={clsx(styles.control, styles.language)}
        data-locale={currentLocale}
        to={to}
        target="_self"
        autoAddBaseUrl={false}
        hrefLang={nextConfig.htmlLang}
        aria-label={label}
        onClick={() => mobileSidebar.toggle()}
      >
        <span aria-hidden="true">{currentLocale === 'zh-Hans' ? '中' : 'EN'}</span>
      </Link>
    </Hint>
  );
}

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className={clsx('clean-btn navbar-sidebar__close', styles.control, styles.closeButton)}
      onClick={() => mobileSidebar.toggle()}
    >
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  );
}

export default function NavbarMobileSidebarHeader(): ReactNode {
  const { localeItem, githubItem } = useMobileNavbarItems();
  const mobileSidebar = useNavbarMobileSidebar();
  const githubLabel = translate({
    id: 'components.navbar.github.ariaLabel',
    message: 'GitHub repository',
  });

  return (
    <div className={clsx('navbar-sidebar__brand', styles.brand)}>
      <NavbarLogo />
      <div className={styles.actions}>
        {localeItem && <LanguageCycleButton queryString={localeItem.queryString} />}
        <NavbarColorModeToggle />
        {githubItem?.href && (
          <Hint label={githubLabel}>
            <Link
              href={githubItem.href}
              target={githubItem.target}
              rel={githubItem.rel}
              className={clsx(githubItem.className, styles.control)}
              aria-label={githubLabel}
              onClick={() => mobileSidebar.toggle()}
            />
          </Hint>
        )}
      </div>
      <CloseButton />
    </div>
  );
}
