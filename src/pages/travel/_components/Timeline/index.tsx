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
    let frame = 0;

    const updateProgress = () => {
      frame = 0;

      if (reducedMotion.matches) {
        timeline.style.setProperty('--timeline-progress', '0');
        return;
      }

      const rect = rail.getBoundingClientRect();
      const playhead = window.innerHeight * 0.58;
      const progress = Math.min(1, Math.max(0, (playhead - rect.top) / rect.height));
      timeline.style.setProperty('--timeline-progress', String(progress));
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    reducedMotion.addEventListener('change', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      reducedMotion.removeEventListener('change', scheduleUpdate);
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
