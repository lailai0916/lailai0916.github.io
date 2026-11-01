import MetricList from '@lailai0916/ui/MetricList';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluralForm } from '@docusaurus/theme-common';
import Button from '@lailai0916/ui/Button';
import { useFetch } from '@site/src/hooks/useFetch';
import { loadPopularPosts, POPULAR_POST_LIMIT, type BlogItems } from './data';

export default function PopularPosts({ items }: { items: BlogItems }) {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const blogPath = useBaseUrl('/blog/');
  const { selectMessage } = usePluralForm();
  const {
    data: posts,
    status,
    isInitialLoading,
    retry,
  } = useFetch((signal) => loadPopularPosts(items, blogPath, signal), [blogPath], []);
  const titles = new Map(posts.map((post) => [post.permalink, post.title]));
  return (
    <MetricList
      title={translate({ id: 'pages.overview.popular.title', message: 'Popular Posts' })}
      variant="ranked"
      size="plain"
      padding="1.25rem"
      items={posts.map((post) => ({ x: post.permalink, y: post.views }))}
      loading={isInitialLoading}
      loadingCount={POPULAR_POST_LIMIT}
      renderLabel={(path) => titles.get(path) ?? path}
      labelTitle={(path) => titles.get(path) ?? path}
      href={(path) => path}
      emptyText={translate({ id: 'pages.overview.popular.empty', message: 'No reading data yet.' })}
      error={
        status === 'error'
          ? translate({
              id: 'pages.overview.popular.error',
              message: 'Could not load popular posts.',
            })
          : undefined
      }
      errorAction={
        <Button size="sm" onClick={retry}>
          {translate({ id: 'pages.overview.popular.retry', message: 'Retry' })}
        </Button>
      }
      formatValue={(count) =>
        selectMessage(
          count,
          translate(
            { id: 'pages.overview.popular.views', message: '{count} view|{count} views' },
            { count: new Intl.NumberFormat(locale).format(count) }
          )
        )
      }
    />
  );
}
