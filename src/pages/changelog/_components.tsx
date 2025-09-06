import React, { useMemo } from 'react';
import { CHANGELOG_LIST, TYPE_LABEL } from '@site/src/data/changelog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function MarkdownText({ text }: { text: string }) {
  const components = useMemo(
    () => ({
      p: ({ children }: { children: React.ReactNode }) => <>{children}</>,
      a: (
        props: React.DetailedHTMLProps<
          React.AnchorHTMLAttributes<HTMLAnchorElement>,
          HTMLAnchorElement
        >
      ) => <a {...props} target="_blank" rel="noopener noreferrer" />,
    }),
    []
  );
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {text}
    </ReactMarkdown>
  );
}

export function Changelog() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n?.currentLocale ?? 'zh-CN';

  const monthFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { month: 'long' }),
    [locale]
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
      .sort((a, b) => b.localeCompare(a)) // 年份降序
      .map((year) => ({
        year,
        months: Object.keys(map[year])
          .sort((a, b) => b.localeCompare(a)) // 月份降序
          .map((m) => ({
            month: m,
            // 同月内再按日期降序，确保稳态
            items: [...map[year][m]].sort((a, b) =>
              b.date.localeCompare(a.date)
            ),
          })),
      }));
  }, []);

  if (!grouped.length) return <p className="text--secondary">暂无更新日志</p>;

  return (
    <div>
      {grouped.map(({ year, months }) => (
        <section key={year}>
          <h2>{year}</h2>
          {months.map(({ month, items }) => {
            const monthTitle = monthFmt.format(
              new Date(Number(year), Number(month) - 1, 1)
            );
            return (
              <section key={`${year}-${month}`}>
                <h3>{monthTitle}</h3>
                <ul>
                  {items.map((item, i) => {
                    return (
                      <li key={`${item.date}-${item.type}-${i}`}>
                        <strong>[{TYPE_LABEL[item.type]}]</strong>{' '}
                        <MarkdownText text={item.content} />
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
