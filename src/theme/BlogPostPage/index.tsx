import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@site/src/hooks/useTheme';
import BlogPostPageOriginal from '@theme-original/BlogPostPage';
import BlogScaffold from '../BlogShared/Scaffold';
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import BlogPostPaginator from '@theme/BlogPostPaginator';
import BlogPostItem from '@theme/BlogPostItem';

// styles are handled by shared components

import type { Props } from '@theme/BlogPostPage';

// Use the official BlogPostItem to render content and metadata

export default function BlogPostPage(props: Props): React.ReactElement {
  const { isNewLayout } = useTheme();
  const BlogPostContent = props.content;

  if (isNewLayout) {
    return (
      <BlogPostProvider content={props.content} isBlogPostPage>
        <HtmlClassNameProvider
          className={clsx(
            ThemeClassNames.wrapper.blogPages,
            ThemeClassNames.page.blogPostPage
          )}
        >
          <BlogPostPageMetadata />
          <BlogPostPageStructuredData />
          <BlogScaffold
            title={props.content.metadata.title}
            description={props.content.metadata.description}
          >
            <BlogPostItem>
              <BlogPostContent />
            </BlogPostItem>
            {(props.content.metadata.nextItem ||
              props.content.metadata.prevItem) && (
              <BlogPostPaginator
                nextItem={props.content.metadata.nextItem}
                prevItem={props.content.metadata.prevItem}
              />
            )}
          </BlogScaffold>
        </HtmlClassNameProvider>
      </BlogPostProvider>
    );
  }

  return <BlogPostPageOriginal {...props} />;
}
