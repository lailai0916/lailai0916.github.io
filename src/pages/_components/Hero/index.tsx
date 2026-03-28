import React, { useMemo } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import { COMMUNITY_LIST } from '@site/src/data/community';
import { getRecentBlogPosts } from '@site/src/utils/blogData';
import Card from '@site/src/components/laikit/widget/Card';
import styles from './styles.module.css';

const NAV_ITEMS = [
  {
    title: 'Contest',
    href: '/docs/contest',
    icon: 'lucide:trophy',
  },
  {
    title: 'Note',
    href: '/docs/note',
    icon: 'lucide:book-open',
  },
  {
    title: 'Project',
    href: '/docs/project',
    icon: 'lucide:folder-code',
  },
  {
    title: 'Blog',
    href: '/blog',
    icon: 'lucide:pen-line',
  },
];

const PROFILE_TAGS = [
  { label: 'China', icon: 'lucide:map-pin' },
  { label: 'Chinese & English', icon: 'lucide:languages' },
  { label: 'THU University', icon: 'lucide:graduation-cap' },
  { label: 'Hello', icon: 'lucide:message-circle' },
];

export default function Hero() {
  const { i18n } = useDocusaurusContext();
  const latestPost = useMemo(() => getRecentBlogPosts(1)[0] ?? null, []);
  const latestPostDate = latestPost
    ? new Date(latestPost.date).toLocaleDateString(i18n.currentLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : '';

  return (
    <section className={styles.hero}>
      <div className={styles.bento}>
        <Card className={styles.cardMain} padding="1.75rem">
          <div className={styles.cardMainInner}>
            <img
              src={useBaseUrl('/img/logo.svg')}
              alt="lailai"
              className={styles.avatar}
            />
            <div className={styles.intro}>
              <div className={styles.nameRow}>
                <h1 className={styles.name}>lailai</h1>
                <span className={styles.statusInline}>
                  <span className={styles.statusDot} />
                  <span className={styles.statusText}>Available</span>
                </span>
              </div>
              <p className={styles.role}>Student & Developer</p>
            </div>
          </div>
          <div className={styles.profileTags}>
            {PROFILE_TAGS.map((tag) => (
              <span key={tag.label} className={styles.profileTag}>
                <Icon icon={tag.icon} className={styles.profileTagIcon} />
                <span>{tag.label}</span>
              </span>
            ))}
          </div>
        </Card>
        {NAV_ITEMS.map((item, index) => (
          <Link key={item.title} to={item.href} className={styles.cardNavLink}>
            <Card
              className={clsx(styles.cardNav, styles[`cardNav${index + 1}`])}
              padding="1.25rem"
            >
              <Icon icon={item.icon} className={styles.cardNavIcon} />
              <span className={styles.cardNavTitle}>{item.title}</span>
              <Icon
                icon="lucide:arrow-up-right"
                className={styles.cardNavArrow}
              />
            </Card>
          </Link>
        ))}
        <Card className={styles.cardSocial} padding="1.25rem">
          <span className={styles.cardSocialLabel}>Connect</span>
          <div className={styles.socialLinks}>
            {COMMUNITY_LIST.map((social) => (
              <Link
                key={social.title}
                href={social.href}
                className={styles.socialLink}
                aria-label={social.title}
              >
                <Icon icon={social.icon} width={20} height={20} />
              </Link>
            ))}
          </div>
        </Card>
        <Card className={styles.cardLatestPost} padding="1.25rem">
          {latestPost ? (
            <Link to={latestPost.permalink} className={styles.latestPostLink}>
              <div className={styles.latestPostHead}>
                <span className={styles.latestPostLabel}>Latest Post</span>
              </div>
              <p className={styles.latestPostTitle}>{latestPost.title}</p>
              <p className={styles.latestPostMeta}>
                <Icon icon="lucide:calendar" className={styles.latestPostMetaIcon} />
                <span>{latestPostDate}</span>
              </p>
            </Link>
          ) : (
            <div className={styles.latestPostEmpty}>No posts yet.</div>
          )}
        </Card>
      </div>
    </section>
  );
}
