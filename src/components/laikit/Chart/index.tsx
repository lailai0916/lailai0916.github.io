import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TitleCard from '@site/src/components/laikit/TitleCard';
import Tooltip from '@site/src/components/laikit/Tooltip';
import Skeleton from '@site/src/components/laikit/Skeleton';
import { formatCompact } from '@site/src/utils/format';
import styles from './styles.module.css';

export interface ChartDatum {
  key: string;
  value: number;
  // Text shown in the hover tooltip (e.g. "May 2023", "Sep 1 – Sep 7").
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
  className?: string;
  // Formats the hover tooltip value (e.g. add a pluralized unit); defaults to compact.
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
  const gridLines = Array.from(
    { length: Math.round(yMax / step) },
    (_, i) => (i + 1) * step
  );
  return { yMax, gridLines };
}

export default function Chart({
  title,
  icon,
  type,
  data,
  loading,
  className,
  formatValue,
}: ChartProps) {
  const {
    i18n: { currentLocale: locale },
  } = useDocusaurusContext();
  const plotRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const n = data.length;
  const max = data.reduce((m, d) => Math.max(m, d.value), 0);
  const { yMax, gridLines } = computeScale(max);

  const fmt = (v: number) => formatCompact(v, locale);
  // Bars sit at slot centres; line points span edge-to-edge.
  const xPct = (i: number) =>
    type === 'bar' ? ((i + 0.5) / n) * 100 : n > 1 ? (i / (n - 1)) * 100 : 50;

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!plotRef.current || n === 0 || loading) return;
    const rect = plotRef.current.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    setHoverIdx(
      type === 'bar'
        ? Math.min(n - 1, Math.floor(ratio * n))
        : Math.round(ratio * (n - 1))
    );
  };
  const onPointerLeave = () => setHoverIdx(null);

  const active = hoverIdx != null ? data[hoverIdx] : null;
  const activeLeftPct = hoverIdx != null ? xPct(hoverIdx) : 0;

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
      <div
        ref={plotRef}
        className={styles.plot}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        role="img"
        aria-label={title}
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
                  className={i === hoverIdx ? styles.barActive : styles.bar}
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
                <path
                  className={styles.line}
                  d={linePath}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}
            {active && (
              <>
                <div
                  className={styles.crosshair}
                  style={{ left: `${activeLeftPct}%` }}
                />
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
                  <Tooltip.Value>
                    {(formatValue ?? fmt)(active.value)}
                  </Tooltip.Value>
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
    </TitleCard>
  );
}
