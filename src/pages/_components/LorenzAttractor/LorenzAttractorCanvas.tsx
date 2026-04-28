import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Icon } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

const TWO_PI = 2 * Math.PI;
const BASE_SIZE = 500;

// Classic Lorenz '63 parameters.
const DEFAULT_SIGMA = 10;
const DEFAULT_RHO = 28;
const DEFAULT_BETA = 8 / 3;

// Integration / trail.
const DT = 0.005;
const STEPS_PER_FRAME = 5;
const MAX_TRAIL = 3000;

// Camera.
const INITIAL_YAW = 0.6;
const INITIAL_PITCH = -0.35;
const AUTO_ROTATE_RATE = 0.0018;
const PITCH_LIMIT = Math.PI / 2 - 0.1;

// Two trajectories starting 1e-3 apart — the canonical butterfly-effect demo.
const INITIAL_CONDITIONS: Vec3[] = [
  { x: 1, y: 1, z: 1 },
  { x: 1.001, y: 1, z: 1 },
];

const RESET_LABEL = translate({
  id: 'home.lorenz.reset',
  message: 'Reset',
});

const THEME_COLORS = {
  dark: {
    background: '#000000',
    grid: 'rgba(255, 255, 255, 0.08)',
    axis: 'rgba(255, 255, 255, 0.22)',
    trails: ['#1d9bf0', '#f97316'],
  },
  light: {
    background: '#ffffff',
    grid: 'rgba(0, 0, 0, 0.06)',
    axis: 'rgba(0, 0, 0, 0.18)',
    trails: ['#1d9bf0', '#f97316'],
  },
} as const;

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Particle {
  pos: Vec3;
  trail: Vec3[];
}

function lorenzDerivative(
  s: Vec3,
  sigma: number,
  rho: number,
  beta: number,
): Vec3 {
  return {
    x: sigma * (s.y - s.x),
    y: s.x * (rho - s.z) - s.y,
    z: s.x * s.y - beta * s.z,
  };
}

function rk4Step(
  p: Vec3,
  sigma: number,
  rho: number,
  beta: number,
  dt: number,
): Vec3 {
  const k1 = lorenzDerivative(p, sigma, rho, beta);
  const k2 = lorenzDerivative(
    {
      x: p.x + (dt / 2) * k1.x,
      y: p.y + (dt / 2) * k1.y,
      z: p.z + (dt / 2) * k1.z,
    },
    sigma,
    rho,
    beta,
  );
  const k3 = lorenzDerivative(
    {
      x: p.x + (dt / 2) * k2.x,
      y: p.y + (dt / 2) * k2.y,
      z: p.z + (dt / 2) * k2.z,
    },
    sigma,
    rho,
    beta,
  );
  const k4 = lorenzDerivative(
    {
      x: p.x + dt * k3.x,
      y: p.y + dt * k3.y,
      z: p.z + dt * k3.z,
    },
    sigma,
    rho,
    beta,
  );
  return {
    x: p.x + (dt / 6) * (k1.x + 2 * k2.x + 2 * k3.x + k4.x),
    y: p.y + (dt / 6) * (k1.y + 2 * k2.y + 2 * k3.y + k4.y),
    z: p.z + (dt / 6) * (k1.z + 2 * k2.z + 2 * k3.z + k4.z),
  };
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  precision: number;
  onChange: (value: number) => void;
}

