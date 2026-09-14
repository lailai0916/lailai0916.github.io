import { geoEquirectangular, geoGraticule, geoPath } from 'd3-geo';
import { CanvasTexture, SRGBColorSpace } from 'three';
import { getFeatureIso3, type GlobeCountryFeature } from '@site/src/utils/travelGlobe';

export function createGlobeTexture(
  features: readonly GlobeCountryFeature[],
  visited: ReadonlySet<string>,
  colors: { ocean: string; grid: string; visited: string; unvisited: string; stroke: string }
) {
  const canvas = document.createElement('canvas');
  canvas.width = 4096;
  canvas.height = 2048;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('A canvas context is required to paint the globe.');
  const projection = geoEquirectangular().fitSize([canvas.width, canvas.height], {
    type: 'Sphere',
  });
  const path = geoPath(projection, context);

  context.fillStyle = colors.ocean;
  context.fillRect(0, 0, canvas.width, canvas.height);
  // Paint below country fills so the graticule only shows through water.
  context.beginPath();
  path(geoGraticule().step([15, 15])());
  context.lineWidth = 2;
  context.strokeStyle = colors.grid;
  context.stroke();

  context.lineJoin = 'round';
  context.lineWidth = 0.8;
  context.strokeStyle = colors.stroke;
  for (const feature of features) {
    context.beginPath();
    path(feature as GeoJSON.Feature);
    context.fillStyle = visited.has(getFeatureIso3(feature)) ? colors.visited : colors.unvisited;
    context.fill();
    context.stroke();
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}
