import React from 'react';
//

import PostsListLayout from '../BlogShared/PostsListLayout';

// no direct data utils needed here; sidebars handle their own data

import type { Props } from '@theme/BlogTagsPostsPage';

// use shared PostCard / Sidebars / Paginator

export default function BlogTagsPostsPage(props: Props) {
  const { items, listMetadata, tag } = props;
  const title = `${tag.label}`;
  const description = tag.description ?? '';
  return (
    <PostsListLayout
      title={title}
      description={description}
      items={items as any[]}
      meta={listMetadata as any}
    />
  );
}
