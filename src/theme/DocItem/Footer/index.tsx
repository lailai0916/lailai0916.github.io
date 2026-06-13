import { type ReactNode } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import MetaFooter from '@site/src/components/Article/MetaFooter';

// Swizzled over the stock footer (tags + EditMetaRow) so docs share the blog's
// bottom-of-article meta: tag chips + "last updated on …". The edit link now
// lives in the top-right Actions row (see DocItem/Layout).
export default function DocItemFooter(): ReactNode {
  const { metadata } = useDoc();
  const { lastUpdatedAt, tags } = metadata;
  const tagItems = tags
    .filter((t) => !!t.label && !!t.permalink)
    .map((t) => ({ to: t.permalink, label: t.label }));

  return <MetaFooter tags={tagItems} lastUpdatedAt={lastUpdatedAt} />;
}
