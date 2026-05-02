import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  leftPct?: number;
}

function Tooltip({
  leftPct,
  className,
  style,
  children,
  ...rest
}: TooltipProps) {
  const finalStyle =
    leftPct != null ? { ...style, left: `${leftPct}%` } : style;
  return (
    <div
      {...rest}
      className={clsx(styles.tooltip, className)}
      style={finalStyle}
    >
      {children}
    </div>
  );
}

function TooltipLabel({
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...rest} className={clsx(styles.label, className)} />;
}

function TooltipValue({
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return <span {...rest} className={clsx(styles.value, className)} />;
}

Tooltip.Label = TooltipLabel;
Tooltip.Value = TooltipValue;

export default Tooltip;
