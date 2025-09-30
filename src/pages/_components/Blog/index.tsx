import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IconText from '@site/src/components/laikit/widget/IconText';

import {
  getRecentBlogPosts,
  type ProcessedBlogPost,
} from '@site/src/utils/blogData';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import { TEXT_COLORS } from '@site/src/components/laikit/section/constants';

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
    '--tw-group --tw-block --tw-h-full --tw-w-full --tw-rounded-2xl --tw-outline-none focus:--tw-outline-none --tw-no-underline hover:--tw-no-underline focus:--tw-ring-2 focus:--tw-ring-[var(--ifm-color-primary)]',
  article:
    '--tw-relative --tw-overflow-hidden --tw-p-6 --tw-cursor-pointer --tw-w-full --tw-bg-white dark:--tw-bg-neutral-900 hover:--tw-bg-gray-50 dark:hover:--tw-bg-neutral-800/50 --tw-rounded-2xl --tw-transition-all --tw-duration-200 --tw-ease-out --tw-shadow-sm hover:--tw-shadow-md dark:--tw-shadow-none --tw-border --tw-border-gray-200 dark:--tw-border-neutral-700 hover:--tw-border-gray-300 dark:hover:--tw-border-neutral-600',
  title:
    '--tw-font-semibold --tw-text-lg --tw-leading-snug group-hover:--tw-text-[var(--ifm-color-primary)] --tw-transition-colors --tw-duration-200',
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
      <Link
        to={permalink}
        className={CARD_STYLES.container}
        style={{ textDecoration: 'none' }}
      >
        <article className={CARD_STYLES.article}>
          <div className="--tw-space-y-6">
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
                className={`--tw-flex --tw-items-center --tw-gap-2 --tw-text-sm ${TEXT_COLORS.SECONDARY}`}
              >
                <IconText icon="lucide:calendar" colorMode="monochrome">
                  <time className="--tw-no-underline" dateTime={date}>
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
        <div className="--tw-w-full --tw-text-center --tw-py-12">
          <p className={`${TEXT_COLORS.MUTED} --tw-text-lg`}>
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
            className={index === 3 ? '--tw-hidden md:--tw-block' : undefined}
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
      <div className="--tw-max-w-7xl --tw-mx-auto --tw-flex --tw-flex-col lg:--tw-flex-row --tw-px-5 --tw-w-full --tw-items-center">
        <div className="--tw-max-w-3xl lg:--tw-max-w-7xl --tw-gap-5 --tw-flex --tw-flex-col lg:--tw-flex-row lg:--tw-px-5">
          <div className="--tw-w-full lg:--tw-w-6/12 --tw-max-w-3xl --tw-flex --tw-flex-col --tw-items-start --tw-justify-start lg:--tw-ps-5 lg:--tw-pe-10">
            <h2
              className={`--tw-font-bold --tw-text-3xl md:--tw-text-4xl ${TEXT_COLORS.PRIMARY} --tw-leading-tight --tw-mb-8 --tw-flex --tw-items-center --tw-gap-3`}
            >
              <IconText icon="lucide:graduation-cap">
                <Translate id="home.blog.title">Learning & Practice</Translate>
              </IconText>
            </h2>
            <p className="--tw-leading-relaxed --tw-mb-6">
              <Translate id="home.blog.description.p1">
                Technology evolves rapidly, and we need to maintain keen
                learning abilities and curiosity. Every mastery of new
                technology is an investment in the future. Here we record
                thoughts and summaries in the learning process, sharing methods
                and experiences for solving problems.
              </Translate>
            </p>
            <p className="--tw-leading-relaxed --tw-mb-6">
              <Translate id="home.blog.description.p2">
                Through continuous practice and summarization, we transform
                knowledge into real skills. Only practice‑validated methods and
                technologies truly help solve real problems. You can find
                algorithm solutions, technical notes, and project practices
                here.
              </Translate>
            </p>
            <Link to="/blog">
              <strong>
                <Translate id="home.blog.more">View More Posts →</Translate>
              </strong>
            </Link>
          </div>

          <div className="--tw-w-full lg:--tw-w-6/12">
            <p
              className={`--tw-font-bold --tw-text-sm ${TEXT_COLORS.SECONDARY} --tw-flex --tw-flex-row --tw-gap-2 --tw-items-center --tw-mt-5 lg:--tw-mt-0 --tw-w-full`}
            >
              <IconText icon="lucide:chevron-right" colorMode="monochrome">
                <Translate id="home.blog.latest">Latest Posts</Translate>
              </IconText>
            </p>
            <div className="--tw-grid --tw-grid-cols-1 md:--tw-grid-cols-2 --tw-gap-6 --tw-text-start --tw-my-8">
              <BlogCardList posts={recentPosts} locale={i18n.currentLocale} />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
