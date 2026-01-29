import React, { type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';

import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';
import { BlogCard, TagChipList } from '../../../BlogShared/Components';
import BlogScaffold from '../../../BlogShared/Scaffold';

const TITLE = translate({
  id: 'theme.blog.authorsList.pageTitle',
  message: 'Authors',
});
const DESCRIPTION = "Authors of lailai's blog";

export default function BlogAuthorsListPage({ authors }: Props): ReactNode {
  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <BlogCard title={TITLE}>
        <TagChipList
          items={authors.map((author) => ({
            to: author.page?.permalink,
            label: author.name,
            count: author.count,
          }))}
        />
      </BlogCard>
    </BlogScaffold>
  );
}
