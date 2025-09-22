import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogTagsListPageOriginal from '@theme-original/BlogTagsListPage';
import type { Props } from '@theme/BlogTagsListPage';
import BlogScaffold from '../BlogShared/Scaffold';
import Translate from '@docusaurus/Translate';
import ChipListCard from '../BlogShared/ChipListCard';
//

// styles are handled by shared components

// shared sidebars handle their own data; no direct utils here

// removed page-local sidebars/cards; using shared ones

export default function BlogTagsListPage(props: Props): React.ReactElement {
  const { isNewLayout } = useTheme();
  const { tags } = props;

  if (isNewLayout) {
    return (
      <BlogScaffold title="Tags" description="Tags of lailai's blog">
        <ChipListCard
          title={<Translate id="theme.tags.tagsPageTitle">Tags</Translate>}
          items={tags.map((t: any) => ({
            to: t.permalink,
            label: t.label,
            count: t.count,
          }))}
        />
      </BlogScaffold>
    );
  }

  return <BlogTagsListPageOriginal {...props} />;
}
