import { lazy, Suspense, type ReactNode } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TravelGlobe = lazy(() => import('./Globe'));
const MAP_DESCRIPTION_ID = 'travel-map-description';
const MAP_LOADING_LABEL = translate({
  id: 'pages.travel.map.loading',
  message: 'Loading map…',
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

export default function TravelMap() {
  return (
    <BrowserOnly fallback={<GlobePlaceholder />}>
      {() => (
        <Suspense fallback={<GlobePlaceholder />}>
          <MapShell>
            <TravelGlobe loadingLabel={MAP_LOADING_LABEL} />
          </MapShell>
        </Suspense>
      )}
    </BrowserOnly>
  );
}
