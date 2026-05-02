import React, { useId, useMemo, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { SeriesPoint } from '@site/src/hooks/useUmamiPageviewsSeries';
import styles from './Sparkline.module.css';

type SparklineUnit = 'hour' | '6h' | 'day' | 'week';

interface SparklineProps {
  data: SeriesPoint[];
  height?: number;
  loading?: boolean;
  unit?: SparklineUnit;
}

function buildPath(
  values: number[],
  width: number,
  height: number,
  padding: number
): { line: string; area: string } {
  if (values.length === 0) {
    return { line: '', area: '' };
  }

  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const stepX = values.length > 1 ? innerW / (values.length - 1) : 0;

  const xs = values.map((_, i) => padding + i * stepX);
  const ys = values.map((v) => padding + innerH - ((v - min) / span) * innerH);

  let line = `M ${xs[0].toFixed(2)} ${ys[0].toFixed(2)}`;
  for (let i = 1; i < values.length; i++) {
    const cpx = (xs[i - 1] + xs[i]) / 2;
    line += ` C ${cpx.toFixed(2)} ${ys[i - 1].toFixed(2)}, ${cpx.toFixed(2)} ${ys[i].toFixed(2)}, ${xs[i].toFixed(2)} ${ys[i].toFixed(2)}`;
  }

  const baseY = height - padding;
  const area = `${line} L ${xs[xs.length - 1].toFixed(2)} ${baseY.toFixed(2)} L ${xs[0].toFixed(2)} ${baseY.toFixed(2)} Z`;

  return { line, area };
}

function parseDate(iso: string): Date {
  return new Date(iso.replace(' ', 'T'));
}

function formatTick(
  iso: string,
  unit: SparklineUnit,
  spanDays: number,
  locale: string
): string {
  const d = parseDate(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (unit === 'hour' && spanDays <= 1.5) {
    return d.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }
  return d.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  });
}

function formatHM(d: Date, locale: string): string {
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatMD(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  });
}

function formatYMD(d: Date, locale: string): string {
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatTooltipDate(
  iso: string,
  unit: SparklineUnit,
  locale: string
): string {
  const d = parseDate(iso);
  if (Number.isNaN(d.getTime())) return iso;
  if (unit === 'hour') {
    const end = new Date(d);
    end.setHours(end.getHours() + 1);
    return `${formatMD(d, locale)} ${formatHM(d, locale)} – ${formatHM(end, locale)}`;
  }
  if (unit === '6h') {
    const end = new Date(d);
    end.setHours(end.getHours() + 6);
    const sameDay =
      d.getFullYear() === end.getFullYear() &&
      d.getMonth() === end.getMonth() &&
      d.getDate() === end.getDate();
    const endLabel = sameDay
      ? formatHM(end, locale)
      : `${formatMD(end, locale)} ${formatHM(end, locale)}`;
    return `${formatMD(d, locale)} ${formatHM(d, locale)} – ${endLabel}`;
  }
  if (unit === 'week') {
    const end = new Date(d);
    end.setDate(end.getDate() + 6);
    return `${formatMD(d, locale)} – ${formatYMD(end, locale)}`;
  }
  return formatYMD(d, locale);
}

function formatCompact(n: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

export default function Sparkline({
  data,
  height = 220,
  loading = false,
  unit = 'day',
}: SparklineProps) {
  const gradientId = useId();
  const width = 1200;
  const padding = 8;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  const values = useMemo(() => data.map((d) => d.y), [data]);
  const { line, area } = useMemo(
    () => buildPath(values, width, height, padding),
    [values, width, height]
  );

  const max = values.length ? Math.max(...values, 1) : 1;
  const min = values.length ? Math.min(...values, 0) : 0;
  const span = max - min || 1;
  const innerH = height - padding * 2;
  const innerW = width - padding * 2;
  const stepX = values.length > 1 ? innerW / (values.length - 1) : 0;

  const xAt = (i: number) => padding + i * stepX;
  const yAt = (v: number) => padding + innerH - ((v - min) / span) * innerH;

  const lastIndex = values.length - 1;
  const activeIdx = hoverIdx ?? lastIndex;
  const activePoint =
    values.length > 0 && activeIdx >= 0
      ? { x: xAt(activeIdx), y: yAt(values[activeIdx]) }
      : null;

  const gridLines = [0.25, 0.5, 0.75].map((r) => padding + innerH * r);
  const tickIdxs =
    values.length === 0
      ? []
      : values.length <= 3
        ? values.map((_, i) => i)
        : [0, Math.floor(lastIndex / 2), lastIndex];

  const spanDays =
    data.length > 1
      ? (parseDate(data[lastIndex].x).getTime() - parseDate(data[0].x).getTime()) /
        86400000
      : 0;

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || values.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverIdx(Math.round(ratio * lastIndex));
  };
  const onPointerLeave = () => setHoverIdx(null);

  if (loading || values.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.sparkline} style={{ height }}>
          <div className={styles.skeleton} />
        </div>
        <div className={styles.xAxis} aria-hidden="true" />
      </div>
    );
  }

  const tooltipLeftPct = (activeIdx / Math.max(lastIndex, 1)) * 100;

  return (
    <div className={styles.wrapper}>
      <div
        ref={containerRef}
        className={styles.sparkline}
        style={{ height }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        role="img"
        aria-label="Pageviews over time"
      >
        <svg
          className={styles.svg}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--ifm-color-primary)"
                stopOpacity="0.32"
              />
              <stop
                offset="100%"
                stopColor="var(--ifm-color-primary)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {gridLines.map((y, i) => (
            <line
              key={i}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              className={styles.grid}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path d={area} fill={`url(#${gradientId})`} />
          <path
            d={line}
            fill="none"
            stroke="var(--ifm-color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            className={styles.line}
          />

          {hoverIdx === null && activePoint && (
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r="4"
              fill="var(--ifm-color-primary)"
              stroke="var(--ifm-card-background-color)"
              strokeWidth="2"
            />
          )}

          {hoverIdx !== null && activePoint && (
            <>
              <line
                x1={activePoint.x}
                x2={activePoint.x}
                y1={padding}
                y2={height - padding}
                className={styles.crosshair}
                vectorEffect="non-scaling-stroke"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="5"
                fill="var(--ifm-color-primary)"
                stroke="var(--ifm-card-background-color)"
                strokeWidth="2"
              />
            </>
          )}
        </svg>

        {hoverIdx !== null && (
          <div
            className={styles.tooltip}
            style={{ left: `${tooltipLeftPct}%` }}
          >
            <span className={styles.tooltipDate}>
              {formatTooltipDate(data[activeIdx].x, unit, locale)}
            </span>
            <span className={styles.tooltipValue}>
              {formatCompact(values[activeIdx])}
            </span>
          </div>
        )}
      </div>

      <div className={styles.xAxis}>
        {tickIdxs.map((i) => (
          <span
            key={i}
            className={styles.xTick}
            style={{ left: `${(i / Math.max(lastIndex, 1)) * 100}%` }}
          >
            {formatTick(data[i].x, unit, spanDays, locale)}
          </span>
        ))}
      </div>
    </div>
  );
}
