import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogListPageOriginal from '@theme-original/BlogListPage';
import PostsListLayout from '../BlogShared/PostsListLayout';
import type { Props as BlogListPageProps } from '@theme/BlogListPage';

export default function BlogListPage(
  props: BlogListPageProps
): React.ReactElement {
  const { isNewLayout } = useTheme();
  if (isNewLayout) return <BlogListPageOriginal {...props} />;

  const { metadata, items } = props;
  return (
    <PostsListLayout
      title={metadata.blogTitle}
      description={metadata.blogDescription}
      items={items}
      meta={metadata}
    />
  );
}
