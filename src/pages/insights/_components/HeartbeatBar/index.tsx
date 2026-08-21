import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { KumaHeartbeat } from '@site/src/utils/kuma';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { formatInTimeZone, parseUtcDateTime } from '@site/src/utils/dateTime';
import Tooltip from '@site/src/components/laikit/Tooltip';
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
  const [selectedOffset, setSelectedOffset] = useState<number | null>(null);
  const [wrapRef, fitSlots] = useResponsiveSlots(slots);
  const barRef = useRef<HTMLDivElement>(null);
  const {
    i18n: { currentLocale: locale },
  } = useDocusaurusContext();
  const timeZone = useVisitorTimeZone();

  const effectiveSlots = fitSlots;

  const padded: (KumaHeartbeat | null)[] = [];
  const start = Math.max(0, beats.length - effectiveSlots);
  const recent = beats.slice(start);
  const empty = effectiveSlots - recent.length;
  for (let i = 0; i < empty; i++) padded.push(null);
  for (const b of recent) padded.push(b);

  const maxOffset = Math.max(0, recent.length - 1);
  const selectedIdx =
    selectedOffset != null && recent.length > 0
      ? padded.length - 1 - Math.min(selectedOffset, maxOffset)
      : null;
  const activeIdx = hoverIdx ?? selectedIdx;
  const active = activeIdx != null ? padded[activeIdx] : null;
  const tooltipLeftPct = activeIdx != null ? ((activeIdx + 0.5) / effectiveSlots) * 100 : 0;

  const indexAt = (clientX: number) => {
    const el = barRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.min(padded.length - 1, Math.floor(ratio * padded.length));
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const index = indexAt(event.clientX);
    if (index != null) setHoverIdx(index);
  };

  const onClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    const index = indexAt(event.clientX);
    if (index == null) return;
    const beat = padded[index];
    setSelectedOffset(beat ? padded.length - 1 - index : null);
    barRef.current?.focus();
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (recent.length === 0) return;
    const current = selectedOffset ?? 0;
    let next: number;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown')
      next = Math.min(maxOffset, current + 1);
    else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') next = Math.max(0, current - 1);
    else if (event.key === 'Home') next = maxOffset;
    else if (event.key === 'End') next = 0;
    else return;
    event.preventDefault();
    setHoverIdx(null);
    setSelectedOffset(next);
  };

  const announcedOffset = Math.min(selectedOffset ?? 0, maxOffset);
  const announced = recent[recent.length - 1 - announcedOffset];
  const announcedText = announced
    ? `${formatTooltipDate(announced.time, locale, timeZone)}, ${heartbeatStatusLabel(announced.status)}${
        typeof announced.ping === 'number' ? `, ${announced.ping}ms` : ''
      }`
    : heartbeatStatusLabel(undefined);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div
        ref={barRef}
        className={clsx(styles.bar, recent.length > 0 && styles.barInteractive)}
        role={recent.length > 0 ? 'slider' : 'img'}
        aria-label={HEARTBEAT_ARIA_LABEL}
        aria-orientation={recent.length > 0 ? 'horizontal' : undefined}
        aria-valuemin={recent.length > 0 ? 1 : undefined}
        aria-valuemax={recent.length > 0 ? recent.length : undefined}
        aria-valuenow={recent.length > 0 ? recent.length - announcedOffset : undefined}
        aria-valuetext={recent.length > 0 ? announcedText : undefined}
        tabIndex={recent.length > 0 ? 0 : undefined}
        onFocus={() => setSelectedOffset((value) => value ?? 0)}
        onBlur={() => {
          setHoverIdx(null);
          setSelectedOffset(null);
        }}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setHoverIdx(null)}
      >
        {padded.map((beat, i) => (
          <span
            key={i}
            className={clsx(
              styles.cell,
              beat ? statusClass(beat.status) : styles.empty,
              i === activeIdx && styles.cellActive
            )}
            aria-hidden="true"
          />
        ))}
      </div>

      {activeIdx != null && (
        <Tooltip leftPct={tooltipLeftPct}>
          <Tooltip.Label>
            {active
              ? formatTooltipDate(active.time, locale, timeZone)
              : translate({
                  id: 'pages.insights.heartbeat.noData',
                  message: 'No Data',
                })}
          </Tooltip.Label>
          <Tooltip.Value>
            <span
              className={clsx(styles.dot, active ? statusClass(active.status) : styles.empty)}
              aria-hidden="true"
            />
            {heartbeatStatusLabel(active?.status)}
            {active && typeof active.ping === 'number' && (
              <span className={styles.tooltipPing}>· {active.ping}ms</span>
            )}
          </Tooltip.Value>
          {active?.msg && <span className={styles.tooltipMsg}>{active.msg}</span>}
        </Tooltip>
      )}
    </div>
  );
}
