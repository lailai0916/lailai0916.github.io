import { useState, type CSSProperties, type ReactNode } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TitleCard from '@site/src/components/laikit/TitleCard';
import Skeleton from '@site/src/components/laikit/Skeleton';
import { formatCompact } from '@site/src/utils/format';
import styles from './styles.module.css';

interface DonutRow {
  x: string;
  y: number;
}

interface DonutProps {
  title: string;
  icon: string;
  items: DonutRow[];
  loading?: boolean;
  emptyText: string;
  // Collapse everything past the top (maxSlices - 1) into a neutral "Other"
  // slice, so a dominant category never shreds the ring into slivers. Also fixes
  // the row count so the legend area — and the skeleton — reserve equal height.
  maxSlices?: number;
  otherLabel?: string;
  renderLabel?: (x: string) => ReactNode;
  formatValue?: (y: number) => string;
}

// Ring geometry in a 100×100 viewBox; pathLength normalises the circumference to
// 100 so a slice's arc length equals its percentage.
const R = 42;
const SW = 10;
const SW_ACTIVE = 13;
// Arc trimmed from each slice; the gap reveals the card background behind the
// ring as a crisp hairline separator (not a grey groove).
const GAP = 1.2;

// Single-hue ramp for the real slices: the largest is the vivid brand primary,
// the rest tint toward the card surface. One hue keeps it unified with the site;
// the aggregated "Other" slice is a neutral grey, set apart from the ramp.
function sliceColor(i: number, n: number): string {
  const strength = n <= 1 ? 100 : 100 - (i / (n - 1)) * 45;
  return `color-mix(in srgb, var(--ifm-color-primary) ${strength}%, var(--ifm-card-background-color))`;
}

interface Slice {
  key: string;
  y: number;
  label: ReactNode;
  color: string;
}

export default function Donut({
  title,
  icon,
  items,
  loading,
  emptyText,
  maxSlices,
  otherLabel,
  renderLabel,
  formatValue,
}: DonutProps) {
  const {
    i18n: { currentLocale: locale },
  } = useDocusaurusContext();
  const [active, setActive] = useState<number | null>(null);

  const format = formatValue ?? ((n: number) => formatCompact(n, locale));
  const label = (x: string) => (renderLabel ? renderLabel(x) : x);
  const sorted = [...items].sort((a, b) => b.y - a.y);
  const total = sorted.reduce((s, d) => s + d.y, 0);

  // Fold the long tail into one "Other" slice (only when it merges ≥2 items).
  let reals = sorted;
  let otherY = 0;
  if (maxSlices && sorted.length > maxSlices) {
    const tail = sorted.slice(maxSlices - 1);
    if (tail.length >= 2) {
      reals = sorted.slice(0, maxSlices - 1);
      otherY = tail.reduce((s, d) => s + d.y, 0);
    }
  }

  const slices: Slice[] = reals.map((d, i) => ({
    key: d.x,
    y: d.y,
    label: label(d.x),
    color: sliceColor(i, reals.length),
  }));
  if (otherY > 0) {
    slices.push({
      key: '__other__',
      y: otherY,
      label: otherLabel ?? 'Other',
      color: 'var(--ifm-color-emphasis-400)',
    });
  }

  let acc = 0;
  const segments = slices.map((s) => {
    const frac = total > 0 ? s.y / total : 0;
    const seg = { ...s, frac, start: acc };
    acc += frac;
    return seg;
  });

  const gap = segments.length > 1 ? GAP : 0;
  const activeSeg = active != null ? segments[active] : null;
  // Reserve legend height for the full slice count so short cards (e.g. Devices)
  // stay the same height as the others and nothing shifts on data load.
  const rows = maxSlices ?? segments.length;

  return (
    <TitleCard
      size="sm"
      icon={icon}
      title={title}
      padding="1.5rem 1.25rem 1.25rem"
      className={styles.card}
    >
      {loading ? (
        <div className={styles.body} style={{ '--donut-rows': rows } as CSSProperties}>
          <div className={styles.chartWrap}>
            <Skeleton width="100%" height="100%" radius="50%" />
          </div>
          <ul className={styles.legend}>
            {Array.from({ length: rows }).map((_, i) => (
              <li key={i} className={styles.legendRow}>
                <Skeleton className={styles.legendFill} height="0.85rem" radius={5} />
              </li>
            ))}
          </ul>
        </div>
      ) : total === 0 ? (
        <p className={styles.empty}>{emptyText}</p>
      ) : (
        <div
          className={styles.body}
          style={{ '--donut-rows': rows } as CSSProperties}
          onPointerLeave={() => setActive(null)}
        >
          <div className={styles.chartWrap}>
            <svg className={styles.svg} viewBox="0 0 100 100" role="img" aria-label={title}>
              <g transform="rotate(-90 50 50)">
                {segments.map((seg, i) => {
                  const raw = seg.frac * 100;
                  const drawLen = Math.max(raw - gap, 0.5);
                  const startOff = seg.start * 100 + gap / 2;
                  return (
                    <circle
                      key={seg.key}
                      className={styles.segment}
                      cx="50"
                      cy="50"
                      r={R}
                      fill="none"
                      pathLength={100}
                      strokeWidth={i === active ? SW_ACTIVE : SW}
                      strokeDasharray={`${drawLen} ${100 - drawLen}`}
                      strokeDashoffset={-startOff}
                      style={{
                        stroke: seg.color,
                        opacity: active == null || i === active ? 1 : 0.32,
                      }}
                      onPointerEnter={() => setActive(i)}
                    />
                  );
                })}
              </g>
            </svg>
            <div className={styles.center}>
              <span className={styles.centerValue}>
                {activeSeg ? format(activeSeg.y) : format(total)}
              </span>
            </div>
          </div>
          <ul className={styles.legend}>
            {segments.map((seg, i) => (
              <li
                key={seg.key}
                className={clsx(
                  styles.legendRow,
                  active != null && i !== active && styles.legendRowDim
                )}
                onPointerEnter={() => setActive(i)}
              >
                <span className={styles.swatch} style={{ background: seg.color }} />
                <span className={styles.legendLabel}>{seg.label}</span>
                <span className={styles.legendPct}>{Math.round(seg.frac * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </TitleCard>
  );
}
