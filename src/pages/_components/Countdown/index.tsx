import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';

// ====== 类型定义 ======
type TimeUnit = 'Days' | 'Hours' | 'Minutes' | 'Seconds';

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
  unit: TimeUnit;
  total: number;
  value: number;
}

interface TimeUnitConfig {
  key: keyof TimeLeft;
  unit: TimeUnit;
  total: number;
}

// ====== 常量配置 ======
const COUNTDOWN_CONFIG = {
  EVENT: '2026 年',
  DATE: '2026-01-01T00:00:00',
  TEXT: 'Happy New Year!',
  TIMER_INTERVAL: 1000,
} as const;

const CIRCLE_CONFIG = {
  RADIUS: 74,
  SVG_SIZE: 160,
  SVG_CENTER: 80, // SVG_SIZE / 2
  STROKE_WIDTH: 8,
  DOT_SIZE: 15,
} as const;

const LAYOUT_CONFIG = {
  MAX_WIDTH: 'max-w-7xl',
  CONTAINER_SPACING: 'my-16 lg:my-24',
  CONTENT_SPACING: 'mb-12',
  GRID_GAP: 'gap-8',
  GRID_GAP_MD: 'gap-6',
  GRID_GAP_SM: 'gap-4',
  PADDING: 'px-5',
} as const;

const RESPONSIVE_CONFIG = {
  DESKTOP: 'flex gap-8 justify-center w-fit mx-auto',
  TABLET: 'max-md:grid max-md:grid-cols-2 max-md:gap-6',
  MOBILE: 'max-[400px]:grid-cols-1 max-[400px]:gap-4',
} as const;

const TYPOGRAPHY_CONFIG = {
  MAIN_TITLE: 'font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4',
  SUBTITLE: 'text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto',
  SUCCESS_TITLE: 'font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4',
  SUCCESS_TEXT: 'text-2xl font-medium text-gray-700 dark:text-neutral-300',
  CIRCLE_VALUE: 'absolute text-center font-medium text-[2.5rem] select-none',
  CIRCLE_UNIT: 'absolute text-[0.5rem] font-light -translate-x-1/2 -translate-y-[10px] tracking-[0.1em] uppercase select-none',
} as const;

const TIME_UNITS: readonly TimeUnitConfig[] = [
  { key: 'days', unit: 'Days', total: 365 },
  { key: 'hours', unit: 'Hours', total: 24 },
  { key: 'minutes', unit: 'Minutes', total: 60 },
  { key: 'seconds', unit: 'Seconds', total: 60 },
] as const;

const DOT_BASE_STYLES: React.CSSProperties = {
  background: 'var(--ifm-color-primary)',
  boxShadow: '0 0 20px var(--ifm-color-primary), 0 0 60px var(--ifm-color-primary)',
  left: '50%',
  top: '50%',
  width: `${CIRCLE_CONFIG.DOT_SIZE}px`,
  height: `${CIRCLE_CONFIG.DOT_SIZE}px`,
} as const;

// ====== 工具常量 ======
const TIME_CONSTANTS = {
  MILLISECOND: 1,
  SECOND: 1000,
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
} as const;

const CSS_TRANSITIONS = {
  CIRCLE: 'transition-all duration-500 linear',
  DOT: 'transition-all duration-500 linear',
} as const;

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
    
    const elapsed = Date.now() - this.startTime;
    this.target += this.delay;
    const adjust = this.target - elapsed;
    const nextDelay = Math.max(0, this.delay + adjust);
    this.timeoutId = setTimeout(this.tick, nextDelay);
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
    days: Math.floor(distance / TIME_CONSTANTS.DAY),
    hours: Math.floor((distance / TIME_CONSTANTS.HOUR) % 24),
    minutes: Math.floor((distance / TIME_CONSTANTS.MINUTE) % 60),
    seconds: Math.floor((distance / TIME_CONSTANTS.SECOND) % 60),
  };
}

function getTimeLeft(): TimeResult {
  try {
    const endDate = new Date(COUNTDOWN_CONFIG.DATE);
    const nowDate = new Date();
    
    // 验证日期有效性
    if (isNaN(endDate.getTime()) || isNaN(nowDate.getTime())) {
      throw new Error('Invalid date format');
    }
    
    const distance = endDate.getTime() - nowDate.getTime();
    
    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
    }

    const timeUnits = calculateTimeUnits(distance);
    return { ...timeUnits, isTimeUp: false };
  } catch (error) {
    console.error('Date calculation error:', error);
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
  }
}

