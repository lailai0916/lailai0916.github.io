import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Heading from '@theme/Heading';
import ProgressCircle from '@site/src/components/ProgressCircle';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimeUp, setIsTimeUp] = useState(false);

  const calculateTimeLeft = () => {
    const endDate = new Date('2025/01/29 00:00:00').getTime();
    const nowDate = new Date().getTime();
    const distance = endDate - nowDate;

    if (distance < 0) {
      setIsTimeUp(true);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 300);

    return () => clearInterval(timer);
  }, []);

  if (isTimeUp) {
    return (
      <div className="container">
        <Heading as="h2" className={styles.year}>
          2025
        </Heading>
        <strong className={styles.message}>
          Happy Chinese New Year!
        </strong>
      </div>
    );
  }

  return (
    <div className="container">
      <Heading as="h2" className={clsx('margin-bottom--lg', 'text--center')}>
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
