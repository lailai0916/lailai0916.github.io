import { type ReactNode } from 'react';
import clsx from 'clsx';
import { useThemeConfig, useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemContent from '@theme/DocItem/Content';
import ContentVisibility from '@theme/ContentVisibility';
import type { Props } from '@theme/DocItem/Layout';
import Actions from '@site/src/components/Article/Actions';
import TableOfContents from '@site/src/components/Article/TableOfContents';
import DocTopRow from '@site/src/theme/DocShared';
import sharedStyles from '@site/src/theme/DocShared/styles.module.css';
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
  const minHeadingLevel = frontMatter.toc_min_heading_level ?? tableOfContents.minHeadingLevel;
  const maxHeadingLevel = frontMatter.toc_max_heading_level ?? tableOfContents.maxHeadingLevel;
  const filteredToc = toc.filter(
    (item) => item.level >= minHeadingLevel && item.level <= maxHeadingLevel
  );
  const canRender = !hidden && filteredToc.length > 0;
  const mobile =
    canRender && (windowSize === 'mobile' || windowSize === 'ssr') ? (
      <div className={styles.docTocMobile}>
        <TableOfContents toc={filteredToc} withCard={false} collapsible />
      </div>
    ) : undefined;
  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <TableOfContents toc={filteredToc} withCard={false} />
    ) : undefined;
  return { hidden, mobile, desktop };
}

export default function DocItemLayout({ children }: Props): ReactNode {
  const docTOC = useDocTOC();
  const { metadata } = useDoc();
  return (
    <div className="row">
      <div className={clsx('col', !docTOC.hidden && sharedStyles.docColumn)}>
        <ContentVisibility metadata={metadata} />
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocTopRow>
              <Actions
                source={metadata.source}
                editUrl={typeof metadata.editUrl === 'string' ? metadata.editUrl : undefined}
              />
            </DocTopRow>
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
