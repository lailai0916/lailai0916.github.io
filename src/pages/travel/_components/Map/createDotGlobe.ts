import { geoEquirectangular, geoPath } from 'd3-geo';
import {
  BufferGeometry,
  CircleGeometry,
  Float32BufferAttribute,
  Group,
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  MeshBasicMaterial,
  Object3D,
} from 'three';
import type { GlobeMethods } from 'react-globe.gl';
import { getFeatureIso3, type GlobeCountryFeature } from '@site/src/utils/travelGlobe';

const SAMPLE_COUNT = 50000;
const MASK_WIDTH = 2048;
const MASK_HEIGHT = MASK_WIDTH / 2;

function sampleLand(features: readonly GlobeCountryFeature[], visited: ReadonlySet<string>) {
  const canvas = document.createElement('canvas');
  canvas.width = MASK_WIDTH;
  canvas.height = MASK_HEIGHT;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('A canvas context is required to sample the globe.');
  const projection = geoEquirectangular().fitSize([MASK_WIDTH, MASK_HEIGHT], { type: 'Sphere' });
  const path = geoPath(projection, context);
  for (const feature of features) {
    context.beginPath();
    path(feature as GeoJSON.Feature);
    context.fillStyle = visited.has(getFeatureIso3(feature)) ? '#ff0000' : '#0000ff';
    context.fill();
  }
  const { data } = context.getImageData(0, 0, MASK_WIDTH, MASK_HEIGHT);
  canvas.width = canvas.height = 0;
  const points: [number, number][][] = [[], []];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  // Equal-area samples avoid the dense polar bands of a latitude/longitude grid.
  for (let index = 0; index < SAMPLE_COUNT; index++) {
    const lat = (Math.asin(1 - (2 * (index + 0.5)) / SAMPLE_COUNT) * 180) / Math.PI;
    const lng = (((index * goldenAngle * 180) / Math.PI) % 360) - 180;
    const x = Math.floor(((lng + 180) / 360) * MASK_WIDTH);
    const y = Math.floor(((90 - lat) / 180) * MASK_HEIGHT);
    const offset = (y * MASK_WIDTH + x) * 4;
    if (data[offset + 3] >= 128) {
      points[data[offset] > data[offset + 2] ? 1 : 0].push([lat, lng]);
    }
  }
  return points;
}

export function createDotGlobe(
  globe: GlobeMethods,
  features: readonly GlobeCountryFeature[],
  visited: ReadonlySet<string>
) {
  const points = sampleLand(features, visited);
  const group = new Group();
  group.name = 'travel-dot-globe';
  const geometry = new CircleGeometry(globe.getGlobeRadius() * 0.00475, 16);
  const materials = [new MeshBasicMaterial(), new MeshBasicMaterial()];
  const transform = new Object3D();
  const meshes = points.map((locations, category) => {
    const mesh = new InstancedMesh(geometry, materials[category], locations.length);
    locations.forEach(([lat, lng], index) => {
      const { x, y, z } = globe.getCoords(lat, lng, 0.002);
      transform.position.set(x, y, z);
      transform.lookAt(x * 2, y * 2, z * 2);
      transform.updateMatrix();
      mesh.setMatrixAt(index, transform.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
    // Country hover is resolved on the sphere, never against individual dots.
    mesh.raycast = () => undefined;
    group.add(mesh);
    return mesh;
  });

  const vertices: number[] = [];
  const addSegment = (lat: number, lng: number, nextLat: number, nextLng: number) => {
    for (const [latitude, longitude] of [
      [lat, lng],
      [nextLat, nextLng],
    ]) {
      const { x, y, z } = globe.getCoords(latitude, longitude, 0.0005);
      vertices.push(x, y, z);
    }
  };
  for (let lng = -180; lng < 180; lng += 15) {
    for (let lat = -90; lat < 90; lat += 2) addSegment(lat, lng, lat + 2, lng);
  }
  for (let lat = -75; lat <= 75; lat += 15) {
    for (let lng = -180; lng < 180; lng += 2) addSegment(lat, lng, lat, lng + 2);
  }
  const gridGeometry = new BufferGeometry();
  gridGeometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
  const gridMaterial = new LineBasicMaterial();
  const grid = new LineSegments(gridGeometry, gridMaterial);
  grid.raycast = () => undefined;
  group.add(grid);

  return {
    group,
    setColors(colors: { unvisited: string; visited: string; grid: string }) {
      materials[0].color.set(colors.unvisited);
      materials[1].color.set(colors.visited);
      gridMaterial.color.set(colors.grid);
    },
    dispose() {
      group.removeFromParent();
      meshes.forEach((mesh) => mesh.dispose());
      geometry.dispose();
      materials.forEach((material) => material.dispose());
      gridGeometry.dispose();
      gridMaterial.dispose();
    },
  };
}
