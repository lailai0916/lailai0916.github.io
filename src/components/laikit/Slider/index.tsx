import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export interface SliderTick {
  value: number;
  label: ReactNode;
}

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  ticks?: SliderTick[];
  onChange: (value: number) => void;
  onCommit?: (value: number) => void;
  className?: string;
  'aria-label'?: string;
}

export default function Slider({
  value,
  min,
  max,
  step = 1,
  ticks,
  onChange,
  onCommit,
  className,
  'aria-label': ariaLabel,
}: SliderProps) {
  const progress = ((value - min) / (max - min)) * 100;

  const handleCommit = (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (!onCommit) return;
    onCommit(parseFloat((e.target as HTMLInputElement).value));
  };

  return (
    <div className={clsx(styles.slider, className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        onPointerUp={handleCommit}
        onKeyUp={handleCommit}
        className={styles.input}
        style={{ '--slider-progress': `${progress}%` } as React.CSSProperties}
      />
      {ticks && ticks.length > 0 && (
        <div className={styles.ticks}>
          {ticks.map((tick) => {
            const ratio = (tick.value - min) / (max - min);
            return (
              <span
                key={tick.value}
                className={styles.tick}
                style={
                  {
                    '--slider-tick-ratio': ratio,
                  } as React.CSSProperties
                }
              >
                {tick.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
