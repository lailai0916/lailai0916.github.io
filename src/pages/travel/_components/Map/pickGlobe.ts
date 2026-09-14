import { Raycaster, Sphere, Vector2, Vector3 } from 'three';
import type { GlobeMethods } from 'react-globe.gl';

export function createGlobePicker() {
  const raycaster = new Raycaster();
  const pointer = new Vector2();
  const sphere = new Sphere(new Vector3());
  const intersection = new Vector3();

  return (globe: GlobeMethods, x: number, y: number) => {
    pointer.set(x * 2 - 1, 1 - y * 2);
    sphere.radius = globe.getGlobeRadius();
    raycaster.setFromCamera(pointer, globe.camera());
    // The globe is centred at the origin; avoid raycasting its triangle mesh.
    return raycaster.ray.intersectSphere(sphere, intersection)
      ? globe.toGeoCoords(intersection)
      : null;
  };
}
