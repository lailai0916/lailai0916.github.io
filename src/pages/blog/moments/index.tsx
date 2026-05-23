import { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import {
  BlogCard,
  MetaBar,
  type MetaBarItem,
} from '@site/src/theme/BlogShared/Components';
import IconBlock from '@site/src/components/laikit/IconBlock';
import ShareCard from '@site/src/components/laikit/ShareCard';
import { MOMENT_LIST } from '@site/src/data/moments';
import {
  formatLocalizedDate,
  formatLocalizedTime,
} from '@site/src/utils/format';
import styles from './styles.module.css';

const TITLE = translate({
  id: 'pages.moments.title',
  message: 'Moments',
});
const DESCRIPTION = translate({
  id: 'pages.moments.description',
  message: 'Share life, anytime, anywhere',
});
const COUNT_LABEL = translate({
  id: 'pages.moments.countLabel',
  message: 'moments',
});
const HANGZHOU_LABEL = translate({
  id: 'pages.moments.location.hangzhou',
  message: 'Hangzhou',
});

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

const WEATHER_LABELS = {
  clear: translate({ id: 'pages.moments.weather.clear', message: 'Clear' }),
  mainlyClear: translate({
    id: 'pages.moments.weather.mainlyClear',
    message: 'Mainly clear',
  }),
  partlyCloudy: translate({
    id: 'pages.moments.weather.partlyCloudy',
    message: 'Partly cloudy',
  }),
  overcast: translate({
    id: 'pages.moments.weather.overcast',
    message: 'Overcast',
  }),
  fog: translate({ id: 'pages.moments.weather.fog', message: 'Fog' }),
  depositingRimeFog: translate({
    id: 'pages.moments.weather.depositingRimeFog',
    message: 'Depositing rime fog',
  }),
  drizzle: translate({
    id: 'pages.moments.weather.drizzle',
    message: 'Drizzle',
  }),
  lightRain: translate({
    id: 'pages.moments.weather.lightRain',
    message: 'Light rain',
  }),
  moderateRain: translate({
    id: 'pages.moments.weather.moderateRain',
    message: 'Moderate rain',
  }),
  heavyRain: translate({
    id: 'pages.moments.weather.heavyRain',
    message: 'Heavy rain',
  }),
  lightSnow: translate({
    id: 'pages.moments.weather.lightSnow',
    message: 'Light snow',
  }),
  moderateSnow: translate({
    id: 'pages.moments.weather.moderateSnow',
    message: 'Moderate snow',
  }),
  heavySnow: translate({
    id: 'pages.moments.weather.heavySnow',
    message: 'Heavy snow',
  }),
  rainShowers: translate({
    id: 'pages.moments.weather.rainShowers',
    message: 'Rain showers',
  }),
  thunderstorm: translate({
    id: 'pages.moments.weather.thunderstorm',
    message: 'Thunderstorm',
  }),
};

const WMO: Record<number, { text: string; icon: string }> = {
  0: { text: WEATHER_LABELS.clear, icon: 'lucide:sun' },
  1: { text: WEATHER_LABELS.mainlyClear, icon: 'lucide:cloud-sun' },
  2: { text: WEATHER_LABELS.partlyCloudy, icon: 'lucide:cloud' },
  3: { text: WEATHER_LABELS.overcast, icon: 'lucide:cloudy' },
  45: { text: WEATHER_LABELS.fog, icon: 'lucide:cloud-fog' },
  48: { text: WEATHER_LABELS.depositingRimeFog, icon: 'lucide:cloud-fog' },
  51: { text: WEATHER_LABELS.drizzle, icon: 'lucide:cloud-drizzle' },
  53: { text: WEATHER_LABELS.drizzle, icon: 'lucide:cloud-drizzle' },
  55: { text: WEATHER_LABELS.drizzle, icon: 'lucide:cloud-drizzle' },
  61: { text: WEATHER_LABELS.lightRain, icon: 'lucide:cloud-rain' },
  63: { text: WEATHER_LABELS.moderateRain, icon: 'lucide:cloud-rain' },
  65: { text: WEATHER_LABELS.heavyRain, icon: 'lucide:cloud-rain-wind' },
  71: { text: WEATHER_LABELS.lightSnow, icon: 'lucide:cloud-snow' },
  73: { text: WEATHER_LABELS.moderateSnow, icon: 'lucide:cloud-snow' },
  75: { text: WEATHER_LABELS.heavySnow, icon: 'lucide:cloud-snow' },
  80: { text: WEATHER_LABELS.rainShowers, icon: 'lucide:cloud-rain' },
  95: { text: WEATHER_LABELS.thunderstorm, icon: 'lucide:cloud-lightning' },
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
          { icon: 'lucide:map-pin', label: HANGZHOU_LABEL },
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
            <span className={styles.countLabel}>{COUNT_LABEL}</span>
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
        if (moment.event) {
          metaItems.push({
            icon: 'lucide:flag',
            label: moment.event,
          });
        }
        if (moment.location) {
          metaItems.push({
            icon: 'lucide:map-pin',
            label: moment.location,
          });
        }
        return (
          <BlogCard key={`${moment.date}-${i}`}>
            <MetaBar items={metaItems} />
            {moment.content && (
              <div
                className={styles.momentContent}
                dangerouslySetInnerHTML={{ __html: moment.content }}
              />
            )}
            {moment.share && <ShareCard {...moment.share} />}
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
