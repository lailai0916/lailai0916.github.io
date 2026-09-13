import { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { usePluralForm } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import { MetaBar, type MetaBarItem } from '@site/src/theme/BlogShared/BlogUI';
import Button from '@site/src/components/laikit/Button';
import Card from '@site/src/components/laikit/Card';
import IconBlock from '@site/src/components/laikit/IconBlock';
import ShareCard from '@site/src/components/laikit/ShareCard';
import Skeleton from '@site/src/components/laikit/Skeleton';
import { MOMENT_LIST } from '@site/src/data/moments';
import { useImageStatus } from '@site/src/hooks/useImageStatus';
import { useVisitorTimeZone } from '@site/src/hooks/useVisitorTimeZone';
import { formatLocalDate, formatLocalTime } from '@site/src/utils/dateTime';
import { withTimeout } from '@site/src/utils/withTimeout';
import styles from './styles.module.css';

const PAGE_SIZE = 20;

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
  message: 'moment|moments',
});
const HANGZHOU_LABEL = translate({
  id: 'pages.moments.location.hangzhou',
  message: 'Hangzhou',
});
const LOAD_MORE_LABEL = translate({
  id: 'pages.moments.loadMore',
  message: 'Load more',
});
const NO_MORE_LABEL = translate({
  id: 'pages.moments.noMore',
  message: 'No more moments',
});
const WEATHER_ERROR_LABEL = translate({
  id: 'pages.moments.weather.error',
  message: 'Weather data is temporarily unavailable.',
});
const WEATHER_RETRY_LABEL = translate({
  id: 'pages.moments.weather.retry',
  message: 'Retry',
});

