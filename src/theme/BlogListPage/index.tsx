import React from 'react';
// Page uses shared components only; no local Link/Translate needed

// styles consumed by shared components via Scaffold
import BlogScaffold from '../BlogShared/Scaffold';
import SidebarLeft from '../BlogShared/SidebarLeft';
import SidebarRight from '../BlogShared/SidebarRight';
import Paginator from '../BlogShared/Paginator';
import PostCard from '../BlogShared/PostCard';

// No direct data utils here; sidebars fetch their own data

import type { Props as BlogListPageProps } from '@theme/BlogListPage';

// Removed page-local PostCard/Recent/Archive helpers

export default function BlogListPage(props: BlogListPageProps) {
  const { metadata, items } = props;
  const title = metadata?.title ?? 'Blog';
  const description = metadata?.description ?? '';

  return (
    <BlogScaffold
      title={title}
      description={description}
      left={<SidebarLeft items={items} />}
      right={<SidebarRight />}
    >
      {items.map((it: any) => (
        <PostCard key={it.content.metadata.permalink} item={it} />
      ))}
      <Paginator meta={metadata} />
    </BlogScaffold>
  );
}
