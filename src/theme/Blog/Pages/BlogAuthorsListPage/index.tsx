import React from 'react';
import Translate from '@docusaurus/Translate';

// styles are handled by shared components
import BlogScaffold from '../../../BlogShared/Scaffold';
import ChipListCard from '../../../BlogShared/ChipListCard';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';

export default function BlogAuthorsListPage({ authors, sidebar }: Props) {
  return (
    <BlogScaffold title="Authors">
      <ChipListCard
        title={<Translate id="blog.authors">All Authors</Translate>}
        items={authors.map((author: any) => ({
          to: author.page.permalink,
          label: author.name,
          count: author.count,
        }))}
      />
    </BlogScaffold>
  );
}
