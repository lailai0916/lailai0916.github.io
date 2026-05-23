import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogArchivePageOriginal from '@theme-original/BlogArchivePage';
import type { Props } from '@theme/BlogArchivePage';
import ArchiveTabs, {
  type ArchiveTagItem,
  type ArchiveAuthorItem,
} from '../BlogShared/ArchiveTabs';
import {
  loadOfficialTags,
  loadOfficialAuthors,
} from '@site/src/utils/blogData';

export default function BlogArchivePage(props: Props): React.ReactElement {
  const { isOriginalLayout } = useTheme();
  if (isOriginalLayout) return <BlogArchivePageOriginal {...props} />;

  const posts = props.archive?.blogPosts ?? [];
  const tags: ArchiveTagItem[] = loadOfficialTags().map((t) => ({
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
    <ArchiveTabs
      initialTab="year"
      posts={posts}
      tags={tags}
      authors={authors}
    />
  );
}
