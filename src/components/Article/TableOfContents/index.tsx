import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import Link from '@docusaurus/Link';
import { useTOCHighlight, type TOCHighlightConfig } from '@docusaurus/theme-common/internal';
import type { TOCItem } from '@docusaurus/mdx-loader';
import { translate } from '@docusaurus/Translate';
import Card from '@lailai0916/ui/Card';
import styles from './styles.module.css';

const CONTENTS_LABEL = translate({
  id: 'components.tableOfContents.title',
  message: 'Contents',
});
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return Math.min(1, Math.max(0, progress));
}

function ReadingProgress({ progress }: { progress: number }) {
  const percent = Math.round(progress * 100);
  return (
    <div
      className={styles.tocProgress}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={translate(
        {
          id: 'components.tableOfContents.progress',
          message: 'Reading progress: {percent}%',
        },
        { percent: String(percent) }
      )}
    >
      <div className={styles.tocProgressFill} style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

export default function TableOfContents({
  toc,
  withCard = true,
  collapsible = false,
}: {
  toc: readonly TOCItem[];
  withCard?: boolean;
  collapsible?: boolean;
}) {
  const progress = useScrollProgress();
  const linkClassName = collapsible ? 'article-toc-link-collapsible' : 'article-toc-link-full';
  const highlightConfig = useMemo<TOCHighlightConfig | undefined>(() => {
    if (!toc.length) return undefined;
    const levels = toc.map((item) => item.level);
    return {
      linkClassName,
      linkActiveClassName: styles.tocLinkActive,
      minHeadingLevel: Math.min(...levels),
      maxHeadingLevel: Math.max(...levels),
    };
  }, [toc, linkClassName]);

  useTOCHighlight(highlightConfig);

  const header = (
    <>
      <span className={styles.tocHeaderTitle}>{CONTENTS_LABEL}</span>
      <span className={styles.tocHeaderPercent}>{Math.round(progress * 100)}%</span>
    </>
  );
  const body = (
    <>
      <ReadingProgress progress={progress} />
      {toc.length > 0 && (
        <ul className={styles.tocList}>
          {toc.map((item) => {
            const level = Math.min(Math.max(item.level, 2), 6);
            return (
              <li key={item.id} className={clsx(styles.tocItem, styles[`tocItemL${level}`])}>
                <Link
                  to={`#${encodeURIComponent(item.id)}`}
                  className={clsx(styles.tocLink, linkClassName)}
                  dangerouslySetInnerHTML={{ __html: item.value }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
  const content = (
    <>
      <div className={styles.tocHeader}>{header}</div>
      {body}
    </>
  );

  return (
    <nav
      className={clsx(styles.tocContainer, collapsible && styles.tocContainerCollapsible)}
      aria-label={CONTENTS_LABEL}
    >
      {collapsible ? (
        <details className={styles.tocDisclosure}>
          <summary className={styles.tocDisclosureSummary}>
            {header}
            <span className={styles.tocDisclosureChevron} aria-hidden="true">
              <Icon icon="lucide:chevron-down" width="1em" height="1em" />
            </span>
          </summary>
          <div className={clsx(styles.tocContent, styles.tocDisclosureContent)}>{body}</div>
        </details>
      ) : withCard ? (
        <Card className={styles.tocContent}>{content}</Card>
      ) : (
        <div className={styles.tocContent}>{content}</div>
      )}
    </nav>
  );
}
