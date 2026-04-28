import React from 'react';
import { useTheme } from '@site/src/hooks/useTheme';
import { BlogCard, TagChipList } from '../BlogShared/Components';
import BlogTagsListPageOriginal from '@theme-original/BlogTagsListPage';
import type { Props } from '@theme/BlogTagsListPage';
import BlogScaffold from '../BlogShared/Scaffold';
import { translate } from '@docusaurus/Translate';

const TITLE = translate({ id: 'theme.tags.tagsPageTitle', message: 'Tags' });
const DESCRIPTION = "Tags of lailai's blog";

export default function BlogTagsListPage(props: Props): React.ReactElement {
  const { isOriginalLayout } = useTheme();
  if (isOriginalLayout) return <BlogTagsListPageOriginal {...props} />;

  const { tags } = props;
  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <BlogCard title={`${TITLE} (${tags.length})`}>
        <TagChipList
          items={tags.map((tag) => ({
            to: tag.permalink,
            label: tag.label,
            count: tag.count,
          }))}
        />
      </BlogCard>
    </BlogScaffold>
  );
}
