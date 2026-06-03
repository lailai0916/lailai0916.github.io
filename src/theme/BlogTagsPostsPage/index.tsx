import React from 'react';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import BlogTagsPostsPageClassic from '@theme-original/BlogTagsPostsPage';
import type { Props } from '@theme/BlogTagsPostsPage';
import BlogScaffold from '../BlogShared/Scaffold';
import { BlogArchiveList } from '../BlogShared/ArchiveList';
import { ArchiveTabsNav } from '../BlogShared/ArchiveTabs';

import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { loadOfficialTags } from '@site/src/utils/blogData';
import TitleCard from '@site/src/components/laikit/TitleCard';
import { TagChipList } from '../BlogShared/BlogUI';

const TITLE = translate({ id: 'blog.pages.tags.tagSelect', message: 'Tags' });

function TagSelector({ activePermalink }: { activePermalink: string }) {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, defaultLocale } = i18n;
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;
  const tags = React.useMemo(
    () => [...loadOfficialTags(localeKey)].sort((a, b) => b.count - a.count),
    [localeKey]
  );

  if (!tags.length) return null;

  return (
    <TitleCard padding="1rem" title={`${TITLE} (${tags.length})`}>
      <TagChipList
        items={tags.map((tag) => ({
          to: tag.permalink === activePermalink ? '/blog/tags' : tag.permalink,
          label: tag.label,
          count: tag.count,
          active: tag.permalink === activePermalink,
        }))}
      />
    </TitleCard>
  );
}

export default function BlogTagsPostsPage(props: Props): React.ReactElement {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  if (isClassicDesign) return <BlogTagsPostsPageClassic {...props} />;

  return <CustomBlogTagsPostsPage {...props} />;
}

function CustomBlogTagsPostsPage(props: Props): React.ReactElement {
  const { items, tag } = props;
  const posts = React.useMemo(
    () => (items as any[]).map((it) => it.content),
    [items]
  );

  return (
    <BlogScaffold title={tag.label} description={tag.description}>
      <ArchiveTabsNav activeTab="tags" />
      <TagSelector activePermalink={tag.permalink} />
      <BlogArchiveList posts={posts} />
    </BlogScaffold>
  );
}
