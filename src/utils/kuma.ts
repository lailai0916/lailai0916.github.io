const KUMA_BASE = 'https://status.lailai.one';
const KUMA_STATUS_SLUG = 'monitor';

export interface KumaMonitor {
  id: number;
  name: string;
  sendUrl?: number;
  type?: string;
}

export interface KumaPublicGroup {
  id: number;
  name: string;
  weight: number;
  monitorList: KumaMonitor[];
}

export interface KumaStatusPageData {
  config: {
    slug: string;
    title: string;
    description?: string | null;
    icon?: string;
    theme?: string;
    customCSS?: string;
  };
  incident: unknown | null;
  publicGroupList: KumaPublicGroup[];
  maintenanceList: unknown[];
}

export interface KumaHeartbeat {
  status: 0 | 1 | 2 | 3;
  time: string;
  msg?: string;
  ping?: number;
}

export interface KumaHeartbeatData {
  heartbeatList: Record<string, KumaHeartbeat[]>;
  uptimeList: Record<string, number>;
}

async function kumaFetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${KUMA_BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Kuma request failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

export function getStatusPage(): Promise<KumaStatusPageData> {
  return kumaFetchJson<KumaStatusPageData>(
    `/api/status-page/${encodeURIComponent(KUMA_STATUS_SLUG)}`
  );
}

export function getHeartbeats(): Promise<KumaHeartbeatData> {
  return kumaFetchJson<KumaHeartbeatData>(
    `/api/status-page/heartbeat/${encodeURIComponent(KUMA_STATUS_SLUG)}`
  );
}
