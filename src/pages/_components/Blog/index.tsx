import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/widget/Card';
import IconText from '@site/src/components/laikit/widget/IconText';

import {
  getRecentBlogPosts,
  type ProcessedBlogPost,
} from '@site/src/utils/blogData';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import styles from './styles.module.css';

const TEXT_CLAMP_STYLES = {
  title: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: '1.375',
    minHeight: '2.75em',
  } as React.CSSProperties,
} as const;

const formatDate = (dateString: string, locale: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // 静默处理无效日期
      return dateString;
    }
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  } catch (error) {
    // 静默处理日期格式化错误
    return dateString;
  }
};

const BlogCard = React.memo<ProcessedBlogPost & { locale: string }>(
  ({ title, date, permalink, locale }) => {
    const formattedDate = useMemo(
      () => formatDate(date, locale),
      [date, locale]
    );

    return (
      <Link to={permalink} className={styles.cardLink}>
        <Card className={styles.card} padding="1.5rem">
          <div className={styles.cardBody}>
            <header>
              <h3 className={styles.cardTitle} style={TEXT_CLAMP_STYLES.title}>
                {title}
              </h3>
            </header>
            <footer>
              <div className={styles.cardMeta}>
                <IconText icon="lucide:calendar" colorMode="monochrome">
                  <time className={styles.time} dateTime={date}>
                    {formattedDate}
                  </time>
                </IconText>
              </div>
            </footer>
          </div>
        </Card>
      </Link>
    );
  }
);

BlogCard.displayName = 'BlogCard';

const BlogCardList = React.memo<{ posts: ProcessedBlogPost[]; locale: string }>(
  ({ posts, locale }) => {
    if (!posts.length) {
      return (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            <Translate id="home.blog.empty">
              No posts yet, please look forward to more content...
            </Translate>
          </p>
        </div>
      );
    }

    return (
      <>
        {posts.slice(0, 4).map((post, index) => (
          <div
            key={post.permalink}
            className={
              index === 3
                ? `${styles.gridItem} ${styles.gridItemHidden}`
                : styles.gridItem
            }
          >
            <BlogCard {...post} locale={locale} />
          </div>
        ))}
      </>
    );
  }
);

BlogCardList.displayName = 'BlogCardList';

export default function Blog() {
  const { i18n } = useDocusaurusContext();
  const recentPosts = useMemo(() => getRecentBlogPosts(), []);

  return (
    <SectionContainer>
      <div className={styles.sectionContent}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <h2 className={styles.title}>
              <IconText icon="lucide:graduation-cap">
                <Translate id="home.blog.title">Learning & Practice</Translate>
              </IconText>
            </h2>
            <p className={styles.description}>
              <Translate id="home.blog.description.p1">
                Technology evolves rapidly, and we need to maintain keen
                learning abilities and curiosity. Every mastery of new
                technology is an investment in the future. Here we record
                thoughts and summaries in the learning process, sharing methods
                and experiences for solving problems.
              </Translate>
            </p>
            <p className={styles.description}>
              <Translate id="home.blog.description.p2">
                Through continuous practice and summarization, we transform
                knowledge into real skills. Only practice‑validated methods and
                technologies truly help solve real problems. You can find
                algorithm solutions, technical notes, and project practices
                here.
              </Translate>
            </p>
            <Link to="/blog" className={styles.moreLink}>
              <strong>
                <Translate id="home.blog.more">View More Posts →</Translate>
              </strong>
            </Link>
          </div>

          <div className={styles.posts}>
            <p className={styles.postsHeading}>
              <IconText icon="lucide:chevron-right" colorMode="monochrome">
                <Translate id="home.blog.latest">Latest Posts</Translate>
              </IconText>
            </p>
            <div className={styles.grid}>
              <BlogCardList posts={recentPosts} locale={i18n.currentLocale} />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
