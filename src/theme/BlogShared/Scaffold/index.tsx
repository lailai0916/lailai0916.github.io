import { useEffect, useMemo, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useLocation } from '@docusaurus/router';
import Layout from '@theme/Layout';
import type { TOCItem } from '@docusaurus/mdx-loader';
import { Icon } from '@iconify/react';

import { translate } from '@docusaurus/Translate';
import { loadOfficialTags } from '@site/src/utils/blogData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Card from '@site/src/components/laikit/Card';
import TitleCard from '@site/src/components/laikit/TitleCard';
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
    pathname === base ||
    pathname === `${base}/` ||
    pathname.startsWith(`${base}/`);

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
                className={clsx(
                  styles.profileNavItem,
                  isActive && styles.profileNavItemActive
                )}
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

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return Math.min(1, Math.max(0, progress));
}

function useActiveHeading(toc: readonly TOCItem[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!toc.length) return;
    const ids = toc.map((item) => item.id);

    const updateActive = () => {
      const offset = window.innerHeight * 0.25;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        } else {
          break;
        }
      }
      setActiveId(current ?? ids[0] ?? null);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [toc]);

  return activeId;
}

function TocProgress({ progress }: { progress: number }) {
  const pct = Math.round(progress * 100);
  return (
    <div
      className={styles.tocProgress}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={translate(
        {
          id: 'blog.sidebar.toc.progress',
          message: 'Reading progress: {percent}%',
        },
        { percent: String(pct) }
      )}
    >
      <div
        className={styles.tocProgressFill}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

function TocCard({
  toc,
  progress,
}: {
  toc: readonly TOCItem[];
  progress: number;
}) {
  const activeId = useActiveHeading(toc);

  return (
    <div className={styles.tocContainer}>
      <Card>
        <div className={styles.tocHeader}>
          <span className={styles.tocHeaderTitle}>
            {translate({
              id: 'blog.sidebar.toc.title',
              message: 'Contents',
            })}
          </span>
          <span className={styles.tocHeaderPercent}>
            {Math.round(progress * 100)}%
          </span>
        </div>
        <TocProgress progress={progress} />
        {toc.length > 0 && (
          <ul className={styles.tocList}>
            {toc.map((item) => {
              const isActive = item.id === activeId;
              const level = Math.min(Math.max(item.level, 2), 6);
              return (
                <li
                  key={item.id}
                  className={clsx(
                    styles.tocItem,
                    styles[`tocItemL${level}`],
                    isActive && styles.tocItemActive
                  )}
                >
                  <Link
                    to={`#${item.id}`}
                    className={styles.tocLink}
                    aria-current={isActive ? 'true' : undefined}
                    dangerouslySetInnerHTML={{ __html: item.value }}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}

function FeedCard() {
  const feeds = [
    {
      name: 'RSS',
      icon: 'lucide:rss',
      ariaLabel: translate({
        id: 'blog.sidebar.feed.rss',
        message: 'RSS Feed',
      }),
      href: useBaseUrl('/blog/rss.xml', { absolute: true }),
    },
    {
      name: 'Atom',
      icon: 'lucide:atom',
      ariaLabel: translate({
        id: 'blog.sidebar.feed.atom',
        message: 'Atom Feed',
      }),
      href: useBaseUrl('/blog/atom.xml', { absolute: true }),
    },
    {
      name: 'JSON',
      icon: 'lucide:braces',
      ariaLabel: translate({
        id: 'blog.sidebar.feed.json',
        message: 'JSON Feed',
      }),
      href: useBaseUrl('/blog/feed.json', { absolute: true }),
    },
  ];

  return (
    <Card>
      <div className={styles.feedGrid}>
        {feeds.map((feed) => (
          <Link
            key={feed.href}
            href={feed.href}
            aria-label={feed.ariaLabel}
            className={styles.feedTile}
          >
            <Icon
              icon={feed.icon}
              width="1.2em"
              height="1.2em"
              className={styles.feedTileIcon}
            />
            <span className={styles.feedTileLabel}>{feed.name}</span>
          </Link>
        ))}
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

function ScaffoldWithProgress({ title, description, children, toc }: Props) {
  const isPostPage = toc !== undefined;
  const progress = useScrollProgress();
  return (
    <Layout title={title} description={description}>
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
        <aside className={styles.sidebar}>
          <ProfileCard />
          {isPostPage ? (
            <TocCard toc={toc} progress={progress} />
          ) : (
            <>
              <CalendarCard />
              <FeedCard />
              <TagsCard />
            </>
          )}
        </aside>
      </div>
    </Layout>
  );
}

export default function BlogScaffold(props: Props) {
  return <ScaffoldWithProgress {...props} />;
}
