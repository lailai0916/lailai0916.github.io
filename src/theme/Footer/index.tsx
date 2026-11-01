import { type ReactNode } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import {
  isMultiColumnFooterLinks,
  ThemeClassNames,
  useThemeConfig,
} from '@docusaurus/theme-common';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLinkItem from '@theme/Footer/LinkItem';
import Hint from '@lailai0916/ui/Hint';
import Icon from '@lailai0916/ui/Icon';
import styles from './styles.module.css';

const FOOTER_DESCRIPTION = translate({
  id: 'components.footer.description',
  message:
    'A personal website for sharing technical notes, project experience, and learning insights.',
});

const SITE_INFORMATION_LABEL = translate({
  id: 'components.footer.siteInformation',
  message: 'Site information',
});

const REPOSITORY_LABEL = translate({
  id: 'components.footer.viewSource',
  message: 'View source on GitHub',
});

const FOOTER_NAVIGATION_LABEL = translate({
  id: 'components.footer.navigation',
  message: 'Footer navigation',
});

const FEED_NAVIGATION_LABEL = translate({
  id: 'components.footer.feeds.ariaLabel',
  message: 'Source code and feed subscriptions',
});

const RSS_FEED_LABEL = translate({
  id: 'components.footer.feeds.rss',
  message: 'RSS',
});

const ATOM_FEED_LABEL = translate({
  id: 'components.footer.feeds.atom',
  message: 'Atom',
});

const JSON_FEED_LABEL = translate({
  id: 'components.footer.feeds.json',
  message: 'JSON',
});

const LICENSE_NOTICE = translate({
  id: 'components.footer.licenseNotice',
  message: "This website's content is licensed under",
});

const LICENSE_LABEL = translate({
  id: 'components.footer.licenseLabel',
  message: 'CC BY 4.0',
});

export default function Footer(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const { footer } = useThemeConfig();
  const titleAccentStart = siteConfig.title.lastIndexOf(' ') + 1;
  const titleBase = siteConfig.title.slice(0, titleAccentStart);
  const titleAccent = siteConfig.title.slice(titleAccentStart);
  const feeds = [
    {
      format: 'rss',
      label: RSS_FEED_LABEL,
      href: useBaseUrl('/blog/rss.xml', { absolute: true }),
    },
    {
      format: 'atom',
      label: ATOM_FEED_LABEL,
      href: useBaseUrl('/blog/atom.xml', { absolute: true }),
    },
    {
      format: 'json',
      label: JSON_FEED_LABEL,
      href: useBaseUrl('/blog/feed.json', { absolute: true }),
    },
  ];

  if (!footer) {
    return null;
  }

  const columns = isMultiColumnFooterLinks(footer.links) ? footer.links : [];

  return (
    <footer
      className={clsx(ThemeClassNames.layout.footer.container, 'footer', styles.footer)}
      data-analytics-surface="footer"
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <section className={styles.brand} aria-label={SITE_INFORMATION_LABEL}>
            <h2 className={styles.title}>
              {titleBase}
              <span className={styles.titleAccent}>{titleAccent}</span>
            </h2>
            <p className={styles.description}>{FOOTER_DESCRIPTION}</p>
            <nav className={styles.feeds} aria-label={FEED_NAVIGATION_LABEL}>
              <ul className={styles.feedList}>
                <li className={styles.feedItem}>
                  <Hint label={REPOSITORY_LABEL}>
                    <Link
                      href="https://github.com/lailai0916/lailai0916.github.io"
                      aria-label={REPOSITORY_LABEL}
                      data-lk-icon-button="xs"
                    >
                      <Icon icon="simple-icons:github" width={16} height={16} aria-hidden />
                    </Link>
                  </Hint>
                </li>
                {feeds.map((feed) => {
                  const label = translate(
                    {
                      id: 'components.footer.feeds.subscribe',
                      message: 'Subscribe via {format}',
                    },
                    { format: feed.label }
                  );

                  return (
                    <li key={feed.href} className={styles.feedItem}>
                      <span className={styles.feedDivider} aria-hidden="true">
                        ·
                      </span>
                      <Hint label={label}>
                        <a
                          className={styles.metaLink}
                          href={feed.href}
                          aria-label={label}
                          data-analytics-event="feed_click"
                          data-analytics-format={feed.format}
                        >
                          {feed.label}
                        </a>
                      </Hint>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </section>

          {columns.length > 0 && (
            <nav className={styles.groups} aria-label={FOOTER_NAVIGATION_LABEL}>
              {columns.map((column, columnIndex) => (
                <section key={column.title ?? columnIndex} className={styles.group}>
                  {column.title && <h2 className={styles.groupTitle}>{column.title}</h2>}
                  <ul className={styles.groupList}>
                    {column.items.map((item, itemIndex) => (
                      <li
                        key={item.label ?? item.to ?? item.href ?? itemIndex}
                        className={styles.item}
                      >
                        <FooterLinkItem item={item} />
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </nav>
          )}
        </div>

        <div className={styles.bottom}>
          {footer.copyright && (
            <div className={styles.copyright}>
              <FooterCopyright copyright={footer.copyright} />
            </div>
          )}

          <p className={styles.license}>
            {LICENSE_NOTICE}{' '}
            <span className={styles.licenseTerms}>
              <a className={styles.metaLink} href="https://creativecommons.org/licenses/by/4.0/">
                {LICENSE_LABEL}
              </a>{' '}
              <span className={styles.licenseIcons} aria-hidden="true">
                <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" />
                <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" />
              </span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
