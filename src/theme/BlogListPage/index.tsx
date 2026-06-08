import { type ReactElement } from 'react';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import BlogListPageClassic from '@theme-original/BlogListPage';
import PostsListLayout from '../BlogShared/PostsListLayout';
import type { Props as BlogListPageProps } from '@theme/BlogListPage';

export default function BlogListPage(props: BlogListPageProps): ReactElement {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  if (isClassicDesign) return <BlogListPageClassic {...props} />;

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
