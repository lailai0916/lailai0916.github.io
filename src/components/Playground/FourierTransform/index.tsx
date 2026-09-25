import { useRef, useEffect, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import Button from '@lailai0916/ui/Button';
import Card from '@lailai0916/ui/Card';
import { dft, type Point, type FourierCoefficient } from './fourier';
import styles from './styles.module.css';

const RESET_LABEL = translate({
  id: 'components.playground.fourierTransform.reset',
  message: 'Reset',
});
const CLEAR_LABEL = translate({
  id: 'components.playground.fourierTransform.clear',
  message: 'Clear',
});
const PAUSE_LABEL = translate({
  id: 'components.playground.fourierTransform.pause',
  message: 'Pause',
});
const PLAY_LABEL = translate({
  id: 'components.playground.fourierTransform.play',
  message: 'Resume',
});

const TWO_PI = 2 * Math.PI;
const STATE = { DRAWING: 1, PLAYING: 2 } as const;
const BASE_SIZE = 500;
const DEFAULT_SAMPLE_COUNT = 360;
const SAMPLE_SPACING = 1.5;
const MIN_SAMPLE_COUNT = 90;
const POINTS_PER_SECOND = 90;
const MAX_PHASE_DURATION_SECONDS = 20;
const MAX_VISIBLE_EPICYCLES = 720;

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

function resamplePoints(points: Point[]): Point[] {
  const distances = [0];
  for (let i = 1; i < points.length; i++) {
    distances.push(
      distances[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
    );
  }

  const total = distances[distances.length - 1];
  const count = Math.max(MIN_SAMPLE_COUNT, Math.ceil(total / SAMPLE_SPACING) + 1);
  if (total === 0) return Array.from({ length: count }, () => ({ ...points[0] }));

  const sampled: Point[] = [];
  let segment = 1;
  for (let i = 0; i < count; i++) {
    const target = (i * total) / (count - 1);
    while (segment < points.length - 1 && distances[segment] < target) segment++;
    const start = points[segment - 1];
    const end = points[segment];
    const span = distances[segment] - distances[segment - 1];
    const fraction = span === 0 ? 0 : (target - distances[segment - 1]) / span;
    sampled.push({
      x: start.x + (end.x - start.x) * fraction,
      y: start.y + (end.y - start.y) * fraction,
    });
  }
  return sampled;
}

export default function FourierTransform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(BASE_SIZE);
  const [dpr, setDpr] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const stateRef = useRef({
    currentState: STATE.PLAYING as (typeof STATE)[keyof typeof STATE],
    activePointerId: null as number | null,
    // Drawing in BASE_SIZE coordinates; render rescales to canvasSize each rebuild.
    baseDrawing: [] as Point[],
    drawing: [] as Point[],
    fourierX: [] as FourierCoefficient[],
    ghostPath: null as Path2D | null,
    path: [] as Point[],
    phaseElapsed: 0,
    phaseDuration: DEFAULT_SAMPLE_COUNT / POINTS_PER_SECOND,
    phase: 'draw' as 'draw' | 'erase',
  });
  const previousDrawingRef = useRef<{
    currentState: (typeof STATE)[keyof typeof STATE];
    drawing: Point[];
    wasPaused: boolean;
  } | null>(null);

  // Theme colors live in a ref so theme changes don't restart the animation effect.
  const themeRef = useRef({
    primary: '',
    colors: THEME_COLORS.light as (typeof THEME_COLORS)[keyof typeof THEME_COLORS],
  });

  const initDefault = () => {
    // Cherng's mathematical heart has a rich spectrum of distinct epicycles.
    const scale = BASE_SIZE * 0.022;
    const pts: Point[] = [];
    for (let i = 0; i < DEFAULT_SAMPLE_COUNT; i++) {
      const t = (i / DEFAULT_SAMPLE_COUNT) * TWO_PI;
      pts.push({
        x: 16 * Math.sin(t) ** 3 * scale,
        y:
          -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale,
      });
    }
    previousDrawingRef.current = null;
    stateRef.current.baseDrawing = centerPoints(pts);
    rebuildFromBase();
    setIsPaused(false);
    setIsDrawing(false);
  };

  const rebuildFromBase = () => {
    const state = stateRef.current;
    state.activePointerId = null;
    const ratio = canvasSize / BASE_SIZE;
    state.drawing = state.baseDrawing.map((p) => ({
      x: p.x * ratio,
      y: p.y * ratio,
    }));
    state.fourierX = dft(state.drawing);
    const ghostPath = new Path2D();
    if (state.drawing.length > 1) {
      ghostPath.moveTo(state.drawing[0].x, state.drawing[0].y);
      for (let i = 1; i < state.drawing.length; i++) {
        ghostPath.lineTo(state.drawing[i].x, state.drawing[i].y);
      }
      ghostPath.closePath();
    }
    state.ghostPath = ghostPath;
    state.phaseDuration = Math.min(
      state.drawing.length / POINTS_PER_SECOND,
      MAX_PHASE_DURATION_SECONDS
    );
    state.currentState = STATE.PLAYING;
    state.path = [];
    state.phaseElapsed = 0;
    state.phase = 'draw';
  };

  const captureDrawing = (drawn: Point[]) => {
    const state = stateRef.current;
    const ratio = BASE_SIZE / canvasSize;
    // Preserve the position the user drew at — don't recenter on centroid.
    state.baseDrawing = resamplePoints(drawn).map((p) => ({
      x: p.x * ratio,
      y: p.y * ratio,
    }));
    previousDrawingRef.current = null;
    rebuildFromBase();
    setIsPaused(false);
    setIsDrawing(false);
  };

  const handleClear = () => {
    const state = stateRef.current;
    previousDrawingRef.current = null;
    state.currentState = STATE.DRAWING;
    state.activePointerId = null;
    state.baseDrawing = [];
    state.drawing = [];
    state.fourierX = [];
    state.ghostPath = null;
    state.path = [];
    state.phaseElapsed = 0;
    state.phase = 'draw';
    setIsPaused(false);
    setIsDrawing(true);
  };

  // Resolve devicePixelRatio after mount to avoid SSR hydration mismatch.
  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const surface = canvasRef.current?.parentElement;
      if (!surface) return;
      const containerWidth = surface.clientWidth;
      const newSize = Math.min(containerWidth, BASE_SIZE);
      setCanvasSize((prev) => (Math.abs(newSize - prev) > 1 ? newSize : prev));
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // An empty drawing after Clear is deliberate; only the initial mount seeds the heart.
  useEffect(() => {
    const state = stateRef.current;
    if (state.currentState === STATE.DRAWING) {
      state.activePointerId = null;
      state.drawing = [];
      previousDrawingRef.current = null;
    } else if (state.baseDrawing.length === 0) {
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
    let lastFrameTime = performance.now();

    const drawEpicycles = (time: number) => {
      const { primary, colors } = themeRef.current;
      let x = 0;
      let y = 0;
      const circles = new Path2D();
      const lines = new Path2D();

      for (let i = 0; i < Math.min(state.fourierX.length, MAX_VISIBLE_EPICYCLES); i++) {
        const prevx = x;
        const prevy = y;
        const { freq, amp, phase } = state.fourierX[i];
        const angle = freq * time + phase;

        x += amp * Math.cos(angle);
        y += amp * Math.sin(angle);

        if (amp > 2 || i < 15) {
          circles.moveTo(prevx + amp, prevy);
          circles.arc(prevx, prevy, amp, 0, TWO_PI);
        }

        lines.moveTo(prevx, prevy);
        lines.lineTo(x, y);
      }

      if (state.fourierX.length > MAX_VISIBLE_EPICYCLES) {
        const sample = (time / TWO_PI) * state.drawing.length;
        const index = Math.floor(sample) % state.drawing.length;
        const fraction = sample - Math.floor(sample);
        const start = state.drawing[index];
        const end = state.drawing[(index + 1) % state.drawing.length];
        const targetX = start.x + (end.x - start.x) * fraction;
        const targetY = start.y + (end.y - start.y) * fraction;
        lines.moveTo(x, y);
        lines.lineTo(targetX, targetY);
        x = targetX;
        y = targetY;
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.circleStroke;
      ctx.stroke(circles);
      ctx.strokeStyle = colors.lineStroke;
      ctx.stroke(lines);
      ctx.fillStyle = primary;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, TWO_PI);
      ctx.fill();
    };

    const drawPath = (points: Point[], alpha = 1) => {
      if (points.length < 2) return;
      ctx.strokeStyle = themeRef.current.primary;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const render = (timestamp: number) => {
      const { primary, colors } = themeRef.current;

      const elapsed = Math.max((timestamp - lastFrameTime) / 1000, 0);
      lastFrameTime = timestamp;
      if (state.currentState === STATE.PLAYING && !isPaused) {
        const totalElapsed = state.phaseElapsed + elapsed;
        const phasesPassed = Math.floor(totalElapsed / state.phaseDuration);
        state.phaseElapsed = totalElapsed % state.phaseDuration;
        if (phasesPassed > 0) {
          if (state.phase === 'draw' && phasesPassed === 1) {
            state.path = state.drawing;
          }
          if (phasesPassed % 2 === 1) {
            state.phase = state.phase === 'draw' ? 'erase' : 'draw';
          }
          // A skipped draw phase has no visible path to erase.
          if (phasesPassed > 1 || state.phase === 'draw') state.path = [];
        }
      }

      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      ctx.save();
      ctx.translate(canvasSize / 2, canvasSize / 2);

      ctx.fillStyle = colors.centerPoint;
      ctx.beginPath();
      ctx.arc(0, 0, 2, 0, TWO_PI);
      ctx.fill();

      if (state.currentState === STATE.DRAWING) {
        drawPath(state.drawing, 0.8);
      } else if (state.currentState === STATE.PLAYING && state.fourierX.length > 0) {
        if (state.ghostPath) {
          ctx.strokeStyle = primary;
          ctx.globalAlpha = 0.2;
          ctx.lineWidth = 1;
          ctx.stroke(state.ghostPath);
          ctx.globalAlpha = 1;
        }

        const progress = state.phaseElapsed / state.phaseDuration;
        drawEpicycles(TWO_PI * progress);
        if (state.phase === 'draw') {
          if (!isPaused) {
            // The full inverse DFT reproduces each resampled point at its sample time.
            const visibleCount = Math.ceil(progress * state.drawing.length);
            while (state.path.length < visibleCount) {
              state.path.push(state.drawing[state.path.length]);
            }
          }
          drawPath(state.path);
        } else {
          drawPath(state.path.slice(Math.floor(progress * state.path.length)));
        }
      }

      ctx.restore();
      if (!isPaused) animationId = requestAnimationFrame(render);
    };

    render(performance.now());

    return () => cancelAnimationFrame(animationId);
  }, [canvasSize, dpr, isDark, isPaused]);

  const getCanvasCoords = (clientX: number, clientY: number): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2,
    };
  };

  const handleStart = (e: ReactPointerEvent) => {
    const point = getCanvasCoords(e.clientX, e.clientY);
    if (!point || stateRef.current.activePointerId !== null) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    const state = stateRef.current;
    previousDrawingRef.current = {
      currentState: state.currentState,
      drawing: state.drawing,
      wasPaused: isPaused,
    };
    state.activePointerId = e.pointerId;
    state.currentState = STATE.DRAWING;
    state.drawing = [point];
    setIsPaused(false);
    setIsDrawing(true);
  };

  const handleMove = (e: ReactPointerEvent) => {
    const state = stateRef.current;
    if (state.currentState !== STATE.DRAWING || state.activePointerId !== e.pointerId) return;

    // Use coalesced events for finer-grained samples on high-frequency input
    // devices (Apple Pencil, drawing tablet). Falls back to the dispatched
    // event itself when no extra samples are available.
    const native = e.nativeEvent;
    const coalesced =
      typeof native.getCoalescedEvents === 'function' ? native.getCoalescedEvents() : [];
    const samples: { clientX: number; clientY: number }[] =
      coalesced.length > 0 ? coalesced : [native];

    for (const sample of samples) {
      const point = getCanvasCoords(sample.clientX, sample.clientY);
      if (!point) continue;
      const lastPoint = state.drawing[state.drawing.length - 1];
      if (!lastPoint || Math.hypot(point.x - lastPoint.x, point.y - lastPoint.y) >= 1) {
        state.drawing.push(point);
      }
    }
  };

  const handleEnd = (e: ReactPointerEvent) => {
    const state = stateRef.current;
    if (state.currentState !== STATE.DRAWING || state.activePointerId !== e.pointerId) return;
    state.activePointerId = null;
    if (state.drawing.length >= 10) {
      captureDrawing(state.drawing);
    } else {
      const previous = previousDrawingRef.current;
      previousDrawingRef.current = null;
      if (previous) {
        state.drawing = previous.drawing;
        state.currentState = previous.currentState;
        setIsPaused(previous.wasPaused);
        setIsDrawing(previous.currentState === STATE.DRAWING);
      }
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
      <div className={styles.controls}>
        <Button variant="secondary" onClick={initDefault} aria-label={RESET_LABEL}>
          {RESET_LABEL}
        </Button>
        <Button variant="secondary" onClick={handleClear} aria-label={CLEAR_LABEL}>
          {CLEAR_LABEL}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setIsPaused((paused) => !paused)}
          disabled={isDrawing}
          aria-label={isPaused ? PLAY_LABEL : PAUSE_LABEL}
        >
          {isPaused ? PLAY_LABEL : PAUSE_LABEL}
        </Button>
      </div>
    </div>
  );
}
