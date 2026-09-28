import { type ReactNode } from 'react';
import { useLocation } from '@docusaurus/router';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import BlogAuthorsPostsPageClassic from '@theme-original/Blog/Pages/BlogAuthorsPostsPage';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsPostsPage';
import BlogArchive from '../../../BlogShared/Archive';

export default function BlogAuthorsPostsPage(props: Props): ReactNode {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  const { pathname } = useLocation();
  if (isClassicDesign) return <BlogAuthorsPostsPageClassic {...props} />;

  const { author, items } = props;
  return (
    <BlogArchive
      selected={{
        kind: 'author',
        permalink: author.page?.permalink ?? pathname,
        title: author.name ?? author.key,
        description: author.title,
        posts: items.map((item) => item.content),
      }}
    />
  );
}
