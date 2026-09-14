import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from 'react';
import clsx from 'clsx';
import Color from 'color';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { useColorMode } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
import { geoContains, geoBounds } from 'd3-geo';
import * as countries from 'i18n-iso-countries';
import countriesEn from 'i18n-iso-countries/langs/en.json';
import countriesZh from 'i18n-iso-countries/langs/zh.json';
import { MeshBasicMaterial, type CanvasTexture } from 'three';
import Button from '@site/src/components/laikit/Button';
import Tooltip from '@site/src/components/laikit/Tooltip';
import { TRAVEL_LIST } from '@site/src/data/travel';
import { formatCalendarMonth } from '@site/src/utils/dateTime';
import {
  getFeatureIso3,
  getTravelDatesByCountry,
  type GlobeCountryFeature,
  type WorldGeoJson,
} from '@site/src/utils/travelGlobe';
import { withTimeout } from '@site/src/utils/withTimeout';
import { createDotGlobe } from './createDotGlobe';
import { createGlobeTexture } from './createGlobeTexture';
import LocationMarker from './LocationMarker';
import { HOME_LOCATION } from './LocationMarker/renderMarker';

countries.registerLocale(countriesEn);
countries.registerLocale(countriesZh);
import styles from './styles.module.css';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';

type GlobeComponent = ComponentType<GlobeProps & { ref?: RefObject<GlobeMethods | undefined> }>;
const MOTHERLAND_LABEL = translate({
  id: 'pages.travel.map.motherland',
  message: 'Motherland',
});
const NOT_VISITED_LABEL = translate({
  id: 'pages.travel.map.legend.unvisited',
  message: 'Not Visited',
});
const HOME_LOCATION_LABEL = translate({
  id: 'pages.travel.map.location',
  message: 'lailai · Hangzhou, China',
});
const ORIGINAL_MAP_LABEL = translate({
  id: 'pages.travel.map.showOriginal',
  message: 'Switch to original map',
});
const DOT_MAP_LABEL = translate({
  id: 'pages.travel.map.showDots',
  message: 'Switch to dot map',
});
const RESET_VIEW_LABEL = translate({
  id: 'pages.travel.map.reset',
  message: 'Reset view',
});
const PLAY_ROTATION_LABEL = translate({
  id: 'pages.travel.map.play',
  message: 'Resume rotation',
});
const PAUSE_ROTATION_LABEL = translate({
  id: 'pages.travel.map.pause',
  message: 'Pause rotation',
});
const DEFAULT_POINT_OF_VIEW = { ...HOME_LOCATION, altitude: 1.8 };
const RESET_DURATION_MS = 600;
const GEOJSON_TIMEOUT_MS = 15000;

function readCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

type HoveredCountry = {
  name: string;
  detail: string;
  flag: string | null;
};

function sameHover(a: HoveredCountry | null, b: HoveredCountry | null) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.name === b.name && a.detail === b.detail && a.flag === b.flag;
}

