import React, { useId, useMemo } from 'react';
import type { SeriesPoint } from '@site/src/hooks/useUmamiPageviewsSeries';
import styles from './Sparkline.module.css';

interface SparklineProps {
  data: SeriesPoint[];
  height?: number;
  loading?: boolean;
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

export default function Sparkline({
  data,
  height = 220,
  loading = false,
}: SparklineProps) {
  const gradientId = useId();
  const width = 1200;
  const padding = 8;

  const values = useMemo(() => data.map((d) => d.y), [data]);
  const { line, area } = useMemo(
    () => buildPath(values, width, height, padding),
    [values, width, height, padding]
  );

  const lastIndex = values.length - 1;
  const lastDot =
    values.length > 0
      ? {
          x:
            padding +
            (values.length > 1
              ? (lastIndex * (width - padding * 2)) / (values.length - 1)
              : (width - padding * 2) / 2),
          y: (() => {
            const max = Math.max(...values, 1);
            const min = Math.min(...values, 0);
            const span = max - min || 1;
            const innerH = height - padding * 2;
            return (
              padding + innerH - ((values[lastIndex] - min) / span) * innerH
            );
          })(),
        }
      : null;

  if (loading || values.length === 0) {
    return (
      <div className={styles.sparkline} style={{ height }}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  return (
    <div className={styles.sparkline} style={{ height }}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        aria-hidden="true"
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
        <path d={area} fill={`url(#${gradientId})`} />
        <path
          d={line}
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className={styles.line}
        />
        {lastDot && (
          <>
            <circle
              cx={lastDot.x}
              cy={lastDot.y}
              r="9"
              fill="var(--ifm-color-primary)"
              opacity="0.18"
              className={styles.pulse}
            />
            <circle
              cx={lastDot.x}
              cy={lastDot.y}
              r="4"
              fill="var(--ifm-color-primary)"
              stroke="var(--ifm-card-background-color)"
              strokeWidth="2"
            />
          </>
        )}
      </svg>
    </div>
  );
}
