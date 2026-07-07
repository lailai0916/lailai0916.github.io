import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import Button from '@site/src/components/laikit/Button';
import Surface from '@site/src/components/playground/Surface';
import styles from './styles.module.css';

const BASE_SIZE = 500;
const GRID = 50;
const STEP_INTERVAL_MS = 90;
const RANDOM_DENSITY = 0.28;

const PLAY_LABEL = translate({
  id: 'components.playground.gameOfLife.play',
  message: 'Play',
});
const PAUSE_LABEL = translate({
  id: 'components.playground.gameOfLife.pause',
  message: 'Pause',
});
const STEP_LABEL = translate({
  id: 'components.playground.gameOfLife.step',
  message: 'Step',
});
const RANDOM_LABEL = translate({
  id: 'components.playground.gameOfLife.random',
  message: 'Random',
});
const CLEAR_LABEL = translate({
  id: 'components.playground.gameOfLife.clear',
  message: 'Clear',
});

const THEME_COLORS = {
  dark: {
    background: '#000000',
    grid: 'rgba(255, 255, 255, 0.08)',
  },
  light: {
    background: '#ffffff',
    grid: 'rgba(0, 0, 0, 0.08)',
  },
} as const;

type Grid = Uint8Array;

function createGrid(): Grid {
  return new Uint8Array(GRID * GRID);
}

function randomGrid(): Grid {
  const g = createGrid();
  for (let i = 0; i < g.length; i++) {
    g[i] = Math.random() < RANDOM_DENSITY ? 1 : 0;
  }
  return g;
}

function step(src: Grid): Grid {
  const dst = createGrid();
  for (let y = 0; y < GRID; y++) {
    const yUp = (y - 1 + GRID) % GRID;
    const yDn = (y + 1) % GRID;
    for (let x = 0; x < GRID; x++) {
      const xL = (x - 1 + GRID) % GRID;
      const xR = (x + 1) % GRID;
      const n =
        src[yUp * GRID + xL] +
        src[yUp * GRID + x] +
        src[yUp * GRID + xR] +
        src[y * GRID + xL] +
        src[y * GRID + xR] +
        src[yDn * GRID + xL] +
        src[yDn * GRID + x] +
        src[yDn * GRID + xR];
      const alive = src[y * GRID + x] === 1;
      dst[y * GRID + x] = n === 3 || (alive && n === 2) ? 1 : 0;
    }
  }
  return dst;
}

export default function GameOfLife({ bare = false }: { bare?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(BASE_SIZE);
  const [dpr, setDpr] = useState(1);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const [running, setRunning] = useState(true);

  const gridRef = useRef<Grid>(randomGrid());
  const liveColorRef = useRef<string>('#1d9bf0');

  const themeRef = useRef(
    THEME_COLORS.light as (typeof THEME_COLORS)[keyof typeof THEME_COLORS]
  );
  useEffect(() => {
    themeRef.current = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
    if (containerRef.current) {
      const cs = getComputedStyle(containerRef.current);
      const c = cs.getPropertyValue('--ifm-color-primary').trim();
      if (c) liveColorRef.current = c;
    }
  }, [isDark]);

  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const newSize = Math.min(w, BASE_SIZE);
      setCanvasSize((prev) => (Math.abs(newSize - prev) > 1 ? newSize : prev));
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const colors = themeRef.current;
    const cell = canvasSize / GRID;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.fillStyle = liveColorRef.current;
    const g = gridRef.current;
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        if (g[y * GRID + x] === 1) {
          ctx.fillRect(x * cell, y * cell, cell, cell);
        }
      }
    }

    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= GRID; i++) {
      const p = Math.round(i * cell) + 0.5;
      ctx.moveTo(p, 0);
      ctx.lineTo(p, canvasSize);
      ctx.moveTo(0, p);
      ctx.lineTo(canvasSize, p);
    }
    ctx.stroke();
  }, [canvasSize, dpr]);

  useEffect(() => {
    draw();
  }, [draw, isDark]);

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    let animId = 0;
    const loop = (now: number) => {
      if (now - last >= STEP_INTERVAL_MS) {
        gridRef.current = step(gridRef.current);
        last = now;
        draw();
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [running, draw]);

  const paintRef = useRef<{ active: boolean; mode: 0 | 1 }>({
    active: false,
    mode: 1,
  });

  const cellAt = (e: ReactPointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * GRID);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * GRID);
    if (x < 0 || x >= GRID || y < 0 || y >= GRID) return null;
    return { x, y };
  };

  const handlePointerDown = (e: ReactPointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const cell = cellAt(e);
    if (!cell) return;
    const idx = cell.y * GRID + cell.x;
    const mode: 0 | 1 = gridRef.current[idx] === 1 ? 0 : 1;
    paintRef.current = { active: true, mode };
    gridRef.current[idx] = mode;
    draw();
  };

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (!paintRef.current.active) return;
    const cell = cellAt(e);
    if (!cell) return;
    const idx = cell.y * GRID + cell.x;
    if (gridRef.current[idx] !== paintRef.current.mode) {
      gridRef.current[idx] = paintRef.current.mode;
      draw();
    }
  };

  const handlePointerUp = () => {
    paintRef.current.active = false;
  };

  const handleStep = () => {
    gridRef.current = step(gridRef.current);
    draw();
  };

  const handleRandom = () => {
    gridRef.current = randomGrid();
    draw();
  };

  const handleClear = () => {
    gridRef.current = createGrid();
    draw();
  };

  const playPauseLabel = running ? PAUSE_LABEL : PLAY_LABEL;

  return (
    <div ref={containerRef} className={styles.container}>
      <Surface bare={bare} className={styles.cardSurface}>
        <canvas
          ref={canvasRef}
          width={canvasSize * dpr}
          height={canvasSize * dpr}
          style={{ width: canvasSize, height: canvasSize }}
          className={styles.canvas}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </Surface>
      <div className={styles.controls}>
        <Button
          variant={running ? 'secondary' : 'primary'}
          onClick={() => setRunning((r) => !r)}
          aria-label={playPauseLabel}
        >
          {playPauseLabel}
        </Button>
        <Button
          variant="secondary"
          onClick={handleStep}
          disabled={running}
          aria-label={STEP_LABEL}
        >
          {STEP_LABEL}
        </Button>
        <Button
          variant="secondary"
          onClick={handleRandom}
          aria-label={RANDOM_LABEL}
        >
          {RANDOM_LABEL}
        </Button>
        <Button
          variant="secondary"
          onClick={handleClear}
          aria-label={CLEAR_LABEL}
        >
          {CLEAR_LABEL}
        </Button>
      </div>
    </div>
  );
}
