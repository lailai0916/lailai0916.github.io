import { useEffect, useState } from 'react';
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
  const [analytics, setAnalytics] = useState<AnalyticsData>({});
  const [status, setStatus] = useState<AnalyticsStatus>('loading');

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
            ...(rawPath ? { path: rawPath } : {}),
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
  }, [rawPath]);

  return { analytics, status };
}
