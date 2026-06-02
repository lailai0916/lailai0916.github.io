import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogTagsListPageClassic from '@theme-original/BlogTagsListPage';
import type { Props } from '@theme/BlogTagsListPage';
import ArchiveTabs, {
  type ArchiveTagItem,
  type ArchiveAuthorItem,
} from '../BlogShared/ArchiveTabs';
import { getAllBlogItems, loadOfficialAuthors } from '@site/src/utils/blogData';

export default function BlogTagsListPage(props: Props): React.ReactElement {
  const { isClassicDesign } = useTheme();
  if (isClassicDesign) return <BlogTagsListPageClassic {...props} />;

  const posts = getAllBlogItems()
    .filter(
      (it) => it.metadata?.date && it.metadata?.permalink && it.metadata?.title
    )
    .map((it) => ({
      metadata: {
        date: it.metadata!.date as string,
        permalink: it.metadata!.permalink as string,
        title: it.metadata!.title as string,
      },
    }));
  const tags: ArchiveTagItem[] = props.tags.map((t) => ({
    label: t.label,
    permalink: t.permalink,
    count: t.count,
  }));
  const authors: ArchiveAuthorItem[] = loadOfficialAuthors()
    .filter((a) => !!a.page?.permalink)
    .map((a) => ({
      label: a.name ?? a.key,
      permalink: a.page!.permalink,
      count: a.count,
    }));

  return (
    <ArchiveTabs activeTab="tags" posts={posts} tags={tags} authors={authors} />
  );
}
