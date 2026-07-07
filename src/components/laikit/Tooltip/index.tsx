import { useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  leftPct?: number;
}

function Tooltip({ leftPct, className, style, children, ...rest }: TooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Centred on leftPct, the card would spill off-screen near the edges and —
  // with no clipping ancestor — widen the page on small screens. Clamp its
  // centre to the viewport (it may overflow the narrow plot, just not the screen).
  const [leftPx, setLeftPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (leftPct == null || !el || !parent) return setLeftPx(null);
    const { left } = parent.getBoundingClientRect();
    const edge = el.offsetWidth / 2 + 8; // min gap from centre to screen edge
    const want = left + (leftPct / 100) * parent.clientWidth;
    const max = document.documentElement.clientWidth - edge;
    setLeftPx(Math.min(Math.max(want, edge), max) - left);
  });

  const finalStyle =
    leftPct != null ? { ...style, left: leftPx != null ? `${leftPx}px` : `${leftPct}%` } : style;
  return (
    <div ref={ref} {...rest} className={clsx(styles.tooltip, className)} style={finalStyle}>
      {children}
    </div>
  );
}

function TooltipLabel({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span {...rest} className={clsx(styles.label, className)} />;
}

function TooltipValue({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return <span {...rest} className={clsx(styles.value, className)} />;
}

Tooltip.Label = TooltipLabel;
Tooltip.Value = TooltipValue;

export default Tooltip;
