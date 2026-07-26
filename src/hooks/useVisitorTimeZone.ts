import useIsBrowser from '@docusaurus/useIsBrowser';
import { SHANGHAI_TIME_ZONE } from '@site/src/utils/dateTime';

export function useVisitorTimeZone(): string {
  const isBrowser = useIsBrowser();
  if (!isBrowser) return SHANGHAI_TIME_ZONE;
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}
