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
import Card from '@site/src/components/laikit/Card';
import { useVisibleRef } from '@site/src/hooks/useVisibleRef';
import styles from './styles.module.css';

const TWO_PI = 2 * Math.PI;
const BASE_SIZE = 500;
const GRID = 29;
const EXPAND_PER_FRAME = 4;
const REVEAL_PER_FRAME = 1;
const WALL_DENSITY = 0.28;

const START = 1 * GRID + 1;
const END = (GRID - 2) * GRID + (GRID - 2);

const RANDOM_LABEL = translate({
  id: 'components.playground.pathfinding.random',
  message: 'Random',
});
const CLEAR_LABEL = translate({
  id: 'components.playground.pathfinding.clear',
  message: 'Clear',
});

const THEME_COLORS = {
  dark: {
    background: '#000000',
    grid: 'rgba(255, 255, 255, 0.05)',
    wall: 'rgba(255, 255, 255, 0.82)',
    end: '#f97316',
  },
  light: {
    background: '#ffffff',
    grid: 'rgba(0, 0, 0, 0.05)',
    wall: 'rgba(0, 0, 0, 0.8)',
    end: '#f97316',
  },
} as const;

const NEIGHBORS = [-GRID, GRID, -1, 1];

function heuristic(i: number): number {
  const x = i % GRID;
  const y = (i / GRID) | 0;
  const ex = END % GRID;
  const ey = (END / GRID) | 0;
  return Math.abs(x - ex) + Math.abs(y - ey);
}

interface Search {
  open: number[];
  inOpen: Uint8Array;
  closed: Uint8Array;
  g: Float32Array;
  came: Int32Array;
  phase: 'searching' | 'done';
  path: number[];
  reveal: number;
}

