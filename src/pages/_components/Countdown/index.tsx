import React, { useEffect, useState, useRef } from 'react';

const EVENT = '2026 年';
const DATE = '2026-01-01T00:00:00';
const TEXT = 'Happy New Year!';

class AccurateTimer {
  private func: () => void;
  private delay: number;
  private started: boolean = false;
  private startTime: number = 0;
  private target: number = 0;
  private timeoutId: NodeJS.Timeout | null = null;

  constructor(func: () => void, delay: number) {
    this.func = func;
    this.delay = delay;
  }

  start() {
    if (this.started) return;
    this.started = true;
    this.startTime = Date.now();
    this.target = this.delay;
    this.tick();
  }

  private tick = () => {
    if (!this.started) return;
    this.func();
    const elapsed = Date.now() - this.startTime;
    this.target += this.delay;
    const adjust = this.target - elapsed;
    const nextDelay = Math.max(0, this.delay + adjust);
    this.timeoutId = setTimeout(this.tick, nextDelay);
  }

  stop() {
    this.started = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  isRunning() {
    return this.started;
  }
}

interface ProgressCircleProps {
  unit: string;
  total: number;
  value: number;
}

function ProgressCircle({ unit, total, value }: ProgressCircleProps) {
  const progress = (value / total) * 100;
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const rotationAngle = 360 * value / total;

  const SVG_SIZE = 160;
  const SVG_CENTER = SVG_SIZE / 2;
  const STROKE_WIDTH = 8;

  const indicatorDotStyle: React.CSSProperties = {
    background: 'var(--ifm-color-primary)',
    boxShadow: '0 0 20px var(--ifm-color-primary), 0 0 60px var(--ifm-color-primary)',
    left: '50%',
    top: '50%',
    transform: `translate(-50%, -50%) rotate(${rotationAngle}deg) translateY(-${radius}px)`
  };

  const progressCircleStyle: React.CSSProperties = {
    strokeDasharray: circumference,
    strokeDashoffset: strokeDashoffset,
    filter: 'drop-shadow(0 0 8px var(--ifm-color-primary-light))'
  };

  return (
    <div className="group relative" role="timer" aria-live="polite" aria-label={`${value} ${unit}`}>
      <div className="relative w-40 h-40 flex justify-center items-center">
        <svg 
          className="absolute w-40 h-40 transform -rotate-90" 
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        >
          <circle 
            cx={SVG_CENTER}
            cy={SVG_CENTER}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
            className="text-gray-100 dark:text-neutral-800"
          />
          <circle 
            cx={SVG_CENTER}
            cy={SVG_CENTER}
            r={radius}
            fill="none"
            stroke="var(--ifm-color-primary)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            style={progressCircleStyle}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        
        <div 
          className="absolute w-[15px] h-[15px] rounded-full shadow-lg transition-all duration-500 ease-out"
          style={indicatorDotStyle}
        />

        <div className="absolute text-center font-medium text-[2.5rem] select-none" aria-hidden="true">
          {value}
          <br />
          <span className="absolute text-[0.5rem] font-light -translate-x-1/2 -translate-y-[10px] tracking-[0.1em] uppercase select-none">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex flex-col w-full max-w-7xl">
      <div className="flex-col gap-2 flex grow w-full my-16 lg:my-24 mx-auto items-center">
        {children}
      </div>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);
  const timerRef = useRef<AccurateTimer | null>(null);

  const calculateTimeLeft = () => {
    try {
      const endDate = new Date(DATE).getTime();
      const nowDate = new Date().getTime();
      const distance = endDate - nowDate;
      
      if (distance < 0) {
        setIsTimeUp(true);
        if (timerRef.current) {
          timerRef.current.stop();
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(distance / (1000 * 60 * 60) % 24);
      const minutes = Math.floor(distance / (1000 * 60) % 60);
      const seconds = Math.floor(distance / 1000 % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    } catch (error) {
      console.error('Date calculation error:', error);
      setIsTimeUp(true);
      if (timerRef.current) {
        timerRef.current.stop();
      }
    }
  };

  useEffect(() => {
    calculateTimeLeft();
    timerRef.current = new AccurateTimer(calculateTimeLeft, 1000);
    timerRef.current.start();

    return () => {
      if (timerRef.current) {
        timerRef.current.stop();
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5" role="main" aria-label="距离2026年倒计时">
        {isTimeUp ? (
          <div className="text-center">
            <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
              {EVENT}
            </h2>
            <p className="text-2xl font-medium text-gray-700 dark:text-neutral-300">
              {TEXT}
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="font-bold text-4xl text-gray-900 dark:text-neutral-100 leading-tight mb-4">
                距离 {EVENT} 还有
              </h2>
              <p className="text-lg lg:text-xl text-gray-700 dark:text-neutral-300 leading-relaxed max-w-3xl mx-auto">
                时间如流水，每一秒都值得珍惜。让我们一起迎接新的开始
              </p>
            </div>
            
            <div className="flex gap-8 justify-center w-fit mx-auto max-md:grid max-md:grid-cols-2 max-md:gap-6 max-[400px]:grid-cols-1 max-[400px]:gap-4">
              <ProgressCircle 
                unit="Days"
                total={365}
                value={timeLeft.days}
              />
              <ProgressCircle 
                unit="Hours"
                total={24}
                value={timeLeft.hours}
              />
              <ProgressCircle 
                unit="Minutes"
                total={60}
                value={timeLeft.minutes}
              />
              <ProgressCircle 
                unit="Seconds"
                total={60}
                value={timeLeft.seconds}
              />
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
