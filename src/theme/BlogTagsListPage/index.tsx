import { type ReactElement } from 'react';
import { translate } from '@docusaurus/Translate';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import BlogTagsListPageClassic from '@theme-original/BlogTagsListPage';
import type { Props } from '@theme/BlogTagsListPage';
import ArchiveRedirect from '../BlogShared/ArchiveRedirect';

const TITLE = translate({ id: 'blog.pages.tags.title', message: 'Tags' });

export default function BlogTagsListPage(props: Props): ReactElement {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  if (isClassicDesign) return <BlogTagsListPageClassic {...props} />;

  return <ArchiveRedirect title={TITLE} />;
}
