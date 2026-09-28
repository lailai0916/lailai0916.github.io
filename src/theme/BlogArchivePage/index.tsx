import { type ReactElement } from 'react';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import BlogArchivePageClassic from '@theme-original/BlogArchivePage';
import type { Props } from '@theme/BlogArchivePage';
import BlogArchive from '../BlogShared/Archive';

export default function BlogArchivePage(props: Props): ReactElement {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  if (isClassicDesign) return <BlogArchivePageClassic {...props} />;

  return <BlogArchive posts={props.archive?.blogPosts} />;
}
