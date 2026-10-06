import { useMemo, useState, type ReactNode } from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useLocation } from '@docusaurus/router';
import { translate } from '@docusaurus/Translate';
import Button from '@lailai0916/ui/Button';
import Card from '@lailai0916/ui/Card';
import SearchField from '@site/src/components/SearchField';
import DataState from '@lailai0916/ui/DataState';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { getDateKey } from '@site/src/utils/dateTime';
import { getAllBlogItems, getAllPostMetadata, loadOfficialTags } from '@site/src/utils/blogData';
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
  message: 'Browse posts by year or tag',
});
const YEAR_TITLE = translate({ id: 'blog.archive.section.year', message: 'By Year' });
const TAGS_TITLE = translate({ id: 'blog.archive.section.tags', message: 'By Tag' });
const SEARCH_PLACEHOLDER = translate({
  id: 'blog.archive.search.placeholder',
  message: 'Search Posts',
});

const CLEAR_SEARCH = translate({ id: 'blog.archive.search.clear', message: 'Clear search' });

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
  const [query, setQuery] = useState('');
  const localeKey = i18n.currentLocale === i18n.defaultLocale ? undefined : i18n.currentLocale;
  const postMetadata = useMemo(
    () => new Map(getAllPostMetadata().map((item) => [item.permalink, item])),
    []
  );
  const allPosts = useMemo<readonly PostLike[]>(
    () =>
      posts ??
      getAllBlogItems(localeKey).map(({ date, permalink, title }) => ({
        metadata: { date, permalink, title },
      })),
    [posts, localeKey]
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
  const normalizedQuery = query.trim().toLocaleLowerCase(i18n.currentLocale);
  const searchResults = useMemo(
    () =>
      normalizedQuery
        ? allPosts
            .filter((post) => {
              const detail = postMetadata.get(post.metadata.permalink);
              return [
                post.metadata.title,
                ...(detail?.tags.map((tag) => tag.label ?? '') ?? []),
                ...(detail?.authors?.map((author) => author.name ?? author.key) ?? []),
              ].some((value) =>
                value.toLocaleLowerCase(i18n.currentLocale).includes(normalizedQuery)
              );
            })
            .map((post) => ({
              metadata: {
                ...post.metadata,
                tags:
                  post.metadata.tags ??
                  postMetadata
                    .get(post.metadata.permalink)
                    ?.tags.filter((tag): tag is { label: string; permalink: string } =>
                      Boolean(tag.label && tag.permalink)
                    ),
              },
            }))
        : null,
    [allPosts, i18n.currentLocale, normalizedQuery, postMetadata]
  );
  const resultPosts =
    searchResults ??
    selected?.posts ??
    (activeYear === null
      ? allPosts
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
      <SearchField
        value={query}
        onValueChange={setQuery}
        placeholder={SEARCH_PLACEHOLDER}
        aria-label={SEARCH_PLACEHOLDER}
      />
      <YearSection years={years} activeYear={activeYear} archiveUrl={archiveUrl} />
      <TagsSection
        activePermalink={selected?.kind === 'tag' ? selected.permalink : undefined}
        archiveUrl={archiveUrl}
        localeKey={localeKey}
      />
      {searchResults && searchResults.length === 0 && (
        <div role="status">
          <DataState
            message={translate(
              {
                id: 'blog.archive.search.empty',
                message: 'No posts match "{query}"',
              },
              { query: query.trim() }
            )}
            action={
              <Button variant="secondary" onClick={() => setQuery('')}>
                {CLEAR_SEARCH}
              </Button>
            }
          />
        </div>
      )}
      {(!searchResults || resultPosts.length > 0) && <BlogArchiveList posts={resultPosts} />}
    </BlogScaffold>
  );
}
