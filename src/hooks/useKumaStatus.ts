import {
  getStatusPage,
  getHeartbeats,
  type KumaStatusPageData,
  type KumaHeartbeatData,
} from '@site/src/utils/kuma';
import { useFetch } from './useFetch';

interface KumaCombined {
  page: KumaStatusPageData;
  heartbeats: KumaHeartbeatData;
}

export function useKumaStatus() {
  return useFetch<KumaCombined | null>(
    async (signal) => {
      const [page, heartbeats] = await Promise.all([getStatusPage(signal), getHeartbeats(signal)]);
      return { page, heartbeats };
    },
    [],
    null
  );
}
