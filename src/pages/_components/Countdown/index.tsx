import React, { useEffect, useState, useRef, useMemo } from 'react';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

// ====== 类型定义 ======
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ProgressCircleProps {
  total: number;
  value: number;
  unitText: string;
}

// ====== 常量配置 ======
const CONFIG = {
  DATE: '2026-01-01T00:00:00',
  EVENT: translate({ id: 'home.countdown.event', message: '2026' }),
  finalText: translate({
    id: 'home.countdown.final',
    message: 'Happy New Year!',
  }),

  // 圆形进度条配置
  RADIUS: 74,
  SVG_SIZE: 160,
  STROKE_WIDTH: 8,
  DOT_SIZE: 15,
} as const;

// ====== 国际化文本 ======
const COUNTDOWN_TEXTS = {
  title: translate({ id: 'home.countdown.title', message: 'Countdown' }),
  description: translate(
    { id: 'home.countdown.description', message: 'Countdown to {event}' },
    { event: CONFIG.EVENT }
  ),
  units: {
    days: translate({ id: 'home.countdown.unit.days', message: 'Days' }),
    hours: translate({ id: 'home.countdown.unit.hours', message: 'Hours' }),
    minutes: translate({
      id: 'home.countdown.unit.minutes',
      message: 'Minutes',
    }),
    seconds: translate({
      id: 'home.countdown.unit.seconds',
      message: 'Seconds',
    }),
  },
} as const;

const TIME_UNITS: readonly { key: keyof TimeLeft; total: number }[] = [
  { key: 'days', total: 365 },
  { key: 'hours', total: 24 },
  { key: 'minutes', total: 60 },
  { key: 'seconds', total: 60 },
] as const;

// ====== 工具函数 ======
function calculateTimeLeft(): TimeLeft & { isTimeUp: boolean } {
  const endDate = new Date(CONFIG.DATE);
  const nowDate = new Date();

  const distance = endDate.getTime() - nowDate.getTime();

  if (distance < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
    isTimeUp: false,
  };
}

// ====== 组件 ======
function ProgressCircle({ total, value, unitText }: ProgressCircleProps) {
  const circleProps = useMemo(() => {
    const circumference = 2 * Math.PI * CONFIG.RADIUS;
    const progress = Math.min(Math.max((value / total) * 100, 0), 100);
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    const rotationAngle = Math.min(Math.max((360 * value) / total, 0), 360);
    const svgCenter = CONFIG.SVG_SIZE / 2;

    return {
      strokeDashoffset,
      rotationAngle,
      svgCenter,
      indicatorDotStyle: {
        left: '50%',
        top: '50%',
        width: `${CONFIG.DOT_SIZE}px`,
        height: `${CONFIG.DOT_SIZE}px`,
        transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translateY(-${CONFIG.RADIUS}px)`,
      } as React.CSSProperties,
      progressStyle: {
        strokeDasharray: circumference,
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
          viewBox={`0 0 ${CONFIG.SVG_SIZE} ${CONFIG.SVG_SIZE}`}
        >
          <circle
            cx={circleProps.svgCenter}
            cy={circleProps.svgCenter}
            r={CONFIG.RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={CONFIG.STROKE_WIDTH}
            className={styles.circleBackground}
          />
          <circle
            cx={circleProps.svgCenter}
            cy={circleProps.svgCenter}
            r={CONFIG.RADIUS}
            fill="none"
            stroke="var(--ifm-color-primary)"
            strokeWidth={CONFIG.STROKE_WIDTH}
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

function CountdownContent({ timeLeft }: { timeLeft: TimeLeft }) {
  return (
    <>
      <SectionHeader
        title={COUNTDOWN_TEXTS.title}
        description={COUNTDOWN_TEXTS.description}
        align="center"
      />

      <div className={styles.countdownLayout}>
        {TIME_UNITS.map(({ key, total }) => (
          <ProgressCircle
            key={key}
            total={total}
            value={timeLeft[key]}
            unitText={COUNTDOWN_TEXTS.units[key]}
          />
        ))}
      </div>
    </>
  );
}

function TimeUpContent() {
  return (
    <div className={styles.timeUpContent}>
      <h2 className={styles.mainTitle}>{CONFIG.EVENT}</h2>
      <p className={styles.successText}>{CONFIG.finalText}</p>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const result = calculateTimeLeft();
    return {
      days: result.days,
      hours: result.hours,
      minutes: result.minutes,
      seconds: result.seconds,
    };
  });
  const [isTimeUp, setIsTimeUp] = useState(() => {
    const result = calculateTimeLeft();
    return result.isTimeUp;
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 精确定时器：确保每次更新都对齐到整秒（恢复顿挫感）
  function startPreciseTimer() {
    function tick() {
      const result = calculateTimeLeft();

      if (result.isTimeUp) {
        setIsTimeUp(true);
        return;
      }

      // 更新状态
      const { days, hours, minutes, seconds } = result;
      setTimeLeft({ days, hours, minutes, seconds });

      // 计算到下一个整秒的精确延迟
      const now = Date.now();
      const nextSecond = Math.ceil(now / 1000) * 1000;
      const delay = nextSecond - now;

      // 设置下一次更新，确保对齐到整秒
      timerRef.current = setTimeout(tick, delay);
    }

    tick();
  }

  useEffect(() => {
    // 初始化时间显示
    const result = calculateTimeLeft();
    if (result.isTimeUp) {
      setIsTimeUp(true);
      return;
    }

    // 设置初始状态
    const { days, hours, minutes, seconds } = result;
    setTimeLeft({ days, hours, minutes, seconds });

    // 启动精确定时器（恢复顿挫感）
    startPreciseTimer();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <SectionContainer>
      <div
        className={styles.container}
        aria-label={`Countdown to ${CONFIG.EVENT}`}
      >
        {isTimeUp ? (
          <TimeUpContent />
        ) : (
          <CountdownContent timeLeft={timeLeft} />
        )}
      </div>
    </SectionContainer>
  );
}
