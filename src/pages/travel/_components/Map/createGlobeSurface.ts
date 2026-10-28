import CssColor from 'color';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { CanvasTexture, Color, MeshBasicMaterial, RepeatWrapping, SRGBColorSpace } from 'three';
import { getFeatureIso3, type GlobeCountryFeature } from '@site/src/utils/travelGlobe';

type GlobeColors = { dark: boolean; ink: string; visited: string };

export function createGlobeSurface(
  features: readonly GlobeCountryFeature[],
  visited: ReadonlySet<string>,
  colors: GlobeColors
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
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  texture.wrapS = RepeatWrapping;
  const material = new MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false });
  const rimColor = { value: new Color() };
  const rimOpacity = { value: 0.035 };
  // A view-dependent edge gives the clear ocean a boundary without directional shading.
  material.onBeforeCompile = (shader) => {
    shader.uniforms.globeRimColor = rimColor;
    shader.uniforms.globeRimOpacity = rimOpacity;
    shader.vertexShader =
      `varying vec3 globeNormal;\nvarying vec3 globeView;\n${shader.vertexShader}`.replace(
        '#include <project_vertex>',
        '#include <project_vertex>\nglobeNormal = normalize(normalMatrix * normal);\nglobeView = -mvPosition.xyz;'
      );
    shader.fragmentShader =
      `varying vec3 globeNormal;\nvarying vec3 globeView;\nuniform vec3 globeRimColor;\nuniform float globeRimOpacity;\n${shader.fragmentShader}`.replace(
        '#include <alphamap_fragment>',
        `#include <alphamap_fragment>
       float edge = pow(1.0 - abs(dot(normalize(globeNormal), normalize(globeView))), 3.5);
       float rimAlpha = edge * globeRimOpacity;
       float combinedAlpha = diffuseColor.a + rimAlpha * (1.0 - diffuseColor.a);
       diffuseColor.rgb = mix(diffuseColor.rgb, globeRimColor, rimAlpha / max(combinedAlpha, 0.0001));
       diffuseColor.a = combinedAlpha;`
      );
  };

  let paintedColors: GlobeColors | null = null;
  const setColors = (next: GlobeColors) => {
    if (paintedColors === next) return;
    paintedColors = next;
    rimColor.value.set(CssColor(next.ink).mix(CssColor(next.visited), 0.18).hex());
    rimOpacity.value = 0.035 * (next.dark ? 1.25 : 1);
    context.clearRect(0, 0, canvas.width, canvas.height);
    const rgba = (color: string, alpha: number) => CssColor(color).alpha(alpha).rgb().string();
    for (const feature of features) {
      const seen = visited.has(getFeatureIso3(feature));
      context.beginPath();
      path(feature as GeoJSON.Feature);
      context.fillStyle = rgba(
        seen ? next.visited : next.ink,
        seen ? 0.3 : next.dark ? 0.09 : 0.055
      );
      context.fill();
      context.strokeStyle = rgba(next.ink, 0.24);
      context.lineWidth = 1.5;
      context.lineJoin = 'round';
      if (!seen) context.stroke();
    }
    context.strokeStyle = next.visited;
    context.lineWidth = 1.5;
    // Draw visited borders last so neighbouring land cannot soften the outline.
    for (const feature of features) {
      if (!visited.has(getFeatureIso3(feature))) continue;
      context.beginPath();
      path(feature as GeoJSON.Feature);
      context.stroke();
    }
    texture.needsUpdate = true;
  };
  setColors(colors);

  return {
    material,
    setColors,
    dispose() {
      material.dispose();
      texture.dispose();
      canvas.width = canvas.height = 0;
    },
  };
}
