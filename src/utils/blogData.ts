export interface BlogPost {
  title: string;
  permalink: string;
  date: string;
}

export interface ProcessedBlogPost {
  title: string;
  date: string;
  permalink: string;
}

// 博客配置常量
export const BLOG_CONFIG = {
  EXCLUDED_PERMALINKS: ['/blog/welcome', '/zh-Hans/blog/welcome'] as string[],
} as const;

function getBlogListData(): any {
  try {
    const data = require('@site/.docusaurus/docusaurus-plugin-content-blog/default/blog-post-list-prop-default.json');
    // 静默加载博客数据
    return data;
  } catch (error) {
    // 静默处理博客数据加载失败
    return null;
  }
}

export function getRecentBlogPosts(
  maxCount: number = 4
): ProcessedBlogPost[] {
  const blogListData = getBlogListData();

  if (!blogListData?.items) {
    return [];
  }

  // 简单过滤：排除指定的文章
  return blogListData.items
    .filter(
      (post: BlogPost) =>
        !BLOG_CONFIG.EXCLUDED_PERMALINKS.includes(post.permalink)
    )
    .slice(0, maxCount)
    .map(
      (post: BlogPost): ProcessedBlogPost => ({
        title: post.title,
        date: post.date,
        permalink: post.permalink,
      })
    );
}
