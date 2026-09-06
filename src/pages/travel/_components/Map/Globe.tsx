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
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { useColorMode } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
import { geoEquirectangular, geoPath, geoContains, geoBounds } from 'd3-geo';
import * as countries from 'i18n-iso-countries';
import countriesEn from 'i18n-iso-countries/langs/en.json';
import countriesZh from 'i18n-iso-countries/langs/zh.json';
import * as threeModule from 'three';
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

countries.registerLocale(countriesEn);
countries.registerLocale(countriesZh);
import styles from './styles.module.css';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';

type GlobeComponent = ComponentType<GlobeProps & { ref?: RefObject<GlobeMethods | undefined> }>;
type GlobeMaterial = NonNullable<GlobeProps['globeMaterial']>;

// three.js GPU resources are not garbage-collected — they have to be disposed by
// hand, so the shims carry `dispose` and the material carries its `map`.
type GlobeTexture = { colorSpace: string; anisotropy: number; dispose: () => void };
type DisposableMaterial = GlobeMaterial & {
  map?: GlobeTexture | null;
  dispose: () => void;
};

const three = threeModule as unknown as {
  MeshBasicMaterial: new (parameters?: object) => DisposableMaterial;
  CanvasTexture: new (canvas: HTMLCanvasElement) => GlobeTexture;
  SRGBColorSpace: string;
};

const MOTHERLAND_LABEL = translate({
  id: 'pages.travel.map.motherland',
  message: 'Motherland',
});
const NOT_VISITED_LABEL = translate({
  id: 'pages.travel.map.legend.unvisited',
  message: 'Not Visited',
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
const DEFAULT_POINT_OF_VIEW = { lat: 30, lng: 120, altitude: 1.8 };
const RESET_DURATION_MS = 600;
const GEOJSON_TIMEOUT_MS = 15000;

function readCssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Paint the whole world onto one equirectangular canvas — ocean, every country
// filled (visited in the theme colour), soft borders — to wrap the globe as a
// texture. No extruded polygons means no z-fighting, no clipping, no raised
// layer to hack.
function bakeGlobeTexture(
  features: readonly GlobeCountryFeature[],
  visited: ReadonlySet<string>,
  colors: { ocean: string; visited: string; unvisited: string; stroke: string }
): HTMLCanvasElement {
  const W = 4096;
  const H = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const projection = geoEquirectangular().fitSize([W, H], { type: 'Sphere' });
  const path = geoPath(projection, ctx);

  ctx.fillStyle = colors.ocean;
  ctx.fillRect(0, 0, W, H);
  ctx.lineJoin = 'round';
  ctx.lineWidth = 0.8;
  ctx.strokeStyle = colors.stroke;
  for (const f of features) {
    ctx.beginPath();
    path(f as GeoJSON.Feature);
    ctx.fillStyle = visited.has(getFeatureIso3(f)) ? colors.visited : colors.unvisited;
    ctx.fill();
    ctx.stroke();
  }
  return canvas;
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
  const [textureCanvas, setTextureCanvas] = useState<HTMLCanvasElement | null>(null);
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
        // Without the borders the globe can't be painted, but it can still show:
        // fall through to the plain ocean sphere rather than an empty frame.
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

  const colors = useMemo(
    () => ({
      ocean: readCssVar('--ifm-color-emphasis-100'),
      visited: readCssVar('--ifm-color-primary-lighter'),
      unvisited: readCssVar('--ifm-color-emphasis-300'),
      stroke: readCssVar('--ifm-color-emphasis-400'),
    }),
    // colorMode isn't read directly, but it's what makes the CSS vars re-read on theme flip.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [colorMode]
  );

  useEffect(() => {
    let cancelled = false;
    setTextureCanvas(null);
    if (features.length === 0) return () => undefined;

    const bake = () => {
      if (cancelled) return;
      try {
        setTextureCanvas(bakeGlobeTexture(features, visitedCountries, colors));
      } catch (error) {
        console.error(error);
        setGeoFailed(true);
      }
    };
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let idleId: number | null = null;
    let timeoutId: number | null = null;
    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(bake, { timeout: 1000 });
    } else {
      timeoutId = window.setTimeout(bake, 0);
    }

    return () => {
      cancelled = true;
      if (idleId !== null) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [colors, features, visitedCountries]);

  const globeMaterial = useMemo<DisposableMaterial>(() => {
    if (!textureCanvas) return new three.MeshBasicMaterial({ color: colors.ocean });
    const texture = new three.CanvasTexture(textureCanvas);
    texture.colorSpace = three.SRGBColorSpace;
    texture.anisotropy = 8;
    return new three.MeshBasicMaterial({ map: texture });
  }, [colors.ocean, textureCanvas]);

  // Three.js GPU resources are not garbage-collected — release each material
  // after react-kapsule has received its replacement.
  useEffect(
    () => () => {
      globeMaterial.map?.dispose();
      globeMaterial.dispose();
    },
    [globeMaterial]
  );

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

  const handleReady = () => {
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
    setIsGlobeReady(true);
  };

  // Ready = globe mounted, borders fetched, and the texture baked from them —
  // or the borders failed, in which case the bare sphere is what we have.
  const isReady = isGlobeReady && ((features.length > 0 && textureCanvas !== null) || geoFailed);
  const rotationLabel = isRotating ? PAUSE_ROTATION_LABEL : PLAY_ROTATION_LABEL;

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
