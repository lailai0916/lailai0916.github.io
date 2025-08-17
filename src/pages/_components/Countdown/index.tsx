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
  { id: 'home.countdown.description', message: 'Countdown to {event}' },
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

const SVG_RADIUS = 74;
const SVG_SIZE = 160;
const STROKE_WIDTH = 0.5;
const DOT_SIZE = 1;
const CIRCUMFERENCE = 2 * Math.PI * SVG_RADIUS; // 预计算常量

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isTimeUp: boolean;
}

interface ProgressCircleProps {
  total: number;
  value: number;
  unitText: string;
}

function calculateTimeLeft(): CountdownState {
  const distance = new Date(TARGET_DATE).getTime() - Date.now();

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
  }

  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    isTimeUp: false,
  };
}

function ProgressCircle({ total, value, unitText }: ProgressCircleProps) {
  const circleProps = useMemo(() => {
    const progress = Math.min(Math.max((value / total) * 100, 0), 100);
    const strokeDashoffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
    const rotationAngle = Math.min(Math.max((360 * value) / total, 0), 360);
    const svgCenter = SVG_SIZE / 2;

    return {
      strokeDashoffset,
      rotationAngle,
      svgCenter,
      indicatorDotStyle: {
        left: '50%',
        top: '50%',
        width: `${DOT_SIZE}rem`,
        height: `${DOT_SIZE}rem`,
        transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translateY(-${SVG_RADIUS}px)`,
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
            cx={circleProps.svgCenter}
            cy={circleProps.svgCenter}
            r={SVG_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={`${STROKE_WIDTH}rem`}
            className={styles.circleBackground}
          />
          <circle
            cx={circleProps.svgCenter}
            cy={circleProps.svgCenter}
            r={SVG_RADIUS}
            fill="none"
            stroke="var(--ifm-color-primary)"
            strokeWidth={`${STROKE_WIDTH}rem`}
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
    <>
      <SectionHeader title={TITLE} description={DESCRIPTION} />
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
    </>
  );
}

function TimeUpContent() {
  return (
    <div className={styles.timeUpContent}>
      <h2 className={styles.mainTitle}>{EVENT}</h2>
      <p className={styles.successText}>{FINAL}</p>
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
      <div className={styles.container} aria-label={`Countdown to ${EVENT}`}>
        {state.isTimeUp ? (
          <TimeUpContent />
        ) : (
          <CountdownContent timeLeft={state} />
        )}
      </div>
    </SectionContainer>
  );
}
