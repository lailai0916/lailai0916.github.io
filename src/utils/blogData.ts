/**
 * 博客数据获取和处理工具
 */

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
  MAX_POSTS: 4,
  EXCLUDED_PERMALINKS: ['/blog/welcome', '/zh-Hans/blog/welcome'] as string[],
  EMPTY_STATE_MESSAGE: '暂无文章，敬请期待更多精彩内容...',
} as const;

/**
 * 格式化日期为中文格式
 * @param dateString ISO格式的日期字符串
 * @returns 中文格式的日期字符串，如 "2025年6月2日"
 */
export function formatDateToChinese(dateString: string): string {
  const date = new Date(dateString);
  // 使用 UTC 方法获取日期，避免时区转换问题
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${year}年${month}月${day}日`;
}

/**
 * 动态获取博客文章数据
 * @returns 博客数据对象或null
 */
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

/**
 * 获取最新的博客文章列表
 * @param maxCount 最大文章数量，默认为配置中的MAX_POSTS
 * @returns 处理后的博客文章数组
 */

export function getRecentBlogPosts(
  maxCount: number = BLOG_CONFIG.MAX_POSTS
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

/**
 * 检查是否有可用的博客数据
 * @returns 是否成功加载博客数据
 */
export function hasBlogData(): boolean {
  const data = getBlogListData();
  return Boolean(data?.items?.length);
}
