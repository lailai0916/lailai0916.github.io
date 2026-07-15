import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { applyTrailingSlash } from '@docusaurus/utils-common';
import { umamiFetchJson } from '@site/src/utils/umami';
import { useFetch } from './useFetch';

export interface AnalyticsData {
  visitors?: number;
  pageviews?: number;
}

interface UmamiStatsResponse {
  pageviews?: number;
  visitors?: number;
  visits?: number;
  bounces?: number;
  totaltime?: number;
}

export function useAnalytics(rawPath: string = '') {
  const { siteConfig } = useDocusaurusContext();

  // Umami records the canonical URL Docusaurus serves (per `trailingSlash`), but
  // an index.mdx doc's `permalink` keeps a trailing slash (`/docs/note/`) that
  // never matches. Normalize with Docusaurus's own rule so the lookup lines up —
  // leaf docs and blog posts are already canonical and pass through untouched.
  const path = rawPath
    ? applyTrailingSlash(rawPath, {
        trailingSlash: siteConfig.trailingSlash,
        baseUrl: siteConfig.baseUrl,
      })
    : '';

  const { data: analytics, status } = useFetch<AnalyticsData>(
    async (signal) => {
      const data = await umamiFetchJson<UmamiStatsResponse>(
        '/api/websites/{id}/stats',
        { startAt: 0, endAt: Date.now(), ...(path ? { path } : {}) },
        { signal }
      );
      return { visitors: data.visitors, pageviews: data.pageviews };
    },
    [path],
    {}
  );

  return { analytics, status };
}
