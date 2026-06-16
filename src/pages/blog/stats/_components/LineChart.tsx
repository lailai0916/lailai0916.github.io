import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TitleCard from '@site/src/components/laikit/TitleCard';
import Tooltip from '@site/src/components/laikit/Tooltip';
import { formatCompact } from '@site/src/utils/format';
import { computeScale } from './scale';
import { type ChartDatum } from './BarChart';
import shared from './chart.module.css';
import styles from './LineChart.module.css';

interface LineChartProps {
  title: string;
  icon: string;
  data: ChartDatum[];
}

// SVG coordinate space; preserveAspectRatio="none" stretches it to the plot.
const VW = 1000;
const VH = 100;

export default function LineChart({ title, icon, data }: LineChartProps) {
  const {
    i18n: { currentLocale: locale },
  } = useDocusaurusContext();
  const plotRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const n = data.length;
  const max = data.reduce((m, d) => Math.max(m, d.value), 0);
  const { yMax, gridLines } = computeScale(max);

  const xAt = (i: number) => (n > 1 ? (i / (n - 1)) * VW : VW / 2);
  const yAt = (v: number) => (1 - v / yMax) * VH;

  const linePath = data
    .map(
      (d, i) =>
        `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(2)} ${yAt(d.value).toFixed(2)}`
    )
    .join(' ');
  const areaPath =
    n > 0
      ? `${linePath} L ${xAt(n - 1).toFixed(2)} ${VH} L ${xAt(0).toFixed(2)} ${VH} Z`
      : '';

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!plotRef.current || n === 0) return;
    const rect = plotRef.current.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    setHoverIdx(Math.round(ratio * (n - 1)));
  };
  const onPointerLeave = () => setHoverIdx(null);

  const active = hoverIdx != null ? data[hoverIdx] : null;
  const leftPct = hoverIdx != null && n > 1 ? (hoverIdx / (n - 1)) * 100 : 0;

  return (
    <TitleCard
      size="sm"
      icon={icon}
      title={title}
      padding="1.5rem 1.25rem 1.25rem"
      className={shared.card}
    >
      <div
        ref={plotRef}
        className={shared.plot}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        role="img"
        aria-label={title}
      >
        {gridLines.map((v) => (
          <div
            key={v}
            className={shared.gridLine}
            style={{ bottom: `${(v / yMax) * 100}%` }}
          >
            <span>{v}</span>
          </div>
        ))}
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
        {active && (
          <>
            <div className={shared.crosshair} style={{ left: `${leftPct}%` }} />
            <div
              className={styles.dot}
              style={{
                left: `${leftPct}%`,
                bottom: `${(active.value / yMax) * 100}%`,
              }}
            />
            <Tooltip leftPct={leftPct}>
              <Tooltip.Label>{active.tooltipLabel}</Tooltip.Label>
              <Tooltip.Value>
                {formatCompact(active.value, locale)}
              </Tooltip.Value>
            </Tooltip>
          </>
        )}
      </div>
      <div className={shared.axis}>
        {data.map((d, i) =>
          d.axisLabel ? (
            <span
              key={d.key}
              className={shared.axisLabel}
              style={{ left: `${n > 1 ? (i / (n - 1)) * 100 : 50}%` }}
            >
              {d.axisLabel}
            </span>
          ) : null
        )}
      </div>
    </TitleCard>
  );
}
