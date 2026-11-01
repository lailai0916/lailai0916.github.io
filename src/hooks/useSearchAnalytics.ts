import { useEffect, useRef } from 'react';
import { useEvent } from '@docusaurus/theme-common';
import { normalizeContentPath, trackEvent, type AnalyticsSurface } from '@site/src/utils/analytics';

type SearchAnalyticsOptions = {
  surface: Extract<AnalyticsSurface, 'search_modal' | 'search_page' | 'resources' | 'archive'>;
  query: string | undefined;
  resultCount: number | null;
  resultKind: 'records' | 'resources' | 'articles';
  ready?: boolean;
  scope?: string;
};

const SETTLE_DELAY = 800;

export default function useSearchAnalytics({
  surface,
  query,
  resultCount,
  resultKind,
  ready = true,
  scope,
}: SearchAnalyticsOptions) {
  const normalizedQuery = (query ?? '').trim().replace(/\s+/g, ' ');
  const key = JSON.stringify([surface, scope, normalizedQuery]);
  const state = useRef({ key: '', stableAt: 0, sent: false });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const composing = useRef(false);

  const cancel = useEvent(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  });

  const synchronize = useEvent(() => {
    if (state.current.key !== key) {
      state.current = { key, stableAt: Date.now() + SETTLE_DELAY, sent: false };
    }
  });

  const flush = useEvent(() => {
    synchronize();
    if (!normalizedQuery || !ready || resultCount === null || composing.current) return false;
    if (state.current.sent) return true;
    cancel();
    state.current.sent = true;
    trackEvent('search_completed', {
      surface,
      result_count: resultCount,
      result_kind: resultKind,
      ...(scope ? { scope } : {}),
    });
    return true;
  });

  const schedule = useEvent(() => {
    cancel();
    synchronize();
    if (
      !normalizedQuery ||
      !ready ||
      resultCount === null ||
      composing.current ||
      state.current.sent
    )
      return;
    timer.current = setTimeout(flush, Math.max(0, state.current.stableAt - Date.now()));
  });

  useEffect(() => {
    schedule();
    return cancel;
  }, [key, ready, resultCount, schedule, cancel]);

  const onCompositionStart = useEvent(() => {
    composing.current = true;
    cancel();
  });

  const onCompositionEnd = useEvent(() => {
    composing.current = false;
    synchronize();
    state.current.stableAt = Date.now() + SETTLE_DELAY;
    schedule();
  });

  const invalidate = useEvent(() => {
    cancel();
    state.current = { key: '', stableAt: 0, sent: false };
  });

  const reset = useEvent(() => {
    composing.current = false;
    invalidate();
  });

  const trackResultClick = useEvent((targetPath: string, position?: number) => {
    if (!flush()) return;
    trackEvent('search_result_click', {
      surface,
      target_path: normalizeContentPath(targetPath),
      result_kind: resultKind,
      ...(position === undefined ? {} : { position }),
      ...(scope ? { scope } : {}),
    });
  });

  return {
    onCompositionStart,
    onCompositionEnd,
    cancel,
    invalidate,
    reset,
    flush,
    trackResultClick,
  };
}
