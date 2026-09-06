import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { useTOCHighlight, type TOCHighlightConfig } from '@docusaurus/theme-common/internal';
import type { TOCItem } from '@docusaurus/mdx-loader';
import { translate } from '@docusaurus/Translate';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

const CONTENTS_LABEL = translate({
  id: 'components.tableOfContents.title',
  message: 'Contents',
});
const PROGRESS_FOLLOW_RATE = 0.12;
const PROGRESS_SETTLE_THRESHOLD = 0.0002;

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

function useInertialProgress(targetProgress: number) {
  const [displayProgress, setDisplayProgress] = useState(targetProgress);
  const currentProgressRef = useRef(targetProgress);
  const targetProgressRef = useRef(targetProgress);
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const animateProgress = useCallback(() => {
    const distance = targetProgressRef.current - currentProgressRef.current;
    currentProgressRef.current =
      Math.abs(distance) < PROGRESS_SETTLE_THRESHOLD
        ? targetProgressRef.current
        : currentProgressRef.current + distance * PROGRESS_FOLLOW_RATE;
    setDisplayProgress(currentProgressRef.current);
    frameRef.current = null;

    if (currentProgressRef.current !== targetProgressRef.current) {
      frameRef.current = window.requestAnimationFrame(animateProgress);
    }
  }, []);

  useEffect(() => {
    targetProgressRef.current = targetProgress;

    if (reducedMotionRef.current) {
      currentProgressRef.current = targetProgress;
      setDisplayProgress(targetProgress);
      return;
    }

    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(animateProgress);
    }
  }, [animateProgress, targetProgress]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = reducedMotion.matches;

    const handleMotionChange = () => {
      reducedMotionRef.current = reducedMotion.matches;
      if (reducedMotion.matches) {
        if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        currentProgressRef.current = targetProgressRef.current;
        setDisplayProgress(targetProgressRef.current);
      } else if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(animateProgress);
      }
    };

    reducedMotion.addEventListener('change', handleMotionChange);
    if (reducedMotion.matches) handleMotionChange();

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      reducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, [animateProgress]);

  return displayProgress;
}

function ReadingProgress({ progress }: { progress: number }) {
  const percent = Math.round(progress * 100);
  const displayProgress = useInertialProgress(progress);
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
      <div
        className={styles.tocProgressFill}
        style={{ transform: `scaleX(${displayProgress})` }}
      />
    </div>
  );
}

export default function TableOfContents({ toc }: { toc: readonly TOCItem[] }) {
  const progress = useScrollProgress();
  const highlightConfig = useMemo<TOCHighlightConfig | undefined>(() => {
    if (!toc.length) return undefined;
    const levels = toc.map((item) => item.level);
    return {
      linkClassName: styles.tocLink,
      linkActiveClassName: styles.tocLinkActive,
      minHeadingLevel: Math.min(...levels),
      maxHeadingLevel: Math.max(...levels),
    };
  }, [toc]);

  useTOCHighlight(highlightConfig);

  return (
    <nav className={styles.tocContainer} aria-label={CONTENTS_LABEL}>
      <Card className={styles.tocCard}>
        <div className={styles.tocHeader}>
          <span className={styles.tocHeaderTitle}>{CONTENTS_LABEL}</span>
          <span className={styles.tocHeaderPercent}>{Math.round(progress * 100)}%</span>
        </div>
        <ReadingProgress progress={progress} />
        {toc.length > 0 && (
          <ul className={styles.tocList}>
            {toc.map((item) => {
              const level = Math.min(Math.max(item.level, 2), 6);
              return (
                <li key={item.id} className={clsx(styles.tocItem, styles[`tocItemL${level}`])}>
                  <Link
                    to={`#${item.id}`}
                    className={styles.tocLink}
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </nav>
  );
}
