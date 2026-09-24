import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';
import shared from '@site/src/components/Article/styles.module.css';
import styles from './styles.module.css';

export default function DocBreadcrumbs(): ReactNode {
  const breadcrumbs = useSidebarBreadcrumbs();
  const homePageRoute = useHomePageRoute();
  const homeHref = useBaseUrl('/');

  if (!breadcrumbs) return null;

  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(ThemeClassNames.docs.docBreadcrumbs, styles.breadcrumbsContainer)}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}
      >
        <ol className={styles.breadcrumbs}>
          {homePageRoute && (
            <li className={styles.homeItem}>
              <Link
                href={homeHref}
                className={clsx(shared.iconBtn, styles.homeLink)}
                aria-label={translate({
                  id: 'theme.docs.breadcrumbs.home',
                  message: 'Home page',
                  description: 'The ARIA label for the home page in the breadcrumbs',
                })}
              >
                <Icon icon="lucide:house" width={18} height={18} aria-hidden="true" />
              </Link>
            </li>
          )}
          {breadcrumbs.map((item, index) => {
            const current = index === breadcrumbs.length - 1;
            const href = item.type === 'category' && item.linkUnlisted ? undefined : item.href;
            return (
              <li
                key={index}
                className={clsx(styles.item, current && styles.closest)}
                aria-current={current ? 'page' : undefined}
              >
                {!current && href ? (
                  <Link href={href} className={styles.link}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.unlinked}>{item.label}</span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
