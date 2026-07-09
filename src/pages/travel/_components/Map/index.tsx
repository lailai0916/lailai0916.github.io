import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent as ReactMouseEvent,
  type MutableRefObject,
} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { useColorMode } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
import { geoEquirectangular, geoPath, geoContains, geoBounds } from 'd3-geo';
import * as countries from 'i18n-iso-countries';
import countriesEn from 'i18n-iso-countries/langs/en.json';
import countriesZh from 'i18n-iso-countries/langs/zh.json';
import { TRAVEL_LIST } from '@site/src/data/travel';
import {
  getFeatureIso3,
  getTravelCountryCodes,
  type GlobeCountryFeature,
  type WorldGeoJson,
} from '@site/src/utils/travelGlobe';

countries.registerLocale(countriesEn);
countries.registerLocale(countriesZh);
import Tooltip from '@site/src/components/laikit/Tooltip';
import styles from './styles.module.css';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';

type GlobeComponent = ComponentType<
  GlobeProps & { ref?: MutableRefObject<GlobeMethods | undefined> }
>;
type GlobeMaterial = NonNullable<GlobeProps['globeMaterial']>;

const three = require('three') as {
  MeshBasicMaterial: new (parameters?: object) => GlobeMaterial;
  CanvasTexture: new (canvas: HTMLCanvasElement) => { colorSpace: string; anisotropy: number };
  SRGBColorSpace: string;
};

const VISITED_LABEL = translate({
  id: 'pages.travel.map.legend.visited',
  message: 'Visited',
});
const NOT_VISITED_LABEL = translate({
  id: 'pages.travel.map.legend.unvisited',
  message: 'Not Visited',
});

function readCssVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
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

function TravelGlobeClient({ Globe }: { Globe: GlobeComponent }) {
  const { i18n } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [size, setSize] = useState({ width: 720, height: 500 });
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [features, setFeatures] = useState<readonly GlobeCountryFeature[]>([]);

  const lang = i18n.currentLocale === 'zh-Hans' ? 'zh' : 'en';

  const [hovered, setHovered] = useState<{
    name: string;
    visited: boolean;
    flag: string | null;
  } | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const worldUrl = useBaseUrl('/json/world.geo.json');
  useEffect(() => {
    let cancelled = false;
    fetch(worldUrl)
      .then((r) => r.json() as Promise<WorldGeoJson>)
      .then((data) => {
        if (!cancelled) setFeatures(data.features);
      });
    return () => {
      cancelled = true;
    };
  }, [worldUrl]);

  const visitedCountries = useMemo(() => new Set(getTravelCountryCodes(TRAVEL_LIST)), []);

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
      ocean: colorMode === 'dark' ? '#222831' : '#eef1f5',
      visited: readCssVar('--ifm-color-primary', '#1d9bf0'),
      unvisited: colorMode === 'dark' ? '#3a4453' : '#cdd5df',
      stroke: colorMode === 'dark' ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)',
    }),
    [colorMode]
  );

  const globeMaterial = useMemo<GlobeMaterial>(() => {
    if (features.length === 0) return new three.MeshBasicMaterial({ color: colors.ocean });
    const texture = new three.CanvasTexture(bakeGlobeTexture(features, visitedCountries, colors));
    texture.colorSpace = three.SRGBColorSpace;
    texture.anisotropy = 8;
    return new three.MeshBasicMaterial({ map: texture });
  }, [features, visitedCountries, colors]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateSize = () => {
      const width = Math.max(Math.round(element.clientWidth), 320);
      const height = Math.min(Math.max(Math.round(width * 0.7), 360), 560);
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
  const onFrameMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const globe = globeRef.current;
    const canvas = globe?.renderer()?.domElement;
    const rect = canvas?.getBoundingClientRect();
    if (!globe || !canvas || !rect) return;
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    setCursor({ x: px, y: py });
    const coords = globe.toGlobeCoords(
      (px / rect.width) * size.width,
      (py / rect.height) * size.height
    );
    if (!coords) {
      setHovered(null);
      return;
    }
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
    if (!f) {
      setHovered(null);
      return;
    }
    const code = getFeatureIso3(f);
    const alpha2 = countries.alpha3ToAlpha2(code);
    setHovered({
      name: countries.getName(code, lang) ?? f.properties.NAME ?? code,
      visited: visitedCountries.has(code),
      flag: alpha2 ? `flag:${alpha2.toLowerCase()}-4x3` : null,
    });
  };

  const handleReady = () => {
    const globe = globeRef.current;
    if (!globe) return;
    const controls = globe.controls();
    controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    globe.pointOfView({ lat: 20, lng: 110, altitude: 2 }, 0);
    setIsGlobeReady(true);
  };

  return (
    <div className={styles.globeShell} ref={containerRef}>
      <div className={styles.globeFrame} ref={frameRef} onMouseMove={onFrameMouseMove}>
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          rendererConfig={{ antialias: true }}
          showGlobe
          globeMaterial={globeMaterial}
          onGlobeReady={handleReady}
        />
        {hovered && (
          <div className={styles.tooltipAnchor} style={{ left: cursor.x, top: cursor.y }}>
            <Tooltip>
              <Tooltip.Label className={styles.tooltipLabelRow}>
                {hovered.flag && <Icon icon={hovered.flag} className={styles.tooltipFlag} />}
                {hovered.name}
              </Tooltip.Label>
              <Tooltip.Value>{hovered.visited ? VISITED_LABEL : NOT_VISITED_LABEL}</Tooltip.Value>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TravelMap() {
  return (
    <BrowserOnly>
      {() => {
        const Globe = require('react-globe.gl').default as GlobeComponent;
        return <TravelGlobeClient Globe={Globe} />;
      }}
    </BrowserOnly>
  );
}
