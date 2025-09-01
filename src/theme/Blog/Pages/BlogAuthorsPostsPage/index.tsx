import React from 'react';
import PostsListLayout from '../../../BlogShared/PostsListLayout';

import type { Props } from '@theme/Blog/Pages/BlogAuthorsPostsPage';

// use shared PostCard & Sidebars

export default function BlogAuthorsPostsPage(props: Props) {
  const { items, listMetadata, author } = props;
  const title = author.name;
  const description = author.title ?? '';
  return (
    <PostsListLayout
      title={title}
      description={description}
      items={items as any[]}
      meta={listMetadata as any}
    />
  );
}
