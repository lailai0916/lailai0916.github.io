import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Heading from '@theme/Heading';
import ProgressCircle from '../ProgressCircle';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const endDate = new Date('2025/01/29 00:00:00').getTime();
    const timer = setInterval(() => {
      const nowDate = new Date().getTime();
      const distance = endDate - nowDate;

      if (distance < 0) {
        setIsTimeUp(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  if (isTimeUp) {
    return (
      <h2 className={styles.newYear}>
        2025<br />
        <span>Happy Chinese New Year</span>
      </h2>
    );
  }

  return (
    <div className={styles.container}>
      <Heading as="h2">
        距离 2025 年春节还剩
      </Heading>
      <div className={styles.time}>
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
    </div>
  );
}
