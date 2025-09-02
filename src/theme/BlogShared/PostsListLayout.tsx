import React from 'react';
import BlogScaffold from './Scaffold';
import Paginator from './Paginator';
import PostCard from './PostCard';
import type { BlogPaginatedMetadata } from '@docusaurus/plugin-content-blog';

export default function PostsListLayout({
  title,
  description,
  items,
  meta,
}: {
  title: string;
  description?: string;
  items: readonly any[];
  meta: BlogPaginatedMetadata;
}) {
  return (
    <BlogScaffold
      title={title}
      description={description}
    >
      {items.map((it: any) => (
        <PostCard key={it.content.metadata.permalink} item={it} />
      ))}
      <Paginator meta={meta} />
    </BlogScaffold>
  );
}
