import React, { useRef, useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import styles from './styles.module.css';

// Constants
const TWO_PI = 2 * Math.PI;
const STATE = { DRAWING: 1, PLAYING: 2 } as const;

// Helper: Get color safely (SSR compatible)
function getPrimaryColor(): string {
  if (typeof window === 'undefined') return '#25c2a0'; // Fallback
  const style = getComputedStyle(document.documentElement);
  return style.getPropertyValue('--ifm-color-primary').trim() || '#25c2a0';
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
    // Optimization: Pre-calc angle component
    const anglePart = (TWO_PI * k) / N;

    for (let n = 0; n < N; n++) {
      const phi = anglePart * n;
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
    // New state for erase cycle
    isErasing: false,
    eraseIndex: 0,
  });

  // Initialize butterfly pattern
  const initButterfly = (width: number) => {
    const state = stateRef.current;
    state.drawing = [];
    const total = 400; // Adjusted for performance
    const scale = width / 10;

    for (let i = 0; i < total; i++) {
      const angle = (i / total) * TWO_PI;
      const r =
        Math.exp(Math.cos(angle)) -
        2 * Math.cos(4 * angle) -
        Math.pow(Math.sin(angle / 12), 5);

      state.drawing.push({
        x: r * Math.sin(angle) * scale,
        y: -r * Math.cos(angle) * scale - scale * 0.25 + 30, // Offset to center better
      });
    }
    calcFourier();
  };

  const calcFourier = () => {
    const state = stateRef.current;
    if (state.drawing.length === 0) return;

    state.fourierX = dft(state.drawing);
    state.currentState = STATE.PLAYING;
    state.path = [];
    state.time = 0;
    state.isErasing = false;
    state.eraseIndex = 0;
  };

  // Handle resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const newSize = Math.min(Math.max(containerWidth - 32, 300), 600);

        setCanvasSize((prev) => {
          if (Math.abs(newSize - prev) > 20) {
            const ratio = newSize / prev;
            const state = stateRef.current;
            if (state.drawing.length > 0) {
              state.drawing = state.drawing.map((p) => ({
                x: p.x * ratio,
                y: p.y * ratio,
              }));
              if (state.currentState !== STATE.DRAWING) {
                calcFourier();
              }
            }
            return newSize;
          }
          return prev;
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = stateRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
    ctx.scale(dpr, dpr);

    if (state.drawing.length === 0) {
      initButterfly(canvasSize);
    }

    let animationId: number;
    const primaryColor = getPrimaryColor();
    const themeColors = isDark ? THEME_COLORS.dark : THEME_COLORS.light;

    // Draw Epicycles (Circles & Arms)
    const drawEpicycles = (): Point => {
      let x = 0,
        y = 0;
      // Optimization: Limit visible circles
      const limit = Math.min(state.fourierX.length, 200);

      for (let i = 0; i < limit; i++) {
        const prevx = x,
          prevy = y;
        const { freq, amp, phase } = state.fourierX[i];
        const angle = freq * state.time + phase;

        x += amp * Math.cos(angle);
        y += amp * Math.sin(angle);

        // Only stroke prominent circles
        if (amp > 1.5 || i < 10) {
          ctx.strokeStyle = themeColors.circleStroke;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(prevx, prevy, amp, 0, TWO_PI);
          ctx.stroke();
        }

        ctx.strokeStyle = themeColors.lineStroke;
        ctx.beginPath();
        ctx.moveTo(prevx, prevy);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      // Pen Tip
      ctx.fillStyle = primaryColor;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, TWO_PI);
      ctx.fill();

      return { x, y };
    };

    // Unified Draw Path Function (Supports partial drawing for erasing effect)
    const drawPath = (points: Point[], startIndex = 0, isGlowing = false) => {
      // Don't draw if too short
      if (points.length - startIndex < 2) return;

      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.globalAlpha = isGlowing ? 1.0 : 0.8;

      ctx.beginPath();
      ctx.moveTo(points[startIndex].x, points[startIndex].y);
      for (let i = startIndex + 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const render = () => {
      const width = canvasSize;
      const height = canvasSize;

      // Clear Canvas
      ctx.fillStyle = themeColors.background;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Center Point
      ctx.fillStyle = themeColors.centerPoint;
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, TWO_PI);
      ctx.fill();

      if (state.currentState === STATE.DRAWING) {
        // Just draw user path
        drawPath(state.drawing);
      } else if (state.fourierX.length > 0) {
        // 1. Draw Ghost (Original Shape)
        ctx.strokeStyle = primaryColor;
        ctx.globalAlpha = 0.15;
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

        // 2. Draw Epicycles & Get current point
        const v = drawEpicycles();

        // 3. Handle Draw/Erase Logic
        if (!state.isErasing) {
          // Phase 1: Drawing
          state.path.push(v); // Efficient PUSH
          drawPath(state.path, 0, true);
        } else {
          // Phase 2: Erasing
          // Advance the start index to make the tail disappear
          state.eraseIndex++;
          drawPath(state.path, state.eraseIndex, true);
        }

        // 4. Time Step
        const dt = TWO_PI / state.fourierX.length;
        state.time += dt;

        // 5. Phase Switch Logic
        if (state.time > TWO_PI) {
          state.time = 0;
          if (!state.isErasing) {
            // Switch to Erase Phase
            state.isErasing = true;
            state.eraseIndex = 0;
          } else {
            // Switch back to Draw Phase
            state.isErasing = false;
            state.path = []; // Clean reset
            state.eraseIndex = 0;
          }
        }
      }

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [canvasSize, isDark]);

  // Interaction Handlers
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
    if (e.type === 'touchstart') e.preventDefault();
    const state = stateRef.current;
    const point =
      'touches' in e
        ? getCanvasCoords(e.touches[0])
        : getCanvasCoords(e as React.MouseEvent);

    if (!point) return;

    state.currentState = STATE.DRAWING;
    state.drawing = [point];
    state.path = [];
    state.time = 0;
    state.isErasing = false;
    state.eraseIndex = 0;
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type === 'touchmove') e.preventDefault();
    const state = stateRef.current;
    if (state.currentState !== STATE.DRAWING) return;

    const point =
      'touches' in e
        ? getCanvasCoords(e.touches[0])
        : getCanvasCoords(e as React.MouseEvent);
    if (!point) return;

    const lastPoint = state.drawing[state.drawing.length - 1];
    // Sampling threshold of 4px for performance
    if (
      !lastPoint ||
      Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) >= 4
    ) {
      state.drawing.push(point);
    }
  };

  const handleEnd = () => {
    const state = stateRef.current;
    if (state.currentState === STATE.DRAWING) {
      if (state.drawing.length > 5) {
        calcFourier();
      } else {
        initButterfly(canvasSize);
      }
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
        style={{ width: canvasSize, height: canvasSize, touchAction: 'none' }}
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
