import { type ReactNode } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type { Props } from '@theme/DocItem/Content';
import Summary from '@site/src/components/Article/Summary';

// Swizzled over the stock Content to drop the AI `Article/Summary` in right after
// the doc's title (between the synthetic h1 and the body) — the stock component
// renders the title and MDX back-to-back with no seam to inject into.
export default function DocItemContent({ children }: Props): ReactNode {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const syntheticTitle =
    !frontMatter.hide_title && typeof contentTitle === 'undefined'
      ? metadata.title
      : null;
  const summary = (frontMatter as { summary?: string }).summary;

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      {summary && <Summary content={summary} />}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
