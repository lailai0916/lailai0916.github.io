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
import shared from './chart.module.css';
import styles from './BarChart.module.css';

export interface ChartDatum {
  key: string;
  value: number;
  // Text shown in the hover tooltip (e.g. "May 2023", "21:00").
  tooltipLabel: string;
  // Optional X-axis tick; rendered only where present.
  axisLabel?: string;
}

interface BarChartProps {
  title: string;
  icon: string;
  data: ChartDatum[];
}

export default function BarChart({ title, icon, data }: BarChartProps) {
  const {
    i18n: { currentLocale: locale },
  } = useDocusaurusContext();
  const plotRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const n = data.length;
  const max = data.reduce((m, d) => Math.max(m, d.value), 0);
  const { yMax, gridLines } = computeScale(max);

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!plotRef.current || n === 0) return;
    const rect = plotRef.current.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    setHoverIdx(Math.min(n - 1, Math.floor(ratio * n)));
  };
  const onPointerLeave = () => setHoverIdx(null);

  const active = hoverIdx != null ? data[hoverIdx] : null;
  const activeLeftPct = hoverIdx != null ? ((hoverIdx + 0.5) / n) * 100 : 0;

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
        {data.map((d, i) => (
          <div
            key={d.key}
            className={i === hoverIdx ? styles.barActive : styles.bar}
            style={{
              height: d.value === 0 ? 0 : `${(d.value / yMax) * 100}%`,
            }}
          />
        ))}
        {active && (
          <>
            <div
              className={shared.crosshair}
              style={{ left: `${activeLeftPct}%` }}
            />
            <Tooltip leftPct={activeLeftPct}>
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
              style={{ left: `${((i + 0.5) / n) * 100}%` }}
            >
              {d.axisLabel}
            </span>
          ) : null
        )}
      </div>
    </TitleCard>
  );
}
