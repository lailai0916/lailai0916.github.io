import { useEffect, useState } from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import TitleCard from '@site/src/components/laikit/TitleCard';
import Skeleton from '@site/src/components/laikit/Skeleton';
import { useSysStatus } from '@site/src/hooks/useSysStatus';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { formatInTimeZone, getDateKey, parseInstant } from '@site/src/utils/dateTime';
import styles from './styles.module.css';

const PING_TARGET = 'https://analytics.lailai.one/script.js';
const PING_INTERVAL = 2000;
const TICK_INTERVAL = 1000;
const CORE_LABEL = translate({ id: 'pages.insights.systemStatus.cores', message: 'core|cores' });

function detectBrowser(ua: string): string {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/OPR\//.test(ua) || / Opera/.test(ua)) return 'Opera';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return 'Chrome';
  if (/Safari\//.test(ua)) return 'Safari';
  return '—';
}

function formatUptime(seconds: number | undefined, locale: string): string {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return '—';
  const unit = (value: number, name: string) =>
    new Intl.NumberFormat(locale, { style: 'unit', unit: name, unitDisplay: 'narrow' }).format(
      value
    );
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours >= 24) return unit(Math.floor(hours / 24), 'day') + ' ' + unit(hours % 24, 'hour');
  if (hours > 0) return unit(hours, 'hour') + ' ' + unit(minutes % 60, 'minute');
  if (minutes > 0) return unit(minutes, 'minute') + ' ' + unit(Math.floor(seconds % 60), 'second');
  return unit(Math.floor(seconds), 'second');
}

