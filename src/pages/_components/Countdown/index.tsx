import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import Section from '@site/src/components/laiKit/common/Section';
import SectionHeader from '@site/src/components/laiKit/common/SectionHeader';
import { COUNTDOWN_STYLES } from '@site/src/components/laiKit/common/constants';
import { translate } from '@docusaurus/Translate';

// ====== 类型定义 ======
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ProgressCircleProps {
  unitKey: keyof TimeLeft;
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
  TIMER_INTERVAL: 1000,
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

// ====== 工具类 ======
class AccurateTimer {
  private func: () => void;
  private delay: number;
  private started = false;
  private startTime = 0;
  private target = 0;
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
      // 静默处理定时器回调错误
    }

    const now = Date.now();
    const elapsed = now - this.startTime;
    this.target += this.delay;

    const drift = this.target - elapsed;
    const nextDelay = Math.max(0, this.delay + drift);

    if (Math.abs(drift) > this.delay / 2) {
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
}

// ====== 工具函数 ======
const calculateTimeLeft = (): TimeLeft & { isTimeUp: boolean } => {
  try {
    const endDate = new Date(CONFIG.DATE);
    const nowDate = new Date();

    // 验证日期有效性
    if (isNaN(endDate.getTime()) || isNaN(nowDate.getTime())) {
      // 静默处理无效日期格式
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
    }

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
  } catch (error) {
    // 静默处理日期计算错误
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true };
  }
};

// ====== 组件 ======
const ProgressCircle = React.memo<ProgressCircleProps>(
  ({ unitKey, total, value, unitText }) => {
    const circleProps = useMemo(() => {
      const circumference = 2 * Math.PI * CONFIG.RADIUS;
      const progress = Math.min(Math.max((value / total) * 100, 0), 100);
      const strokeDashoffset = circumference - (progress / 100) * circumference;
      const rotationAngle = Math.min(Math.max((360 * value) / total, 0), 360);
      const svgCenter = CONFIG.SVG_SIZE / 2;

      return {
        circumference,
        strokeDashoffset,
        rotationAngle,
        svgCenter,
        indicatorDotStyle: {
          background: 'var(--ifm-color-primary)',
          boxShadow:
            '0 0 20px var(--ifm-color-primary), 0 0 60px var(--ifm-color-primary)',
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
        className="group relative"
        role="timer"
        aria-live="polite"
        aria-label={`${value} ${unitText}`}
      >
        <div className="relative w-40 h-40 flex justify-center items-center">
          <svg
            className="absolute w-40 h-40 transform -rotate-90"
            viewBox={`0 0 ${CONFIG.SVG_SIZE} ${CONFIG.SVG_SIZE}`}
          >
            <circle
              cx={circleProps.svgCenter}
              cy={circleProps.svgCenter}
              r={CONFIG.RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={CONFIG.STROKE_WIDTH}
              className="text-gray-100 dark:text-neutral-800"
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
              className={COUNTDOWN_STYLES.CIRCLE_TRANSITION}
            />
          </svg>

          <div
            className={`absolute rounded-full shadow-lg ${COUNTDOWN_STYLES.DOT_TRANSITION}`}
            style={circleProps.indicatorDotStyle}
          />

          <div className={COUNTDOWN_STYLES.CIRCLE_VALUE} aria-hidden="true">
            {value}
            <br />
            <span className={COUNTDOWN_STYLES.CIRCLE_UNIT}>{unitText}</span>
          </div>
        </div>
      </div>
    );
  }
);

ProgressCircle.displayName = 'ProgressCircle';

const CountdownContent = React.memo<{ timeLeft: TimeLeft }>(({ timeLeft }) => (
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
          unitText={COUNTDOWN_TEXTS.units[key]}
        />
      ))}
    </div>
  </>
));

CountdownContent.displayName = 'CountdownContent';

const TimeUpContent = React.memo(() => (
  <div className="text-center">
    <h2 className={COUNTDOWN_STYLES.MAIN_TITLE}>{CONFIG.EVENT}</h2>
    <p className={COUNTDOWN_STYLES.SUCCESS_TEXT}>{CONFIG.finalText}</p>
  </div>
));

TimeUpContent.displayName = 'TimeUpContent';

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
  const timerRef = useRef<AccurateTimer | null>(null);

  const updateTime = useCallback(() => {
    try {
      const result = calculateTimeLeft();

      if (result.isTimeUp) {
        setIsTimeUp(true);
        timerRef.current?.stop();
        return;
      }

      const { days, hours, minutes, seconds } = result;
      setTimeLeft((prev) => {
        if (
          prev.days !== days ||
          prev.hours !== hours ||
          prev.minutes !== minutes ||
          prev.seconds !== seconds
        ) {
          return { days, hours, minutes, seconds };
        }
        return prev;
      });
    } catch (error) {
      // 静默处理更新时间错误
    }
  }, []);

  useEffect(() => {
    // 初始更新
    updateTime();

    // 检查初始状态，如果时间已到就不启动定时器
    const initialResult = calculateTimeLeft();
    if (initialResult.isTimeUp) {
      return;
    }

    try {
      timerRef.current = new AccurateTimer(updateTime, CONFIG.TIMER_INTERVAL);
      timerRef.current.start();
    } catch (error) {
      // 静默处理定时器初始化错误
    }

    return () => {
      if (timerRef.current) {
        timerRef.current.stop();
        timerRef.current = null;
      }
    };
  }, [updateTime]);

  return (
    <Section>
      <div
        className="max-w-7xl mx-auto flex flex-col px-5"
        role="main"
        aria-label={`Countdown to ${CONFIG.EVENT}`}
      >
        {isTimeUp ? (
          <TimeUpContent />
        ) : (
          <CountdownContent timeLeft={timeLeft} />
        )}
      </div>
    </Section>
  );
}
