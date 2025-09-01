import React from 'react';
import BlogScaffold from './Scaffold';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';
import Paginator from './Paginator';
import PostCard from './PostCard';

type Meta = {
  page: number;
  totalPages: number;
  previousPage?: string;
  nextPage?: string;
  permalink: string;
};

export default function PostsListLayout({
  title,
  description,
  items,
  meta,
}: {
  title: string;
  description?: string;
  items: any[];
  meta: Meta;
}) {
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
      <Paginator meta={meta} />
    </BlogScaffold>
  );
}

