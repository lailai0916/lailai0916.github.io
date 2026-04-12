import React, { useEffect, useMemo, useRef, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';
import { useColorMode } from '@docusaurus/theme-common';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import { TRAVEL_LIST } from '@site/src/data/travel';
import { getTravelCountryCodes } from '@site/src/utils/travel';
import {
  getTravelPolygons,
  type TravelPolygon,
} from '@site/src/utils/travelGlobe';
import styles from './styles.module.css';
import type { GlobeMethods, GlobeProps } from 'react-globe.gl';
import { MeshBasicMaterial } from 'three';

type GlobeComponent = React.ComponentType<
  GlobeProps & { ref?: React.MutableRefObject<GlobeMethods | undefined> }
>;

interface CustomGlobePolygon extends TravelPolygon {
  properties: {
    name: string;
    name_zh?: string;
    name_en?: string;
  };
}

const TITLE = translate({
  id: 'pages.travel.map.title',
  message: 'Travel Map',
});
const DESCRIPTION = translate({
  id: 'pages.travel.map.description',
  message: 'Interactive map showing countries I have visited around the world',
});
const VISITED_LABEL = translate({
  id: 'pages.travel.map.legend.visited',
  message: 'Visited',
});
const NOT_VISITED_LABEL = translate({
  id: 'pages.travel.map.legend.unvisited',
  message: 'Not visited',
});

function readCssVar(name: string, fallback: string) {
  if (typeof window === 'undefined') return fallback;
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
}

function TravelGlobeClient({ Globe }: { Globe: GlobeComponent }) {
  const { i18n } = useDocusaurusContext();
  const { colorMode } = useColorMode();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [size, setSize] = useState({ width: 720, height: 500 });

  const visitedCountries = useMemo(
    () => new Set(getTravelCountryCodes(TRAVEL_LIST)),
    []
  );
  const polygons = useMemo(
    () => getTravelPolygons(visitedCountries),
    [visitedCountries]
  );
  const colors = useMemo(
    () => ({
      ocean: colorMode === 'dark' ? '#2d3440' : '#dfe4ea',
      visited: readCssVar('--ifm-color-primary', '#1d9bf0'),
      unvisited: colorMode === 'dark' ? '#66707d' : '#b8c0cb',
      stroke: colorMode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.15)',
    }),
    [colorMode]
  );
  const globeMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: colors.ocean,
      }),
    [colors.ocean]
  );
  const visitedPolygonMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: colors.visited,
      }),
    [colors.visited]
  );
  const unvisitedPolygonMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: colors.unvisited,
      }),
    [colors.unvisited]
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateSize = () => {
      const width = Math.max(Math.round(element.clientWidth), 320);
      const height = Math.min(Math.max(Math.round(width * 0.7), 360), 560);
      setSize((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height }
      );
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleReady = () => {
    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    globe.pointOfView({ lat: 20, lng: 110, altitude: 2 }, 0);
  };

  return (
    <div className={styles.globeShell} ref={containerRef}>
      <div className={styles.globeFrame}>
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          backgroundColor="rgba(0,0,0,0)"
          showGlobe
          globeMaterial={globeMaterial}
          polygonsData={polygons}
          polygonCapMaterial={(polygon) =>
            (polygon as TravelPolygon).visited
              ? visitedPolygonMaterial
              : unvisitedPolygonMaterial
          }
          polygonSideMaterial={(polygon) =>
            (polygon as TravelPolygon).visited
              ? visitedPolygonMaterial
              : unvisitedPolygonMaterial
          }
          polygonStrokeColor={false}
          polygonAltitude={0.01}
          polygonsTransitionDuration={180}
          polygonLabel={(polygon) => {
            const item = polygon as CustomGlobePolygon;
            const isZh = i18n.currentLocale === 'zh-Hans';
            const localizedName = isZh
              ? item.properties.name_zh || item.properties.name
              : item.properties.name_en || item.properties.name;
            return `${localizedName}<br />${item.visited ? VISITED_LABEL : NOT_VISITED_LABEL}`;
          }}
          onGlobeReady={handleReady}
        />
      </div>
    </div>
  );
}

export default function TravelMap() {
  return (
    <SectionContainer>
      <SectionHeader title={TITLE} description={DESCRIPTION} />
      <BrowserOnly>
        {() => {
          const Globe = require('react-globe.gl').default as GlobeComponent;
          return <TravelGlobeClient Globe={Globe} />;
        }}
      </BrowserOnly>
    </SectionContainer>
  );
}
