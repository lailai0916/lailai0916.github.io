import React from 'react';
import BlogScaffold from '../BlogShared/Scaffold';
import SidebarLeft from '../BlogShared/SidebarLeft';
import SidebarRight from '../BlogShared/SidebarRight';
import Translate from '@docusaurus/Translate';
import ChipListCard from '../BlogShared/ChipListCard';
//

// styles are handled by shared components

// shared sidebars handle their own data; no direct utils here

type Props = any;

// removed page-local sidebars/cards; using shared ones

export default function BlogTagsListPage(props: Props) {
  const { tags } = props;
  return (
    <BlogScaffold title="Tags" left={<SidebarLeft />} right={<SidebarRight />}>
      <ChipListCard
        title={<Translate id="blog.tags.list">All Tags</Translate>}
        items={tags.map((t: any) => ({
          to: t.permalink,
          label: t.label,
          count: t.count,
        }))}
      />
    </BlogScaffold>
  );
}
