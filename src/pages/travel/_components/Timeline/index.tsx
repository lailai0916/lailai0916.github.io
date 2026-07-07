import { useMemo } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/Card';
import { TRAVEL_LIST, type TravelItem } from '@site/src/data/travel';
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
  const monthFmt = useMemo(
    () => new Intl.DateTimeFormat(i18n.currentLocale, { month: 'long' }),
    [i18n.currentLocale]
  );

  // Month name only — the year is the group header. Year/month are read
  // literally from the 'YYYY-MM' string, so no timezone conversion applies.
  const monthLabel = (date: string): string => {
    const [year, month] = date.split('-');
    return isZh
      ? `${Number(month)} 月`
      : monthFmt.format(new Date(Number(year), Number(month) - 1, 1));
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
    <div className={styles.timeline}>
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
