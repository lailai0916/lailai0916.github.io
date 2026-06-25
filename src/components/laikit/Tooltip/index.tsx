import { useLayoutEffect, useRef, useState, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  leftPct?: number;
}

function Tooltip({
  leftPct,
  className,
  style,
  children,
  ...rest
}: TooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  // The card is centred on leftPct, so near the edges half of it would spill
  // off-screen — with no clipping ancestor that widens the whole page on small
  // screens. Clamp the centre to the viewport (not the possibly-narrow plot):
  // the card may overflow the plot, it just must stay on screen. leftPx is in
  // the positioned ancestor's space, so convert the viewport bounds into it.
  const [leftPx, setLeftPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.offsetParent as HTMLElement | null;
    if (leftPct == null || !el || !parent) {
      setLeftPx(null);
      return;
    }
    const gutter = 8;
    const parentLeft = parent.getBoundingClientRect().left;
    const vw = document.documentElement.clientWidth;
    const half = el.offsetWidth / 2;
    const want = (leftPct / 100) * parent.clientWidth;
    const lo = gutter - parentLeft + half;
    const hi = vw - gutter - parentLeft - half;
    setLeftPx(lo > hi ? vw / 2 - parentLeft : Math.min(Math.max(want, lo), hi));
  });

  const finalStyle =
    leftPct != null
      ? { ...style, left: leftPx != null ? `${leftPx}px` : `${leftPct}%` }
      : style;
  return (
    <div
      ref={ref}
      {...rest}
      className={clsx(styles.tooltip, className)}
      style={finalStyle}
    >
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
