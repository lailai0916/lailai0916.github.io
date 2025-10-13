import React from 'react';
import { translate } from '@docusaurus/Translate';

// styles are handled by shared components
import { Card } from '../../../BlogShared/components';
import TagChipList from '../../../BlogShared/TagChipList';
import BlogScaffold from '../../../BlogShared/Scaffold';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';

export default function BlogAuthorsListPage({ authors, sidebar }: Props) {
  return (
    <BlogScaffold title="Authors" description="Authors of lailai's blog">
      <Card
        title={translate({
          id: 'theme.blog.authorsList.pageTitle',
          message: 'Authors',
        })}
      >
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
