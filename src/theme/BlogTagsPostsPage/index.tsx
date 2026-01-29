import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogTagsPostsPageOriginal from '@theme-original/BlogTagsPostsPage';
import type { Props } from '@theme/BlogTagsPostsPage';
import BlogScaffold from '../BlogShared/Scaffold';
import { BlogArchiveList } from '../BlogShared/ArchiveList';

import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { loadOfficialTags } from '@site/src/utils/blogData';
import { BlogCard, TagChipList } from '../BlogShared/Components';
import { Paginator } from '../BlogShared/PostsListLayout';

const TITLE = translate({ id: 'blog.pages.tags.tagSelect', message: 'Tags' });

function TagSelector({ activePermalink }: { activePermalink: string }) {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, defaultLocale } = i18n;
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;
  const tags = React.useMemo(() => loadOfficialTags(localeKey), [localeKey]);

  if (!tags.length) return null;

  return (
    <BlogCard title={`${TITLE} (${tags.length})`}>
      <TagChipList
        items={tags.map((tag) => ({
          to: tag.permalink === activePermalink ? '/blog/tags' : tag.permalink,
          label: tag.label,
          count: tag.count,
          active: tag.permalink === activePermalink,
        }))}
      />
    </BlogCard>
  );
}

export default function BlogTagsPostsPage(props: Props): React.ReactElement {
  const { isOriginalLayout } = useTheme();
  if (isOriginalLayout) return <BlogTagsPostsPageOriginal {...props} />;

  const { items, listMetadata, tag } = props;
  const posts = React.useMemo(
    () => (items as any[]).map((it) => it.content),
    [items]
  );

  return (
    <BlogScaffold title={tag.label} description={tag.description}>
      <TagSelector activePermalink={tag.permalink} />
      <BlogArchiveList posts={posts} />
      <Paginator meta={listMetadata} />
    </BlogScaffold>
  );
}
