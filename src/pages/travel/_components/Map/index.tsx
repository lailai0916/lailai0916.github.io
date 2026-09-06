import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import Button from '@site/src/components/laikit/Button';
import styles from './styles.module.css';

const MAP_DESCRIPTION_ID = 'travel-map-description';
const MAP_LOADING_LABEL = translate({
  id: 'pages.travel.map.loading',
  message: 'Loading map…',
});
const MAP_ERROR_LABEL = translate({
  id: 'pages.travel.map.error',
  message: 'The map could not be loaded.',
});
const MAP_RETRY_LABEL = translate({
  id: 'pages.travel.map.retry',
  message: 'Retry',
});
const MAP_ARIA_LABEL = translate({
  id: 'pages.travel.map.ariaLabel',
  message: 'Interactive travel map',
});
const MAP_ARIA_DESCRIPTION = translate({
  id: 'pages.travel.map.ariaDescription',
  message:
    'An interactive globe showing visited countries. The travel timeline below provides the same information in text.',
});

function MapShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={styles.globeShell}
      role="region"
      aria-label={MAP_ARIA_LABEL}
      aria-describedby={MAP_DESCRIPTION_ID}
    >
      <p id={MAP_DESCRIPTION_ID} className={styles.srOnly}>
        {MAP_ARIA_DESCRIPTION}
      </p>
      {children}
    </div>
  );
}

function GlobePlaceholder() {
  return (
    <MapShell>
      <div className={styles.globeFrame}>
        <div className={styles.mapStatus} role="status" aria-live="polite">
          <p className={styles.mapStatusMessage}>{MAP_LOADING_LABEL}</p>
        </div>
      </div>
    </MapShell>
  );
}

function GlobeErrorPlaceholder({ onRetry }: { onRetry: () => void }) {
  return (
    <MapShell>
      <div className={styles.globeFrame}>
        <div className={clsx(styles.mapStatus, styles.mapStatusError)} role="alert">
          <p className={styles.mapStatusMessage}>{MAP_ERROR_LABEL}</p>
          <Button variant="secondary" size="sm" onClick={onRetry}>
            {MAP_RETRY_LABEL}
          </Button>
        </div>
      </div>
    </MapShell>
  );
}

function createTravelGlobe() {
  return lazy(() => import('./Globe'));
}

class MapErrorBoundary extends Component<
  {
    children: ReactNode;
    onRetry: () => void;
  },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Travel map failed to initialize.', error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <GlobeErrorPlaceholder onRetry={this.props.onRetry} />;
    return this.props.children;
  }
}

function TravelGlobeLoader() {
  const [retryKey, setRetryKey] = useState(0);
  const [TravelGlobe, setTravelGlobe] = useState(createTravelGlobe);
  const retry = useCallback(() => {
    setTravelGlobe(() => createTravelGlobe());
    setRetryKey((key) => key + 1);
  }, []);

  return (
    <MapErrorBoundary key={retryKey} onRetry={retry}>
      <Suspense fallback={<GlobePlaceholder />}>
        <MapShell>
          <TravelGlobe
            loadingLabel={MAP_LOADING_LABEL}
            errorLabel={MAP_ERROR_LABEL}
            retryLabel={MAP_RETRY_LABEL}
          />
        </MapShell>
      </Suspense>
    </MapErrorBoundary>
  );
}

export default function TravelMap() {
  return <BrowserOnly fallback={<GlobePlaceholder />}>{() => <TravelGlobeLoader />}</BrowserOnly>;
}
