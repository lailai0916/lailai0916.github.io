import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogTagsPostsPageOriginal from '@theme-original/BlogTagsPostsPage';
import PostsListLayout from '../BlogShared/PostsListLayout';
import TagSelector from '../BlogShared/TagSelector';

// no direct data utils needed here; sidebars handle their own data

import type { Props } from '@theme/BlogTagsPostsPage';

// use shared PostCard / Sidebars / Paginator

export default function BlogTagsPostsPage(props: Props): React.ReactElement {
  const { isNewLayout } = useTheme();
  const { items, listMetadata, tag } = props;

  if (isNewLayout) {
    const title = `${tag.label}`;
    const description = tag.description ?? '';
    return (
      <PostsListLayout
        title={title}
        description={description}
        items={items}
        meta={listMetadata}
        topSlot={<TagSelector activePermalink={tag.permalink} />}
      />
    );
  }

  return <BlogTagsPostsPageOriginal {...props} />;
}