// ====== 组件 ======
function ProgressCircle({ unit, total, value }: ProgressCircleProps) {
  const circleMetrics = useMemo(() => {
    const circumference = 2 * Math.PI * CIRCLE_CONFIG.RADIUS;
    const progress = Math.min(Math.max((value / total) * 100, 0), 100); // 限制在0-100%
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    return { circumference, strokeDashoffset };
  }, [value, total]);

  const rotationAngle = useMemo(() => 
    Math.min(Math.max(360 * value / total, 0), 360), // 限制在0-360度
    [value, total]
  );

  const indicatorDotStyle: React.CSSProperties = useMemo(() => ({
    ...DOT_BASE_STYLES,
    transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translateY(-${CIRCLE_CONFIG.RADIUS}px)`,
  }), [rotationAngle]);

  const progressCircleStyle: React.CSSProperties = useMemo(() => ({
    strokeDasharray: circleMetrics.circumference,
    strokeDashoffset: circleMetrics.strokeDashoffset,
  }), [circleMetrics]);

  return (
    <div className="group relative" role="timer" aria-live="polite" aria-label={`${value} ${unit}`}>
      <div className="relative w-40 h-40 flex justify-center items-center">
        <svg 
          className="absolute w-40 h-40 transform -rotate-90" 
          viewBox={`0 0 ${CIRCLE_CONFIG.SVG_SIZE} ${CIRCLE_CONFIG.SVG_SIZE}`}
        >
          <circle 
            cx={CIRCLE_CONFIG.SVG_CENTER}
            cy={CIRCLE_CONFIG.SVG_CENTER}
            r={CIRCLE_CONFIG.RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={CIRCLE_CONFIG.STROKE_WIDTH}
            className="text-gray-100 dark:text-neutral-800"
          />
          <circle 
            cx={CIRCLE_CONFIG.SVG_CENTER}
            cy={CIRCLE_CONFIG.SVG_CENTER}
            r={CIRCLE_CONFIG.RADIUS}
            fill="none"
            stroke="var(--ifm-color-primary)"
            strokeWidth={CIRCLE_CONFIG.STROKE_WIDTH}
            strokeLinecap="round"
            style={progressCircleStyle}
            className={CSS_TRANSITIONS.CIRCLE}
          />
        </svg>
        
        <div 
          className={`absolute rounded-full shadow-lg ${CSS_TRANSITIONS.DOT}`}
          style={indicatorDotStyle}
        />

        <div className={TYPOGRAPHY_CONFIG.CIRCLE_VALUE} aria-hidden="true">
          {value}
          <br />
          <span className={TYPOGRAPHY_CONFIG.CIRCLE_UNIT}>
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}

const Section = React.memo(function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className={`mx-auto flex flex-col w-full ${LAYOUT_CONFIG.MAX_WIDTH}`}>
      <div className={`flex-col gap-2 flex grow w-full ${LAYOUT_CONFIG.CONTAINER_SPACING} mx-auto items-center`}>
        {children}
      </div>
    </div>
  );
});

const CountdownContent = React.memo(function CountdownContent({ timeLeft }: { timeLeft: TimeLeft }) {
  const responsiveClasses = `${RESPONSIVE_CONFIG.DESKTOP} ${RESPONSIVE_CONFIG.TABLET} ${RESPONSIVE_CONFIG.MOBILE}`;
  
  return (
    <>
      <div className={`text-center ${LAYOUT_CONFIG.CONTENT_SPACING}`}>
        <h2 className={TYPOGRAPHY_CONFIG.MAIN_TITLE}>
          距离 {COUNTDOWN_CONFIG.EVENT} 还有
        </h2>
        <p className={TYPOGRAPHY_CONFIG.SUBTITLE}>
          时间如流水，每一秒都值得珍惜。让我们一起迎接新的开始
        </p>
      </div>
      
      <div className={responsiveClasses}>
        {TIME_UNITS.map(({ key, unit, total }) => (
          <ProgressCircle 
            key={key}
            unit={unit}
            total={total}
            value={timeLeft[key]}
          />
        ))}
      </div>
    </>
  );
});

const TimeUpContent = React.memo(function TimeUpContent() {
  return (
    <div className="text-center">
      <h2 className={TYPOGRAPHY_CONFIG.SUCCESS_TITLE}>
        {COUNTDOWN_CONFIG.EVENT}
      </h2>
      <p className={TYPOGRAPHY_CONFIG.SUCCESS_TEXT}>
        {COUNTDOWN_CONFIG.TEXT}
      </p>
    </div>
  );
});

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const { days, hours, minutes, seconds } = getTimeLeft();
    return { days, hours, minutes, seconds };
  });
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerRef = useRef<AccurateTimer | null>(null);

  const calculateTimeLeft = useCallback(() => {
    const result = getTimeLeft();
    
    if (result.isTimeUp) {
      setIsTimeUp(true);
      timerRef.current?.stop();
      return;
    }

    setTimeLeft({ 
      days: result.days, 
      hours: result.hours, 
      minutes: result.minutes, 
      seconds: result.seconds 
    });
  }, []);

  useEffect(() => {
    calculateTimeLeft();
    
    try {
      timerRef.current = new AccurateTimer(calculateTimeLeft, COUNTDOWN_CONFIG.TIMER_INTERVAL);
      timerRef.current.start();
    } catch (error) {
      console.error('Timer initialization error:', error);
    }

    return () => {
      timerRef.current?.stop();
      timerRef.current = null;
    };
  }, [calculateTimeLeft]);

  return (
    <Section>
      <div className={`${LAYOUT_CONFIG.MAX_WIDTH} mx-auto flex flex-col ${LAYOUT_CONFIG.PADDING}`} role="main" aria-label="距离2026年倒计时">
        {isTimeUp ? (
          <TimeUpContent />
        ) : (
          <CountdownContent timeLeft={timeLeft} />
        )}
      </div>
    </Section>
  );
}
