import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogListPageOriginal from '@theme-original/BlogListPage';
import PostsListLayout from '../BlogShared/PostsListLayout';
import type { Props as BlogListPageProps } from '@theme/BlogListPage';

export default function BlogListPage(
  props: BlogListPageProps
): React.ReactElement {
  const { isNewLayout } = useTheme();
  const { metadata, items } = props;

  if (isNewLayout) {
    const title = metadata?.blogTitle ?? 'Blog';
    const description = metadata?.blogDescription ?? '';
    return (
      <PostsListLayout
        title={title}
        description={description}
        items={items}
        meta={metadata}
      />
    );
  }

  return <BlogListPageOriginal {...props} />;
}