// Hangzhou
const WEATHER_LAT = 30.27;
const WEATHER_LNG = 120.16;
const WEATHER_URL = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LNG}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FShanghai`;
const WEATHER_TIMEOUT_MS = 10000;

type WeatherCurrent = {
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
};

// WMO weather interpretation codes (WW). Labels are Open-Meteo's official
// descriptions, expanded to one entry per code. https://open-meteo.com/en/docs
const WMO: Record<number, { text: string; icon: string }> = {
  0: {
    text: translate({
      id: 'pages.moments.weather.clearSky',
      message: 'Clear sky',
    }),
    icon: 'lucide:sun',
  },
  1: {
    text: translate({
      id: 'pages.moments.weather.mainlyClear',
      message: 'Mainly clear',
    }),
    icon: 'lucide:cloud-sun',
  },
  2: {
    text: translate({
      id: 'pages.moments.weather.partlyCloudy',
      message: 'Partly cloudy',
    }),
    icon: 'lucide:cloud',
  },
  3: {
    text: translate({
      id: 'pages.moments.weather.overcast',
      message: 'Overcast',
    }),
    icon: 'lucide:cloudy',
  },
  45: {
    text: translate({ id: 'pages.moments.weather.fog', message: 'Fog' }),
    icon: 'lucide:cloud-fog',
  },
  48: {
    text: translate({
      id: 'pages.moments.weather.depositingRimeFog',
      message: 'Depositing rime fog',
    }),
    icon: 'lucide:cloud-fog',
  },
  51: {
    text: translate({
      id: 'pages.moments.weather.lightDrizzle',
      message: 'Light drizzle',
    }),
    icon: 'lucide:cloud-drizzle',
  },
  53: {
    text: translate({
      id: 'pages.moments.weather.moderateDrizzle',
      message: 'Moderate drizzle',
    }),
    icon: 'lucide:cloud-drizzle',
  },
  55: {
    text: translate({
      id: 'pages.moments.weather.denseDrizzle',
      message: 'Dense drizzle',
    }),
    icon: 'lucide:cloud-drizzle',
  },
  56: {
    text: translate({
      id: 'pages.moments.weather.lightFreezingDrizzle',
      message: 'Light freezing drizzle',
    }),
    icon: 'lucide:cloud-drizzle',
  },
  57: {
    text: translate({
      id: 'pages.moments.weather.denseFreezingDrizzle',
      message: 'Dense freezing drizzle',
    }),
    icon: 'lucide:cloud-drizzle',
  },
  61: {
    text: translate({
      id: 'pages.moments.weather.slightRain',
      message: 'Slight rain',
    }),
    icon: 'lucide:cloud-rain',
  },
  63: {
    text: translate({
      id: 'pages.moments.weather.moderateRain',
      message: 'Moderate rain',
    }),
    icon: 'lucide:cloud-rain',
  },
  65: {
    text: translate({
      id: 'pages.moments.weather.heavyRain',
      message: 'Heavy rain',
    }),
    icon: 'lucide:cloud-rain-wind',
  },
  66: {
    text: translate({
      id: 'pages.moments.weather.lightFreezingRain',
      message: 'Light freezing rain',
    }),
    icon: 'lucide:cloud-rain',
  },
  67: {
    text: translate({
      id: 'pages.moments.weather.heavyFreezingRain',
      message: 'Heavy freezing rain',
    }),
    icon: 'lucide:cloud-rain-wind',
  },
  71: {
    text: translate({
      id: 'pages.moments.weather.slightSnowFall',
      message: 'Slight snow fall',
    }),
    icon: 'lucide:cloud-snow',
  },
  73: {
    text: translate({
      id: 'pages.moments.weather.moderateSnowFall',
      message: 'Moderate snow fall',
    }),
    icon: 'lucide:cloud-snow',
  },
  75: {
    text: translate({
      id: 'pages.moments.weather.heavySnowFall',
      message: 'Heavy snow fall',
    }),
    icon: 'lucide:cloud-snow',
  },
  77: {
    text: translate({
      id: 'pages.moments.weather.snowGrains',
      message: 'Snow grains',
    }),
    icon: 'lucide:cloud-snow',
  },
  80: {
    text: translate({
      id: 'pages.moments.weather.slightRainShowers',
      message: 'Slight rain showers',
    }),
    icon: 'lucide:cloud-rain',
  },
  81: {
    text: translate({
      id: 'pages.moments.weather.moderateRainShowers',
      message: 'Moderate rain showers',
    }),
    icon: 'lucide:cloud-rain',
  },
  82: {
    text: translate({
      id: 'pages.moments.weather.violentRainShowers',
      message: 'Violent rain showers',
    }),
    icon: 'lucide:cloud-rain-wind',
  },
  85: {
    text: translate({
      id: 'pages.moments.weather.slightSnowShowers',
      message: 'Slight snow showers',
    }),
    icon: 'lucide:cloud-snow',
  },
  86: {
    text: translate({
      id: 'pages.moments.weather.heavySnowShowers',
      message: 'Heavy snow showers',
    }),
    icon: 'lucide:cloud-snow',
  },
  95: {
    text: translate({
      id: 'pages.moments.weather.thunderstorm',
      message: 'Thunderstorm',
    }),
    icon: 'lucide:cloud-lightning',
  },
  96: {
    text: translate({
      id: 'pages.moments.weather.thunderstormSlightHail',
      message: 'Thunderstorm with slight hail',
    }),
    icon: 'lucide:cloud-lightning',
  },
  99: {
    text: translate({
      id: 'pages.moments.weather.thunderstormHeavyHail',
      message: 'Thunderstorm with heavy hail',
    }),
    icon: 'lucide:cloud-lightning',
  },
};

const WEATHER_UNKNOWN = translate({
  id: 'pages.moments.weather.unknown',
  message: 'Unknown',
});

type WeatherStatus = 'loading' | 'success' | 'error';

function useHangzhouWeather(): {
  weather: WeatherCurrent | null;
  status: WeatherStatus;
  retry: () => void;
} {
  const [w, setW] = useState<WeatherCurrent | null>(null);
  const [status, setStatus] = useState<WeatherStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    void withTimeout(
      async (signal) => {
        const response = await fetch(WEATHER_URL, { signal });
        if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
        const data = (await response.json()) as { current?: WeatherCurrent };
        if (!data.current) throw new Error('Weather response is missing current data');
        return data.current;
      },
      controller.signal,
      WEATHER_TIMEOUT_MS
    )
      .then((current) => {
        if (controller.signal.aborted) return;
        setW(current);
        setStatus('success');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });

    return () => controller.abort();
  }, [attempt]);

  return { weather: w, status, retry: () => setAttempt((value) => value + 1) };
}

function MomentImage({ src }: { src: string }) {
  const { imgRef, status, onLoad, onError } = useImageStatus(src);

  if (status === 'error') {
    return (
      <span className={clsx(styles.momentImage, styles.momentImageFallback)} aria-hidden="true">
        <Icon icon="lucide:image-off" />
      </span>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      className={styles.momentImage}
      loading="lazy"
      decoding="async"
      data-zoomable
      onLoad={onLoad}
      onError={onError}
    />
  );
}

export default function Moments() {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { selectMessage } = usePluralForm();
  const timeZone = useVisitorTimeZone();
  const { weather, status: weatherStatus, retry: retryWeather } = useHangzhouWeather();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const totalCount = MOMENT_LIST.length;
  const visibleMoments = MOMENT_LIST.slice(0, visibleCount);
  const hasMore = visibleCount < totalCount;
  const weatherInfo = weather
    ? (WMO[weather.weather_code] ?? {
        text: WEATHER_UNKNOWN,
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
      <Card>
        <div className={styles.headerCard}>
          <IconBlock icon="lucide:aperture" variant="accent" size={48} />
          <div className={styles.headerInfo}>
            <h1 className={styles.title}>{TITLE}</h1>
            <p className={styles.description}>{DESCRIPTION}</p>
          </div>
          <div className={styles.count}>
            <span className={styles.countNumber}>{MOMENT_LIST.length}</span>
            <span className={styles.countLabel}>
              {selectMessage(MOMENT_LIST.length, COUNT_LABEL)}
            </span>
          </div>
        </div>
        <div className={styles.headerWeather}>
          {weatherStatus === 'success' && weather ? (
            <MetaBar items={weatherItems} />
          ) : weatherStatus === 'error' ? (
            <div className={styles.weatherError} role="alert">
              <span>{WEATHER_ERROR_LABEL}</span>
              <Button variant="ghost" size="sm" onClick={retryWeather}>
                {WEATHER_RETRY_LABEL}
              </Button>
            </div>
          ) : (
            <Skeleton className={styles.weatherSkeleton} />
          )}
        </div>
      </Card>

      {visibleMoments.map((moment, i) => {
        const metaItems: MetaBarItem[] = [
          {
            icon: 'lucide:calendar',
            dateTime: moment.date,
            label: formatLocalDate(moment.date, currentLocale, timeZone),
          },
          {
            icon: 'lucide:clock',
            label: formatLocalTime(moment.date, currentLocale, timeZone),
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
          <Card key={`${moment.date}-${i}`}>
            <MetaBar items={metaItems} />
            {moment.content && (
              <div
                className={styles.momentContent}
                dangerouslySetInnerHTML={{ __html: moment.content }}
              />
            )}
            {moment.share && <ShareCard {...moment.share} />}
            {moment.images && moment.images.length > 0 && (
              <div className={styles.momentImages} data-count={moment.images.length}>
                {moment.images.map((image) => (
                  <MomentImage key={image} src={image} />
                ))}
              </div>
            )}
          </Card>
        );
      })}

      <div className={styles.loadMore}>
        {hasMore ? (
          <button
            type="button"
            className={styles.loadMoreLink}
            onClick={() => setVisibleCount((c) => Math.min(c + PAGE_SIZE, totalCount))}
          >
            {LOAD_MORE_LABEL}
          </button>
        ) : (
          totalCount > PAGE_SIZE && <span className={styles.loadMoreDone}>{NO_MORE_LABEL}</span>
        )}
      </div>
    </BlogScaffold>
  );
}