function TravelGlobeClient({
  Globe,
  loadingLabel,
  errorLabel,
  retryLabel,
}: {
  Globe: GlobeComponent;
  loadingLabel: string;
  errorLabel: string;
  retryLabel: string;
}) {
  const { i18n } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  const frameRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const resetTimerRef = useRef<number | null>(null);
  const rotationEnabledRef = useRef(false);
  const [size, setSize] = useState({ width: 720, height: 500 });
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [features, setFeatures] = useState<readonly GlobeCountryFeature[]>([]);
  const [dotGlobe, setDotGlobe] = useState<ReturnType<typeof createDotGlobe> | null>(null);
  const [mapStyle, setMapStyle] = useState<'dots' | 'original'>('dots');
  const [originalRequested, setOriginalRequested] = useState(false);
  const [originalTexture, setOriginalTexture] = useState<CanvasTexture | null>(null);
  const [geoFailed, setGeoFailed] = useState(false);
  const [geoRequest, setGeoRequest] = useState(0);
  const [isFrameVisible, setIsFrameVisible] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  const locale = i18n.currentLocale;
  const lang = locale === 'zh-Hans' ? 'zh' : 'en';

  const [hovered, setHovered] = useState<HoveredCountry | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const pointerRef = useRef<{ x: number; y: number } | null>(null);

  const worldUrl = useBaseUrl('/json/world.geo.json');
  useEffect(() => {
    const controller = new AbortController();
    setFeatures([]);
    setGeoFailed(false);
    void withTimeout(
      async (signal) => {
        const response = await fetch(worldUrl, { cache: 'force-cache', signal });
        if (!response.ok) throw new Error(`Failed to load ${worldUrl}: ${response.status}`);
        return (await response.json()) as WorldGeoJson;
      },
      controller.signal,
      GEOJSON_TIMEOUT_MS
    )
      .then((data) => {
        if (!controller.signal.aborted) setFeatures(data.features);
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error(error);
        setGeoFailed(true);
      });
    return () => controller.abort();
  }, [worldUrl, geoRequest]);

  const travelDatesByCountry = useMemo(() => getTravelDatesByCountry(TRAVEL_LIST), []);
  const visitedCountries = useMemo(
    () => new Set(travelDatesByCountry.keys()),
    [travelDatesByCountry]
  );

  // Precomputed bounding boxes so hover skips the costly geoContains for every
  // country whose box can't hold the cursor. geoBounds can wrap the antimeridian
  // (west > east) for countries like Russia and Fiji.
  const bounded = useMemo(
    () =>
      features.map((f) => {
        const [[west, south], [east, north]] = geoBounds(f as GeoJSON.Feature);
        return { feature: f, west, east, south, north, wraps: west > east };
      }),
    [features]
  );

  const colors = useMemo(() => {
    const isDark = colorMode === 'dark';
    const accent = Color(readCssVar('--ifm-color-primary'));
    const pageBackground = Color(readCssVar('--ifm-background-color'));
    const background = pageBackground.alpha()
      ? pageBackground
      : Color(readCssVar('--ifm-background-surface-color'));
    const neutral = Color(readCssVar('--ifm-color-emphasis-600'));
    const ocean = readCssVar('--ifm-color-emphasis-100');
    return {
      dots: {
        ocean: background.hex(),
        visited: accent.mix(background, isDark ? 0.08 : 0.12).hex(),
        unvisited: neutral.mix(background, isDark ? 0.22 : 0.18).hex(),
        grid: neutral.mix(background, isDark ? 0.85 : 0.87).hex(),
      },
      original: {
        ocean,
        grid: neutral.mix(Color(ocean), isDark ? 0.92 : 0.9).hex(),
        visited: readCssVar('--ifm-color-primary-lighter'),
        unvisited: readCssVar('--ifm-color-emphasis-300'),
        stroke: readCssVar('--ifm-color-emphasis-400'),
      },
    };
  }, [colorMode]);

  useEffect(() => {
    setDotGlobe(null);
    const globe = globeRef.current;
    if (!isGlobeReady || !globe || features.length === 0) return;
    let dots: ReturnType<typeof createDotGlobe> | null = null;
    // Required map work must run promptly, even when the browser never becomes idle.
    const timeoutId = window.setTimeout(() => {
      try {
        dots = createDotGlobe(globe, features, visitedCountries);
        globe.scene().add(dots.group);
        setDotGlobe(dots);
      } catch (error) {
        console.error(error);
        setGeoFailed(true);
      }
    }, 0);
    return () => {
      window.clearTimeout(timeoutId);
      dots?.dispose();
    };
  }, [features, isGlobeReady, visitedCountries]);

  useEffect(() => {
    if (!originalRequested || features.length === 0) {
      setOriginalTexture(null);
      return;
    }
    const timeoutId = window.setTimeout(() => {
      try {
        setOriginalTexture(createGlobeTexture(features, visitedCountries, colors.original));
      } catch (error) {
        console.error(error);
        setGeoFailed(true);
      }
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [colors.original, features, originalRequested, visitedCountries]);
  useEffect(() => () => originalTexture?.dispose(), [originalTexture]);

  const globeMaterial = useMemo(() => new MeshBasicMaterial(), []);
  useEffect(() => () => globeMaterial.dispose(), [globeMaterial]);
  const showOriginal = mapStyle === 'original' && originalTexture !== null;
  useEffect(() => {
    const texture = showOriginal ? originalTexture : null;
    if (globeMaterial.map !== texture) {
      globeMaterial.map = texture;
      globeMaterial.needsUpdate = true;
    }
    globeMaterial.color.set(showOriginal ? '#ffffff' : colors.dots.ocean);
    if (dotGlobe) {
      dotGlobe.setColors(colors.dots);
      dotGlobe.group.visible = !showOriginal;
    }
  }, [colors.dots, dotGlobe, globeMaterial, originalTexture, showOriginal]);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const updateSize = () => {
      const width = Math.round(element.clientWidth);
      const height = Math.round(element.clientHeight);
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = frameRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setIsFrameVisible(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState === 'visible');
    };

    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!isGlobeReady) return;
    const globe = globeRef.current;
    if (!globe) return;

    if (isFrameVisible && isDocumentVisible) globe.resumeAnimation();
    else globe.pauseAnimation();
  }, [isDocumentVisible, isFrameVisible, isGlobeReady]);

  useEffect(
    () => () => {
      if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    },
    []
  );

  useEffect(() => {
    if (!isGlobeReady) return;
    const globe = globeRef.current;
    const canvas = globe?.renderer()?.domElement;
    if (!globe || !canvas) return;

    const handlePointerDownCapture = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((event.clientX - rect.left) / rect.width) * size.width;
      const y = ((event.clientY - rect.top) / rect.height) * size.height;
      if (globe.toGlobeCoords(x, y)) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    };

    canvas.addEventListener('pointerdown', handlePointerDownCapture, true);
    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDownCapture, true);
    };
  }, [isGlobeReady, size.height, size.width]);

  // Hover is resolved geometrically: screen point → lat/lng on the sphere →
  // which country contains it. No polygon meshes needed.
  const resolveHovered = useCallback(
    (px: number, py: number): HoveredCountry | null => {
      const globe = globeRef.current;
      const canvas = globe?.renderer()?.domElement;
      const rect = canvas?.getBoundingClientRect();
      if (!globe || !canvas || !rect) return null;
      const coords = globe.toGlobeCoords(
        (px / rect.width) * size.width,
        (py / rect.height) * size.height
      );
      if (!coords) return null;
      const { lng, lat } = coords;
      const point: [number, number] = [lng, lat];
      const hit = bounded.find(
        (b) =>
          lat >= b.south &&
          lat <= b.north &&
          (b.wraps ? lng >= b.west || lng <= b.east : lng >= b.west && lng <= b.east) &&
          geoContains(b.feature as GeoJSON.Feature, point)
      );
      const f = hit?.feature;
      if (!f) return null;
      const code = getFeatureIso3(f);
      const alpha2 = countries.alpha3ToAlpha2(code);
      const travelDates = travelDatesByCountry.get(code);
      return {
        name: countries.getName(code, lang) ?? f.properties.NAME ?? code,
        detail:
          code === 'CHN'
            ? MOTHERLAND_LABEL
            : travelDates
              ? travelDates.map((date) => formatCalendarMonth(date, locale)).join('\n')
              : NOT_VISITED_LABEL,
        flag: alpha2 ? `flag:${alpha2.toLowerCase()}-4x3` : null,
      };
    },
    [bounded, size.width, size.height, travelDatesByCountry, locale, lang]
  );

  // The globe auto-rotates, so a stationary cursor covers a different country
  // every frame — re-resolve from the last cursor position each frame, not just
  // on mousemove, or the tooltip goes stale until the pointer moves.
  useEffect(() => {
    if (!isGlobeReady || !isFrameVisible || !isDocumentVisible) return;
    let raf = 0;
    let lastResolve = 0;
    const tick = (timestamp: number) => {
      const p = pointerRef.current;
      if (p && timestamp - lastResolve >= 50) {
        const next = resolveHovered(p.x, p.y);
        setHovered((prev) => (sameHover(prev, next) ? prev : next));
        lastResolve = timestamp;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isDocumentVisible, isFrameVisible, isGlobeReady, resolveHovered]);

  const onFrameMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const canvas = globeRef.current?.renderer()?.domElement;
    const rect = canvas?.getBoundingClientRect();
    if (!rect) return;
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    setCursor({ x: px, y: py });
    pointerRef.current = { x: px, y: py };
  };

  const onFrameMouseLeave = () => {
    pointerRef.current = null;
    setHovered(null);
  };

  const resetView = () => {
    const globe = globeRef.current;
    const controls = globe?.controls();
    if (!globe || !controls) return;

    if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 0 : RESET_DURATION_MS;

    controls.autoRotate = false;
    globe.pointOfView(DEFAULT_POINT_OF_VIEW, duration);

    if (duration === 0) {
      controls.autoRotate = rotationEnabledRef.current;
      return;
    }

    resetTimerRef.current = window.setTimeout(() => {
      const currentControls = globeRef.current?.controls();
      if (currentControls) currentControls.autoRotate = rotationEnabledRef.current;
      resetTimerRef.current = null;
    }, duration);
  };

  const toggleRotation = () => {
    const controls = globeRef.current?.controls();
    if (!controls) return;
    const next = !isRotating;
    controls.autoRotate = next;
    rotationEnabledRef.current = next;
    setIsRotating(next);
  };

  const retryGeoJson = () => setGeoRequest((request) => request + 1);

  const toggleMapStyle = () => {
    setOriginalRequested(true);
    setMapStyle((style) => (style === 'dots' ? 'original' : 'dots'));
  };

  const handleReady = useCallback(() => setIsGlobeReady(true), []);

  // onGlobeReady can fire before react-kapsule attaches the ref in Safari.
  // Configure the instance after React commits instead of dropping that signal.
  useEffect(() => {
    if (!isGlobeReady) return;
    const globe = globeRef.current;
    if (!globe) return;
    const controls = globe.controls();
    const shouldRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    controls.autoRotate = shouldRotate;
    controls.autoRotateSpeed = 1.0;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    globe.pointOfView(DEFAULT_POINT_OF_VIEW, 0);
    rotationEnabledRef.current = shouldRotate;
    setIsRotating(shouldRotate);
  }, [isGlobeReady]);

  const isReady = isGlobeReady && (dotGlobe !== null || geoFailed);
  const rotationLabel = isRotating ? PAUSE_ROTATION_LABEL : PLAY_ROTATION_LABEL;
  const mapStyleLabel = mapStyle === 'dots' ? ORIGINAL_MAP_LABEL : DOT_MAP_LABEL;

  return (
    <div
      className={styles.globeFrame}
      ref={frameRef}
      onMouseMove={onFrameMouseMove}
      onMouseLeave={onFrameMouseLeave}
      aria-busy={!isReady && !geoFailed}
    >
      <div className={clsx(styles.globeLayer, isReady && styles.globeVisible)}>
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          rendererConfig={{ antialias: true }}
          animateIn={false}
          showGlobe
          showAtmosphere={false}
          globeMaterial={globeMaterial}
          onGlobeReady={handleReady}
        />
        <LocationMarker
          globeRef={globeRef}
          ready={isGlobeReady}
          width={size.width}
          height={size.height}
          label={HOME_LOCATION_LABEL}
        />
      </div>
      {!isReady && !geoFailed && (
        <div className={styles.mapStatus} role="status" aria-live="polite">
          <p className={styles.mapStatusMessage}>{loadingLabel}</p>
        </div>
      )}
      {geoFailed && (
        <div className={clsx(styles.mapStatus, styles.mapStatusError)} role="alert">
          <p className={styles.mapStatusMessage}>{errorLabel}</p>
          <Button variant="secondary" size="sm" onClick={retryGeoJson}>
            {retryLabel}
          </Button>
        </div>
      )}
      {isReady && (
        <div className={styles.globeControls}>
          <Button
            variant="secondary"
            size="sm"
            className={clsx(styles.globeControlButton, styles.mapStyleButton)}
            leftIcon={
              <Icon
                icon={mapStyle === 'dots' ? 'lucide:earth' : 'lucide:grip'}
                className={styles.globeControlIcon}
                aria-hidden="true"
              />
            }
            onClick={toggleMapStyle}
            aria-label={mapStyleLabel}
            title={mapStyleLabel}
          />
          <Button
            variant="secondary"
            size="sm"
            className={styles.globeControlButton}
            leftIcon={
              <Icon
                icon="lucide:rotate-ccw"
                className={styles.globeControlIcon}
                aria-hidden="true"
              />
            }
            onClick={resetView}
            aria-label={RESET_VIEW_LABEL}
            title={RESET_VIEW_LABEL}
          />
          <Button
            variant="secondary"
            size="sm"
            className={styles.globeControlButton}
            leftIcon={
              <Icon
                icon={isRotating ? 'lucide:pause' : 'lucide:play'}
                className={styles.globeControlIcon}
                aria-hidden="true"
              />
            }
            onClick={toggleRotation}
            aria-label={rotationLabel}
            title={rotationLabel}
          />
        </div>
      )}
      {hovered && (
        <div className={styles.tooltipAnchor} style={{ left: cursor.x, top: cursor.y }}>
          <Tooltip>
            <Tooltip.Label className={styles.tooltipLabelRow}>
              {hovered.flag && <Icon icon={hovered.flag} className={styles.tooltipFlag} />}
              {hovered.name}
            </Tooltip.Label>
            <Tooltip.Value className={styles.tooltipValue}>{hovered.detail}</Tooltip.Value>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

export default function TravelGlobe({
  loadingLabel,
  errorLabel,
  retryLabel,
}: {
  loadingLabel: string;
  errorLabel: string;
  retryLabel: string;
}) {
  const Globe = require('react-globe.gl').default as GlobeComponent;
  return (
    <TravelGlobeClient
      Globe={Globe}
      loadingLabel={loadingLabel}
      errorLabel={errorLabel}
      retryLabel={retryLabel}
    />
  );
}
