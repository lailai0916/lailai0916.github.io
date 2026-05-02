import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react';
import Card from '@site/src/components/laikit/Card';
import { useSysStatus } from '@site/src/hooks/useSysStatus';
import metricListStyles from './MetricList.module.css';
import styles from './SysStatusCard.module.css';

const PING_TARGET = 'https://analytics.lailai.one/script.js';
const PING_INTERVAL = 8000;
const TICK_INTERVAL = 1000;

function detectBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/OPR\//.test(ua) || / Opera/.test(ua)) return 'Opera';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return 'Chrome';
  if (/Safari\//.test(ua)) return 'Safari';
  return 'Unknown';
}

function formatUptimeSec(s: number): string {
  if (!Number.isFinite(s) || s < 0) return '—';
  if (s < 60) return `${Math.floor(s)}s`;
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  if (m < 60) return `${m}m ${r}s`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  if (h < 24) return `${h}h ${rm}m`;
  const d = Math.floor(h / 24);
  const rh = h % 24;
  return `${d}d ${rh}h`;
}

function formatDateTime(d: Date): string {
  const p = (n: number) => n.toString().padStart(2, '0');
  return (
    `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ` +
    `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
  );
}

function formatBuildTime(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const p = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function formatIp(ip: string | null | undefined): string {
  if (!ip) return '—';
  if (ip.length <= 21) return ip;
  return `${ip.slice(0, 9)}…${ip.slice(-9)}`;
}

function formatRelative(ms: number, nowMs: number): string {
  const diff = Math.max(0, Math.round((nowMs - ms) / 1000));
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function usePing(): number | null {
  const [val, setVal] = useState<number | null>(null);
  useEffect(() => {
    let stopped = false;
    const measure = async () => {
      const t0 = performance.now();
      try {
        await fetch(`${PING_TARGET}?t=${Date.now()}`, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
        });
        if (stopped) return;
        setVal(Math.round(performance.now() - t0));
      } catch {
        if (!stopped) setVal(null);
      }
    };
    measure();
    const id = window.setInterval(measure, PING_INTERVAL);
    return () => {
      stopped = true;
      window.clearInterval(id);
    };
  }, []);
  return val;
}

function useNow(): Date {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), TICK_INTERVAL);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

interface Cell {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

function Group({ cells }: { cells: Cell[] }) {
  return (
    <div className={styles.group}>
      {cells.map((c) => (
        <div key={c.label} className={styles.cell}>
          <span className={styles.key}>{c.label}</span>
          <span className={`${styles.val} ${c.valueClassName ?? ''}`}>
            {c.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function SysStatusCardInner() {
  const { siteConfig } = useDocusaurusContext();
  const buildTime = String(siteConfig.customFields?.buildTime ?? '');
  const debugId = String(siteConfig.customFields?.debugId ?? '—');

  const { data: sys } = useSysStatus();
  const cpu = sys?.cpu ?? null;
  const mem = sys?.mem ?? null;
  const serverUptime = sys?.uptime ?? null;
  const load1 = sys?.load?.[0] ?? null;
  const disk = sys?.disk ?? null;
  const swap = sys?.swap ?? null;
  const lastDeploy = sys?.last_deploy ?? null;
  const tlsExpires = sys?.tls_expires_in ?? null;
  const ip = sys?.ip ?? null;
  const ping = usePing();
  const now = useNow();

  const [browser, setBrowser] = useState('—');
  const [host, setHost] = useState('—');
  useEffect(() => {
    setBrowser(detectBrowser(navigator.userAgent));
    setHost(window.location.hostname);
  }, []);
  const cpuStr = cpu == null ? '—' : `${cpu.toFixed(1)}%`;
  const memStr = mem == null ? '—' : `${mem.toFixed(1)}%`;
  const pingStr = ping == null ? '—' : `${ping}ms`;
  const uptimeStr = serverUptime == null ? '—' : formatUptimeSec(serverUptime);
  const loadStr = load1 == null ? '—' : load1.toFixed(2);
  const diskStr = disk == null ? '—' : `${disk.toFixed(1)}%`;
  const swapStr = swap == null ? '—' : `${swap.toFixed(1)}%`;
  const lastDeployStr =
    lastDeploy == null ? '—' : formatRelative(lastDeploy, now.getTime());
  const tlsStr = tlsExpires == null ? '—' : `${tlsExpires}d`;
  const ipNode = ip == null ? '—' : <span title={ip}>{formatIp(ip)}</span>;
  const mutedIfNull = (v: unknown) => (v == null ? styles.muted : undefined);

  return (
    <Card padding="1.5rem 1.25rem 1.25rem" className={styles.card}>
      <header className={metricListStyles.head}>
        <Icon icon="lucide:activity" className={metricListStyles.icon} />
        <h3 className={metricListStyles.title}>
          {translate({
            id: 'pages.insights.sysStatus.title',
            message: 'Runtime snapshot',
          })}
        </h3>
      </header>

      <div className={styles.body}>
        <Group
          cells={[
            { label: 'cpu', value: cpuStr, valueClassName: mutedIfNull(cpu) },
            { label: 'mem', value: memStr, valueClassName: mutedIfNull(mem) },
            {
              label: 'swap',
              value: swapStr,
              valueClassName: mutedIfNull(swap),
            },
            {
              label: 'load',
              value: loadStr,
              valueClassName: mutedIfNull(load1),
            },
            {
              label: 'disk',
              value: diskStr,
              valueClassName: mutedIfNull(disk),
            },
          ]}
        />
        <Group
          cells={[
            {
              label: 'ping',
              value: pingStr,
              valueClassName: mutedIfNull(ping),
            },
            { label: 'ip', value: ipNode, valueClassName: mutedIfNull(ip) },
            { label: 'host', value: host },
            {
              label: 'uptime',
              value: uptimeStr,
              valueClassName: mutedIfNull(serverUptime),
            },
            { label: 'browser', value: browser },
          ]}
        />
        <Group
          cells={[
            {
              label: 'last_deploy',
              value: lastDeployStr,
              valueClassName: mutedIfNull(lastDeploy),
            },
            { label: 'build_time', value: formatBuildTime(buildTime) },
            { label: 'debug_id', value: debugId },
            {
              label: 'tls_expires',
              value: tlsStr,
              valueClassName: mutedIfNull(tlsExpires),
            },
            { label: 'datetime', value: formatDateTime(now) },
          ]}
        />
      </div>

      <span className={styles.srOnly}>
        {translate({
          id: 'pages.insights.sysStatus.srLabel',
          message: 'System status overview',
        })}
      </span>
    </Card>
  );
}

export default function SysStatusCard() {
  return (
    <BrowserOnly fallback={<div className={styles.cardSkeleton} />}>
      {() => <SysStatusCardInner />}
    </BrowserOnly>
  );
}
