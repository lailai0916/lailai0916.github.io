import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TitleCard from '@site/src/components/laikit/TitleCard';
import Tooltip from '@site/src/components/laikit/Tooltip';
import Skeleton from '@site/src/components/laikit/Skeleton';
import DataState from '@site/src/components/laikit/DataState';
import { formatCompact } from '@site/src/utils/format';
import styles from './styles.module.css';

export interface ChartDatum {
  key: string;
  value: number;
  // Text shown in the interactive tooltip (e.g. "May 2023", "Sep 1 – Sep 7").
  tooltipLabel: string;
  // Optional X-axis tick; rendered only where present.
  axisLabel?: string;
}

interface ChartProps {
  title: string;
  icon: string;
  type: 'bar' | 'line';
  data: ChartDatum[];
  loading?: boolean;
  emptyText: string;
  // Set when the source fetch failed. Kept separate from `loading` so a dead
  // endpoint can't render as an endless skeleton.
  error?: string;
  errorAction?: ReactNode;
  className?: string;
  // Formats the interactive tooltip value (e.g. add a pluralized unit); defaults to compact.
  formatValue?: (value: number) => string;
}

// SVG coordinate space for the line variant; preserveAspectRatio="none" stretches it.
const VW = 1000;
const VH = 100;

// A "nice" gridline step (~4 lines) sized to the data, plus the rounded axis max.
function niceStep(max: number): number {
  if (max <= 0) return 5;
  const raw = max / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const mult = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return mult * mag;
}

function computeScale(max: number): { yMax: number; gridLines: number[] } {
  const step = niceStep(max);
  const yMax = Math.max(step, Math.ceil(max / step) * step);
  const gridLines = Array.from({ length: Math.round(yMax / step) }, (_, i) => (i + 1) * step);
  return { yMax, gridLines };
}

