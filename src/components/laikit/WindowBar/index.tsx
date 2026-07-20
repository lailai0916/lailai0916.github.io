import { type ReactNode } from 'react';
import clsx from 'clsx';
import TrafficLights from '@site/src/components/laikit/TrafficLights';
import styles from './styles.module.css';

// The mac-style window title bar shared by every browser-window surface
// (BrowserWindow, the Problem / Playground tab panels, the CodeBlock
// header): a frosted 42px bar led by traffic-light dots. Callers pass a
// className for their own grid layout (columns / gap / padding) and the content
// that sits after the dots.
export default function WindowBar({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={clsx(styles.bar, className)}>
      <TrafficLights className={styles.dots} />
      {children}
    </div>
  );
}
