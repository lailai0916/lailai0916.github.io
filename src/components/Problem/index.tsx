import React, { useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import { translate } from '@docusaurus/Translate';
import Card from '@site/src/components/laikit/Card';
import TrafficLights from '@site/src/components/laikit/TrafficLights';
import { formatBytes } from '@site/src/utils/format';

import styles from './styles.module.css';

declare const require: any;
type RawCodeModule = { default: string };
type RawCodeContext = {
  keys: () => string[];
  (key: string): RawCodeModule;
};
type ProblemFrontMatter = {
  title?: string;
  link?: string;
};
type ProblemMdxModule = {
  default: React.ComponentType;
  frontMatter?: ProblemFrontMatter;
};

const ctx = require.context(
  '!!raw-loader!@site/docs/contest/problems',
  true,
  /\.cpp$/
) as RawCodeContext;

type Tab =
  | { kind: 'statement'; label: string; Render: React.ComponentType }
  | { kind: 'solution'; label: string; Render: React.ComponentType }
  | { kind: 'code'; label: string; code: string };

function formatCodeTitle(p: string): string {
  return p
    .slice(p.lastIndexOf('/') + 1)
    .replace(/\.cpp$/, '')
    .replace(/_/g, ' ');
}

function ProblemPanel({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState<number | null>(0);
  const lastIdx = useRef(0);
  if (active !== null) lastIdx.current = active;
  const open = active !== null;
  const displayed = tabs[active ?? lastIdx.current];
  const showMeta = open && displayed.kind === 'code';

  return (
    <Card padding={0} className={clsx(styles.panel, open && styles.panelOpen)}>
      <div className={styles.header}>
        <TrafficLights className={styles.dots} />
        <div className={styles.tabs} role="tablist">
          {tabs.map((t, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={clsx(styles.tab, i === active && styles.tabActive)}
              onClick={() => setActive((cur) => (cur === i ? null : i))}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className={styles.right}>
          {showMeta && displayed.kind === 'code' && (
            <span className={styles.meta} aria-hidden="true">
              <span className={styles.size}>
                {formatBytes(new TextEncoder().encode(displayed.code).length)}
              </span>
              <span className={styles.language}>cpp</span>
            </span>
          )}
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-label={
              open
                ? translate({
                    id: 'components.problem.collapse',
                    message: 'Collapse',
                  })
                : translate({
                    id: 'components.problem.expand',
                    message: 'Expand',
                  })
            }
            onClick={() => setActive((cur) => (cur === null ? 0 : null))}
          >
            <svg
              className={styles.chevron}
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                d="M5 8l5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={clsx(styles.collapse, open && styles.collapseOpen)}
        aria-hidden={!open}
      >
        <div className={styles.body} role="tabpanel">
          {displayed.kind === 'code' ? (
            <CodeBlock language="cpp" className="codeBlockBare">
              {displayed.code}
            </CodeBlock>
          ) : (
            <div className={styles.bodyInner}>
              <displayed.Render />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function Problem({ id }: { id: string }) {
  let mdxModule: ProblemMdxModule;
  try {
    mdxModule = require(
      `@site/docs/contest/problems/${id}/index.mdx`
    ) as ProblemMdxModule;
  } catch {
    return (
      <Admonition type="warning">
        {translate(
          {
            id: 'components.problem.error',
            message: 'Unable to load problem "{id}".',
          },
          { id }
        )}
      </Admonition>
    );
  }
  const { default: MDX, frontMatter } = mdxModule;
  const { title = id, link } = frontMatter ?? {};

  const tabs = useMemo<Tab[]>(() => {
    const list: Tab[] = [
      {
        kind: 'statement',
        label: translate({
          id: 'components.problem.statement',
          message: 'Problem',
        }),
        Render: () => (
          <>
            <div className={styles.title}>
              {link ? (
                <Link href={link} className={styles.titleLink}>
                  {title}
                </Link>
              ) : (
                title
              )}
            </div>
            <MDX />
          </>
        ),
      },
    ];

    try {
      const sol = require(`@site/blog/solution/${id}.mdx`) as {
        default: React.ComponentType;
      };
      list.push({
        kind: 'solution',
        label: translate({
          id: 'components.problem.solution',
          message: 'Solution',
        }),
        Render: sol.default,
      });
    } catch {
      // No solution available
    }

    const codes = ctx
      .keys()
      .filter((p) => p.includes(`/${id}/`))
      .map((p) => ({ label: formatCodeTitle(p), code: ctx(p).default }))
      .sort((a, b) => a.label.localeCompare(b.label));
    for (const c of codes) {
      list.push({ kind: 'code', label: c.label, code: c.code });
    }

    return list;
  }, [id, link, title, MDX]);

  return <ProblemPanel tabs={tabs} />;
}
