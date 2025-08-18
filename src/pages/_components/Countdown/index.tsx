import React, { useEffect, useState, useRef } from 'react';
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
} as const;

function ProgressCircle({
  total,
  value,
  unitText,
}: {
  total: number;
  value: number;
  unitText: string;
}) {
  const progress = value / total;
  const angleRad = progress * 2 * Math.PI;
  const dotX = SVG_CONFIG.radius * Math.cos(angleRad);
  const dotY = SVG_CONFIG.radius * Math.sin(angleRad);

  return (
    <div className={styles.pxcontainer}>
      <svg
        className={styles.circleSvg}
        viewBox={`0 0 ${SVG_CONFIG.size} ${SVG_CONFIG.size}`}
      >
        <circle
          cx={SVG_CONFIG.size / 2}
          cy={SVG_CONFIG.size / 2}
          r={SVG_CONFIG.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={SVG_CONFIG.strokeWidth}
          className={styles.circleBackground}
        />
        <circle
          cx={SVG_CONFIG.size / 2}
          cy={SVG_CONFIG.size / 2}
          r={SVG_CONFIG.radius}
          fill="none"
          stroke="var(--ifm-color-primary)"
          strokeWidth={SVG_CONFIG.strokeWidth}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={`${progress} ${1 - progress}`}
          strokeDashoffset={0}
        />
        <circle
          cx={SVG_CONFIG.size / 2 + dotX}
          cy={SVG_CONFIG.size / 2 + dotY}
          r={SVG_CONFIG.dotSize / 2}
          fill="var(--ifm-color-primary)"
        />
      </svg>
      <div className={styles.pxanchor}>
        <div className={styles.pxtitle}>{value}</div>
        <div className={styles.pxsub}>{unitText}</div>
      </div>
    </div>
  );
}

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

function CountdownContent({ timeLeft }: { timeLeft: CountdownState }) {
  return (
    <div className={styles.countdownLayout}>
      {TIME_UNITS.map(({ key, total, label }) => (
        <ProgressCircle
          key={key}
          total={total}
          value={timeLeft[key]}
          unitText={label}
        />
      ))}
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
