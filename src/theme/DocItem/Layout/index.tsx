import { type ReactNode } from 'react';
import clsx from 'clsx';
import { useThemeConfig, useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import ContentVisibility from '@theme/ContentVisibility';
import type { Props } from '@theme/DocItem/Layout';
import Actions from '@site/src/components/Article/Actions';
import TableOfContents from '@site/src/components/Article/TableOfContents';
import styles from './styles.module.css';

// Swizzled over the stock layout to share the blog's article chrome: the
// "Copy Markdown" + "Edit this page" actions move to a small top-right row
// (paired with the breadcrumbs), and the swizzled DocItemFooter renders the
// blog-style tags + "last updated" footer at the bottom.
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const { tableOfContents } = useThemeConfig();
  const windowSize = useWindowSize();
  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;
  const mobile = canRender ? <DocItemTOCMobile /> : undefined;
  const minHeadingLevel = frontMatter.toc_min_heading_level ?? tableOfContents.minHeadingLevel;
  const maxHeadingLevel = frontMatter.toc_max_heading_level ?? tableOfContents.maxHeadingLevel;
  const desktopToc = toc.filter(
    (item) => item.level >= minHeadingLevel && item.level <= maxHeadingLevel
  );
  const desktop =
    canRender && desktopToc.length > 0 && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <TableOfContents toc={desktopToc} withCard={false} />
    ) : undefined;
  return { hidden, mobile, desktop };
}

export default function DocItemLayout({ children }: Props): ReactNode {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && styles.docItemCol)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <div className={styles.docTopRow}>
              <DocBreadcrumbs />
              <Actions
                source={metadata.source}
                editUrl={typeof metadata.editUrl === 'string' ? metadata.editUrl : undefined}
              />
            </div>
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && (
        <div className={clsx('col col--3', styles.docTocDesktop)}>{docTOC.desktop}</div>
      )}
    </div>
  );
}