function ParamSlider({
  label,
  value,
  min,
  max,
  step,
  precision,
  onChange,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={styles.slider}>
      <div className={styles.sliderHead}>
        <span className={styles.sliderLabel}>{label}</span>
        <span className={styles.sliderValue}>{value.toFixed(precision)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={styles.sliderInput}
        style={{ ['--lz-slider-fill' as string]: `${pct}%` }}
      />
    </div>
  );
}

export default function LorenzAttractorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState(BASE_SIZE);
  const [dpr, setDpr] = useState(1);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const [sigma, setSigma] = useState(DEFAULT_SIGMA);
  const [rho, setRho] = useState(DEFAULT_RHO);
  const [beta, setBeta] = useState(DEFAULT_BETA);

  const paramsRef = useRef({ sigma, rho, beta });
  useEffect(() => {
    paramsRef.current = { sigma, rho, beta };
  }, [sigma, rho, beta]);

  const stateRef = useRef({
    particles: INITIAL_CONDITIONS.map((ic) => ({
      pos: { ...ic },
      trail: [] as Vec3[],
    })) as Particle[],
    yaw: INITIAL_YAW,
    pitch: INITIAL_PITCH,
    autoRotate: true,
  });

  const themeRef = useRef(
    THEME_COLORS.light as (typeof THEME_COLORS)[keyof typeof THEME_COLORS],
  );
  useEffect(() => {
    themeRef.current = isDark ? THEME_COLORS.dark : THEME_COLORS.light;
  }, [isDark]);

  const resetSimulation = useCallback(() => {
    stateRef.current.particles = INITIAL_CONDITIONS.map((ic) => ({
      pos: { ...ic },
      trail: [],
    }));
  }, []);

  const handleReset = useCallback(() => {
    resetSimulation();
    stateRef.current.yaw = INITIAL_YAW;
    stateRef.current.pitch = INITIAL_PITCH;
    stateRef.current.autoRotate = true;
    setSigma(DEFAULT_SIGMA);
    setRho(DEFAULT_RHO);
    setBeta(DEFAULT_BETA);
  }, [resetSimulation]);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let animId = 0;

    const project = (
      p: Vec3,
    ): { sx: number; sy: number; depth: number } => {
      const { yaw, pitch } = stateRef.current;
      // Center the attractor: it lives roughly within
      // x ∈ [-22, 22], y ∈ [-30, 30], z ∈ [0, 50].
      const x = p.x;
      const y = p.y;
      const z = p.z - 25;
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const x1 = x * cy - y * sy;
      const y1 = x * sy + y * cy;
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const y2 = y1 * cp - z * sp;
      const z2 = y1 * sp + z * cp;
      const scale = canvasSize / 70;
      return {
        sx: canvasSize / 2 + x1 * scale,
        sy: canvasSize / 2 - z2 * scale,
        depth: y2,
      };
    };

    const drawAxes = () => {
      const colors = themeRef.current;
      const len = 18;
      const axes: Array<{ from: Vec3; to: Vec3 }> = [
        { from: { x: -len, y: 0, z: 25 }, to: { x: len, y: 0, z: 25 } },
        { from: { x: 0, y: -len, z: 25 }, to: { x: 0, y: len, z: 25 } },
        { from: { x: 0, y: 0, z: 25 - len }, to: { x: 0, y: 0, z: 25 + len } },
      ];
      ctx.strokeStyle = colors.axis;
      ctx.lineWidth = 1;
      for (const a of axes) {
        const p1 = project(a.from);
        const p2 = project(a.to);
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }
    };

    const drawTrail = (particle: Particle, color: string) => {
      const trail = particle.trail;
      if (trail.length < 2) return;

      // Render in 4 chunks with increasing alpha so the head looks fresh
      // and the tail dims gracefully — cheap "fading trail" without per-segment cost.
      const bands = 4;
      const baseAlpha = 0.18;
      const segLen = Math.ceil(trail.length / bands);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let b = 0; b < bands; b++) {
        const start = b * segLen;
        const end = Math.min(trail.length, (b + 1) * segLen + 1);
        if (end - start < 2) continue;
        ctx.globalAlpha = baseAlpha + ((1 - baseAlpha) * (b + 1)) / bands;
        ctx.beginPath();
        const p0 = project(trail[start]);
        ctx.moveTo(p0.sx, p0.sy);
        for (let i = start + 1; i < end; i++) {
          const p = project(trail[i]);
          ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const head = project(trail[trail.length - 1]);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(head.sx, head.sy, 3, 0, TWO_PI);
      ctx.fill();
    };

    const render = () => {
      const colors = themeRef.current;
      const state = stateRef.current;
      const { sigma: σ, rho: ρ, beta: β } = paramsRef.current;

      for (let s = 0; s < STEPS_PER_FRAME; s++) {
        for (const particle of state.particles) {
          particle.pos = rk4Step(particle.pos, σ, ρ, β, DT);
          particle.trail.push({ ...particle.pos });
          if (particle.trail.length > MAX_TRAIL) particle.trail.shift();
        }
      }

      if (state.autoRotate) {
        state.yaw += AUTO_ROTATE_RATE;
      }

      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      drawAxes();

      for (let i = 0; i < state.particles.length; i++) {
        drawTrail(state.particles[i], colors.trails[i % colors.trails.length]);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [canvasSize, dpr, isDark]);

  const interactionRef = useRef({ x: 0, y: 0, active: false, moved: false });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    interactionRef.current = {
      x: e.clientX,
      y: e.clientY,
      active: true,
      moved: false,
    };
    stateRef.current.autoRotate = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const inter = interactionRef.current;
    if (!inter.active) return;
    const dx = e.clientX - inter.x;
    const dy = e.clientY - inter.y;
    if (Math.abs(dx) + Math.abs(dy) > 1) inter.moved = true;
    stateRef.current.yaw += dx * 0.008;
    stateRef.current.pitch -= dy * 0.008;
    if (stateRef.current.pitch > PITCH_LIMIT)
      stateRef.current.pitch = PITCH_LIMIT;
    if (stateRef.current.pitch < -PITCH_LIMIT)
      stateRef.current.pitch = -PITCH_LIMIT;
    inter.x = e.clientX;
    inter.y = e.clientY;
  };

  const handlePointerUp = () => {
    interactionRef.current.active = false;
  };

  return (
    <div ref={containerRef} className={styles.container}>
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
      <div className={styles.controls}>
        <ParamSlider
          label="σ"
          value={sigma}
          min={1}
          max={20}
          step={0.1}
          precision={1}
          onChange={setSigma}
        />
        <ParamSlider
          label="ρ"
          value={rho}
          min={1}
          max={50}
          step={0.1}
          precision={1}
          onChange={setRho}
        />
        <ParamSlider
          label="β"
          value={beta}
          min={0.5}
          max={5}
          step={0.05}
          precision={2}
          onChange={setBeta}
        />
        <button
          type="button"
          className={styles.resetButton}
          onClick={handleReset}
          aria-label={RESET_LABEL}
        >
          <Icon icon="lucide:refresh-cw" width={14} height={14} />
          <span>{RESET_LABEL}</span>
        </button>
      </div>
    </div>
  );
}
