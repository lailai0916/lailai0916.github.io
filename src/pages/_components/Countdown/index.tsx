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
    key: 'days' as const,
    total: 366,
    label: translate({ id: 'home.countdown.unit.days', message: 'Days' }),
  },
  {
    key: 'hours' as const,
    total: 24,
    label: translate({ id: 'home.countdown.unit.hours', message: 'Hours' }),
  },
  {
    key: 'minutes' as const,
    total: 60,
    label: translate({ id: 'home.countdown.unit.minutes', message: 'Minutes' }),
  },
  {
    key: 'seconds' as const,
    total: 60,
    label: translate({ id: 'home.countdown.unit.seconds', message: 'Seconds' }),
  },
];

const SVG_SIZE = 10;
const SVG_RADIUS = 4.5;
const STROKE_WIDTH = 0.5;
const DOT_SIZE = 1;
const SVG_CENTER = SVG_SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * SVG_RADIUS;

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
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
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
    const progress = (100 * value) / total;
    const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
    const rotationAngle = (360 * value) / total;

    return {
      strokeDashoffset,
      rotationAngle,
      indicatorDotStyle: {
        left: '50%',
        top: '50%',
        width: `${DOT_SIZE}rem`,
        height: `${DOT_SIZE}rem`,
        transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translateY(-${SVG_RADIUS}rem)`,
      } as React.CSSProperties,
      progressStyle: {
        strokeDasharray: CIRCUMFERENCE,
        strokeDashoffset,
      } as React.CSSProperties,
    };
  }, [value, total]);

  return (
    <div
      className={styles.progressCircleContainer}
      role="timer"
      aria-live="polite"
      aria-label={`${value} ${unitText}`}
    >
      <div className={styles.circleWrapper}>
        <svg
          className={styles.circleSvg}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        >
          <circle
            cx={SVG_CENTER}
            cy={SVG_CENTER}
            r={SVG_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            className={styles.circleBackground}
          />
          <circle
            cx={SVG_CENTER}
            cy={SVG_CENTER}
            r={SVG_RADIUS}
            fill="none"
            stroke="var(--ifm-color-primary)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            style={circleProps.progressStyle}
            className={styles.circleTransition}
          />
        </svg>

        <div
          className={`${styles.indicatorDot} ${styles.dotTransition}`}
          style={circleProps.indicatorDotStyle}
        />

        <div className={styles.circleValue} aria-hidden="true">
          {value}
          <br />
          <span className={styles.circleUnit}>{unitText}</span>
        </div>
      </div>
    </div>
  );
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

  function tick() {
    const result = calculateTimeLeft();
    setState(result);

    if (result.isTimeUp) {
      return;
    }

    const now = Date.now();
    const nextSecond = Math.ceil(now / 1000) * 1000;
    const delay = nextSecond - now;

    timerRef.current = setTimeout(tick, delay);
  }

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
