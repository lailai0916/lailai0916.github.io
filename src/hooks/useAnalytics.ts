import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { applyTrailingSlash } from '@docusaurus/utils-common';
import { umamiFetchJson } from '@site/src/utils/umami';

export interface AnalyticsData {
  visitors?: number;
  pageviews?: number;
}

export type AnalyticsStatus = 'loading' | 'success' | 'error';

interface UmamiStatsResponse {
  pageviews?: number;
  visitors?: number;
  visits?: number;
  bounces?: number;
  totaltime?: number;
}

export function useAnalytics(rawPath: string = '') {
  const { siteConfig } = useDocusaurusContext();
  const [analytics, setAnalytics] = useState<AnalyticsData>({});
  const [status, setStatus] = useState<AnalyticsStatus>('loading');

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

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setStatus('loading');
      try {
        const data = await umamiFetchJson<UmamiStatsResponse>(
          '/api/websites/{id}/stats',
          {
            startAt: 0,
            endAt: Date.now(),
            ...(path ? { path } : {}),
          },
          { signal: controller.signal }
        );

        if (controller.signal.aborted) return;

        setAnalytics({
          visitors: data.visitors,
          pageviews: data.pageviews,
        });
        setStatus('success');
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error(error);
        setStatus('error');
      }
    })();

    return () => controller.abort();
  }, [path]);

  return { analytics, status };
}
