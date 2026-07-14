import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import Card from '@site/src/components/laikit/Card';
import Skeleton from '@site/src/components/laikit/Skeleton';
import { useKumaStatus } from '@site/src/hooks/useKumaStatus';
import type { KumaHeartbeat, KumaMonitor } from '@site/src/utils/kuma';
import HeartbeatBar from './HeartbeatBar';
import StatePanel from './StatePanel';
import styles from './UptimeSection.module.css';

function lastStatus(beats: KumaHeartbeat[] | undefined): number | undefined {
  if (!beats || beats.length === 0) return undefined;
  return beats[beats.length - 1].status;
}

function avgPing(beats: KumaHeartbeat[] | undefined): number | null {
  if (!beats || beats.length === 0) return null;
  const valid = beats.filter(
    (b): b is KumaHeartbeat & { ping: number } =>
      typeof b.ping === 'number' && Number.isFinite(b.ping)
  );
  if (valid.length === 0) return null;
  return Math.round(valid.reduce((s, b) => s + b.ping, 0) / valid.length);
}

function MonitorRow({
  monitor,
  beats,
  uptime24,
  loading,
}: {
  monitor?: KumaMonitor;
  beats?: KumaHeartbeat[];
  uptime24?: number;
  loading?: boolean;
}) {
  // Placeholder rows render the exact same Card / head / HeartbeatBar shell, so a
  // loading row is the same height as a loaded one by construction — no magic
  // number. Heights are held by &nbsp; in the real head classes; scaling the
  // bars is post-layout, so it changes their look but not the reserved height.
  if (loading || !monitor) {
    return (
      <Card className={styles.row}>
        <div className={styles.rowHead}>
          <Skeleton className={styles.dot} />
          <div className={styles.nameWrap}>
            <Skeleton
              className={clsx(styles.name, styles.ghost)}
              radius={6}
              style={{ width: '45%' }}
            >
              &nbsp;
            </Skeleton>
          </div>
          <span className={styles.uptime}>
            <Skeleton
              className={clsx(styles.uptimeValue, styles.ghost)}
              radius={6}
              style={{ width: '2.75rem' }}
            >
              &nbsp;
            </Skeleton>
          </span>
        </div>
        <HeartbeatBar beats={[]} slots={100} />
      </Card>
    );
  }

  const last = lastStatus(beats);
  const ping = avgPing(beats);
  const upPct = typeof uptime24 === 'number' ? (uptime24 * 100).toFixed(2) : '–';

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
    <Card className={styles.row}>
      <div className={styles.rowHead}>
        <span className={clsx(styles.dot, statusCls)} aria-hidden="true" />
        <div className={styles.nameWrap}>
          {monitor.url ? (
            <Link className={styles.name} href={monitor.url}>
              {monitor.name}
            </Link>
          ) : (
            <span className={styles.name}>{monitor.name}</span>
          )}
        </div>
        <span className={styles.uptime}>
          <span className={styles.uptimeValue}>{upPct}%</span>
          {ping != null && (
            <span className={styles.uptimeLabel}>
              {translate(
                {
                  id: 'pages.insights.uptime.avgPing',
                  message: 'Avg {ping}ms',
                },
                { ping }
              )}
            </span>
          )}
        </span>
      </div>
      <HeartbeatBar beats={beats ?? []} slots={100} />
    </Card>
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

  return (
    <section className={styles.section}>
      {errored ? (
        <StatePanel
          text={translate({
            id: 'pages.insights.status.error',
            message: 'Unable to reach status server',
          })}
        />
      ) : (
        <div className={styles.list}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <MonitorRow key={i} loading />)
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
