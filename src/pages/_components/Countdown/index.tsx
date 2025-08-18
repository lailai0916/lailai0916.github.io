import React, { useEffect, useState, useRef, useMemo } from 'react';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TARGET_DATE = '2026-01-01T00:00:00';
const EVENT = translate({ id: 'home.countdown.event', message: '2026' });
const FINAL = translate({
  id: 'home.countdown.final',
  message: 'Happy New Year!',
});
const TITLE = translate({ id: 'home.countdown.title', message: 'Countdown' });
const DESCRIPTION = translate(
  { id: 'home.countdown.description', message: 'Time left until {event}' },
  { event: EVENT }
);

const TIME_UNITS = [
  {
    key: 'days',
    total: 366,
    label: translate({ id: 'home.countdown.unit.days', message: 'Days' }),
  },
  {
    key: 'hours',
    total: 24,
    label: translate({ id: 'home.countdown.unit.hours', message: 'Hours' }),
  },
  {
    key: 'minutes',
    total: 60,
    label: translate({ id: 'home.countdown.unit.minutes', message: 'Minutes' }),
  },
  {
    key: 'seconds',
    total: 60,
    label: translate({ id: 'home.countdown.unit.seconds', message: 'Seconds' }),
  },
];

const SVG_CONFIG = {
  size: 160,
  radius: 72,
  strokeWidth: 8,
  dotSize: 16,
  get center() {
    return this.size / 2;
  },
  get circumference() {
    return 2 * Math.PI * this.radius;
  },
} as const;

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTimeUp: boolean;
}

function calculateTimeLeft(): CountdownState {
  const distance = new Date(TARGET_DATE).getTime() - Date.now();

  return {
    days: Math.floor(distance / (24 * 60 * 60 * 1000)),
    hours: Math.floor((distance / (60 * 60 * 1000)) % 24),
    minutes: Math.floor((distance / (60 * 1000)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    isTimeUp: distance <= 0,
  };
}

interface ProgressCircleProps {
  total: number;
  value: number;
  unitText: string;
}

function ProgressCircle({ total, value, unitText }: ProgressCircleProps) {
  const circleProps = useMemo(() => {
    const progress = value / total;
    const dash = progress * SVG_CONFIG.circumference;
    const angleRad = progress * 2 * Math.PI;
    const dotX = SVG_CONFIG.center + SVG_CONFIG.radius * Math.cos(angleRad);
    const dotY = SVG_CONFIG.center + SVG_CONFIG.radius * Math.sin(angleRad);

    return { dash, dotX, dotY } as const;
  }, [value, total]);

  return (
    <div className={styles.circleWrapper}>
      <svg
        className={styles.circleSvg}
        viewBox={`0 0 ${SVG_CONFIG.size} ${SVG_CONFIG.size}`}
      >
        <circle
          cx={SVG_CONFIG.center}
          cy={SVG_CONFIG.center}
          r={SVG_CONFIG.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={SVG_CONFIG.strokeWidth}
          className={styles.circleBackground}
        />
        <circle
          cx={SVG_CONFIG.center}
          cy={SVG_CONFIG.center}
          r={SVG_CONFIG.radius}
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth={SVG_CONFIG.strokeWidth}
          strokeLinecap="round"
          pathLength={SVG_CONFIG.circumference}
          strokeDasharray={`${circleProps.dash} ${SVG_CONFIG.circumference - circleProps.dash}`}
          strokeDashoffset={0}
          className={styles.circleTransition}
        />
        <circle
          cx={circleProps.dotX}
          cy={circleProps.dotY}
          r={SVG_CONFIG.dotSize / 2}
          fill="var(--ifm-color-primary)"
          className={styles.circleTransition}
        />
      </svg>
      <div className={styles.circleValue}>
        <span>{value}</span>
        <span className={styles.circleUnit}>{unitText}</span>
      </div>
    </div>
  );
}

function CircleBadge() {
  return (
    <div className={styles.pxcontainer}>
      <svg
        className={styles.pxring}
        viewBox="0 0 160 160"
      >
        <circle
          cx="80"
          cy="80"
          r="72"
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth="8"
        />
      </svg>
      <div className={styles.pxanchor}>
        <div className={styles.pxtitle}>XXX</div>
        <div className={styles.pxsub}>YYY</div>
      </div>
    </div>
  );
}

function CountdownContent({ timeLeft }: { timeLeft: CountdownState }) {
  return (
    <div className={styles.countdownLayout}>
      {TIME_UNITS.map(({ key, total, label }) => (
        <ProgressCircle total={total} value={timeLeft[key]} unitText={label} />
      ))}
      {/* <CircleBadge /> */}
    </div>
  );
}

export default function Countdown() {
  const [state, setState] = useState(calculateTimeLeft);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const tick = () => {
    const result = calculateTimeLeft();
    setState(result);

    if (result.isTimeUp) {
      return;
    }

    const now = Date.now();
    const nextSecond = Math.ceil(now / 1000) * 1000;
    const delay = nextSecond - now;

    timerRef.current = setTimeout(tick, delay);
  };

  useEffect(() => {
    if (state.isTimeUp) return;

    tick();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <SectionContainer>
      <SectionHeader
        title={state.isTimeUp ? EVENT : TITLE}
        description={state.isTimeUp ? FINAL : DESCRIPTION}
      />
      {!state.isTimeUp && <CountdownContent timeLeft={state} />}
    </SectionContainer>
  );
}
