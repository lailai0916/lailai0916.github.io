import React, { type ReactNode } from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogAuthorsPostsPageOriginal from '@theme-original/Blog/Pages/BlogAuthorsPostsPage';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsPostsPage';
import PostsListLayout from '../../../BlogShared/PostsListLayout';

export default function BlogAuthorsPostsPage(props: Props): ReactNode {
  const { isOriginalLayout } = useTheme();
  if (isOriginalLayout) return <BlogAuthorsPostsPageOriginal {...props} />;

  const { author, items, listMetadata } = props;

  return (
    <PostsListLayout
      title={author.name ?? author.key}
      description={author.title}
      items={items}
      meta={listMetadata}
    />
  );
}
