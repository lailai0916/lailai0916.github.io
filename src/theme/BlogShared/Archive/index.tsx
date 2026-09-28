import { useMemo, type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import Card from '@lailai0916/ui/Card';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { getDateKey } from '@site/src/utils/dateTime';
import { getAllBlogItems, loadOfficialAuthors, loadOfficialTags } from '@site/src/utils/blogData';
import { TagChipList } from '../BlogUI';
import BlogScaffold from '../Scaffold';
import { BlogArchiveList } from '../ArchiveList';
import styles from './styles.module.css';

type PostLike = {
  metadata: {
    date: string;
    permalink: string;
    title: string;
    tags?: ReadonlyArray<{ label: string; permalink: string }>;
  };
};

export type ArchiveSelection = {
  kind: 'tag' | 'author';
  permalink: string;
  title: string;
  description?: string;
  posts: readonly PostLike[];
};

const PAGE_TITLE = translate({ id: 'blog.pages.archive.title', message: 'Archive' });
const PAGE_DESCRIPTION = translate({
  id: 'blog.pages.archive.description',
  message: 'Browse posts by year, tag, or author',
});
const YEAR_TITLE = translate({ id: 'blog.archive.section.year', message: 'By Year' });
const TAGS_TITLE = translate({ id: 'blog.archive.section.tags', message: 'By Tag' });
const AUTHORS_TITLE = translate({ id: 'blog.archive.section.authors', message: 'By Author' });

function ArchiveSection({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <Card padding="1rem">
        <div className={styles.sectionHeader}>
          <h2 id={id} className={styles.sectionTitle}>
            {title}
          </h2>
          <span className={styles.sectionCount}>{count}</span>
        </div>
        {children}
      </Card>
    </section>
  );
}

function YearSection({
  years,
  activeYear,
  archiveUrl,
}: {
  years: readonly { year: number; count: number }[];
  activeYear: number | null;
  archiveUrl: string;
}) {
  return (
    <ArchiveSection id="years" title={YEAR_TITLE} count={years.length}>
      <TagChipList
        items={years.map(({ year, count }) => ({
          to: year === activeYear ? archiveUrl : `${archiveUrl}?year=${year}`,
          label: String(year),
          count,
          active: year === activeYear,
        }))}
      />
    </ArchiveSection>
  );
}

function TagsSection({
  activePermalink,
  archiveUrl,
  localeKey,
}: {
  activePermalink?: string;
  archiveUrl: string;
  localeKey?: string;
}) {
  const sorted = useMemo(
    () => [...loadOfficialTags(localeKey)].sort((a, b) => b.count - a.count),
    [localeKey]
  );
  return (
    <ArchiveSection id="tags" title={TAGS_TITLE} count={sorted.length}>
      <TagChipList
        items={sorted.map((tag) => ({
          to: tag.permalink === activePermalink ? archiveUrl : tag.permalink,
          label: tag.label,
          count: tag.count,
          active: tag.permalink === activePermalink,
        }))}
      />
    </ArchiveSection>
  );
}

function AuthorsSection({
  activePermalink,
  archiveUrl,
  localeKey,
}: {
  activePermalink?: string;
  archiveUrl: string;
  localeKey?: string;
}) {
  const authors = useMemo(
    () => loadOfficialAuthors(localeKey).filter((author) => !!author.page?.permalink),
    [localeKey]
  );
  return (
    <ArchiveSection id="authors" title={AUTHORS_TITLE} count={authors.length}>
      <TagChipList
        items={authors.map((author) => ({
          to: author.page!.permalink === activePermalink ? archiveUrl : author.page!.permalink,
          label: author.name ?? author.key,
          count: author.count,
          active: author.page!.permalink === activePermalink,
        }))}
      />
    </ArchiveSection>
  );
}

export default function BlogArchive({
  posts,
  selected,
}: {
  posts?: readonly PostLike[];
  selected?: ArchiveSelection;
}) {
  const archiveUrl = useBaseUrl('/blog/archive');
  const { i18n, siteConfig } = useDocusaurusContext();
  const { search } = useLocation();
  const isBrowser = useIsBrowser();
  const timeZone = useVisitorTimeZone();
  const localeKey = i18n.currentLocale === i18n.defaultLocale ? undefined : i18n.currentLocale;
  const allPosts = useMemo<readonly PostLike[]>(
    () =>
      posts ??
      getAllBlogItems().flatMap((item) => {
        const { date, permalink, title } = item.metadata ?? item;
        return date && permalink && title ? [{ metadata: { date, permalink, title } }] : [];
      }),
    [posts]
  );
  const years = useMemo(() => {
    const map = new Map<number, number>();
    allPosts.forEach((post) => {
      const year = Number(getDateKey(post.metadata.date, timeZone).slice(0, 4));
      map.set(year, (map.get(year) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([year, count]) => ({ year, count }));
  }, [allPosts, timeZone]);
  const requestedYear = Number(new URLSearchParams(search).get('year'));
  // Query parameters are client-only; keep the first render identical to the built HTML.
  const activeYear =
    !selected && isBrowser && years.some(({ year }) => year === requestedYear)
      ? requestedYear
      : null;
  const resultPosts =
    selected?.posts ??
    (activeYear === null
      ? null
      : allPosts.filter(
          (post) => Number(getDateKey(post.metadata.date, timeZone).slice(0, 4)) === activeYear
        ));
  const canonical = selected?.permalink ?? archiveUrl;

  return (
    <BlogScaffold
      title={selected?.title ?? PAGE_TITLE}
      description={selected ? selected.description : PAGE_DESCRIPTION}
    >
      <Head>
        <link rel="canonical" href={new URL(canonical, siteConfig.url).href} />
      </Head>
      <YearSection years={years} activeYear={activeYear} archiveUrl={archiveUrl} />
      <TagsSection
        activePermalink={selected?.kind === 'tag' ? selected.permalink : undefined}
        archiveUrl={archiveUrl}
        localeKey={localeKey}
      />
      <AuthorsSection
        activePermalink={selected?.kind === 'author' ? selected.permalink : undefined}
        archiveUrl={archiveUrl}
        localeKey={localeKey}
      />
      {resultPosts !== null && <BlogArchiveList posts={resultPosts} />}
    </BlogScaffold>
  );
}
