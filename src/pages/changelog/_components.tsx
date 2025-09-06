import React from 'react';
import { CHANGELOG_LIST, TYPE_LABEL } from '@site/src/data/changelog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function Changelog() {
  const map: Record<string, Record<string, typeof CHANGELOG_LIST>> = {};

  CHANGELOG_LIST.forEach((item) => {
    const [year, month] = item.date.split('-');
    (map[year] ??= {})[month] ??= [];
    map[year][month].push(item);
  });

  const grouped = Object.keys(map)
    .sort((a, b) => b.localeCompare(a))
    .map((year) => {
      const months = Object.keys(map[year]).sort((a, b) => b.localeCompare(a));
      return {
        year,
        months: months.map((m) => ({ month: m, items: map[year][m] })),
      };
    });

  return (
    <div>
      {grouped.map(({ year, months }) => (
        <section key={year}>
          <h2>{year} 年</h2>
          {months.map(({ month, items }) => (
            <section key={`${year}-${month}`}>
              <h3>{Number(month)} 月</h3>
              <ul>
                {items.map((item) => (
                  <li key={`${item.date}-${item.type}`}>
                    <strong>[{TYPE_LABEL[item.type]}]</strong>{' '}
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ node, ...props }) => <>{props.children}</>,
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                      }}
                    >
                      {item.content}
                    </ReactMarkdown>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>
      ))}
    </div>
  );
}