export default function Chart({
  title,
  icon,
  type,
  data,
  loading,
  emptyText,
  error,
  errorAction,
  className,
  formatValue,
}: ChartProps) {
  const {
    i18n: { currentLocale: locale },
  } = useDocusaurusContext();
  const plotRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const n = data.length;
  const max = data.reduce((m, d) => Math.max(m, d.value), 0);
  const { yMax, gridLines } = computeScale(max);
  const interactive = !loading && n > 0;
  const selectedIndex = selectedKey == null ? -1 : data.findIndex((d) => d.key === selectedKey);
  const selectedIdx = selectedIndex >= 0 ? selectedIndex : null;

  useEffect(() => {
    if (selectedKey == null) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!plotRef.current?.contains(event.target as Node)) {
        setHoverIdx(null);
        setSelectedKey(null);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [selectedKey]);

  const fmt = (v: number) => formatCompact(v, locale);
  // Bars sit at slot centres; line points span edge-to-edge.
  const xPct = (i: number) =>
    type === 'bar' ? ((i + 0.5) / n) * 100 : n > 1 ? (i / (n - 1)) * 100 : 50;

  const indexAt = (clientX: number): number | null => {
    if (!plotRef.current || !interactive) return null;
    const rect = plotRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return type === 'bar' ? Math.min(n - 1, Math.floor(ratio * n)) : Math.round(ratio * (n - 1));
  };
  const select = (idx: number) => {
    setSelectedKey(data[idx].key);
    setHoverIdx(null);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const idx = indexAt(e.clientX);
    if (idx != null) setHoverIdx(idx);
  };
  const onClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const idx = indexAt(e.clientX);
    if (idx != null) {
      plotRef.current?.focus();
      select(idx);
    }
  };
  const onFocus = () => {
    if (interactive && selectedIdx == null) select(n - 1);
  };
  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const current = selectedIdx ?? n - 1;
    let next: number;
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = Math.max(0, current - 1);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        next = Math.min(n - 1, current + 1);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = n - 1;
        break;
      case 'Escape':
        setSelectedKey(null);
        setHoverIdx(null);
        return;
      default:
        return;
    }
    e.preventDefault();
    select(next);
  };
  const onPointerLeave = () => setHoverIdx(null);

  const resolvedHoverIdx = hoverIdx != null && hoverIdx < n ? hoverIdx : null;
  const activeIdx = resolvedHoverIdx ?? selectedIdx;
  const active = activeIdx != null ? data[activeIdx] : null;
  const activeLeftPct = activeIdx != null ? xPct(activeIdx) : 0;
  const ariaIdx = activeIdx ?? n - 1;
  const ariaDatum = interactive ? data[ariaIdx] : null;

  const lineXAt = (i: number) => (n > 1 ? (i / (n - 1)) * VW : VW / 2);
  const lineYAt = (v: number) => (1 - v / yMax) * VH;
  // Smooth the line with horizontal-midpoint cubic beziers between points.
  const linePath = data
    .map((d, i) => {
      const x = lineXAt(i);
      const y = lineYAt(d.value);
      if (i === 0) return `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      const px = lineXAt(i - 1);
      const py = lineYAt(data[i - 1].value);
      const cpx = ((px + x) / 2).toFixed(2);
      return `C ${cpx} ${py.toFixed(2)}, ${cpx} ${y.toFixed(2)}, ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
  const areaPath =
    n > 0
      ? `${linePath} L ${lineXAt(n - 1).toFixed(2)} ${VH} L ${lineXAt(0).toFixed(2)} ${VH} Z`
      : '';

  return (
    <TitleCard
      size="sm"
      icon={icon}
      title={title}
      padding="1.5rem 1.25rem 1.25rem"
      className={clsx(styles.card, className)}
    >
      {!loading && error ? (
        <DataState message={error} action={errorAction} />
      ) : !loading && n === 0 ? (
        <DataState message={emptyText} />
      ) : (
        <>
          <div
            ref={plotRef}
            className={clsx(styles.plot, interactive && styles.plotInteractive)}
            role={interactive ? 'slider' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label={interactive ? title : undefined}
            aria-orientation={interactive ? 'horizontal' : undefined}
            aria-valuemin={interactive ? 1 : undefined}
            aria-valuemax={interactive ? n : undefined}
            aria-valuenow={interactive ? ariaIdx + 1 : undefined}
            aria-valuetext={
              ariaDatum
                ? `${ariaDatum.tooltipLabel}: ${(formatValue ?? fmt)(ariaDatum.value)}`
                : undefined
            }
            onClick={onClick}
            onFocus={onFocus}
            onBlur={() => {
              setHoverIdx(null);
              setSelectedKey(null);
            }}
            onKeyDown={onKeyDown}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
          >
            {loading ? (
              <Skeleton width="100%" height="100%" radius={12} />
            ) : (
              <>
                {gridLines.map((v) => (
                  <div
                    key={v}
                    className={styles.gridLine}
                    style={{ bottom: `${(v / yMax) * 100}%` }}
                  >
                    <span>{fmt(v)}</span>
                  </div>
                ))}
                {type === 'bar' ? (
                  data.map((d, i) => (
                    <div
                      key={d.key}
                      className={i === activeIdx ? styles.barActive : styles.bar}
                      style={{
                        height: d.value === 0 ? 0 : `${(d.value / yMax) * 100}%`,
                      }}
                    />
                  ))
                ) : (
                  <svg
                    className={styles.svg}
                    viewBox={`0 0 ${VW} ${VH}`}
                    preserveAspectRatio="none"
                  >
                    {areaPath && <path className={styles.area} d={areaPath} />}
                    <path className={styles.line} d={linePath} vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
                {active && (
                  <>
                    <div className={styles.crosshair} style={{ left: `${activeLeftPct}%` }} />
                    {type === 'line' && (
                      <div
                        className={styles.dot}
                        style={{
                          left: `${activeLeftPct}%`,
                          bottom: `${(active.value / yMax) * 100}%`,
                        }}
                      />
                    )}
                    <Tooltip leftPct={activeLeftPct}>
                      <Tooltip.Label>{active.tooltipLabel}</Tooltip.Label>
                      <Tooltip.Value>{(formatValue ?? fmt)(active.value)}</Tooltip.Value>
                    </Tooltip>
                  </>
                )}
              </>
            )}
          </div>
          <div className={styles.axis}>
            {!loading &&
              data.map((d, i) => {
                if (!d.axisLabel) return null;
                const lp = xPct(i);
                // Nudge the edge ticks inward so they don't overflow the plot.
                const tx = lp <= 0 ? '0' : lp >= 100 ? '-100%' : '-50%';
                return (
                  <span
                    key={d.key}
                    className={styles.axisLabel}
                    style={{ left: `${lp}%`, transform: `translateX(${tx})` }}
                  >
                    {d.axisLabel}
                  </span>
                );
              })}
          </div>
          {!loading && (
            <table className="sr-only">
              <caption>{title}</caption>
              <tbody>
                {data.map((d) => (
                  <tr key={d.key}>
                    <th scope="row">{d.tooltipLabel}</th>
                    <td>{(formatValue ?? fmt)(d.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </TitleCard>
  );
}
