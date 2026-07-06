import { type CSSProperties, type ReactNode, type SyntheticEvent } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SliderProps {
  label?: ReactNode;
  valueLabel?: ReactNode;
  labelVariant?: 'default' | 'math';
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  onCommit?: (value: number) => void;
  className?: string;
  'aria-label'?: string;
}

export default function Slider({
  label,
  valueLabel,
  labelVariant = 'default',
  value,
  min,
  max,
  step = 1,
  onChange,
  onCommit,
  className,
  'aria-label': ariaLabel,
}: SliderProps) {
  const ratio = max === min ? 0 : (value - min) / (max - min);
  const resolvedAriaLabel =
    ariaLabel ?? (typeof label === 'string' ? label : undefined);

  const handleCommit = (e: SyntheticEvent<HTMLInputElement>) => {
    if (!onCommit) return;
    onCommit(parseFloat((e.target as HTMLInputElement).value));
  };

  return (
    <div className={clsx(styles.slider, className)}>
      {(label || valueLabel) && (
        <div
          className={clsx(
            styles.head,
            labelVariant === 'math' && styles.headMath
          )}
        >
          {label && (
            <span
              className={clsx(
                styles.label,
                labelVariant === 'math' && styles.labelMath
              )}
            >
              {label}
            </span>
          )}
          {valueLabel && <span className={styles.value}>{valueLabel}</span>}
        </div>
      )}
      <div
        className={styles.control}
        style={{ '--slider-ratio': ratio } as CSSProperties}
      >
        <div className={styles.track} aria-hidden="true">
          <span className={styles.trackFill} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={resolvedAriaLabel}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          onPointerUp={handleCommit}
          onKeyUp={handleCommit}
          className={styles.input}
        />
      </div>
    </div>
  );
}
