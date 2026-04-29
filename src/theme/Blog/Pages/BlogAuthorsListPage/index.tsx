import React, { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';

import { useTheme } from '@site/src/hooks/useTheme';
import BlogAuthorsListPageOriginal from '@theme-original/Blog/Pages/BlogAuthorsListPage';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';
import { BlogCard, TagChipList } from '../../../BlogShared/Components';
import BlogScaffold from '../../../BlogShared/Scaffold';

const TITLE = translate({
  id: 'theme.blog.authorsList.pageTitle',
  message: 'Authors',
});
const DESCRIPTION = "Authors of lailai's blog";

export default function BlogAuthorsListPage(props: Props): ReactNode {
  const { isOriginalLayout } = useTheme();
  if (isOriginalLayout) return <BlogAuthorsListPageOriginal {...props} />;

  const { authors } = props;
  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <BlogCard title={TITLE}>
        <TagChipList
          items={authors.flatMap((author) => {
            if (!author.page?.permalink) {
              return [];
            }

            return [
              {
                to: author.page.permalink,
                label: author.name ?? author.key,
                count: author.count,
              },
            ];
          })}
        />
      </BlogCard>
    </BlogScaffold>
  );
}
