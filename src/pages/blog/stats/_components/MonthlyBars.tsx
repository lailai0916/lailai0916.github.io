import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import TitleCard from '@site/src/components/laikit/TitleCard';
import Tooltip from '@site/src/components/laikit/Tooltip';
import { formatCompact } from '@site/src/utils/format';
import styles from './MonthlyBars.module.css';

export interface MonthBucket {
  key: string;
  year: number;
  month: number;
  total: number;
}

const CHART_TITLE = translate({
  id: 'pages.stats.chart.title',
  message: 'Posts per Month',
});

// Y-axis gridlines every 5 posts; round the ceiling up to the next multiple.
const STEP = 5;

export default function MonthlyBars({ data }: { data: MonthBucket[] }) {
  const {
    i18n: { currentLocale: locale },
  } = useDocusaurusContext();
  const plotRef = useRef<HTMLDivElement>(null);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const n = data.length;
  const max = data.reduce((m, d) => Math.max(m, d.total), 0);
  const yMax = Math.max(STEP, Math.ceil(max / STEP) * STEP);
  const gridLines = Array.from(
    { length: yMax / STEP },
    (_, i) => (i + 1) * STEP
  );

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
      icon="lucide:bar-chart-3"
      title={CHART_TITLE}
      padding="1.5rem 1.25rem 1.25rem"
      className={styles.card}
    >
      <div
        ref={plotRef}
        className={styles.plot}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        role="img"
        aria-label={CHART_TITLE}
      >
        {gridLines.map((v) => (
          <div
            key={v}
            className={styles.gridLine}
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
              height: d.total === 0 ? 0 : `${(d.total / yMax) * 100}%`,
            }}
          />
        ))}
        {active && (
          <>
            <div
              className={styles.crosshair}
              style={{ left: `${activeLeftPct}%` }}
            />
            <Tooltip leftPct={activeLeftPct}>
              <Tooltip.Label>
                {new Date(active.year, active.month - 1, 1).toLocaleDateString(
                  locale,
                  { year: 'numeric', month: 'long' }
                )}
              </Tooltip.Label>
              <Tooltip.Value>
                {formatCompact(active.total, locale)}
              </Tooltip.Value>
            </Tooltip>
          </>
        )}
      </div>
      <div className={styles.axis}>
        {data.map((d, i) =>
          d.month === 1 || i === 0 ? (
            <span
              key={d.key}
              className={styles.axisLabel}
              style={{ left: `${((i + 0.5) / n) * 100}%` }}
            >
              {d.year}
            </span>
          ) : null
        )}
      </div>
    </TitleCard>
  );
}
