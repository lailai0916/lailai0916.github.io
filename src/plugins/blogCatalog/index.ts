import type { Plugin } from '@docusaurus/types';
import type { BlogContent } from '@docusaurus/plugin-content-blog';

export default function blogCatalogPlugin(): Plugin {
  return {
    name: 'blog-catalog',
    async allContentLoaded({ allContent, actions }) {
      const blog = allContent['docusaurus-plugin-content-blog']?.default as BlogContent | undefined;
      await actions.createData(
        'posts.json',
        JSON.stringify(blog?.blogPosts.map((post) => post.metadata) ?? [])
      );
    },
  };
}
