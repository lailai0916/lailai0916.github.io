import { useMemo, type ReactNode } from 'react';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';
import { loadOfficialAuthors } from '@site/src/utils/blogData';
import BlogAuthorsPostsPageClassic from '@theme-original/Blog/Pages/BlogAuthorsPostsPage';
import type { Props } from '@theme/Blog/Pages/BlogAuthorsPostsPage';
import BlogScaffold from '../../../BlogShared/Scaffold';
import { BlogArchiveList } from '../../../BlogShared/ArchiveList';
import TitleCard from '@site/src/components/laikit/TitleCard';
import { TagChipList } from '../../../BlogShared/BlogUI';
import { ArchiveTabsNav } from '../../../BlogShared/ArchiveTabs';

const TITLE = translate({
  id: 'blog.pages.authors.authorSelect',
  message: 'Authors',
});

function AuthorSelector({ activePermalink }: { activePermalink: string }) {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, defaultLocale } = i18n;
  const localeKey = currentLocale === defaultLocale ? undefined : currentLocale;
  const authors = useMemo(() => loadOfficialAuthors(localeKey), [localeKey]);
  const authorsListUrl = useBaseUrl('/blog/authors');

  const items = authors.flatMap((author) => {
    if (!author.page?.permalink) return [];
    const isActive = author.page.permalink === activePermalink;
    return [
      {
        to: isActive ? authorsListUrl : author.page.permalink,
        label: author.name ?? author.key,
        count: author.count,
        active: isActive,
      },
    ];
  });

  if (!items.length) return null;

  return (
    <TitleCard size="plain" padding="1rem" title={`${TITLE} (${items.length})`}>
      <TagChipList items={items} />
    </TitleCard>
  );
}

export default function BlogAuthorsPostsPage(props: Props): ReactNode {
  const isClassicDesign = useExperimentalFlag('classicDesign');
  if (isClassicDesign) return <BlogAuthorsPostsPageClassic {...props} />;

  return <CustomBlogAuthorsPostsPage {...props} />;
}

function CustomBlogAuthorsPostsPage(props: Props): ReactNode {
  const { author, items } = props;
  const posts = useMemo(
    () => (items as any[]).map((it) => it.content),
    [items]
  );

  return (
    <BlogScaffold title={author.name ?? author.key} description={author.title}>
      <ArchiveTabsNav activeTab="authors" />
      {author.page?.permalink && (
        <AuthorSelector activePermalink={author.page.permalink} />
      )}
      <BlogArchiveList posts={posts} />
    </BlogScaffold>
  );
}
