import React from 'react';
import { translate } from '@docusaurus/Translate';

import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';
import { Card } from '../../../BlogShared/Components';
import TagChipList from '../../../BlogShared/TagChipList';
import BlogScaffold from '../../../BlogShared/Scaffold';

const TITLE = translate({
  id: 'theme.blog.authorsList.pageTitle',
  message: 'Authors',
});
const DESCRIPTION = "Authors of lailai's blog";

export default function BlogAuthorsListPage({ authors }: Props) {
  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <Card title={TITLE}>
        <TagChipList
          items={authors.map((author: any) => ({
            to: author.page.permalink,
            label: author.name,
            count: author.count,
          }))}
        />
      </Card>
    </BlogScaffold>
  );
}