export default function Pathfinding() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(BASE_SIZE);
  const [dpr, setDpr] = useState(1);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const visibleRef = useVisibleRef(containerRef);

  const wallsRef = useRef<Uint8Array>(new Uint8Array(GRID * GRID));
  const searchRef = useRef<Search | null>(null);
  const paintingRef = useRef<{ active: boolean; mode: 0 | 1 }>({
    active: false,
    mode: 1,
  });

  const themeRef = useRef(
    THEME_COLORS.light as (typeof THEME_COLORS)[keyof typeof THEME_COLORS]
  );
  const primaryRef = useRef('#1d9bf0');
  useEffect(() => {
    themeRef.current = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
    if (containerRef.current) {
      const c = getComputedStyle(containerRef.current)
        .getPropertyValue('--ifm-color-primary')
        .trim();
      if (c) primaryRef.current = c;
    }
  }, [isDark]);

  const startSearch = useCallback(() => {
    const n = GRID * GRID;
    const g = new Float32Array(n).fill(Infinity);
    g[START] = 0;
    searchRef.current = {
      open: [START],
      inOpen: new Uint8Array(n),
      closed: new Uint8Array(n),
      g,
      came: new Int32Array(n).fill(-1),
      phase: 'searching',
      path: [],
      reveal: 0,
    };
    searchRef.current.inOpen[START] = 1;
  }, []);

  const randomize = useCallback(() => {
    const walls = new Uint8Array(GRID * GRID);
    for (let i = 0; i < walls.length; i++) {
      walls[i] = Math.random() < WALL_DENSITY ? 1 : 0;
    }
    walls[START] = 0;
    walls[END] = 0;
    wallsRef.current = walls;
    startSearch();
  }, [startSearch]);

  const clear = useCallback(() => {
    wallsRef.current = new Uint8Array(GRID * GRID);
    startSearch();
  }, [startSearch]);

  useEffect(() => {
    randomize();
  }, [randomize]);

  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      if (w <= 0) return;
      const newSize = Math.min(w, BASE_SIZE);
      setCanvasSize((prev) => (Math.abs(newSize - prev) > 1 ? newSize : prev));
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let animId = 0;

    const stepSearch = () => {
      const s = searchRef.current;
      if (!s || s.phase !== 'searching') return;
      const walls = wallsRef.current;
      for (let e = 0; e < EXPAND_PER_FRAME; e++) {
        if (s.open.length === 0) {
          s.phase = 'done';
          return;
        }
        let bestIdx = 0;
        let bestF = Infinity;
        for (let k = 0; k < s.open.length; k++) {
          const node = s.open[k];
          const f = s.g[node] + heuristic(node);
          if (f < bestF) {
            bestF = f;
            bestIdx = k;
          }
        }
        const current = s.open[bestIdx];
        s.open.splice(bestIdx, 1);
        s.inOpen[current] = 0;

        if (current === END) {
          let c = current;
          const path: number[] = [];
          while (c !== -1) {
            path.push(c);
            c = s.came[c];
          }
          s.path = path.reverse();
          s.phase = 'done';
          return;
        }
        s.closed[current] = 1;

        const cx = current % GRID;
        for (const off of NEIGHBORS) {
          const next = current + off;
          if (next < 0 || next >= GRID * GRID) continue;
          // Reject horizontal wraps across row edges.
          if (Math.abs(off) === 1 && Math.abs((next % GRID) - cx) !== 1)
            continue;
          if (walls[next] || s.closed[next]) continue;
          const tentative = s.g[current] + 1;
          if (tentative < s.g[next]) {
            s.came[next] = current;
            s.g[next] = tentative;
            if (!s.inOpen[next]) {
              s.open.push(next);
              s.inOpen[next] = 1;
            }
          }
        }
      }
    };

    const render = () => {
      if (!visibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }
      const colors = themeRef.current;
      const primary = primaryRef.current;
      const size = canvasSize;
      const cell = size / GRID;
      const s = searchRef.current;

      if (!paintingRef.current.active) {
        stepSearch();
        if (s && s.phase === 'done' && s.reveal < s.path.length) {
          s.reveal += REVEAL_PER_FRAME;
        }
      }

      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, size, size);

      const walls = wallsRef.current;
      const fill = (i: number, color: string, alpha = 1) => {
        const x = (i % GRID) * cell;
        const y = ((i / GRID) | 0) * cell;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, cell, cell);
        ctx.globalAlpha = 1;
      };

      if (s) {
        for (let i = 0; i < s.closed.length; i++) {
          if (s.closed[i]) fill(i, primary, 0.14);
        }
        for (const i of s.open) fill(i, primary, 0.4);
      }

      ctx.fillStyle = colors.wall;
      for (let i = 0; i < walls.length; i++) {
        if (walls[i]) {
          const x = (i % GRID) * cell;
          const y = ((i / GRID) | 0) * cell;
          ctx.fillRect(x, y, cell, cell);
        }
      }

      if (s && s.path.length > 0) {
        const shown = Math.min(s.reveal, s.path.length);
        for (let k = 0; k < shown; k++) fill(s.path[k], primary, 0.85);
      }

      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= GRID; i++) {
        const p = Math.round(i * cell) + 0.5;
        ctx.moveTo(p, 0);
        ctx.lineTo(p, size);
        ctx.moveTo(0, p);
        ctx.lineTo(size, p);
      }
      ctx.stroke();

      const marker = (i: number, color: string) => {
        const x = (i % GRID) * cell + cell / 2;
        const y = ((i / GRID) | 0) * cell + cell / 2;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, cell * 0.34, 0, TWO_PI);
        ctx.fill();
      };
      marker(START, primary);
      marker(END, colors.end);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [canvasSize, dpr, isDark]);

  const cellAt = (e: ReactPointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return -1;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * GRID);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * GRID);
    if (x < 0 || x >= GRID || y < 0 || y >= GRID) return -1;
    return y * GRID + x;
  };

  const handlePointerDown = (e: ReactPointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const i = cellAt(e);
    if (i < 0 || i === START || i === END) return;
    const mode: 0 | 1 = wallsRef.current[i] ? 0 : 1;
    paintingRef.current = { active: true, mode };
    wallsRef.current[i] = mode;
  };

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (!paintingRef.current.active) return;
    const i = cellAt(e);
    if (i < 0 || i === START || i === END) return;
    wallsRef.current[i] = paintingRef.current.mode;
  };

  const handlePointerUp = () => {
    if (!paintingRef.current.active) return;
    paintingRef.current.active = false;
    startSearch();
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
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </Card>
      <div className={styles.controls}>
        <Button
          variant="secondary"
          onClick={randomize}
          aria-label={RANDOM_LABEL}
        >
          {RANDOM_LABEL}
        </Button>
        <Button variant="secondary" onClick={clear} aria-label={CLEAR_LABEL}>
          {CLEAR_LABEL}
        </Button>
      </div>
    </div>
  );
}
