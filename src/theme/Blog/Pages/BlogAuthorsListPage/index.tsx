import React from 'react';
import Translate from '@docusaurus/Translate';

// styles are handled by shared components
import BlogScaffold from '../../../BlogShared/Scaffold';
import SidebarLeft from '../../../BlogShared/SidebarLeft';
import SidebarRight from '../../../BlogShared/SidebarRight';

import ChipListCard from '../../../BlogShared/ChipListCard';

import type { Props } from '@theme/Blog/Pages/BlogAuthorsListPage';

export default function BlogAuthorsListPage(props: Props) {
  const { authors } = props;
  return (
    <BlogScaffold
      title="Authors"
      left={<SidebarLeft />}
      right={<SidebarRight />}
    >
      <ChipListCard
        title={<Translate id="blog.authors">Authors</Translate>}
        items={authors.map((a: any) => ({
          to: a.permalink,
          label: a.name,
          count: a.count,
        }))}
      />
    </BlogScaffold>
  );
}
