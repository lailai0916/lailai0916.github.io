import React from 'react';
import { Icon } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import { useKumaStatus } from '@site/src/hooks/useKumaStatus';
import type { KumaHeartbeat, KumaMonitor } from '@site/src/utils/kuma';
import HeartbeatBar from './HeartbeatBar';
import styles from './UptimeSection.module.css';

type OverallStatus =
  | 'operational'
  | 'degraded'
  | 'major'
  | 'maintenance'
  | 'unknown';

function lastStatus(beats: KumaHeartbeat[] | undefined): number | undefined {
  if (!beats || beats.length === 0) return undefined;
  return beats[beats.length - 1].status;
}

function avgPing(beats: KumaHeartbeat[] | undefined): number | null {
  if (!beats || beats.length === 0) return null;
  const valid = beats.filter(
    (b) => typeof b.ping === 'number' && Number.isFinite(b.ping)
  );
  if (valid.length === 0) return null;
  return Math.round(
    valid.reduce((s, b) => s + (b.ping ?? 0), 0) / valid.length
  );
}

function overall(
  monitors: KumaMonitor[],
  beats: Record<string, KumaHeartbeat[]>
): OverallStatus {
  if (monitors.length === 0) return 'unknown';
  let down = 0;
  let pending = 0;
  let maintenance = 0;
  let up = 0;
  for (const m of monitors) {
    const s = lastStatus(beats[String(m.id)]);
    if (s === 1) up++;
    else if (s === 0) down++;
    else if (s === 2) pending++;
    else if (s === 3) maintenance++;
  }
  if (down >= monitors.length) return 'major';
  if (down > 0) return 'degraded';
  if (maintenance > 0) return 'maintenance';
  if (up > 0) return 'operational';
  if (pending > 0) return 'unknown';
  return 'unknown';
}

const STATUS_COPY: Record<
  OverallStatus,
  { label: string; icon: string; cls: string }
> = {
  operational: {
    label: translate({
      id: 'pages.insights.status.operational',
      message: 'All systems operational',
    }),
    icon: 'lucide:check-circle-2',
    cls: 'pillUp',
  },
  degraded: {
    label: translate({
      id: 'pages.insights.status.degraded',
      message: 'Partial outage',
    }),
    icon: 'lucide:alert-triangle',
    cls: 'pillDown',
  },
  major: {
    label: translate({
      id: 'pages.insights.status.major',
      message: 'Major outage',
    }),
    icon: 'lucide:x-circle',
    cls: 'pillDown',
  },
  maintenance: {
    label: translate({
      id: 'pages.insights.status.maintenance',
      message: 'Under maintenance',
    }),
    icon: 'lucide:wrench',
    cls: 'pillMaintenance',
  },
  unknown: {
    label: translate({
      id: 'pages.insights.status.unknown',
      message: 'Status unknown',
    }),
    icon: 'lucide:help-circle',
    cls: 'pillEmpty',
  },
};

function MonitorRow({
  monitor,
  beats,
  uptime24,
}: {
  monitor: KumaMonitor;
  beats: KumaHeartbeat[] | undefined;
  uptime24: number | undefined;
}) {
  const last = lastStatus(beats);
  const ping = avgPing(beats);
  const upPct =
    typeof uptime24 === 'number' ? (uptime24 * 100).toFixed(2) : '–';

  const statusCls =
    last === 1
      ? styles.dotUp
      : last === 0
        ? styles.dotDown
        : last === 2
          ? styles.dotPending
          : last === 3
            ? styles.dotMaintenance
            : styles.dotEmpty;

  return (
    <div className={styles.row}>
      <div className={styles.rowHead}>
        <span className={`${styles.dot} ${statusCls}`} aria-hidden="true" />
        <span className={styles.name}>{monitor.name}</span>
        <span className={styles.uptime}>
          <span className={styles.uptimeValue}>{upPct}%</span>
          <span className={styles.uptimeLabel}>
            {translate({
              id: 'pages.insights.uptime.last24h',
              message: '24h uptime',
            })}
          </span>
        </span>
      </div>
      <HeartbeatBar beats={beats ?? []} slots={60} />
      <div className={styles.rowFoot}>
        <span>
          {translate(
            {
              id: 'pages.insights.uptime.checks',
              message: '{count} recent checks',
            },
            { count: beats?.length ?? 0 }
          )}
        </span>
        {ping != null && (
          <span>
            {translate(
              {
                id: 'pages.insights.uptime.avgPing',
                message: 'Avg {ping}ms',
              },
              { ping }
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export default function UptimeSection() {
  const { data, status } = useKumaStatus();
  const loading = status === 'loading';
  const errored = status === 'error';

  const monitors: KumaMonitor[] = data
    ? data.page.publicGroupList.flatMap((g) => g.monitorList)
    : [];
  const heartbeats = data?.heartbeats.heartbeatList ?? {};
  const uptimes = data?.heartbeats.uptimeList ?? {};

  const ovStatus = overall(monitors, heartbeats);
  const ovCopy = STATUS_COPY[ovStatus];

  return (
    <section className={styles.section}>
      <header className={styles.head}>
        <h2 className={styles.title}>
          {translate({
            id: 'pages.insights.uptime.title',
            message: 'System status',
          })}
        </h2>
        <span
          className={`${styles.pill} ${
            loading
              ? styles.pillEmpty
              : errored
                ? styles.pillDown
                : (styles as Record<string, string>)[ovCopy.cls]
          }`}
        >
          <Icon
            icon={
              loading
                ? 'lucide:loader-2'
                : errored
                  ? 'lucide:cloud-off'
                  : ovCopy.icon
            }
            className={loading ? styles.spin : undefined}
          />
          <span>
            {loading
              ? translate({
                  id: 'pages.insights.status.loading',
                  message: 'Checking…',
                })
              : errored
                ? translate({
                    id: 'pages.insights.status.error',
                    message: 'Unable to reach status server',
                  })
                : ovCopy.label}
          </span>
        </span>
      </header>

      {!errored && (
        <div className={styles.list}>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.skeletonRow} />
            ))
          ) : monitors.length === 0 ? (
            <p className={styles.empty}>
              {translate({
                id: 'pages.insights.uptime.empty',
                message: 'No monitors published.',
              })}
            </p>
          ) : (
            monitors.map((m) => (
              <MonitorRow
                key={m.id}
                monitor={m}
                beats={heartbeats[String(m.id)]}
                uptime24={uptimes[`${m.id}_24`]}
              />
            ))
          )}
        </div>
      )}
    </section>
  );
}
