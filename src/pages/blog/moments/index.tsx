import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import {
  BlogCard,
  MetaBar,
  type MetaBarItem,
} from '@site/src/theme/BlogShared/Components';
import IconBlock from '@site/src/components/laikit/IconBlock';
import { MOMENT_LIST } from '@site/src/data/moments';
import {
  formatLocalizedDate,
  formatLocalizedTime,
} from '@site/src/utils/format';
import styles from './styles.module.css';

const TITLE = 'Moments';
const DESCRIPTION = 'Share life, anytime, anywhere';

// Hangzhou
const WEATHER_LAT = 30.27;
const WEATHER_LNG = 120.16;
const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LNG}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FShanghai`;

type WeatherCurrent = {
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
};

const WMO: Record<number, { text: string; icon: string }> = {
  0: { text: '晴', icon: 'lucide:sun' },
  1: { text: '少云', icon: 'lucide:cloud-sun' },
  2: { text: '多云', icon: 'lucide:cloud' },
  3: { text: '阴', icon: 'lucide:cloudy' },
  45: { text: '雾', icon: 'lucide:cloud-fog' },
  48: { text: '冻雾', icon: 'lucide:cloud-fog' },
  51: { text: '毛毛雨', icon: 'lucide:cloud-drizzle' },
  53: { text: '毛毛雨', icon: 'lucide:cloud-drizzle' },
  55: { text: '毛毛雨', icon: 'lucide:cloud-drizzle' },
  61: { text: '小雨', icon: 'lucide:cloud-rain' },
  63: { text: '中雨', icon: 'lucide:cloud-rain' },
  65: { text: '大雨', icon: 'lucide:cloud-rain-wind' },
  71: { text: '小雪', icon: 'lucide:cloud-snow' },
  73: { text: '中雪', icon: 'lucide:cloud-snow' },
  75: { text: '大雪', icon: 'lucide:cloud-snow' },
  80: { text: '阵雨', icon: 'lucide:cloud-rain' },
  95: { text: '雷暴', icon: 'lucide:cloud-lightning' },
};

function useHangzhouWeather(): WeatherCurrent | null {
  const [w, setW] = useState<WeatherCurrent | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(WEATHER_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        if (!cancelled) setW(j.current);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return w;
}

export default function Moments() {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const weather = useHangzhouWeather();
  const weatherInfo = weather
    ? (WMO[weather.weather_code] ?? {
        text: `code ${weather.weather_code}`,
        icon: 'lucide:cloud',
      })
    : null;
  const weatherItems: MetaBarItem[] =
    weather && weatherInfo
      ? [
          { icon: 'lucide:map-pin', label: 'Hangzhou' },
          {
            icon: weatherInfo.icon,
            label: `${weatherInfo.text} ${weather.temperature_2m.toFixed(1)}°C`,
          },
          {
            icon: 'lucide:droplets',
            label: `${weather.relative_humidity_2m}%`,
          },
          {
            icon: 'lucide:wind',
            label: `${weather.wind_speed_10m.toFixed(1)} m/s`,
          },
        ]
      : [];

  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <BlogCard>
        <div className={styles.headerCard}>
          <IconBlock icon="lucide:sparkles" variant="accent" size={48} />
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>{TITLE}</h1>
            <p className={styles.description}>{DESCRIPTION}</p>
          </div>
          <div className={styles.count}>
            <span className={styles.countNumber}>{MOMENT_LIST.length}</span>
            <span className={styles.countLabel}>moments</span>
          </div>
        </div>
        {weather && (
          <div className={styles.headerWeather}>
            <MetaBar items={weatherItems} />
          </div>
        )}
      </BlogCard>

      {MOMENT_LIST.map((moment, i) => {
        const metaItems: MetaBarItem[] = [
          {
            icon: 'lucide:calendar',
            dateTime: moment.date,
            label: formatLocalizedDate(moment.date, currentLocale),
          },
          {
            icon: 'lucide:clock',
            label: formatLocalizedTime(moment.date, currentLocale),
          },
        ];
        if (moment.location) {
          metaItems.push({
            icon: 'lucide:map-pin',
            label: moment.location,
          });
        }
        return (
          <BlogCard key={`${moment.date}-${i}`}>
            <MetaBar items={metaItems} />
            <div
              className={styles.momentContent}
              dangerouslySetInnerHTML={{ __html: moment.content }}
            />
            {moment.images && moment.images.length > 0 && (
              <div
                className={styles.momentImages}
                data-count={moment.images.length}
              >
                {moment.images.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt=""
                    className={styles.momentImage}
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </BlogCard>
        );
      })}
    </BlogScaffold>
  );
}
