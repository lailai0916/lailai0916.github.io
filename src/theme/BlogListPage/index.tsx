import React from 'react';
// Page uses shared components only; no local Link/Translate needed

// styles consumed by shared components via Scaffold
import PostsListLayout from '../BlogShared/PostsListLayout';

// No direct data utils here; sidebars fetch their own data

import type { Props as BlogListPageProps } from '@theme/BlogListPage';

// Removed page-local PostCard/Recent/Archive helpers

export default function BlogListPage(props: BlogListPageProps) {
  const { metadata, items } = props;
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
