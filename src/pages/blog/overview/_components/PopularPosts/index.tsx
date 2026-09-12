import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluralForm } from '@docusaurus/theme-common';
import Button from '@site/src/components/laikit/Button';
import DataState from '@site/src/components/laikit/DataState';
import Skeleton from '@site/src/components/laikit/Skeleton';
import TitleCard from '@site/src/components/laikit/TitleCard';
import { useFetch } from '@site/src/hooks/useFetch';
import { loadPopularPosts, POPULAR_POST_LIMIT, type BlogItems } from './data';
import styles from './styles.module.css';

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
  const maxViews = posts[0]?.views ?? 0;

  return (
    <TitleCard
      size="plain"
      padding="1.25rem"
      title={translate({ id: 'pages.overview.popular.title', message: 'Popular Posts' })}
      className={styles.card}
    >
      <div aria-busy={isInitialLoading} aria-live="polite">
        {isInitialLoading ? (
          <div className={styles.list} aria-hidden="true">
            {Array.from({ length: POPULAR_POST_LIMIT }, (_, i) => (
              <div key={i} className={styles.row}>
                <div className={styles.rank}>
                  <Skeleton width="1.25rem" height="1.25rem" />
                </div>
                <div className={styles.content}>
                  <div className={styles.heading}>
                    <div className={styles.title}>
                      <Skeleton width="75%" height="1.4em" />
                    </div>
                    <div className={styles.views}>
                      <Skeleton width="4rem" height="1.4em" />
                    </div>
                  </div>
                  <Skeleton width="100%" height="3px" />
                </div>
              </div>
            ))}
          </div>
        ) : status === 'error' ? (
          <DataState
            message={translate({
              id: 'pages.overview.popular.error',
              message: 'Could not load popular posts.',
            })}
            action={
              <Button size="sm" onClick={retry}>
                {translate({ id: 'pages.overview.popular.retry', message: 'Retry' })}
              </Button>
            }
          />
        ) : posts.length === 0 ? (
          <DataState
            message={translate({
              id: 'pages.overview.popular.empty',
              message: 'No reading data yet.',
            })}
          />
        ) : (
          <ol className={styles.list} role="list">
            {posts.map((post, i) => (
              <li key={post.permalink}>
                <Link to={post.permalink} className={styles.row}>
                  <span className={styles.rank} aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className={styles.content}>
                    <div className={styles.heading}>
                      <span className={styles.title} title={post.title}>
                        {post.title}
                      </span>
                      <span className={styles.views}>
                        {selectMessage(
                          post.views,
                          translate(
                            {
                              id: 'pages.overview.popular.views',
                              message: '{count} view|{count} views',
                            },
                            { count: new Intl.NumberFormat(locale).format(post.views) }
                          )
                        )}
                      </span>
                    </div>
                    <div className={styles.track} aria-hidden="true">
                      <div
                        className={styles.fill}
                        style={{ width: `${maxViews > 0 ? (post.views / maxViews) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </TitleCard>
  );
}
