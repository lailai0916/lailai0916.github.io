import { useMemo, useRef, useState, type ReactNode } from 'react';
import OriginalSearchBar from '@theme-original/SearchBar';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';
import { isRegexpStringMatch, useEvent } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { DocSearchModalProps, DocSearchTransformClient } from '@docsearch/react';
import useSearchAnalytics from '@site/src/hooks/useSearchAnalytics';
import { normalizeContentPath } from '@site/src/utils/analytics';

type Props = Partial<DocSearchModalProps> & {
  contextualSearch?: boolean;
  externalUrlRegex?: string;
  searchPagePath?: boolean | string;
};
type HitProps = Parameters<NonNullable<DocSearchModalProps['hitComponent']>>[0];

const emptyResult = { query: '', count: null as number | null };

export default function SearchBar(props: Props): ReactNode {
  const {
    siteConfig,
    siteMetadata: { docusaurusVersion },
  } = useDocusaurusContext();
  const configured = { ...(siteConfig.themeConfig.algolia as Props), ...props };
  const history = useHistory();
  const [result, setResult] = useState(emptyResult);
  const revision = useRef(0);
  const resultUrls = useRef(new Set<string>());
  const analytics = useSearchAnalytics({
    surface: 'search_modal',
    query: result.query,
    resultCount: result.count,
    resultKind: 'records',
  });

  const invalidate = useEvent((empty = false) => {
    revision.current++;
    if (empty) analytics.invalidate();
    else analytics.cancel();
    resultUrls.current.clear();
  });

  const cancelSearch = useEvent(() => {
    analytics.reset();
    invalidate();
  });

  const selectHit = useEvent((hit: HitProps['hit']) => {
    // Recent/favorite entries are navigation shortcuts, not completed current queries.
    if ('_highlightResult' in hit && resultUrls.current.has(normalizeContentPath(hit.url))) {
      analytics.trackResultClick(hit.url);
    }
  });

  const Hit = useMemo(
    () =>
      function SearchHit({ hit, children }: HitProps) {
        return (
          <Link
            to={hit.url}
            onClick={() => selectHit(hit)}
            onAuxClick={(event) => {
              if (event.button === 1) selectHit(hit);
            }}
          >
            {children}
          </Link>
        );
      },
    [selectHit]
  );

  const navigate = useEvent<NonNullable<NonNullable<DocSearchModalProps['navigator']>['navigate']>>(
    (params) => {
      selectHit(params.item);
      if (configured.navigator?.navigate) configured.navigator.navigate(params);
      else if (isRegexpStringMatch(configured.externalUrlRegex, params.itemUrl)) {
        window.location.href = params.itemUrl;
      } else history.push(params.itemUrl);
    }
  );
  const navigateNewTab = useEvent<
    NonNullable<NonNullable<DocSearchModalProps['navigator']>['navigateNewTab']>
  >((params) => {
    selectHit(params.item);
    if (configured.navigator?.navigateNewTab) configured.navigator.navigateNewTab(params);
    else window.open(params.itemUrl, '_blank', 'noopener');
  });
  const navigateNewWindow = useEvent<
    NonNullable<NonNullable<DocSearchModalProps['navigator']>['navigateNewWindow']>
  >((params) => {
    selectHit(params.item);
    if (configured.navigator?.navigateNewWindow) configured.navigator.navigateNewWindow(params);
    else window.open(params.itemUrl, '_blank', 'noopener');
  });
  const navigator = useMemo(
    () => ({ navigate, navigateNewTab, navigateNewWindow }),
    [navigate, navigateNewTab, navigateNewWindow]
  );

  const transformSearchClient = useEvent((client: DocSearchTransformClient) => {
    client.addAlgoliaAgent('docusaurus', docusaurusVersion);
    const transformed = configured.transformSearchClient?.(client) ?? client;
    const search: DocSearchTransformClient['search'] = (parameters, options) => {
      const requests = Array.isArray(parameters) ? parameters : parameters.requests;
      const indices = new Set(
        [
          configured.indexName,
          ...(configured.indices ?? []).map((index) =>
            typeof index === 'string' ? index : index.name
          ),
        ].filter(Boolean)
      );
      const requestIndex = requests.findIndex((request) => indices.has(request.indexName));
      const request = requests[requestIndex];
      // Ask AI suggestions use another index and must not become ordinary search events.
      if (!request) return transformed.search(parameters, options);
      const query =
        ('query' in request ? request.query : undefined) ??
        ('params' in request && typeof request.params === 'object'
          ? request.params.query
          : undefined) ??
        ('params' in request && typeof request.params === 'string'
          ? new URLSearchParams(request.params).get('query')
          : '') ??
        '';
      const currentRevision = ++revision.current;
      resultUrls.current.clear();
      setResult({ query, count: null });
      return transformed.search(parameters, options).then((response) => {
        const current = response.results[requestIndex];
        if (
          revision.current === currentRevision &&
          current &&
          'nbHits' in current &&
          typeof current.nbHits === 'number' &&
          'hits' in current &&
          Array.isArray(current.hits)
        ) {
          resultUrls.current = new Set(
            current.hits.flatMap((hit) =>
              typeof hit.url === 'string' ? [normalizeContentPath(hit.url)] : []
            )
          );
          setResult({ query, count: current.nbHits });
        }
        return response;
      });
    };
    return { ...transformed, search };
  });

  return (
    <span
      style={{ display: 'contents' }}
      onInputCapture={(event) => {
        invalidate(event.target instanceof HTMLInputElement && !event.target.value.trim());
      }}
      onResetCapture={() => invalidate(true)}
      onCompositionStartCapture={() => {
        invalidate();
        analytics.onCompositionStart();
      }}
      onCompositionEndCapture={analytics.onCompositionEnd}
      onKeyDownCapture={(event) => {
        if (
          event.key === 'Escape' ||
          ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')
        ) {
          cancelSearch();
        }
      }}
      onClickCapture={(event) => {
        const target = event.target;
        if (
          target instanceof Element &&
          (target.closest('.DocSearch-Close') || target.classList.contains('DocSearch-Container'))
        ) {
          cancelSearch();
        }
      }}
    >
      <OriginalSearchBar
        {...props}
        hitComponent={Hit}
        navigator={navigator}
        transformSearchClient={transformSearchClient}
      />
    </span>
  );
}
