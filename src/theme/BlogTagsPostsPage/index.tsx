import React from 'react';
//

import styles from '../BlogListPage/styles.module.css';
import BlogScaffold from '../BlogShared/Scaffold';
import SidebarLeft from '../BlogShared/SidebarLeft';
import SidebarRight from '../BlogShared/SidebarRight';
import Paginator from '../BlogShared/Paginator';
import PostCard from '../BlogShared/PostCard';

// no direct data utils needed here; sidebars handle their own data

import type { Props } from '@theme/BlogTagsPostsPage';

// use shared PostCard / Sidebars / Paginator

export default function BlogTagsPostsPage(props: Props) {
  const { items, listMetadata, tag } = props;
  const title = `${tag.label}`;
  const description = tag.description ?? '';
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
      <Paginator meta={listMetadata} />
    </BlogScaffold>
  );
}
