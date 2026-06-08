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
const G = 0.5;
const DT = 0.18;
const STEPS_PER_FRAME = 2;
const SOFTENING = 60;
const MAX_TRAIL = 160;
const ORBITERS = 11;

const RESET_LABEL = translate({
  id: 'components.playground.nBody.reset',
  message: 'Reset',
});

const THEME_COLORS = {
  dark: {
    background: '#000000',
    sun: '#f97316',
    guide: 'rgba(255, 255, 255, 0.4)',
  },
  light: {
    background: '#ffffff',
    sun: '#f97316',
    guide: 'rgba(0, 0, 0, 0.35)',
  },
} as const;

interface Body {
  x: number;
  y: number;
  vx: number;
  vy: number;
  m: number;
  sun: boolean;
  trail: { x: number; y: number }[];
}

export default function NBodyGravity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(BASE_SIZE);
  const [dpr, setDpr] = useState(1);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const visibleRef = useVisibleRef(containerRef);

  const bodiesRef = useRef<Body[]>([]);
  const dragRef = useRef<{
    active: boolean;
    sx: number;
    sy: number;
    cx: number;
    cy: number;
  }>({
    active: false,
    sx: 0,
    sy: 0,
    cx: 0,
    cy: 0,
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

  const seed = useCallback((size: number) => {
    const cx = size / 2;
    const cy = size / 2;
    const sunMass = 1400;
    const bodies: Body[] = [
      { x: cx, y: cy, vx: 0, vy: 0, m: sunMass, sun: true, trail: [] },
    ];
    for (let i = 0; i < ORBITERS; i++) {
      const r = size * (0.12 + Math.random() * 0.32);
      const a = Math.random() * TWO_PI;
      const speed = Math.sqrt((G * sunMass) / r);
      bodies.push({
        x: cx + Math.cos(a) * r,
        y: cy + Math.sin(a) * r,
        vx: -Math.sin(a) * speed,
        vy: Math.cos(a) * speed,
        m: 2 + Math.random() * 6,
        sun: false,
        trail: [],
      });
    }
    bodiesRef.current = bodies;
  }, []);

  useEffect(() => {
    if (bodiesRef.current.length === 0) seed(canvasSize);
  }, [seed, canvasSize]);

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

    const stepSim = () => {
      const bodies = bodiesRef.current;
      for (let i = 0; i < bodies.length; i++) {
        const bi = bodies[i];
        let ax = 0;
        let ay = 0;
        for (let j = 0; j < bodies.length; j++) {
          if (i === j) continue;
          const bj = bodies[j];
          const dx = bj.x - bi.x;
          const dy = bj.y - bi.y;
          const d2 = dx * dx + dy * dy + SOFTENING;
          const inv = (G * bj.m) / (d2 * Math.sqrt(d2));
          ax += dx * inv;
          ay += dy * inv;
        }
        bi.vx += ax * DT;
        bi.vy += ay * DT;
      }
      for (const b of bodies) {
        if (b.sun) continue;
        b.x += b.vx * DT;
        b.y += b.vy * DT;
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

      for (let s = 0; s < STEPS_PER_FRAME; s++) stepSim();

      for (const b of bodiesRef.current) {
        if (b.sun) continue;
        b.trail.push({ x: b.x, y: b.y });
        if (b.trail.length > MAX_TRAIL) b.trail.shift();
      }

      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, size, size);

      for (const b of bodiesRef.current) {
        if (b.trail.length < 2) continue;
        const color = b.sun ? colors.sun : primary;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        const bands = 4;
        const seg = Math.ceil(b.trail.length / bands);
        for (let band = 0; band < bands; band++) {
          const start = band * seg;
          const end = Math.min(b.trail.length, (band + 1) * seg + 1);
          if (end - start < 2) continue;
          ctx.globalAlpha = 0.1 + (0.6 * (band + 1)) / bands;
          ctx.beginPath();
          ctx.moveTo(b.trail[start].x, b.trail[start].y);
          for (let p = start + 1; p < end; p++)
            ctx.lineTo(b.trail[p].x, b.trail[p].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      for (const b of bodiesRef.current) {
        ctx.fillStyle = b.sun ? colors.sun : primary;
        const r = b.sun ? 8 : 2 + Math.sqrt(b.m) * 0.7;
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, TWO_PI);
        ctx.fill();
      }

      const drag = dragRef.current;
      if (drag.active) {
        ctx.strokeStyle = colors.guide;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(drag.sx, drag.sy);
        ctx.lineTo(drag.cx, drag.cy);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = primary;
        ctx.beginPath();
        ctx.arc(drag.sx, drag.sy, 4, 0, TWO_PI);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [canvasSize, dpr, isDark]);

  const pointerAt = (e: ReactPointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvasSize,
      y: ((e.clientY - rect.top) / rect.height) * canvasSize,
    };
  };

  const handlePointerDown = (e: ReactPointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = pointerAt(e);
    dragRef.current = { active: true, sx: p.x, sy: p.y, cx: p.x, cy: p.y };
  };

  const handlePointerMove = (e: ReactPointerEvent) => {
    if (!dragRef.current.active) return;
    const p = pointerAt(e);
    dragRef.current.cx = p.x;
    dragRef.current.cy = p.y;
  };

  const handlePointerUp = () => {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    // Slingshot: drag back from the spawn point to set launch velocity.
    bodiesRef.current.push({
      x: drag.sx,
      y: drag.sy,
      vx: (drag.sx - drag.cx) * 0.04,
      vy: (drag.sy - drag.cy) * 0.04,
      m: 4,
      sun: false,
      trail: [],
    });
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
          onClick={() => seed(canvasSize)}
          aria-label={RESET_LABEL}
        >
          {RESET_LABEL}
        </Button>
      </div>
    </div>
  );
}