function formatDateTime(value: string | number | Date, timeZone: string): string {
  if (Number.isNaN(parseInstant(value).getTime())) return '—';
  const time = formatInTimeZone(value, 'en-GB', timeZone, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
  return `${getDateKey(value, timeZone)} ${time}`;
}

function formatRelative(timestamp: number, now: number, locale: string): string {
  const seconds = Math.max(0, Math.round((now - timestamp) / 1000));
  const format = new Intl.RelativeTimeFormat(locale, { numeric: 'always', style: 'narrow' });
  if (seconds < 60) return format.format(-seconds, 'second');
  if (seconds < 3600) return format.format(-Math.floor(seconds / 60), 'minute');
  if (seconds < 86400) return format.format(-Math.floor(seconds / 3600), 'hour');
  return format.format(-Math.floor(seconds / 86400), 'day');
}

function formatCapacity(
  used: number | null | undefined,
  total: number | null | undefined,
  locale: string,
  unit: 'MiB' | 'GiB' = 'MiB'
): string {
  if (
    used == null ||
    total == null ||
    !Number.isFinite(used) ||
    !Number.isFinite(total) ||
    used < 0 ||
    total < used
  ) {
    return '—';
  }
  const divisor = unit === 'GiB' ? 1024 : 1;
  const number = new Intl.NumberFormat(locale, {
    maximumFractionDigits: unit === 'GiB' ? 2 : 0,
  });
  return number.format(used / divisor) + ' / ' + number.format(total / divisor) + ' ' + unit;
}

function usePing(): number | null {
  const [val, setVal] = useState<number | null>(null);
  useEffect(() => {
    let stopped = false;
    const measure = async () => {
      const t0 = performance.now();
      try {
        await fetch(PING_TARGET + '?t=' + Date.now(), {
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
    // A hidden Insights page should not keep measuring request latency.
    let id = 0;
    const start = () => {
      measure();
      id = window.setInterval(measure, PING_INTERVAL);
    };
    const stop = () => window.clearInterval(id);
    const onVisibility = () => (document.hidden ? stop() : start());
    if (!document.hidden) start();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stopped = true;
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
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

function Cell({
  label,
  value,
  loading = false,
  identifier = false,
  title,
}: {
  label: string;
  value: string;
  loading?: boolean;
  identifier?: boolean;
  title?: string;
}) {
  return (
    <div className={styles.cell}>
      <dt className={styles.key} title={label}>
        {label}
      </dt>
      <dd className={clsx(styles.val, value === '—' && styles.muted)} title={title ?? value}>
        {loading ? (
          <Skeleton className={styles.valueSkeleton} width="5rem" height="1em" radius={4} />
        ) : identifier ? (
          <code className={styles.identifier}>{value}</code>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

// Keep the one-second clock updates inside the two time-derived rows.
function ClockCell() {
  const now = useNow();
  const isBrowser = useIsBrowser();
  const timeZone = useVisitorTimeZone();
  return (
    <Cell
      label={translate({ id: 'pages.insights.systemStatus.localTime', message: 'Local time' })}
      value={isBrowser ? formatDateTime(now, timeZone) : '—'}
    />
  );
}

function DeployCell({ value, loading }: { value?: number | null; loading: boolean }) {
  const now = useNow();
  const { i18n } = useDocusaurusContext();
  const timeZone = useVisitorTimeZone();
  const valid = value != null && Number.isFinite(value);
  return (
    <Cell
      label={translate({ id: 'pages.insights.systemStatus.lastDeploy', message: 'Last deploy' })}
      value={valid ? formatRelative(value, now.getTime(), i18n.currentLocale) : '—'}
      title={valid ? formatDateTime(value, timeZone) : undefined}
      loading={loading}
    />
  );
}

function ResourceMeter({
  label,
  value,
  detail,
  loading,
}: {
  label: string;
  value?: number | null;
  detail?: string;
  loading: boolean;
}) {
  const percent =
    value != null && Number.isFinite(value) && value >= 0 && value <= 100 ? value : null;
  return (
    <div className={styles.resource}>
      <div className={styles.resourceHeader}>
        <span className={styles.resourceLabel}>{label}</span>
        {detail !== undefined && (
          <span className={styles.resourceDetail} title={detail}>
            {loading ? <Skeleton width="7rem" height="1em" radius={4} /> : detail}
          </span>
        )}
        <div className={clsx(styles.resourceValue, percent == null && styles.muted)}>
          {loading ? (
            <Skeleton width="3rem" height="1em" radius={4} />
          ) : percent == null ? (
            '—'
          ) : (
            percent.toFixed(1) + '%'
          )}
        </div>
      </div>
      {loading ? (
        <Skeleton className={styles.track} radius={99} />
      ) : (
        <div
          className={styles.track}
          role={percent == null ? undefined : 'meter'}
          aria-label={percent == null ? undefined : label}
          aria-valuemin={percent == null ? undefined : 0}
          aria-valuemax={percent == null ? undefined : 100}
          aria-valuenow={percent ?? undefined}
          aria-hidden={percent == null ? true : undefined}
        >
          <div className={styles.fill} style={{ width: (percent ?? 0) + '%' }} />
        </div>
      )}
    </div>
  );
}

export default function SysStatusCard() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const timeZone = useVisitorTimeZone();
  const { selectMessage } = usePluralForm();
  const { data: sys, status } = useSysStatus();
  const loading = status === 'loading';
  const ping = usePing();
  const [client, setClient] = useState({ browser: '—', host: '—', protocol: '—' });
  useEffect(() => {
    setClient({
      browser: detectBrowser(navigator.userAgent),
      host: window.location.hostname,
      protocol: window.location.protocol.replace(':', '').toUpperCase(),
    });
  }, []);
  const locale = i18n.currentLocale;
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const cores = sys?.cores;
  const coreDetail =
    cores != null && Number.isFinite(cores) && cores > 0
      ? number.format(cores) + ' ' + selectMessage(cores, CORE_LABEL)
      : '—';
  const load = sys?.load?.[0];
  const tls = sys?.tls_expires_in;
  const note =
    status === 'error'
      ? sys
        ? translate({
            id: 'pages.insights.systemStatus.stale',
            message: 'Update unavailable · showing the last server snapshot',
          })
        : translate({
            id: 'pages.insights.systemStatus.error',
            message: 'Server data unavailable · retrying automatically',
          })
      : null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <TitleCard
          size="sm"
          icon="lucide:server"
          title={translate({
            id: 'pages.insights.systemStatus.resources',
            message: 'Server Resources',
          })}
          padding="1.5rem 1.25rem 1.25rem"
          className={styles.card}
        >
          <div className={styles.meters} aria-busy={loading}>
            <ResourceMeter
              label={translate({ id: 'pages.insights.systemStatus.cpu', message: 'CPU' })}
              value={sys?.cpu}
              detail={coreDetail}
              loading={loading}
            />
            <ResourceMeter
              label={translate({ id: 'pages.insights.systemStatus.memory', message: 'Memory' })}
              value={sys?.mem}
              detail={formatCapacity(sys?.mem_used_mb, sys?.mem_total_mb, locale)}
              loading={loading}
            />
            <ResourceMeter
              label={translate({ id: 'pages.insights.systemStatus.disk', message: 'Disk' })}
              value={sys?.disk}
              detail={formatCapacity(sys?.disk_used_mb, sys?.disk_total_mb, locale, 'GiB')}
              loading={loading}
            />
            <ResourceMeter
              label={translate({ id: 'pages.insights.systemStatus.swap', message: 'Swap' })}
              value={sys?.swap}
              detail={formatCapacity(sys?.swap_used_mb, sys?.swap_total_mb, locale)}
              loading={loading}
            />
          </div>
        </TitleCard>
        <TitleCard
          size="sm"
          icon="lucide:activity"
          title={translate({
            id: 'pages.insights.systemStatus.title',
            message: 'Runtime Snapshot',
          })}
          padding="1.5rem 1.25rem 1.25rem"
          className={styles.card}
        >
          <div className={styles.details}>
            <section
              className={styles.section}
              aria-label={translate({
                id: 'pages.insights.systemStatus.server',
                message: 'Server status',
              })}
            >
              <dl className={styles.list}>
                <Cell
                  label={translate({ id: 'pages.insights.systemStatus.uptime', message: 'Uptime' })}
                  value={formatUptime(sys?.uptime, locale)}
                  loading={loading}
                />
                <Cell
                  label={translate({
                    id: 'pages.insights.systemStatus.load',
                    message: 'Load',
                  })}
                  value={load != null && Number.isFinite(load) ? load.toFixed(2) : '—'}
                  loading={loading}
                />
                <Cell
                  label={translate({
                    id: 'pages.insights.systemStatus.tls',
                    message: 'TLS validity',
                  })}
                  value={
                    tls != null && Number.isFinite(tls)
                      ? new Intl.NumberFormat(locale, {
                          style: 'unit',
                          unit: 'day',
                          unitDisplay: 'narrow',
                        }).format(tls)
                      : '—'
                  }
                  loading={loading}
                />
                <DeployCell value={sys?.last_deploy} loading={loading} />
                <Cell
                  label={translate({
                    id: 'pages.insights.systemStatus.debugId',
                    message: 'Build ID',
                  })}
                  value={String(siteConfig.customFields?.debugId ?? '—')}
                  identifier
                />
                <Cell
                  label={translate({
                    id: 'pages.insights.systemStatus.buildTime',
                    message: 'Build time',
                  })}
                  value={formatDateTime(String(siteConfig.customFields?.buildTime ?? ''), timeZone)}
                />
              </dl>
            </section>
            <section
              className={styles.section}
              aria-label={translate({
                id: 'pages.insights.systemStatus.client',
                message: 'Visitor environment',
              })}
            >
              <dl className={styles.list}>
                <Cell
                  label={translate({ id: 'pages.insights.systemStatus.ip', message: 'Your IP' })}
                  value={sys?.ip || '—'}
                  loading={loading}
                  identifier
                />
                <Cell
                  label={translate({
                    id: 'pages.insights.systemStatus.latency',
                    message: 'Request latency',
                  })}
                  value={ping == null ? '—' : ping + 'ms'}
                />
                <Cell
                  label={translate({ id: 'pages.insights.systemStatus.host', message: 'Host' })}
                  value={client.host}
                  identifier
                />
                <Cell
                  label={translate({
                    id: 'pages.insights.systemStatus.browser',
                    message: 'Browser',
                  })}
                  value={client.browser}
                />
                <Cell
                  label={translate({
                    id: 'pages.insights.systemStatus.protocol',
                    message: 'Connection',
                  })}
                  value={client.protocol}
                />
                <ClockCell />
              </dl>
            </section>
          </div>
        </TitleCard>
      </div>
      {note && (
        <p className={styles.status} role="status">
          {note}
        </p>
      )}
    </div>
  );
}
