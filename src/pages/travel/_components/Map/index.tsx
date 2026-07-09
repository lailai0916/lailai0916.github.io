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
import * as countries from 'i18n-iso-countries';
import countriesEn from 'i18n-iso-countries/langs/en.json';
import countriesZh from 'i18n-iso-countries/langs/zh.json';
import { TRAVEL_LIST } from '@site/src/data/travel';
import {
  buildTravelPolygons,
  getFeatureIso3,
  getTravelCountryCodes,
  type GlobeCountryFeature,
  type TravelPolygon,
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
type MeshBasicMaterialCtor = new (parameters: { color: string }) => GlobeMaterial;

const { MeshBasicMaterial } = require('three') as {
  MeshBasicMaterial: MeshBasicMaterialCtor;
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

  // Country hover card: a laikit Tooltip that follows the cursor, replacing
  // react-globe.gl's plain built-in label. `cursorRef` tracks the pointer even
  // when nothing is hovered, so the tooltip has a position the moment a country
  // is entered; state only updates while a country is actually under the cursor.
  const cursorRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);
  const [hovered, setHovered] = useState<{
    name: string;
    visited: boolean;
    flag: string | null;
  } | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const onFrameMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    cursorRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    if (hoveredRef.current) setCursor(cursorRef.current);
  };

  const worldUrl = useBaseUrl('/json/datamaps.world.json');
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
  const polygons = useMemo(
    () => buildTravelPolygons(features, visitedCountries),
    [features, visitedCountries]
  );

  const colors = useMemo(
    () => ({
      ocean: colorMode === 'dark' ? '#2d3440' : '#dfe4ea',
      visited: readCssVar('--ifm-color-primary', '#1d9bf0'),
      unvisited: colorMode === 'dark' ? '#66707d' : '#b8c0cb',
      stroke: colorMode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.2)',
    }),
    [colorMode]
  );

  const globeMaterial = useMemo<GlobeMaterial>(
    () =>
      new MeshBasicMaterial({
        color: colors.ocean,
      }),
    [colors.ocean]
  );

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
          showGlobe
          globeMaterial={globeMaterial}
          polygonsData={polygons}
          polygonCapColor={(polygon) =>
            (polygon as TravelPolygon).visited ? colors.visited : colors.unvisited
          }
          polygonSideColor={(polygon) =>
            (polygon as TravelPolygon).visited ? colors.visited : colors.unvisited
          }
          polygonStrokeColor={() => colors.stroke}
          polygonAltitude={0.01}
          polygonsTransitionDuration={0}
          polygonLabel={() => ''}
          onPolygonHover={(polygon) => {
            if (!polygon) {
              hoveredRef.current = false;
              setHovered(null);
              return;
            }
            const item = polygon as TravelPolygon;
            const code = getFeatureIso3(item);
            const name = countries.getName(code, lang) ?? item.properties.NAME ?? '';
            const alpha2 = countries.alpha3ToAlpha2(code);
            const flag = alpha2 ? `flag:${alpha2.toLowerCase()}-4x3` : null;
            hoveredRef.current = true;
            setCursor(cursorRef.current);
            setHovered({ name, visited: item.visited, flag });
          }}
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
