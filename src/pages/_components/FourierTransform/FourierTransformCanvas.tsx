import React, { useRef, useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Card from '@site/src/components/laikit/Card';
import styles from './styles.module.css';

const TWO_PI = 2 * Math.PI;
const STATE = { DRAWING: 1, PLAYING: 2 } as const;
const BASE_SIZE = 500;

function getPrimaryColor(): string {
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue('--ifm-color-primary').trim();
}

const THEME_COLORS = {
  dark: {
    background: '#000000',
    circleStroke: 'rgba(255, 255, 255, 0.2)',
    lineStroke: 'rgba(255, 255, 255, 0.5)',
    centerPoint: 'rgba(255, 255, 255, 0.3)',
  },
  light: {
    background: '#ffffff',
    circleStroke: 'rgba(0, 0, 0, 0.15)',
    lineStroke: 'rgba(0, 0, 0, 0.3)',
    centerPoint: 'rgba(0, 0, 0, 0.2)',
  },
} as const;

interface Point {
  x: number;
  y: number;
}

interface FourierCoefficient {
  freq: number;
  amp: number;
  phase: number;
}

function dft(points: Point[]): FourierCoefficient[] {
  const N = points.length;
  const result: FourierCoefficient[] = [];

  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;

    for (let n = 0; n < N; n++) {
      const phi = (TWO_PI * k * n) / N;
      const cos = Math.cos(phi);
      const sin = Math.sin(phi);
      re += points[n].x * cos + points[n].y * sin;
      im += points[n].y * cos - points[n].x * sin;
    }

    const freq = k <= N / 2 ? k : k - N;
    result.push({
      freq,
      amp: Math.hypot(re, im) / N,
      phase: Math.atan2(im, re),
    });
  }

  return result.sort((a, b) => b.amp - a.amp);
}

function centerPoints(points: Point[]): Point[] {
  if (points.length === 0) return points;
  let cx = 0;
  let cy = 0;
  for (const p of points) {
    cx += p.x;
    cy += p.y;
  }
  cx /= points.length;
  cy /= points.length;
  return points.map((p) => ({ x: p.x - cx, y: p.y - cy }));
}

