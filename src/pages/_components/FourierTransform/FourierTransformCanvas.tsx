import React, { useRef, useEffect, useState } from 'react';
import styles from './styles.module.css';

// 全局配置
const STATE = { DRAWING: 1, PLAYING: 2 };

// 从 CSS 变量获取主题色
function getPrimaryColor(): { r: number; g: number; b: number } {
  if (typeof window === 'undefined') {
    return { r: 29, g: 155, b: 240 }; // 默认 #1d9bf0
  }
  const style = getComputedStyle(document.documentElement);
  const primaryColor = style.getPropertyValue('--ifm-color-primary').trim();
  
  // 解析 hex 颜色
  const hex = primaryColor.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

interface Complex {
  re: number;
  im: number;
}

interface FourierCoefficient {
  freq: number;
  amp: number;
  phase: number;
}

interface Point {
  x: number;
  y: number;
}

function dft(x: Complex[]): FourierCoefficient[] {
  const N = x.length;
  const X: FourierCoefficient[] = [];
  for (let k = 0; k < N; k++) {
    let sumRe = 0;
    let sumIm = 0;
    for (let n = 0; n < N; n++) {
      const phi = (2 * Math.PI * k * n) / N;
      const c = { re: Math.cos(phi), im: -Math.sin(phi) };
      sumRe += x[n].re * c.re - x[n].im * c.im;
      sumIm += x[n].re * c.im + x[n].im * c.re;
    }
    X[k] = {
      freq: k,
      amp: Math.sqrt(sumRe ** 2 + sumIm ** 2) / N,
      phase: Math.atan2(sumIm / N, sumRe / N),
    };
  }
  return X;
}

function rgbaString(r: number, g: number, b: number, a: number = 1): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function FourierTransformCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(400);

  const stateRef = useRef({
    currentState: STATE.PLAYING,
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
      const angle = (i / total) * 2 * Math.PI;
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
    const complexData: Complex[] = state.drawing.map((p) => ({
      re: p.x,
      im: p.y,
    }));
    state.fourierX = dft(complexData);
    state.fourierX.sort((a, b) => b.amp - a.amp);
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

    // Initialize butterfly on first load
    if (state.drawing.length === 0) {
      initButterfly(canvasSize);
    }

    let animationId: number;
    
    // 获取主题色
    const primaryColor = getPrimaryColor();

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
          ctx.strokeStyle = rgbaString(255, 255, 255, 0.15);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(prevx, prevy, amp, 0, 2 * Math.PI);
          ctx.stroke();
        }

        // Draw connecting line
        ctx.strokeStyle = rgbaString(255, 255, 255, 0.3);
        ctx.beginPath();
        ctx.moveTo(prevx, prevy);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      // Draw pen tip
      ctx.fillStyle = rgbaString(primaryColor.r, primaryColor.g, primaryColor.b, 1);
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fill();

      return { x, y };
    };

    const drawGlowingPath = () => {
      if (state.path.length < 2) return;

      ctx.strokeStyle = rgbaString(primaryColor.r, primaryColor.g, primaryColor.b, 1);
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
      ctx.strokeStyle = rgbaString(primaryColor.r, primaryColor.g, primaryColor.b, 0.8);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
    };

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);

      // Translate to center
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Draw center point
      ctx.fillStyle = rgbaString(255, 255, 255, 0.2);
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, 2 * Math.PI);
      ctx.fill();

      if (state.currentState === STATE.DRAWING) {
        drawPath(state.drawing);
      } else if (
        state.currentState === STATE.PLAYING &&
        state.fourierX.length > 0
      ) {
        // Draw original shape faintly
        ctx.strokeStyle = rgbaString(primaryColor.r, primaryColor.g, primaryColor.b, 0.2);
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

        // Calculate and draw epicycles
        const v = drawEpicycles();
        state.path.unshift(v);

        // Draw glowing path
        drawGlowingPath();

        // Limit path length
        if (state.path.length > state.fourierX.length * 0.95) {
          state.path.pop();
        }

        // Time step
        const dt = (2 * Math.PI) / state.fourierX.length;
        state.time += dt;
        if (state.time > 2 * Math.PI) {
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
  }, [canvasSize]);

  // Mouse/touch handlers
  const getCanvasCoords = (
    e: React.MouseEvent | React.Touch,
  ): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left - canvas.width / 2,
      y: e.clientY - rect.top - canvas.height / 2,
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
      Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) > 3
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
        width={canvasSize}
        height={canvasSize}
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
