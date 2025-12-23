import React, { type ReactNode } from 'react';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsPostsPage';
import PostsListLayout from '../../../BlogShared/PostsListLayout';

export default function BlogAuthorsPostsPage(props: Props): ReactNode {
  const { author, items, listMetadata } = props;

  return (
    <PostsListLayout
      title={author.name}
      description={author.title}
      items={items}
      meta={listMetadata}
    />
  );
}
