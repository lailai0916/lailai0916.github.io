import { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import BlogAuthorsListPageClassic from '@theme-original/Blog/Pages/BlogAuthorsListPage';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';
import ArchiveRedirect from '../../../BlogShared/ArchiveRedirect';

const TITLE = translate({ id: 'blog.pages.authors.title', message: 'Authors' });

export default function BlogAuthorsListPage(props: Props): ReactNode {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  if (isClassicDesign) return <BlogAuthorsListPageClassic {...props} />;

  return <ArchiveRedirect title={TITLE} />;
}
