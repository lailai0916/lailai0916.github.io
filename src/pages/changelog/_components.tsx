import { useMemo } from 'react';
import { translate } from '@docusaurus/Translate';
import { CHANGELOG_LIST, TYPE_LABEL } from '@site/src/data/changelog';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const EMPTY_LABEL = translate({
  id: 'pages.changelog.empty',
  message: 'No changelog entries yet',
});

export function Changelog() {
  const { i18n } = useDocusaurusContext();

  const isZh = i18n.currentLocale === 'zh-Hans';
  const monthFmt = useMemo(
    () => new Intl.DateTimeFormat(i18n.currentLocale, { month: 'long' }),
    [i18n.currentLocale]
  );

  const grouped = useMemo(() => {
    const sorted = [...CHANGELOG_LIST].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
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
            items: [...map[year][m]].sort((a, b) =>
              b.date.localeCompare(a.date)
            ),
          })),
      }));
  }, []);

  if (!grouped.length) return <p>{EMPTY_LABEL}</p>;

  return (
    <div>
      {grouped.map(({ year, months }) => (
        <section key={year}>
          <h2>{year}</h2>
          {months.map(({ month, items }) => {
            return (
              <section key={`${year}-${month}`}>
                <h3>
                  {isZh
                    ? `${Number(month)} 月`
                    : monthFmt.format(
                        new Date(Number(year), Number(month) - 1, 1)
                      )}
                </h3>
                <ul>
                  {items.map((item, i) => {
                    return (
                      <li key={`${item.date}-${item.type}-${i}`}>
                        <strong>{TYPE_LABEL[item.type]}</strong>{' '}
                        <span
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </section>
      ))}
    </div>
  );
}
