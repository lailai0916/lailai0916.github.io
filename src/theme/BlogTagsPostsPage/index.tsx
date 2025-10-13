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
import TagChipList from '../BlogShared/TagChipList';
import { Card } from '../BlogShared/components';

const TITLE = translate({ id: 'blog.pages.tags.tagSelect', message: 'Tags' });

interface TagSelectorProps {
  activePermalink?: string;
  limit?: number;
}

function TagSelector({ activePermalink, limit = 30 }: TagSelectorProps) {
  const {
    i18n: { currentLocale, defaultLocale },
  } = useDocusaurusContext();
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;

  const tags = React.useMemo(
    () => getTagsOfficialOrder({ limit, locale: localeKey }),
    [limit, localeKey]
  );

  if (!tags.length) {
    return null;
  }

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
  const { isNewLayout } = useTheme();
  const { items, listMetadata, tag } = props;

  if (isNewLayout) {
    const title = `${tag.label}`;
    const description = tag.description ?? '';
    return (
      <PostsListLayout
        title={title}
        description={description}
        items={items}
        meta={listMetadata}
        topSlot={<TagSelector activePermalink={tag.permalink} />}
      />
    );
  }

  return <BlogTagsPostsPageOriginal {...props} />;
}
