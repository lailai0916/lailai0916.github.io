import { useEffect, useState } from 'react';
import Heading from '@theme/Heading';
import globalStyles from '../../styles.module.css';

const EVENT = '2026 年';
const DATE = '2026-01-01T00:00:00';
const TEXT = 'Happy New Year!';

function ProgressCircle({ unit, total, value }) {
  return (
    <div className="relative w-[150px] h-[150px] flex justify-center items-center">
      <svg className="relative w-[150px] h-[150px] rotate-[270deg]">
        <circle 
          cx="70" 
          cy="70" 
          r="70" 
          className="w-full h-full fill-transparent stroke-[8] stroke-gray-200 dark:stroke-gray-800 stroke-[round] translate-x-[5px] translate-y-[5px]"
        />
        <circle 
          cx="70" 
          cy="70" 
          r="70" 
          className="w-full h-full fill-transparent stroke-[8] stroke-[var(--ifm-color-primary)] stroke-[round] translate-x-[5px] translate-y-[5px]"
          style={{ 
            strokeDasharray: 440,
            strokeDashoffset: 440 - 440 * value / total 
          }}
        />
      </svg>
      <div 
        className="absolute w-full h-full rounded-full flex justify-center items-start before:content-[''] before:absolute before:-top-[3px] before:w-[15px] before:h-[15px] before:bg-[var(--ifm-color-primary)] before:rounded-full before:shadow-[0_0_20px_var(--ifm-color-primary),0_0_60px_var(--ifm-color-primary)]"
        style={{ transform: `rotateZ(${ 360 * value / total }deg)` }}
      />
      <div className="absolute text-center font-medium text-[2.5rem] select-none">
        {value}
        <br />
        <span className="absolute text-[0.5rem] font-light -translate-x-1/2 -translate-y-[10px] tracking-[0.1em] uppercase select-none">{unit}</span>
      </div>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  const calculateTimeLeft = () => {
    const endDate = new Date(DATE).getTime();
    const nowDate = new Date().getTime();
    const distance = endDate - nowDate;
    
    if (distance < 0) {
      setIsTimeUp(true);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(distance / (1000 * 60 * 60) % 24);
    const minutes = Math.floor(distance / (1000 * 60) % 60);
    const seconds = Math.floor(distance / 1000 % 60);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={globalStyles.section}>
      {isTimeUp ? (
        <>
          <Heading as="h2" className="text-[5rem] text-center">
            {EVENT}
          </Heading>
          <strong className="text-[3rem] text-center">
            {TEXT}
          </strong>
        </>
      ) : (
        <>
          <Heading as="h2" className="margin-bottom--lg text--center">
            距离 {EVENT} 还有
          </Heading>
          <div className="flex gap-8 justify-center w-fit mx-auto max-md:grid max-md:grid-cols-2 max-[400px]:grid-cols-1">
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
  );
}
