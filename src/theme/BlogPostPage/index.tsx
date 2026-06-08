import { type ReactElement } from 'react';
import clsx from 'clsx';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import BlogPostPageClassic from '@theme-original/BlogPostPage';
import BlogScaffold from '../BlogShared/Scaffold';
import Card from '@site/src/components/laikit/Card';
import {
  PostHeader,
  PostFooter,
  PostPaginator,
} from '../BlogShared/PostChrome';
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { BlogPostProvider } from '@docusaurus/plugin-content-blog/client';
import BlogPostPageMetadata from '@theme/BlogPostPage/Metadata';
import BlogPostPageStructuredData from '@theme/BlogPostPage/StructuredData';
import MDXContent from '@theme/MDXContent';

import type { Props } from '@theme/BlogPostPage';

export default function BlogPostPage(props: Props): ReactElement {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  if (isClassicDesign) return <BlogPostPageClassic {...props} />;

  const BlogPostContent = props.content;
  const { metadata, frontMatter } = props.content;

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
          toc={props.content.toc}
          title={metadata.title}
          description={metadata.description}
        >
          <Card>
            <PostHeader
              metadata={metadata}
              frontMatter={frontMatter as Record<string, unknown>}
            />
            <article className="markdown">
              <MDXContent>
                <BlogPostContent />
              </MDXContent>
            </article>
            <PostFooter metadata={metadata} />
          </Card>
          <PostPaginator
            prevItem={metadata.prevItem}
            nextItem={metadata.nextItem}
          />
        </BlogScaffold>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
