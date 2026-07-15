import { useMemo, type ComponentType } from 'react';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import { translate } from '@docusaurus/Translate';
import WindowPanel, { type WindowPanelTab } from '@site/src/components/laikit/WindowPanel';
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
  default: ComponentType;
  frontMatter?: ProblemFrontMatter;
};

const ctx = require.context(
  '!!raw-loader!@site/docs/contest/problems',
  true,
  /\.cpp$/
) as RawCodeContext;

type Tab =
  | { kind: 'statement'; label: string; Render: ComponentType }
  | { kind: 'solution'; label: string; Render: ComponentType }
  | { kind: 'code'; label: string; code: string };

function formatCodeTitle(p: string): string {
  return p
    .slice(p.lastIndexOf('/') + 1)
    .replace(/\.cpp$/, '')
    .replace(/_/g, ' ');
}

function ProblemPanel({ tabs }: { tabs: Tab[] }) {
  const panelTabs: WindowPanelTab[] = tabs.map((t) =>
    t.kind === 'code'
      ? {
          label: t.label,
          // Full-bleed bare CodeBlock, so skip WindowPanel's padded body wrapper.
          bare: true,
          content: (
            <CodeBlock language="cpp" className="codeBlockBare">
              {t.code}
            </CodeBlock>
          ),
        }
      : { label: t.label, content: <t.Render /> }
  );

  return (
    <WindowPanel
      tabs={panelTabs}
      collapseLabel={translate({
        id: 'components.problem.collapse',
        message: 'Collapse',
      })}
      expandLabel={translate({
        id: 'components.problem.expand',
        message: 'Expand',
      })}
      toolbar={(idx, open) => {
        const t = tabs[idx];
        if (!open || t.kind !== 'code') return null;
        return (
          <span className={styles.meta} aria-hidden="true">
            <span className={styles.size}>
              {formatBytes(new TextEncoder().encode(t.code).length)}
            </span>
            <span className={styles.language}>cpp</span>
          </span>
        );
      }}
    />
  );
}

export default function Problem({ id }: { id: string }) {
  // Resolve the MDX and build the tab list inside the memo so the hook stays
  // unconditional — the require can throw, and an early return before a hook
  // would break the rules of hooks.
  const tabs = useMemo<Tab[] | null>(() => {
    let mdxModule: ProblemMdxModule;
    try {
      mdxModule = require(`@site/docs/contest/problems/${id}/index.mdx`) as ProblemMdxModule;
    } catch {
      return null;
    }
    const { default: MDX, frontMatter } = mdxModule;
    const { title = id, link } = frontMatter ?? {};

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
        default: ComponentType;
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
  }, [id]);

  if (tabs === null) {
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

  return <ProblemPanel tabs={tabs} />;
}
