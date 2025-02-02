import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Heading from '@theme/Heading';
import ProgressCircle from './ProgressCircle';

const EVENT = '2026 年';
const DATE = '2026-01-01T00:00:00';
const TEXT = 'Happy New Year!';

export default function Timer() {
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
    <div className="container">
      {isTimeUp ? (
        <>
          <Heading as="h2" className={styles.endTitle}>
            {EVENT}
          </Heading>
          <strong className={styles.endMessage}>
            {TEXT}
          </strong>
        </>
      ) : (
        <>
          <Heading as="h2" className="margin-bottom--lg text--center">
            距离 {EVENT} 还剩
          </Heading>
          <div className={styles.timer}>
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
