import React, { useEffect, useState, useRef } from 'react';
import Section from '../common/Section';
import SectionHeader from '../common/SectionHeader';
import { COUNTDOWN_STYLES } from '../common/constants';
import { translate } from '@docusaurus/Translate';

// ====== 类型定义 ======
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeResult extends TimeLeft {
  isTimeUp: boolean;
}

interface ProgressCircleProps {
  unitKey: keyof TimeLeft;
  total: number;
  value: number;
}

interface TimeUnitConfig {
  key: keyof TimeLeft;
  total: number;
}

// ====== 常量配置 ======
const CONFIG = {
  EVENT: '2026',
  DATE: '2026-01-01T00:00:00',
  TIMER_INTERVAL: 1000,
  // 圆形进度条配置
  RADIUS: 74,
  SVG_SIZE: 160,
  STROKE_WIDTH: 8,
  DOT_SIZE: 15,
} as const;

// ====== 国际化文本 ======
const COUNTDOWN_TEXTS = {
  title: translate({
    id: 'countdown.title',
    message: 'Countdown',
  }),
  description: translate({
    id: 'countdown.description',
    message: 'Time remaining until {event}',
  }, {
    event: CONFIG.EVENT
  }),
  finalText: translate({
    id: 'countdown.finalText',
    message: 'Happy New Year!',
  }),
  units: {
    days: translate({
      id: 'countdown.unit.days',
      message: 'Days',
    }),
    hours: translate({
      id: 'countdown.unit.hours',
      message: 'Hours',
    }),
    minutes: translate({
      id: 'countdown.unit.minutes',
      message: 'Minutes',
    }),
    seconds: translate({
      id: 'countdown.unit.seconds',
      message: 'Seconds',
    }),
  }
} as const;

const TIME_UNITS: readonly TimeUnitConfig[] = [
  { key: 'days', total: 365 },
  { key: 'hours', total: 24 },
  { key: 'minutes', total: 60 },
  { key: 'seconds', total: 60 },
] as const;

// ====== 工具类 ======
class AccurateTimer {
  private func: () => void;
  private delay: number;
  private started: boolean = false;
  private startTime: number = 0;
  private target: number = 0;
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(func: () => void, delay: number) {
    if (typeof func !== 'function') {
      throw new Error('Timer function must be a function');
    }
    if (delay <= 0) {
      throw new Error('Timer delay must be positive');
    }
    this.func = func;
    this.delay = delay;
  }

  start(): void {
    if (this.started) return;
    this.started = true;
    this.startTime = Date.now();
    this.target = this.delay;
    this.tick();
  }

  private tick = (): void => {
    if (!this.started) return;
    
    try {
      this.func();
    } catch (error) {
      console.error('Timer callback error:', error);
    }
    
    // 精确时间校正算法：基于实际时间而非累积延迟
    const now = Date.now();
    const elapsed = now - this.startTime;
    this.target += this.delay;
    
    // 计算到下一个目标时间点的精确延迟
    const drift = this.target - elapsed;
    const nextDelay = Math.max(0, this.delay + drift);
    
    // 如果误差过大（超过半个周期），重新同步
    if (Math.abs(drift) > this.delay / 2) {
      console.warn(`Timer drift detected: ${drift}ms, resyncing...`);
      this.target = now + this.delay;
      this.timeoutId = setTimeout(this.tick, this.delay);
    } else {
      this.timeoutId = setTimeout(this.tick, nextDelay);
    }
  };

