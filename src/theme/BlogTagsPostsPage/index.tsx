import { type ReactElement } from 'react';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import BlogTagsPostsPageClassic from '@theme-original/BlogTagsPostsPage';
import type { Props } from '@theme/BlogTagsPostsPage';
import BlogArchive from '../BlogShared/Archive';

export default function BlogTagsPostsPage(props: Props): ReactElement {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  if (isClassicDesign) return <BlogTagsPostsPageClassic {...props} />;

  const { items, tag } = props;
  return (
    <BlogArchive
      selected={{
        kind: 'tag',
        permalink: tag.permalink,
        title: tag.label,
        description: tag.description,
        posts: items.map((item) => item.content),
      }}
    />
  );
}
