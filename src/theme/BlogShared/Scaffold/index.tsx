import { useMemo, type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import type { TOCItem } from '@docusaurus/mdx-loader';

import { translate } from '@docusaurus/Translate';
import { loadOfficialTags } from '@site/src/utils/blogData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/Card';
import TitleCard from '@site/src/components/laikit/TitleCard';
import TableOfContents from '@site/src/components/Article/TableOfContents';
import { TagChipList, type ChipItem } from '../BlogUI';
import CalendarCard from '../Calendar';
import styles from './styles.module.css';

type BlogNavKey = 'blog' | 'moments' | 'archive';

type PopularTagItem = ChipItem & {
  count: number;
};

function useActiveBlogNav(): BlogNavKey {
  const { pathname } = useLocation();
  const momentsBase = useBaseUrl('/blog/moments');
  const archiveBase = useBaseUrl('/blog/archive');
  const tagsBase = useBaseUrl('/blog/tags');
  const authorsBase = useBaseUrl('/blog/authors');
  const overviewBase = useBaseUrl('/blog/overview');

  const startsWith = (base: string) =>
    pathname === base || pathname === `${base}/` || pathname.startsWith(`${base}/`);

  if (startsWith(momentsBase)) return 'moments';
  if (
    startsWith(archiveBase) ||
    startsWith(tagsBase) ||
    startsWith(authorsBase) ||
    startsWith(overviewBase)
  )
    return 'archive';
  return 'blog';
}

// Hardcoded site-owner profile, matching the homepage hero card. Keeping this
// in sync with blog/authors.yml is the author's responsibility — Docusaurus's
// author API is per-post / per-author-page context, not globally accessible,
// and tapping internal generated files (loadAuthor-style) ties us to private
// implementation details. For a single-owner personal site, copying the few
// fields the sidebar actually needs is simpler than either alternative.
const PROFILE_AVATAR = '/img/logo.svg';
const PROFILE_NAME = 'lailai';
const PROFILE_TITLE_ID = 'blog.sidebar.profileCard.title';
const PROFILE_TITLE_DEFAULT = 'Student & Developer';

function ProfileCard() {
  const avatarUrl = useBaseUrl(PROFILE_AVATAR);
  const aboutHref = useBaseUrl('/about');
  const blogHref = useBaseUrl('/blog');
  const momentsHref = useBaseUrl('/blog/moments');
  const archiveHref = useBaseUrl('/blog/overview');
  const active = useActiveBlogNav();
  const title = translate({
    id: PROFILE_TITLE_ID,
    message: PROFILE_TITLE_DEFAULT,
  });

  return (
    <Card>
      <div className={styles.profileCard}>
        <Link to={aboutHref} className={styles.profileHeader}>
          <img
            src={avatarUrl}
            alt={PROFILE_NAME}
            width={80}
            height={80}
            className={styles.profileAvatar}
          />
          <div className={styles.profileIntro}>
            <div className={styles.profileName}>{PROFILE_NAME}</div>
            <div className={styles.profileTitle}>{title}</div>
          </div>
        </Link>
        <nav className={styles.profileNav} aria-label="Blog sections">
          {(
            [
              {
                value: 'blog' as BlogNavKey,
                label: translate({ id: 'blog.menu.blog', message: 'Blog' }),
                href: blogHref,
              },
              {
                value: 'moments' as BlogNavKey,
                label: translate({
                  id: 'blog.menu.moments',
                  message: 'Moments',
                }),
                href: momentsHref,
              },
              {
                value: 'archive' as BlogNavKey,
                label: translate({
                  id: 'blog.menu.archive',
                  message: 'Archive',
                }),
                href: archiveHref,
              },
            ] as const
          ).map((item) => {
            const isActive = item.value === active;
            return (
              <Link
                key={item.value}
                to={item.href}
                className={clsx(styles.profileNavItem, isActive && styles.profileNavItemActive)}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </Card>
  );
}

function TagsCard() {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, defaultLocale } = i18n;
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;
  const tags = useMemo(
    () =>
      [...loadOfficialTags(localeKey)]
        .sort((a, b) => b.count - a.count)
        .slice(0, 8)
        .map(
          (tag): PopularTagItem => ({
            to: tag.permalink,
            label: tag.label,
            count: tag.count,
          })
        ),
    [localeKey]
  );

  return (
    <TitleCard
      size="plain"
      padding="1rem"
      title={translate({
        id: 'blog.sidebar.tags.title',
        message: 'Popular Tags',
      })}
    >
      <TagChipList items={tags} />
    </TitleCard>
  );
}

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
  toc?: readonly TOCItem[];
};

export default function BlogScaffold({ title, description, children, toc }: Props) {
  const isPostPage = toc !== undefined;
  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
        <aside className={styles.sidebar}>
          <ProfileCard />
          {isPostPage ? (
            <TableOfContents toc={toc} />
          ) : (
            <>
              <CalendarCard />
              <TagsCard />
            </>
          )}
        </aside>
      </div>
    </Layout>
  );
}
