import type { GlobeMethods } from 'react-globe.gl';

export const HOME_LOCATION = { lat: 30.2741, lng: 120.1551 } as const;

const MARKER_SIZE = 64;
const ANCHOR_X = 32;
const ANCHOR_Y = 52;
const FADE_DURATION_MS = 200;
const BACK_OPACITY = 0.2;

function bakeMarker(avatar: HTMLImageElement | null, ratio: number) {
  const bitmap = document.createElement('canvas');
  const pin = document.createElement('canvas');
  bitmap.width = bitmap.height = pin.width = pin.height = Math.ceil(MARKER_SIZE * ratio);
  const ctx = bitmap.getContext('2d');
  const pinCtx = pin.getContext('2d');
  if (!ctx || !pinCtx) return bitmap;

  const style = getComputedStyle(document.documentElement);
  const white = style.getPropertyValue('--ifm-color-white').trim();
  const border = style.getPropertyValue('--ifm-color-gray-300').trim();
  // This token is a single shadow: x/y/blur in pixels, followed by its CSS color.
  const shadow = style
    .getPropertyValue('--lk-shadow-pin')
    .trim()
    .match(/^(-?[\d.]+)(?:px)?\s+(-?[\d.]+)(?:px)?\s+([\d.]+)(?:px)?\s+(.+)$/);
  const scale = bitmap.width / MARKER_SIZE;
  pinCtx.scale(scale, scale);
  pinCtx.fillStyle = white;
  pinCtx.beginPath();
  pinCtx.arc(32, 27, 16, 0, Math.PI * 2);
  pinCtx.fill();
  pinCtx.beginPath();
  pinCtx.moveTo(27, 41);
  pinCtx.lineTo(37, 41);
  pinCtx.lineTo(32, 48);
  pinCtx.closePath();
  pinCtx.fill();
  if (avatar?.complete && avatar.naturalWidth > 0) {
    pinCtx.save();
    pinCtx.beginPath();
    pinCtx.arc(32, 27, 14, 0, Math.PI * 2);
    pinCtx.clip();
    pinCtx.drawImage(avatar, 18, 13, 28, 28);
    pinCtx.restore();
  }

  ctx.scale(scale, scale);
  if (shadow) {
    // Canvas shadows do not inherit the drawing transform's pixel density.
    ctx.shadowOffsetX = Number(shadow[1]) * scale;
    ctx.shadowOffsetY = Number(shadow[2]) * scale;
    ctx.shadowBlur = Number(shadow[3]) * scale;
    ctx.shadowColor = shadow[4];
  }
  // Shadow the joined pin once, so its tip does not cast a seam onto the avatar.
  ctx.drawImage(pin, 0, 0, MARKER_SIZE, MARKER_SIZE);
  ctx.fillStyle = white;
  ctx.beginPath();
  ctx.arc(ANCHOR_X, ANCHOR_Y, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowColor = 'rgba(0,0,0,0)';
  ctx.strokeStyle = border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(ANCHOR_X, ANCHOR_Y, 4.5, 0, Math.PI * 2);
  ctx.stroke();
  pin.width = pin.height = 0;
  return bitmap;
}

export function attachLocationMarker(
  globe: GlobeMethods,
  canvas: HTMLCanvasElement,
  avatar: HTMLImageElement | null,
  width: number,
  height: number
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const scene = globe.scene();
  const previousAfterRender = scene.onAfterRender;
  const position = globe.getCoords(HOME_LOCATION.lat, HOME_LOCATION.lng, 0);
  const radiusSquared = globe.getGlobeRadius() ** 2;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ratio = 0;
  let bitmap: HTMLCanvasElement | null = null;
  let previousRect: { x: number; y: number; width: number; height: number } | null = null;
  let lastX = NaN;
  let lastY = NaN;
  let lastOpacity = NaN;
  let opacity = 1;
  let targetOpacity: number | null = null;
  let startOpacity = 1;
  let fadeStartedAt = 0;

  const drawMarker = () => {
    const nextRatio = window.devicePixelRatio || 1;
    if (ratio !== nextRatio) {
      ratio = nextRatio;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (bitmap) bitmap.width = bitmap.height = 0;
      bitmap = bakeMarker(avatar, ratio);
      previousRect = null;
      lastX = NaN;
    }

    const point = globe.getScreenCoords(HOME_LOCATION.lat, HOME_LOCATION.lng, 0);
    const camera = globe.camera().position;
    // A surface point faces the camera when it lies in front of the tangent plane.
    const isVisible =
      camera.x * position.x + camera.y * position.y + camera.z * position.z >= radiusSquared;
    const nextOpacity = isVisible ? 1 : BACK_OPACITY;
    const now = performance.now();
    if (targetOpacity === null || reducedMotion.matches) {
      opacity = startOpacity = nextOpacity;
      targetOpacity = nextOpacity;
    } else {
      const progress = Math.min(1, (now - fadeStartedAt) / FADE_DURATION_MS);
      opacity = startOpacity + (targetOpacity - startOpacity) * progress ** 2 * (3 - 2 * progress);
      if (targetOpacity !== nextOpacity) {
        startOpacity = opacity;
        targetOpacity = nextOpacity;
        fadeStartedAt = now;
      }
    }

    if (point.x === lastX && point.y === lastY && opacity === lastOpacity) return;
    if (previousRect) {
      ctx.clearRect(previousRect.x, previousRect.y, previousRect.width, previousRect.height);
      previousRect = null;
    }
    lastX = point.x;
    lastY = point.y;
    lastOpacity = opacity;
    if (!bitmap || !Number.isFinite(point.x) || !Number.isFinite(point.y)) return;
    ctx.globalAlpha = opacity;
    ctx.drawImage(bitmap, point.x - ANCHOR_X, point.y - ANCHOR_Y, MARKER_SIZE, MARKER_SIZE);
    const x = Math.floor(point.x - ANCHOR_X) - 1;
    const y = Math.floor(point.y - ANCHOR_Y) - 1;
    previousRect = {
      x,
      y,
      width: Math.ceil(point.x - ANCHOR_X + MARKER_SIZE) + 1 - x,
      height: Math.ceil(point.y - ANCHOR_Y + MARKER_SIZE) + 1 - y,
    };
  };

  // Share the globe's render loop: pausing it offscreen also pauses the marker.
  const afterRender: typeof scene.onAfterRender = function (this: typeof scene, ...args) {
    previousAfterRender.apply(this, args);
    drawMarker();
  };
  scene.onAfterRender = afterRender;

  return () => {
    if (scene.onAfterRender === afterRender) scene.onAfterRender = previousAfterRender;
    if (bitmap) bitmap.width = bitmap.height = 0;
    canvas.width = canvas.height = 0;
  };
}
