import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogArchivePageOriginal from '@theme-original/BlogArchivePage';
import { translate } from '@docusaurus/Translate';
import { BlogArchiveList } from '../BlogShared/ArchiveList';
import BlogScaffold from '../BlogShared/Scaffold';
import type { Props } from '@theme/BlogArchivePage';

const TITLE = translate({ id: 'theme.blog.archive.title', message: 'Archive' });
const DESCRIPTION = "Archive of lailai's blog";

export default function BlogArchivePage(props: Props): React.ReactElement {
  const { isOriginalLayout } = useTheme();
  if (isOriginalLayout) return <BlogArchivePageOriginal {...props} />;

  const posts = (props.archive?.blogPosts ?? []) as any[];
  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <BlogArchiveList posts={posts} />
    </BlogScaffold>
  );
}
