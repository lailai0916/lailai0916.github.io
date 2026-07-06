import { useMemo } from 'react';
import { Icon } from '@iconify/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/Card';
import SectionContainer from '@site/src/components/laikit/Section';
import { TRAVEL_LIST, type TravelItem } from '@site/src/data/travel';
import styles from './styles.module.css';

interface YearGroup {
  year: string;
  items: TravelItem[];
}

function EntryBody({ item, month }: { item: TravelItem; month: string }) {
  return (
    <>
      <div className={styles.entryHead}>
        <span className={styles.entryMonth}>{month}</span>
        {item.href && (
          <Icon
            icon="lucide:arrow-up-right"
            className={styles.entryArrow}
            aria-hidden
          />
        )}
      </div>
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

  const groups = useMemo<YearGroup[]>(() => {
    const sorted = [...TRAVEL_LIST].sort((a, b) => b.date.localeCompare(a.date));
    const map = new Map<string, TravelItem[]>();
    for (const item of sorted) {
      const year = item.date.slice(0, 4);
      const bucket = map.get(year);
      if (bucket) bucket.push(item);
      else map.set(year, [item]);
    }
    return [...map.entries()].map(([year, items]) => ({ year, items }));
  }, []);

  return (
    <SectionContainer>
      <div className={styles.timeline}>
        {groups.map(({ year, items }) => (
          <section className={styles.group} key={year}>
            <div className={styles.year}>
              <span className={styles.yearLabel}>{year}</span>
            </div>
            <ol className={styles.entries}>
              {items.map((item, index) => {
                const month = monthLabel(item.date);
                return (
                  <li className={styles.entry} key={`${item.date}-${index}`}>
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
    </SectionContainer>
  );
}
