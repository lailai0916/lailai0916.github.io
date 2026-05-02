import React, { useEffect, useRef, useState } from 'react';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { KumaHeartbeat } from '@site/src/utils/kuma';
import Tooltip from '@site/src/components/laikit/Tooltip';
import styles from './HeartbeatBar.module.css';

interface HeartbeatBarProps {
  beats: KumaHeartbeat[];
  slots?: number;
}

const CELL_MIN = 2;
const GAP = 2;

function useResponsiveSlots(maxSlots: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [slots, setSlots] = useState(maxSlots);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      const fit = Math.max(
        1,
        Math.min(maxSlots, Math.floor((w + GAP) / (CELL_MIN + GAP)))
      );
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

function statusLabel(status: number | undefined): string {
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
        message: 'No data',
      });
  }
}

function parseDate(iso: string): Date {
  return new Date(iso.replace(' ', 'T'));
}

function formatTooltipDate(iso: string, locale: string): string {
  const d = parseDate(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export default function HeartbeatBar({ beats, slots = 100 }: HeartbeatBarProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [wrapRef, fitSlots] = useResponsiveSlots(slots);
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  const effectiveSlots = Math.min(slots, fitSlots);

  const padded: (KumaHeartbeat | null)[] = [];
  const start = Math.max(0, beats.length - effectiveSlots);
  const recent = beats.slice(start);
  const empty = effectiveSlots - recent.length;
  for (let i = 0; i < empty; i++) padded.push(null);
  for (const b of recent) padded.push(b);

  const active = hoverIdx != null ? padded[hoverIdx] : null;
  const tooltipLeftPct =
    hoverIdx != null ? ((hoverIdx + 0.5) / effectiveSlots) * 100 : 0;

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div
        className={styles.bar}
        role="img"
        aria-label="Recent heartbeat status"
        onPointerLeave={() => setHoverIdx(null)}
      >
        {padded.map((beat, i) => (
          <span
            key={i}
            className={`${styles.cell} ${
              beat ? statusClass(beat.status) : styles.empty
            }`}
            onPointerEnter={() => setHoverIdx(i)}
          />
        ))}
      </div>

      {hoverIdx != null && (
        <Tooltip leftPct={tooltipLeftPct}>
          <Tooltip.Label>
            {active
              ? formatTooltipDate(active.time, locale)
              : translate({
                  id: 'pages.insights.heartbeat.noData',
                  message: 'No data',
                })}
          </Tooltip.Label>
          <Tooltip.Value>
            <span
              className={`${styles.dot} ${
                active ? statusClass(active.status) : styles.empty
              }`}
              aria-hidden="true"
            />
            {statusLabel(active?.status)}
            {active && typeof active.ping === 'number' && (
              <span className={styles.tooltipPing}>· {active.ping}ms</span>
            )}
          </Tooltip.Value>
          {active?.msg && (
            <span className={styles.tooltipMsg}>{active.msg}</span>
          )}
        </Tooltip>
      )}
    </div>
  );
}
