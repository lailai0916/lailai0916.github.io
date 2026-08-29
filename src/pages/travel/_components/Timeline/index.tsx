import { useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/Card';
import { TRAVEL_LIST, type TravelItem } from '@site/src/data/travel';
import { formatCalendarMonthName } from '@site/src/utils/dateTime';
import styles from './styles.module.css';

interface TimelineEntry {
  item: TravelItem;
  index: number;
}

interface YearGroup {
  year: string;
  entries: TimelineEntry[];
}

const PROGRESS_FOLLOW_RATE = 0.12;
const PROGRESS_SETTLE_THRESHOLD = 0.0002;

function EntryBody({ item, month }: { item: TravelItem; month: string }) {
  return (
    <>
      {item.href && <Icon icon="lucide:arrow-up-right" className={styles.entryArrow} aria-hidden />}
      <span className={styles.entryMonth}>{month}</span>
      <h3 className={styles.entryTitle}>{item.title}</h3>
      <p className={styles.entryCities}>{item.description}</p>
    </>
  );
}

export default function TravelTimeline() {
  const { i18n } = useDocusaurusContext();
  const isZh = i18n.currentLocale === 'zh-Hans';
  const timelineRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const rail = railRef.current;
    if (!timeline || !rail) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentProgress = 0;
    let targetProgress = 0;
    let frame = 0;
    let yearMarkers: { element: HTMLElement; progress: number; lit: boolean }[] = [];

    const measureYearMarkers = () => {
      const railRect = rail.getBoundingClientRect();
      yearMarkers = [...timeline.querySelectorAll<HTMLElement>(`.${styles.yearLabel}`)].map(
        (element) => {
          const rect = element.getBoundingClientRect();
          const progress = (rect.top + rect.height / 2 - railRect.top) / railRect.height;
          return {
            element,
            progress: Math.min(1, Math.max(0, progress)),
            lit: element.classList.contains(styles.yearLabelLit),
          };
        }
      );
    };

    const getProgress = () => {
      const rect = rail.getBoundingClientRect();
      const playhead = window.innerHeight * 0.58;
      return Math.min(1, Math.max(0, (playhead - rect.top) / rect.height));
    };

    const renderProgress = () => {
      timeline.style.setProperty('--timeline-progress', String(currentProgress));
      for (const marker of yearMarkers) {
        const lit = marker.progress <= currentProgress;
        if (lit === marker.lit) continue;
        marker.lit = lit;
        marker.element.classList.toggle(styles.yearLabelLit, lit);
      }
    };

    const animateProgress = () => {
      frame = 0;
      const distance = targetProgress - currentProgress;
      currentProgress =
        Math.abs(distance) < PROGRESS_SETTLE_THRESHOLD
          ? targetProgress
          : currentProgress + distance * PROGRESS_FOLLOW_RATE;
      renderProgress();

      if (currentProgress !== targetProgress) {
        frame = window.requestAnimationFrame(animateProgress);
      }
    };

    const updateTarget = () => {
      targetProgress = getProgress();

      if (reducedMotion.matches) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        currentProgress = targetProgress;
        renderProgress();
        return;
      }

      if (!frame) frame = window.requestAnimationFrame(animateProgress);
    };

    const handleResize = () => {
      measureYearMarkers();
      updateTarget();
    };

    measureYearMarkers();
    currentProgress = getProgress();
    targetProgress = currentProgress;
    renderProgress();

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', handleResize);
    reducedMotion.addEventListener('change', updateTarget);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', handleResize);
      reducedMotion.removeEventListener('change', updateTarget);
    };
  }, []);

  // Month name only — the year is the group header. Year/month are read
  // literally from the 'YYYY-MM' string, so no timezone conversion applies.
  const monthLabel = (date: string): string => {
    const month = date.slice(5, 7);
    return isZh ? `${Number(month)} 月` : formatCalendarMonthName(date, i18n.currentLocale);
  };

  // A continuous running index drives the left/right alternation across the
  // whole timeline, so the zigzag stays balanced regardless of year sizes.
  const groups = useMemo<YearGroup[]>(() => {
    const sorted = [...TRAVEL_LIST].sort((a, b) => b.date.localeCompare(a.date));
    const map = new Map<string, TimelineEntry[]>();
    sorted.forEach((item, index) => {
      const year = item.date.slice(0, 4);
      const bucket = map.get(year);
      if (bucket) bucket.push({ item, index });
      else map.set(year, [{ item, index }]);
    });
    return [...map.entries()].map(([year, entries]) => ({ year, entries }));
  }, []);

  return (
    <div className={styles.timeline} ref={timelineRef}>
      <span className={styles.rail} ref={railRef} aria-hidden>
        <span className={styles.progressLine} />
      </span>
      {groups.map(({ year, entries }) => (
        <section className={styles.group} key={year}>
          <div className={styles.year}>
            <span className={styles.yearLabel}>{year}</span>
          </div>
          <ol className={styles.entries}>
            {entries.map(({ item, index }) => {
              const month = monthLabel(item.date);
              return (
                <li
                  key={`${item.date}-${index}`}
                  data-number={TRAVEL_LIST.length - index}
                  className={clsx(
                    styles.entry,
                    index % 2 === 0 ? styles.entryLeft : styles.entryRight
                  )}
                >
                  {item.href ? (
                    <Card
                      to={item.href}
                      padding="1.25rem 1.5rem"
                      className={styles.card}
                      wrapperClassName={styles.cardLink}
                    >
                      <EntryBody item={item} month={month} />
                    </Card>
                  ) : (
                    <Card padding="1.25rem 1.5rem" className={styles.card}>
                      <EntryBody item={item} month={month} />
                    </Card>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
