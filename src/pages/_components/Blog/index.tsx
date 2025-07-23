import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IconText from '@site/src/components/laiKit/IconText';

import {
  getRecentBlogPosts,
  type ProcessedBlogPost,
} from '@site/src/utils/blogData';
import Section from '../common/Section';
import { TEXT_COLORS } from '../common';

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
} as const;

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

const CARD_STYLES = {
  container:
    'group block h-full w-full rounded-2xl outline-none focus:outline-none no-underline hover:no-underline focus:ring-2 focus:ring-[var(--ifm-color-primary)]',
  article:
    'relative overflow-hidden p-6 cursor-pointer w-full bg-white dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800/50 rounded-2xl transition-all duration-200 ease-out shadow-sm hover:shadow-md dark:shadow-none border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600',
  title:
    'font-semibold text-lg leading-snug group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200',
} as const;

const formatDate = (dateString: string, locale: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // 静默处理无效日期
      return dateString;
    }
    return date.toLocaleDateString(locale, DATE_FORMAT_OPTIONS);
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
      <Link
        to={permalink}
        className={CARD_STYLES.container}
        style={{ textDecoration: 'none' }}
      >
        <article className={CARD_STYLES.article}>
          <div className="space-y-6">
            <header>
              <h3
                className={`${CARD_STYLES.title} ${TEXT_COLORS.PRIMARY}`}
                style={TEXT_CLAMP_STYLES.title}
              >
                {title}
              </h3>
            </header>
            <footer>
              <div
                className={`flex items-center gap-2 text-sm ${TEXT_COLORS.SECONDARY}`}
              >
                <IconText icon="lucide:calendar" colorMode="monochrome">
                  <time className="no-underline" dateTime={date}>
                    {formattedDate}
                  </time>
                </IconText>
              </div>
            </footer>
          </div>
        </article>
      </Link>
    );
  }
);

BlogCard.displayName = 'BlogCard';

const BlogCardList = React.memo<{ posts: ProcessedBlogPost[]; locale: string }>(
  ({ posts, locale }) => {
    if (!posts.length) {
      return (
        <div className="w-full text-center py-12">
          <p className={`${TEXT_COLORS.MUTED} text-lg`}>
            <Translate id="home.blog.noPosts">
              No articles yet, stay tuned for more exciting content...
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
            className={index === 3 ? 'hidden md:block' : undefined}
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
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row px-5 w-full items-center">
        <div className="max-w-3xl lg:max-w-7xl gap-5 flex flex-col lg:flex-row lg:px-5">
          <div className="w-full lg:w-6/12 max-w-3xl flex flex-col items-start justify-start lg:ps-5 lg:pe-10">
            <h2
              className={`font-bold text-3xl md:text-4xl ${TEXT_COLORS.PRIMARY} leading-tight mb-8 flex items-center gap-3`}
            >
              <IconText icon="lucide:graduation-cap">
                <Translate id="home.blog.title">Learning & Practice</Translate>
              </IconText>
            </h2>
            <p className="leading-relaxed mb-6">
              <Translate id="home.blog.description.p1">
                Technology evolves rapidly, and we need to maintain keen
                learning abilities and curiosity. Every mastery of new
                technology is an investment in the future. Here we record
                thoughts and summaries in the learning process, sharing methods
                and experiences for solving problems.
              </Translate>
            </p>
            <p className="leading-relaxed mb-6">
              <Translate id="home.blog.description.p2">
                Through continuous practice and summarization, we transform
                knowledge into real skills. Only through practice-verified
                technologies and methods can truly help us solve real problems.
                You can find algorithm solutions, technical notes, and project
                practices here.
              </Translate>
            </p>
            <Link to="/blog">
              <strong>
                <Translate id="home.blog.more">View More Posts</Translate> →
              </strong>
            </Link>
          </div>

          <div className="w-full lg:w-6/12">
            <p
              className={`font-bold text-sm ${TEXT_COLORS.SECONDARY} flex flex-row gap-2 items-center mt-5 lg:mt-0 w-full`}
            >
              <IconText icon="lucide:chevron-right" colorMode="monochrome">
                <Translate id="home.blog.latest">Latest Posts</Translate>
              </IconText>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start my-8">
              <BlogCardList posts={recentPosts} locale={i18n.currentLocale} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
