import React, { useRef, useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

// Constants
const TWO_PI = 2 * Math.PI;
const STATE = { DRAWING: 1, PLAYING: 2 } as const;

// Get primary color from CSS variable
function getPrimaryColor(): string {
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue('--ifm-color-primary').trim();
}

// Theme colors configuration
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

// Types
interface Point {
  x: number;
  y: number;
}

interface FourierCoefficient {
  freq: number;
  amp: number;
  phase: number;
}

// Discrete Fourier Transform
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

    result.push({
      freq: k,
      amp: Math.hypot(re, im) / N,
      phase: Math.atan2(im, re),
    });
  }

  return result.sort((a, b) => b.amp - a.amp);
}

export default function FourierTransformCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(400);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const stateRef = useRef({
    currentState: STATE.PLAYING as (typeof STATE)[keyof typeof STATE],
    drawing: [] as Point[],
    fourierX: [] as FourierCoefficient[],
    path: [] as Point[],
    time: 0,
  });

  // Initialize butterfly pattern
  const initButterfly = (width: number) => {
    const state = stateRef.current;
    state.drawing = [];
    const total = 500;
    const scale = width / 11;

    for (let i = 0; i < total; i++) {
      const angle = (i / total) * TWO_PI;
      const r =
        Math.exp(Math.cos(angle)) -
        2 * Math.cos(4 * angle) -
        Math.pow(Math.sin(angle / 12), 5);

      state.drawing.push({
        x: r * Math.sin(angle) * scale,
        y: -r * Math.cos(angle) * scale - scale * 0.25,
      });
    }
    calcFourier();
  };

  const calcFourier = () => {
    const state = stateRef.current;
    state.fourierX = dft(state.drawing);
    state.currentState = STATE.PLAYING;
    state.path = [];
    state.time = 0;
  };

  // Handle resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newSize = Math.min(containerWidth - 32, 500);
        const oldSize = canvasSize;

        if (Math.abs(newSize - oldSize) > 10) {
          const ratio = newSize / oldSize;
          const state = stateRef.current;

          // Scale existing drawing
          if (state.drawing.length > 0) {
            state.drawing = state.drawing.map((p) => ({
              x: p.x * ratio,
              y: p.y * ratio,
            }));
            calcFourier();
          }

          setCanvasSize(newSize);
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [canvasSize]);

  // Initialize and animate
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = stateRef.current;

    // 处理高 DPI 屏幕
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Initialize butterfly on first load
    if (state.drawing.length === 0) {
      initButterfly(canvasSize);
    }

    let animationId: number;

    // 获取主题色和主题颜色配置
    const primaryColor = getPrimaryColor();
    const themeColors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

    const drawEpicycles = (): Point => {
      let x = 0,
        y = 0;

      for (let i = 0; i < state.fourierX.length; i++) {
        const prevx = x,
          prevy = y;
        const { freq, amp, phase } = state.fourierX[i];
        const angle = freq * state.time + phase;

        x += amp * Math.cos(angle);
        y += amp * Math.sin(angle);

        // Draw circles for main harmonics
        if (amp > 2 || i < 15) {
          ctx.strokeStyle = themeColors.circleStroke;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(prevx, prevy, amp, 0, TWO_PI);
          ctx.stroke();
        }

        // Draw connecting line
        ctx.strokeStyle = themeColors.lineStroke;
        ctx.beginPath();
        ctx.moveTo(prevx, prevy);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      // Draw pen tip
      ctx.fillStyle = primaryColor;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, TWO_PI);
      ctx.fill();

      return { x, y };
    };

    const drawGlowingPath = () => {
      if (state.path.length < 2) return;

      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(state.path[0].x, state.path[0].y);
      for (let i = 1; i < state.path.length; i++) {
        ctx.lineTo(state.path[i].x, state.path[i].y);
      }
      ctx.stroke();
    };

    const drawPath = (points: Point[]) => {
      if (points.length < 2) return;
      ctx.strokeStyle = primaryColor;
      ctx.globalAlpha = 0.8;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const render = () => {
      const width = canvasSize;
      const height = canvasSize;

      // Clear canvas
      ctx.fillStyle = themeColors.background;
      ctx.fillRect(0, 0, width, height);

      // Translate to center
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Draw center point
      ctx.fillStyle = themeColors.centerPoint;
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, TWO_PI);
      ctx.fill();

      if (state.currentState === STATE.DRAWING) {
        drawPath(state.drawing);
      } else if (
        state.currentState === STATE.PLAYING &&
        state.fourierX.length > 0
      ) {
        // Draw original shape faintly
        ctx.strokeStyle = primaryColor;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 1;
        ctx.beginPath();
        if (state.drawing.length > 0) {
          ctx.moveTo(state.drawing[0].x, state.drawing[0].y);
          for (let i = 1; i < state.drawing.length; i++) {
            ctx.lineTo(state.drawing[i].x, state.drawing[i].y);
          }
          ctx.closePath();
          ctx.stroke();
        }
        ctx.globalAlpha = 1;

        // Calculate and draw epicycles
        const v = drawEpicycles();
        state.path.unshift(v);

        // Draw glowing path
        drawGlowingPath();

        // Time step
        const dt = TWO_PI / state.fourierX.length;
        state.time += dt;
        if (state.time > TWO_PI) {
          state.time = 0;
          state.path = [];
        }
      }

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [canvasSize, isDark]);

  // Mouse/touch handlers
  const getCanvasCoords = (e: React.MouseEvent | React.Touch): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const state = stateRef.current;
    const point =
      'touches' in e
        ? getCanvasCoords(e.touches[0])
        : getCanvasCoords(e as React.MouseEvent);

    if (!point) return;

    state.currentState = STATE.DRAWING;
    state.drawing = [];
    state.path = [];
    state.time = 0;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    const state = stateRef.current;
    if (state.currentState !== STATE.DRAWING) return;

    const point =
      'touches' in e
        ? getCanvasCoords(e.touches[0])
        : getCanvasCoords(e as React.MouseEvent);

    if (!point) return;

    const lastPoint = state.drawing[state.drawing.length - 1];
    if (
      !lastPoint ||
      Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) > 1
    ) {
      state.drawing.push(point);
    }
  };

  const handleEnd = () => {
    const state = stateRef.current;
    if (state.currentState === STATE.DRAWING && state.drawing.length > 5) {
      calcFourier();
    } else if (state.currentState === STATE.DRAWING) {
      initButterfly(canvasSize);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas
        ref={canvasRef}
        width={
          canvasSize *
          (typeof window !== 'undefined' ? window.devicePixelRatio : 1)
        }
        height={
          canvasSize *
          (typeof window !== 'undefined' ? window.devicePixelRatio : 1)
        }
        style={{ width: canvasSize, height: canvasSize }}
        className={styles.canvas}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
    </div>
  );
}
