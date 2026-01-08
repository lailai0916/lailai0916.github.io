import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogTagsPostsPageOriginal from '@theme-original/BlogTagsPostsPage';
import PostsListLayout from '../BlogShared/PostsListLayout';

// no direct data utils needed here; sidebars handle their own data

import type { Props } from '@theme/BlogTagsPostsPage';

// use shared PostCard / Sidebars / Paginator

import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { getTagsOfficialOrder } from '@site/src/utils/blogData';
import { Card, TagChipList } from '../BlogShared/Components';

const TITLE = translate({ id: 'blog.pages.tags.tagSelect', message: 'Tags' });

interface TagSelectorProps {
  activePermalink?: string;
  limit?: number;
}

function TagSelector({ activePermalink, limit = 30 }: TagSelectorProps) {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, defaultLocale } = i18n;
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;

  const tags = React.useMemo(
    () => getTagsOfficialOrder({ limit, locale: localeKey }),
    [limit, localeKey]
  );

  if (!tags.length) return null;

  return (
    <Card title={TITLE}>
      <TagChipList
        items={tags.map((tag) => ({
          to: tag.permalink,
          label: tag.label,
          count: tag.count,
          active: tag.permalink === activePermalink,
        }))}
      />
    </Card>
  );
}

export default function BlogTagsPostsPage(props: Props): React.ReactElement {
  const { isOriginalLayout } = useTheme();
  if (isOriginalLayout) <BlogTagsPostsPageOriginal {...props} />;

  const { items, listMetadata, tag } = props;

  return (
    <PostsListLayout
      title={tag.label}
      description={tag.description}
      items={items}
      meta={listMetadata}
      topSlot={<TagSelector activePermalink={tag.permalink} />}
    />
  );
}
