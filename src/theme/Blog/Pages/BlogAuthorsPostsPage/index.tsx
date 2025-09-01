import React from 'react';
import styles from '../../../BlogListPage/styles.module.css';
import BlogScaffold from '../../../BlogShared/Scaffold';
import SidebarLeft from '../../../BlogShared/SidebarLeft';
import SidebarRight from '../../../BlogShared/SidebarRight';
import Paginator from '../../../BlogShared/Paginator';
import PostCard from '../../../BlogShared/PostCard';

import type { Props } from '@theme/Blog/Pages/BlogAuthorsPostsPage';

// use shared PostCard & Sidebars

export default function BlogAuthorsPostsPage(props: Props) {
  const { items, listMetadata, author } = props;
  const title = author.name;
  const description = author.title ?? '';
  return (
    <BlogScaffold
      title={title}
      description={description}
      left={<SidebarLeft items={items} />}
      right={<SidebarRight />}
    >
      {items.map((it: any) => (
        <PostCard key={it.content.metadata.permalink} item={it} />
      ))}
      <Paginator meta={listMetadata} />
    </BlogScaffold>
  );
}
