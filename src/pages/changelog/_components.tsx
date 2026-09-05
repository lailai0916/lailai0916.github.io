import { useMemo } from 'react';
import { translate } from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import { CHANGELOG_LIST, TYPE_LABEL } from '@site/src/data/changelog';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { formatCalendarMonthName } from '@site/src/utils/dateTime';
import styles from './styles.module.css';

const EMPTY_LABEL = translate({
  id: 'pages.changelog.empty',
  message: 'No changelog entries yet',
});

export function Changelog() {
  const { i18n } = useDocusaurusContext();

  const isZh = i18n.currentLocale === 'zh-Hans';

  const grouped = useMemo(() => {
    const sorted = [...CHANGELOG_LIST].sort((a, b) => b.date.localeCompare(a.date));
    const map: Record<string, Record<string, typeof CHANGELOG_LIST>> = {};
    for (const item of sorted) {
      const [year, month] = item.date.split('-');
      (map[year] ??= {})[month] ??= [];
      map[year][month].push(item);
    }
    return Object.keys(map)
      .sort((a, b) => b.localeCompare(a))
      .map((year) => ({
        year,
        months: Object.keys(map[year])
          .sort((a, b) => b.localeCompare(a))
          .map((m) => ({
            month: m,
            items: map[year][m],
          })),
      }));
  }, []);

  if (!grouped.length) return <p>{EMPTY_LABEL}</p>;

  return (
    <div>
      {grouped.map(({ year, months }) => (
        <section key={year}>
          <Heading as="h2" id={year}>
            {year}
          </Heading>
          {months.map(({ month, items }) => {
            return (
              <section key={`${year}-${month}`}>
                <Heading as="h3" id={`${year}-${month}`}>
                  {isZh
                    ? `${Number(month)} 月`
                    : formatCalendarMonthName(`${year}-${month}`, i18n.currentLocale)}
                </Heading>
                <ul className={styles.entries}>
                  {items.map((item, i) => (
                    <li
                      className={styles.entry}
                      data-type={item.type}
                      key={`${item.date}-${item.type}-${i}`}
                    >
                      <strong className={styles.type}>{TYPE_LABEL[item.type]}</strong>
                      <span
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </section>
      ))}
    </div>
  );
}