export default function FourierTransformCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(BASE_SIZE);
  const [dpr, setDpr] = useState(1);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const stateRef = useRef({
    currentState: STATE.PLAYING as (typeof STATE)[keyof typeof STATE],
    // Drawing in BASE_SIZE coordinates; render rescales to canvasSize each rebuild.
    baseDrawing: [] as Point[],
    drawing: [] as Point[],
    fourierX: [] as FourierCoefficient[],
    path: [] as Point[],
    time: 0,
    phase: 'draw' as 'draw' | 'erase',
    eraseIndex: 0,
  });

  // Theme colors live in a ref so theme changes don't restart the animation effect.
  const themeRef = useRef({
    primary: '',
    colors:
      THEME_COLORS.light as (typeof THEME_COLORS)[keyof typeof THEME_COLORS],
  });

  const initDefault = () => {
    // Cherng's mathematical heart — chosen for its rich Fourier spectrum.
    // The complex spectrum has nonzero terms at ±1, ±2, ±3, ±4, so the
    // visualization shows a clear cascade of ~8 distinct epicycles.
    const total = 360;
    const scale = BASE_SIZE * 0.022;
    const pts: Point[] = [];
    for (let i = 0; i < total; i++) {
      const t = (i / total) * TWO_PI;
      pts.push({
        x: 16 * Math.sin(t) ** 3 * scale,
        // Negate y so the heart points up on screen (canvas y is inverted).
        y:
          -(
            13 * Math.cos(t) -
            5 * Math.cos(2 * t) -
            2 * Math.cos(3 * t) -
            Math.cos(4 * t)
          ) * scale,
      });
    }
    stateRef.current.baseDrawing = centerPoints(pts);
    rebuildFromBase();
  };

  const rebuildFromBase = () => {
    const state = stateRef.current;
    const ratio = canvasSize / BASE_SIZE;
    state.drawing = state.baseDrawing.map((p) => ({
      x: p.x * ratio,
      y: p.y * ratio,
    }));
    state.fourierX = dft(state.drawing);
    state.currentState = STATE.PLAYING;
    state.path = [];
    state.time = 0;
    state.phase = 'draw';
    state.eraseIndex = 0;
  };

  const captureDrawing = (drawn: Point[]) => {
    const state = stateRef.current;
    const ratio = BASE_SIZE / canvasSize;
    // Preserve the position the user drew at — don't recenter on centroid.
    state.baseDrawing = drawn.map((p) => ({
      x: p.x * ratio,
      y: p.y * ratio,
    }));
    rebuildFromBase();
  };

  // Resolve devicePixelRatio after mount to avoid SSR hydration mismatch.
  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const newSize = Math.min(containerWidth, BASE_SIZE);
      setCanvasSize((prev) => (Math.abs(newSize - prev) > 1 ? newSize : prev));
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Rebuild from base coordinates whenever canvas size changes.
  useEffect(() => {
    if (stateRef.current.baseDrawing.length === 0) {
      initDefault();
    } else {
      rebuildFromBase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasSize]);

  // Update theme colors via ref so animation loop keeps running across theme toggles.
  useEffect(() => {
    themeRef.current = {
      primary: getPrimaryColor(),
      colors: isDark ? THEME_COLORS.dark : THEME_COLORS.light,
    };
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Make sure theme is populated before the first frame.
    if (themeRef.current.primary === '') {
      themeRef.current = {
        primary: getPrimaryColor(),
        colors: isDark ? THEME_COLORS.dark : THEME_COLORS.light,
      };
    }

    const state = stateRef.current;
    let animationId: number;

    const drawEpicycles = (): Point => {
      const { colors } = themeRef.current;
      let x = 0;
      let y = 0;

      for (let i = 0; i < state.fourierX.length; i++) {
        const prevx = x;
        const prevy = y;
        const { freq, amp, phase } = state.fourierX[i];
        const angle = freq * state.time + phase;

        x += amp * Math.cos(angle);
        y += amp * Math.sin(angle);

        if (amp > 2 || i < 15) {
          ctx.strokeStyle = colors.circleStroke;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(prevx, prevy, amp, 0, TWO_PI);
          ctx.stroke();
        }

        ctx.strokeStyle = colors.lineStroke;
        ctx.beginPath();
        ctx.moveTo(prevx, prevy);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      return { x, y };
    };

    // Willow-leaf brush: bell-curve taper sin(π·t) along the *full* curve
    // (offset shifts t when the slice no longer starts at 0, e.g. during erase).
    // Three passes — wide+faint, mid, crisp — give a soft glow; dark mode
    // uses 'lighter' so the halo blooms instead of stacking opaquely.
    const drawWillowLeaf = (points: Point[], offset: number) => {
      const total = state.fourierX.length;
      if (points.length < 2 || total < 2) return;

      const N = points.length;
      const baseWidth = Math.max(2.5, canvasSize * 0.014);
      const taper = new Float32Array(N);
      const nx = new Float32Array(N);
      const ny = new Float32Array(N);

      for (let i = 0; i < N; i++) {
        const t = (i + offset) / total;
        const tc = t < 0 ? 0 : t > 1 ? 1 : t;
        taper[i] = Math.pow(Math.sin(Math.PI * tc), 0.65);

        let dx: number;
        let dy: number;
        if (i === 0) {
          dx = points[1].x - points[0].x;
          dy = points[1].y - points[0].y;
        } else if (i === N - 1) {
          dx = points[i].x - points[i - 1].x;
          dy = points[i].y - points[i - 1].y;
        } else {
          dx = points[i + 1].x - points[i - 1].x;
          dy = points[i + 1].y - points[i - 1].y;
        }
        const len = Math.hypot(dx, dy) || 1;
        nx[i] = -dy / len;
        ny[i] = dx / len;
      }

      const passes = isDark
        ? [
            { scale: 2.6, alpha: 0.1, comp: 'lighter' },
            { scale: 1.5, alpha: 0.32, comp: 'lighter' },
            { scale: 1.0, alpha: 1.0, comp: 'source-over' },
          ]
        : [
            { scale: 1.8, alpha: 0.09, comp: 'source-over' },
            { scale: 1.3, alpha: 0.22, comp: 'source-over' },
            { scale: 1.0, alpha: 1.0, comp: 'source-over' },
          ];

      const primary = themeRef.current.primary;
      for (const pass of passes) {
        const w = baseWidth * pass.scale;
        ctx.save();
        ctx.globalCompositeOperation = pass.comp as GlobalCompositeOperation;
        ctx.globalAlpha = pass.alpha;
        ctx.fillStyle = primary;

        ctx.beginPath();
        const w0 = w * taper[0];
        ctx.moveTo(points[0].x + nx[0] * w0, points[0].y + ny[0] * w0);
        for (let i = 1; i < N; i++) {
          const ww = w * taper[i];
          ctx.lineTo(points[i].x + nx[i] * ww, points[i].y + ny[i] * ww);
        }
        for (let i = N - 1; i >= 0; i--) {
          const ww = w * taper[i];
          ctx.lineTo(points[i].x - nx[i] * ww, points[i].y - ny[i] * ww);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };

    const drawLiveStroke = (points: Point[]) => {
      if (points.length < 2) return;
      ctx.save();
      ctx.strokeStyle = themeRef.current.primary;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = Math.max(2.5, canvasSize * 0.014);
      ctx.globalAlpha = 0.92;
      if (isDark) {
        ctx.shadowColor = themeRef.current.primary;
        ctx.shadowBlur = 12;
      }
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawTip = (x: number, y: number) => {
      const primary = themeRef.current.primary;
      ctx.save();
      if (isDark) ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = primary;

      ctx.globalAlpha = isDark ? 0.18 : 0.1;
      ctx.beginPath();
      ctx.arc(x, y, canvasSize * 0.04, 0, TWO_PI);
      ctx.fill();

      ctx.globalAlpha = isDark ? 0.36 : 0.22;
      ctx.beginPath();
      ctx.arc(x, y, canvasSize * 0.022, 0, TWO_PI);
      ctx.fill();

      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(x, y, Math.max(2, canvasSize * 0.008), 0, TWO_PI);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      const { primary, colors } = themeRef.current;

      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      ctx.save();
      ctx.translate(canvasSize / 2, canvasSize / 2);

      ctx.fillStyle = colors.centerPoint;
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, TWO_PI);
      ctx.fill();

      if (state.currentState === STATE.DRAWING) {
        drawLiveStroke(state.drawing);
      } else if (
        state.currentState === STATE.PLAYING &&
        state.fourierX.length > 0
      ) {
        if (state.drawing.length > 1) {
          ctx.save();
          ctx.strokeStyle = primary;
          ctx.globalAlpha = 0.16;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 5]);
          ctx.beginPath();
          ctx.moveTo(state.drawing[0].x, state.drawing[0].y);
          for (let i = 1; i < state.drawing.length; i++) {
            ctx.lineTo(state.drawing[i].x, state.drawing[i].y);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.restore();
        }

        const v = drawEpicycles();
        if (state.phase === 'draw') {
          state.path.push(v);
          drawWillowLeaf(state.path, 0);
        } else {
          state.eraseIndex++;
          drawWillowLeaf(state.path.slice(state.eraseIndex), state.eraseIndex);
        }
        drawTip(v.x, v.y);

        const dt = TWO_PI / state.fourierX.length;
        state.time += dt;
        if (state.time > TWO_PI) {
          state.time = 0;
          if (state.phase === 'draw') {
            state.phase = 'erase';
            state.eraseIndex = 0;
          } else {
            state.phase = 'draw';
            state.path = [];
          }
        }
      }

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [canvasSize, dpr, isDark]);

  const getCanvasCoords = (clientX: number, clientY: number): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2,
    };
  };

  const handleStart = (e: React.PointerEvent) => {
    const point = getCanvasCoords(e.clientX, e.clientY);
    if (!point) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    const state = stateRef.current;
    state.currentState = STATE.DRAWING;
    state.drawing = [point];
    state.path = [];
    state.time = 0;
    state.phase = 'draw';
    state.eraseIndex = 0;
  };

  const handleMove = (e: React.PointerEvent) => {
    const state = stateRef.current;
    if (state.currentState !== STATE.DRAWING) return;

    // Use coalesced events for finer-grained samples on high-frequency input
    // devices (Apple Pencil, drawing tablet). Falls back to the dispatched
    // event itself when no extra samples are available.
    const native = e.nativeEvent;
    const coalesced =
      typeof native.getCoalescedEvents === 'function'
        ? native.getCoalescedEvents()
        : [];
    const samples: { clientX: number; clientY: number }[] =
      coalesced.length > 0 ? coalesced : [native];

    for (const sample of samples) {
      const point = getCanvasCoords(sample.clientX, sample.clientY);
      if (!point) continue;
      const lastPoint = state.drawing[state.drawing.length - 1];
      if (
        !lastPoint ||
        Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) >= 1
      ) {
        state.drawing.push(point);
      }
    }
  };

  const handleEnd = () => {
    const state = stateRef.current;
    if (state.currentState !== STATE.DRAWING) return;
    if (state.drawing.length >= 10) {
      captureDrawing(state.drawing);
    } else {
      initDefault();
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <Card padding="0" className={styles.cardSurface}>
        <canvas
          ref={canvasRef}
          width={canvasSize * dpr}
          height={canvasSize * dpr}
          style={{ width: canvasSize, height: canvasSize }}
          className={styles.canvas}
          onPointerDown={handleStart}
          onPointerMove={handleMove}
          onPointerUp={handleEnd}
          onPointerCancel={handleEnd}
        />
      </Card>
    </div>
  );
}
