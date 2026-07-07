import { type ReactNode } from 'react';

import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import BlogAuthorsListPageClassic from '@theme-original/Blog/Pages/BlogAuthorsListPage';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';
import ArchiveTabs, {
  type ArchiveTagItem,
  type ArchiveAuthorItem,
} from '../../../BlogShared/ArchiveTabs';
import { getAllBlogItems, loadOfficialTags } from '@site/src/utils/blogData';

export default function BlogAuthorsListPage(props: Props): ReactNode {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  if (isClassicDesign) return <BlogAuthorsListPageClassic {...props} />;

  const posts = getAllBlogItems()
    .filter((it) => it.metadata?.date && it.metadata?.permalink && it.metadata?.title)
    .map((it) => ({
      metadata: {
        date: it.metadata!.date as string,
        permalink: it.metadata!.permalink as string,
        title: it.metadata!.title as string,
      },
    }));

  const tags: ArchiveTagItem[] = loadOfficialTags().map((t) => ({
    label: t.label,
    permalink: t.permalink,
    count: t.count,
  }));

  const authors: ArchiveAuthorItem[] = props.authors.flatMap((author) => {
    if (!author.page?.permalink) return [];
    return [
      {
        label: author.name ?? author.key,
        permalink: author.page.permalink,
        count: author.count,
      },
    ];
  });

  return <ArchiveTabs activeTab="authors" posts={posts} tags={tags} authors={authors} />;
}
