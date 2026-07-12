import { type ReactNode } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import MetaFooter from '@site/src/components/Article/MetaFooter';
import ViewCount from '@site/src/components/Article/ViewCount';

// Swizzled over the stock footer (tags + EditMetaRow) so docs share the blog's
// bottom-of-article meta: tag chips + view count + "last updated on …". Blog
// posts show the view count in their top meta bar, so it only appears here for
// docs. The edit link now lives in the top-right Actions row (see DocItem/Layout).
export default function DocItemFooter(): ReactNode {
  const { metadata } = useDoc();
  const { lastUpdatedAt, tags, permalink } = metadata;
  const tagItems = tags.map((t) => ({ to: t.permalink, label: t.label }));

  return (
    <MetaFooter
      tags={tagItems}
      lastUpdatedAt={lastUpdatedAt}
      views={<ViewCount path={permalink} />}
    />
  );
}