  stop(): void {
    this.started = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  isRunning(): boolean {
    return this.started;
  }
}

// ====== 工具函数 ======
function calculateTimeUnits(distance: number): TimeLeft {
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function getTimeLeft(): TimeResult {
  try {
    const endDate = new Date(CONFIG.DATE);
    const nowDate = new Date();
    
    // 验证日期有效性
    if (isNaN(endDate.getTime()) || isNaN(nowDate.getTime())) {
      throw new Error('Invalid date format');
    }
    
    const distance = endDate.getTime() - nowDate.getTime();
    
    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
    }

    // 关键优化：每次都基于当前实际时间重新计算，而不依赖Timer精度
    // 这确保了即使Timer有轻微延迟，显示的时间仍然是准确的
    const timeUnits = calculateTimeUnits(distance);
    return { ...timeUnits, isTimeUp: false };
  } catch (error) {
    console.error('Date calculation error:', error);
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
  }
}

// ====== 组件 ======
function ProgressCircle({ unitKey, total, value }: ProgressCircleProps) {
  const circumference = 2 * Math.PI * CONFIG.RADIUS;
  const progress = Math.min(Math.max((value / total) * 100, 0), 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const rotationAngle = Math.min(Math.max(360 * value / total, 0), 360);

  // 直接获取国际化的单位文本
  const unitText = COUNTDOWN_TEXTS.units[unitKey];

  const indicatorDotStyle: React.CSSProperties = {
    background: 'var(--ifm-color-primary)',
    boxShadow: '0 0 20px var(--ifm-color-primary), 0 0 60px var(--ifm-color-primary)',
    left: '50%',
    top: '50%',
    width: `${CONFIG.DOT_SIZE}px`,
    height: `${CONFIG.DOT_SIZE}px`,
    transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translateY(-${CONFIG.RADIUS}px)`,
  };

  const progressCircleStyle: React.CSSProperties = {
    strokeDasharray: circumference,
    strokeDashoffset: strokeDashoffset,
  };

  const svgCenter = CONFIG.SVG_SIZE / 2;

  return (
    <div className="group relative" role="timer" aria-live="polite" aria-label={`${value} ${unitText}`}>
      <div className="relative w-40 h-40 flex justify-center items-center">
        <svg 
          className="absolute w-40 h-40 transform -rotate-90" 
          viewBox={`0 0 ${CONFIG.SVG_SIZE} ${CONFIG.SVG_SIZE}`}
        >
          <circle 
            cx={svgCenter}
            cy={svgCenter}
            r={CONFIG.RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={CONFIG.STROKE_WIDTH}
            className="text-gray-100 dark:text-neutral-800"
          />
          <circle 
            cx={svgCenter}
            cy={svgCenter}
            r={CONFIG.RADIUS}
            fill="none"
            stroke="var(--ifm-color-primary)"
            strokeWidth={CONFIG.STROKE_WIDTH}
            strokeLinecap="round"
            style={progressCircleStyle}
            className={COUNTDOWN_STYLES.CIRCLE_TRANSITION}
          />
        </svg>
        
                <div
          className={`absolute rounded-full shadow-lg ${COUNTDOWN_STYLES.DOT_TRANSITION}`}
          style={indicatorDotStyle}
        />

        <div className={COUNTDOWN_STYLES.CIRCLE_VALUE} aria-hidden="true">
          {value}
          <br />
          <span className={COUNTDOWN_STYLES.CIRCLE_UNIT}>
            {unitText}
          </span>
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
      
      <div className="flex gap-8 justify-center w-fit mx-auto max-md:grid max-md:grid-cols-2 max-md:gap-6 max-[400px]:grid-cols-1 max-[400px]:gap-4">
        {TIME_UNITS.map(({ key, total }) => (
          <ProgressCircle 
            key={key}
            unitKey={key}
            total={total}
            value={timeLeft[key]}
          />
        ))}
      </div>
    </>
  );
}

function TimeUpContent() {
  return (
    <div className="text-center">
      <h2 className={COUNTDOWN_STYLES.MAIN_TITLE}>
        {CONFIG.EVENT}
      </h2>
      <p className={COUNTDOWN_STYLES.SUCCESS_TEXT}>
        {COUNTDOWN_TEXTS.finalText}
      </p>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const { days, hours, minutes, seconds } = getTimeLeft();
    return { days, hours, minutes, seconds };
  });
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerRef = useRef<AccurateTimer | null>(null);

  const calculateTimeLeft = () => {
    const result = getTimeLeft();
    
    if (result.isTimeUp) {
      setIsTimeUp(true);
      timerRef.current?.stop();
      return;
    }

    // 优化：只有当时间真正发生变化时才更新状态
    const { days, hours, minutes, seconds } = result;
    setTimeLeft(prevTime => {
      if (prevTime.days !== days || 
          prevTime.hours !== hours || 
          prevTime.minutes !== minutes || 
          prevTime.seconds !== seconds) {
        return { days, hours, minutes, seconds };
      }
      return prevTime; // 返回相同的引用，避免重新渲染
    });
  };

  useEffect(() => {
    calculateTimeLeft();
    
    try {
      timerRef.current = new AccurateTimer(calculateTimeLeft, CONFIG.TIMER_INTERVAL);
      timerRef.current.start();
    } catch (error) {
      console.error('Timer initialization error:', error);
    }

    return () => {
      timerRef.current?.stop();
      timerRef.current = null;
    };
  }, []);

  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5" role="main" aria-label={`Countdown to ${CONFIG.EVENT}`}>
        {isTimeUp ? (
          <TimeUpContent />
        ) : (
          <CountdownContent timeLeft={timeLeft} />
        )}
      </div>
    </Section>
  );
}
