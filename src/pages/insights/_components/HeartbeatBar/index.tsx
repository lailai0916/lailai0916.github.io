import { type CSSProperties, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluralForm } from '@docusaurus/theme-common';
import type { KumaHeartbeat } from '@site/src/utils/kuma';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { formatInTimeZone, parseUtcDateTime } from '@site/src/utils/dateTime';
import Tooltip from '@lailai0916/ui/Tooltip';
import { getHeartbeatBuckets } from './buckets';
import styles from './styles.module.css';

interface HeartbeatBarProps {
  beats: KumaHeartbeat[];
  slots?: number;
}

const CELL_MIN = 2;
const GAP = 2;

const HEARTBEAT_ARIA_LABEL = translate({
  id: 'pages.insights.heartbeat.ariaLabel',
  message: 'Recent heartbeat status',
});

function useResponsiveSlots(maxSlots: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState(maxSlots);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const fit = Math.max(1, Math.min(maxSlots, Math.floor((w + GAP) / (CELL_MIN + GAP))));
      setSlots(fit);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxSlots]);

  return [ref, slots] as const;
}

function statusClass(status: number | undefined): string {
  switch (status) {
    case 1:
      return styles.up;
    case 0:
      return styles.down;
    case 2:
      return styles.pending;
    case 3:
      return styles.maintenance;
    default:
      return styles.empty;
  }
}

export function heartbeatStatusLabel(status: number | undefined): string {
  switch (status) {
    case 1:
      return translate({
        id: 'pages.insights.heartbeat.up',
        message: 'Up',
      });
    case 0:
      return translate({
        id: 'pages.insights.heartbeat.down',
        message: 'Down',
      });
    case 2:
      return translate({
        id: 'pages.insights.heartbeat.pending',
        message: 'Pending',
      });
    case 3:
      return translate({
        id: 'pages.insights.heartbeat.maintenance',
        message: 'Maintenance',
      });
    default:
      return translate({
        id: 'pages.insights.heartbeat.unknown',
        message: 'No Data',
      });
  }
}

function formatTooltipDate(iso: string, locale: string, timeZone: string): string {
  const d = parseUtcDateTime(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return formatInTimeZone(d, locale, timeZone, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });
}

export default function HeartbeatBar({ beats, slots = 100 }: HeartbeatBarProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [wrapRef, fitSlots] = useResponsiveSlots(slots);
  const {
    i18n: { currentLocale: locale },
  } = useDocusaurusContext();
  const timeZone = useVisitorTimeZone();
  const { selectMessage } = usePluralForm();

  const effectiveSlots = Math.min(slots, fitSlots);
  const buckets = getHeartbeatBuckets(beats, slots, effectiveSlots);
  const active = hoverIdx != null ? buckets[hoverIdx] : undefined;
  const representative = active?.representative;
  const tooltipLeftPct = hoverIdx != null ? ((hoverIdx + 0.5) / effectiveSlots) * 100 : 0;

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div
        className={styles.bar}
        style={{ '--heartbeat-slots': effectiveSlots } as CSSProperties}
        role="img"
        aria-label={HEARTBEAT_ARIA_LABEL}
        onPointerLeave={() => setHoverIdx(null)}
      >
        {buckets.map((bucket, i) => (
          <span
            key={i}
            className={clsx(styles.cell, statusClass(bucket.representative?.status))}
            onPointerEnter={() => setHoverIdx(i)}
          />
        ))}
      </div>

      {active && (
        <Tooltip leftPct={tooltipLeftPct}>
          <Tooltip.Label>
            {active.first ? (
              <>
                {formatTooltipDate(active.first.time, locale, timeZone)}
                {active.last && active.last.time !== active.first.time && (
                  <>
                    <br />
                    {'– '}
                    {formatTooltipDate(active.last.time, locale, timeZone)}
                  </>
                )}
              </>
            ) : (
              translate({
                id: 'pages.insights.heartbeat.noData',
                message: 'No Data',
              })
            )}
          </Tooltip.Label>
          <Tooltip.Value>
            <span
              className={clsx(styles.dot, statusClass(representative?.status))}
              aria-hidden="true"
            />
            {heartbeatStatusLabel(representative?.status)}
            {representative && typeof representative.ping === 'number' && (
              <span className={styles.tooltipPing}>· {representative.ping}ms</span>
            )}
          </Tooltip.Value>
          {active.count > 1 && representative && (
            <Tooltip.Label>
              {selectMessage(
                active.count,
                translate(
                  {
                    id: 'pages.insights.heartbeat.checks',
                    message: '{count} check|{count} checks',
                  },
                  { count: String(active.count) }
                )
              )}
              <br />
              {formatTooltipDate(representative.time, locale, timeZone)}
            </Tooltip.Label>
          )}
          {representative?.msg && <span className={styles.tooltipMsg}>{representative.msg}</span>}
        </Tooltip>
      )}
    </div>
  );
}
