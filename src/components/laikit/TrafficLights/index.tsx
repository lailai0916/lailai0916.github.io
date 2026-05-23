import clsx from 'clsx';
import styles from './styles.module.css';

interface TrafficLightsProps {
  className?: string;
}

/**
 * macOS-style red/yellow/green window control dots.
 * Used by BrowserWindow, Problem, and the CodeBlock title bar.
 */
export default function TrafficLights({ className }: TrafficLightsProps) {
  return (
    <div className={clsx(styles.lights, className)} aria-hidden="true">
      <span className={clsx(styles.dot, styles.red)} />
      <span className={clsx(styles.dot, styles.yellow)} />
      <span className={clsx(styles.dot, styles.green)} />
    </div>
  );
}
