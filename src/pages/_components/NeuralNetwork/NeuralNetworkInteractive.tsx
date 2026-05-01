// Adapted from the interactive on 3Blue1Brown's neural network series: https://www.3blue1brown.com/lessons/neural-networks

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import Button from '@site/src/components/laikit/Button';
import styles from './styles.module.css';

const CLEAR_LABEL = translate({
  id: 'home.neuralnetwork.clear',
  message: 'Clear',
});
const CHECK_LABEL = translate({
  id: 'home.neuralnetwork.check',
  message: 'Check digit',
});
const PREPROCESS_LABEL = translate({
  id: 'home.neuralnetwork.preprocess',
  message: 'Pre-process',
});

type Point = { x: number; y: number };
type NormData = { scale: number; centerX: number; centerY: number };
type SelectedNeuron = { layerIndex: number; neuronId: number } | null;

// Module-level cache so the JSON is only fetched once across remounts
let weights: number[][][] | null = null;
let biases: number[][] | null = null;
let threeImage: Point[] | null = null;

// null entries mark the ellipsis gaps between visible neurons
const visibleNeurons: (number | null)[][] = [
  [0, 1, 2, 3, 4, 5, null, null, 778, 779, 780, 781, 782, 783],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
];

// Square 500×500 canvas, matching Fourier Transform's canvas.
const CANVAS_SIZE = 500;
const CANVAS_CENTER = CANVAS_SIZE / 2;

function getNeuronPosition(layerIndex: number, visibleNeuronIndex: number) {
  const count = visibleNeurons[layerIndex].length;
  return {
    x: 175 + 90 * layerIndex,
    y: CANVAS_CENTER + 25 * (visibleNeuronIndex - (count - 1) / 2),
  };
}

export default function NeuralNetworkInteractive({
  instant = false,
}: {
  instant?: boolean;
}) {
  const dataUrl = useBaseUrl('/json/neural-network-data.json');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [isNormalized, setIsNormalized] = useState(true);
  const [normalizing, setNormalizing] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [selectedNeuron, setSelectedNeuron] = useState<SelectedNeuron>(null);
  const [neurons, setNeurons] = useState<number[][]>([[], [], [], []]);

  useEffect(() => {
    if (weights !== null) {
      setDataLoaded(true);
      return;
    }
    fetch(dataUrl)
      .then((r) => r.json())
      .then((data) => {
        weights = data.weights;
        biases = data.biases;
        threeImage = data.threeImage;
        setDataLoaded(true);
      });
  }, [dataUrl]);

  useEffect(() => {
    if (dataLoaded && threeImage && points.length === 0) {
      setPoints(threeImage);
    }
  }, [dataLoaded]);

  useEffect(() => {
    if (instant || animating) {
      setNeurons(getNeuronValues(points));
    }
  }, [points, instant, animating]);

  const normalizePointsAnimated = useCallback(
    (duration = 1.0): Promise<void> => {
      setNormalizing(true);
      const normData = collectNormalizationData(points);
      const startTime = Date.now();
      const ease = (t: number) =>
        t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;

      return new Promise((resolve) => {
        const frame = () => {
          const t = (Date.now() - startTime) / 1000;
          setPoints(
            applyNormalizationTransformation(
              points,
              normData,
              ease(Math.min(1, t / duration))
            )
          );
          setIsNormalized(true);
          if (t < duration) {
            requestAnimationFrame(frame);
          } else {
            setNormalizing(false);
            resolve();
          }
        };
        frame();
      });
    },
    [points]
  );

  const animate = useCallback(() => {
    setAnimating(false);
    if (isNormalized) {
      setTimeout(() => setAnimating(true), 1);
    } else {
      normalizePointsAnimated().then(() =>
        setTimeout(() => setAnimating(true), 200)
      );
    }
  }, [isNormalized, normalizePointsAnimated]);

  const inputValues = useMemo(() => getInputNeuronValues(points), [points]);
  const isEmpty = !inputValues.some((v) => v > 0.1);

  if (!dataLoaded) {
    return (
      <div className={styles.container} style={{ minHeight: CANVAS_SIZE }} />
    );
  }

  const compact = animating || instant;
  const editing = !animating || instant;

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <svg
          className={styles.svg}
          width={CANVAS_SIZE}
          height={CANVAS_SIZE}
          viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
          style={{ touchAction: 'none' }}
        >
          <NeuronConnections
            selectedNeuron={selectedNeuron}
            animating={animating}
            instant={instant}
          />
          <VerticalEllipsis cx={175} cy={CANVAS_CENTER} />
          <Neurons
            neurons={neurons}
            selectedNeuron={selectedNeuron}
            setSelectedNeuron={setSelectedNeuron}
            animating={animating}
            instant={instant}
          />
          <OutputDigitLabels />
          <WinningOutputNeuronBox
            neurons={neurons}
            animating={animating}
            instant={instant}
          />

          {selectedNeuron?.layerIndex === 1 &&
            (() => {
              const pos = getNeuronPosition(
                selectedNeuron.layerIndex,
                selectedNeuron.neuronId
              );
              return (
                <WeightGrid
                  x={pos.x + 14}
                  y={-30 + (pos.y - CANVAS_CENTER) * 0.85 + CANVAS_CENTER}
                  width={65}
                  height={65}
                  weights={weights![0][selectedNeuron.neuronId]}
                  inputNeurons={neurons[0]}
                />
              );
            })()}

          {!instant && (
            <rect
              x="0"
              y="0"
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              fill="var(--ifm-background-color)"
              style={{
                opacity: animating ? 0 : 1,
                pointerEvents: animating ? 'none' : undefined,
                transition: 'opacity 300ms ease-in-out',
              }}
            />
          )}

          <ImageGrid
            editing={editing}
            startEditing={() => {
              setAnimating(false);
              setPoints([]);
              setIsNormalized(false);
            }}
            x={compact ? 10 : 70}
            y={compact ? 10 : 30}
            width={compact ? 130 : 360}
            height={compact ? 130 : 360}
            points={points}
            inputValues={inputValues}
            setPoints={(newPoints) => {
              setPoints(newPoints);
              setIsNormalized(false);
            }}
            normalizing={normalizing}
            highlightedTile={
              selectedNeuron?.layerIndex === 0 ? selectedNeuron.neuronId : null
            }
          />
        </svg>

        <div
          className={clsx(styles.controls, !editing && styles.controlsHidden)}
          aria-hidden={!editing}
        >
          <Button
            variant="secondary"
            fullWidth
            disabled={isEmpty}
            className={styles.buttonSlot}
            onClick={() => {
              setPoints([]);
              setIsNormalized(false);
            }}
          >
            {CLEAR_LABEL}
          </Button>
          {instant ? (
            <Button
              variant="primary"
              fullWidth
              disabled={isEmpty || isNormalized}
              className={styles.buttonSlot}
              onClick={() => normalizePointsAnimated(1)}
            >
              {PREPROCESS_LABEL}
            </Button>
          ) : (
            <Button
              variant="primary"
              fullWidth
              disabled={isEmpty}
              className={styles.buttonSlot}
              onClick={animate}
            >
              {CHECK_LABEL}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function NeuronConnections({
  selectedNeuron,
  animating,
  instant,
}: {
  selectedNeuron: SelectedNeuron;
  animating: boolean;
  instant: boolean;
}) {
  const connections: React.ReactNode[] = [];

  for (let layerIndex = 1; layerIndex < visibleNeurons.length; layerIndex++) {
    const layer = visibleNeurons[layerIndex];
    const prevLayerIndex = layerIndex - 1;
    const prevLayer = visibleNeurons[prevLayerIndex];

    layer.forEach((neuronId, neuronIndex) => {
      if (neuronId === null) return;

      prevLayer.forEach((prevNeuronId, prevNeuronIndex) => {
        if (prevNeuronId === null) return;

        const weight = weights![prevLayerIndex][neuronId][prevNeuronId];
        const layerIsHighlighted = selectedNeuron?.layerIndex === layerIndex;
        const neuronIsHighlighted =
          layerIsHighlighted && selectedNeuron?.neuronId === neuronId;

        const maxAlpha = neuronIsHighlighted
          ? 1.0
          : layerIsHighlighted
            ? 0.1
            : 0.3;
        const alpha = maxAlpha * Math.abs(weight * 0.6);
        const color =
          weight < 0
            ? `rgba(var(--nn-connection-negative-rgb), ${alpha})`
            : `rgba(var(--nn-connection-positive-rgb), ${alpha})`;
        const lineWidth = neuronIsHighlighted ? 3 : 1;

        const prevPos = getNeuronPosition(prevLayerIndex, prevNeuronIndex);
        const nextPos = getNeuronPosition(layerIndex, neuronIndex);
        const lineLength = Math.hypot(
          prevPos.x - nextPos.x,
          prevPos.y - nextPos.y
        );
        const canAnimate = (prevNeuronId * layer.length + neuronId) % 7 === 2;

        const lineProps = {
          x1: prevPos.x,
          x2: nextPos.x,
          y1: prevPos.y,
          y2: nextPos.y,
          strokeWidth: lineWidth,
        };

        connections.push(
          <line
            key={`${prevLayerIndex}-${prevNeuronId}-${layerIndex}-${neuronId}`}
            {...lineProps}
            stroke={color}
          />
        );

        if (canAnimate && !instant) {
          connections.push(
            <line
              key={`${prevLayerIndex}-${prevNeuronId}-${layerIndex}-${neuronId}-anim`}
              {...lineProps}
              stroke="var(--nn-connection-animation)"
              strokeDasharray={`${lineLength} ${lineLength}`}
              strokeDashoffset={(animating ? -1 : 1) * lineLength}
              style={{
                transition: animating
                  ? `stroke-dashoffset 1200ms ease-in-out ${1200 * (layerIndex - 1) + 500 + 100 * Math.random()}ms`
                  : 'none',
              }}
            />
          );
        }
      });
    });
  }

  return <g>{connections}</g>;
}

function Neurons({
  neurons,
  selectedNeuron,
  setSelectedNeuron,
  animating,
  instant,
}: {
  neurons: number[][];
  selectedNeuron: SelectedNeuron;
  setSelectedNeuron: (n: SelectedNeuron) => void;
  animating: boolean;
  instant: boolean;
}) {
  return (
    <g>
      {visibleNeurons.map((layer, layerIndex) =>
        layer.map((neuronId, neuronIndex) => {
          if (neuronId === null) return null;

          const neuronValue = neurons[layerIndex][neuronId];
          const grayCalc = `calc(var(--nn-neuron-gray-base) + var(--nn-neuron-gray-multiplier) * ${neuronValue})`;
          const fill = `rgb(${grayCalc}, ${grayCalc}, ${grayCalc})`;
          const pos = getNeuronPosition(layerIndex, neuronIndex);
          const isSelected =
            selectedNeuron?.layerIndex === layerIndex &&
            selectedNeuron?.neuronId === neuronId;

          return (
            <circle
              key={`${layerIndex}-${neuronId}`}
              cx={pos.x}
              cy={pos.y}
              r={8}
              stroke={
                isSelected
                  ? 'var(--nn-neuron-border-selected)'
                  : 'var(--nn-neuron-border-default)'
              }
              strokeWidth={isSelected ? 2 : 1}
              style={{
                fill:
                  animating || instant ? fill : 'var(--nn-neuron-fill-default)',
                transition:
                  animating && !instant
                    ? `fill 600ms ease-in-out ${1200 * layerIndex + 100}ms`
                    : 'none',
                cursor: 'pointer',
              }}
              onClick={() =>
                setSelectedNeuron(isSelected ? null : { layerIndex, neuronId })
              }
            />
          );
        })
      )}
    </g>
  );
}

function WinningOutputNeuronBox({
  neurons,
  animating,
  instant,
}: {
  neurons: number[][];
  animating: boolean;
  instant: boolean;
}) {
  const outputLayer = neurons[3];
  const winningNeuron = outputLayer.indexOf(Math.max(...outputLayer));
  const pos = getNeuronPosition(3, winningNeuron);
  const w = 44;
  const h = 24;
  const perimeter = 2 * (w + h);
  return (
    <rect
      x={pos.x - 13}
      y={pos.y - 12}
      width={w}
      height={h}
      stroke="var(--nn-stroke-accent)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray={`${perimeter} ${perimeter}`}
      strokeDashoffset={(animating || instant ? 0 : 1) * perimeter}
      style={{
        transition: animating
          ? `stroke-dashoffset 800ms ease-in-out ${instant ? '0ms' : '4500ms'}`
          : 'none',
      }}
    />
  );
}

function OutputDigitLabels() {
  const lastLayerIndex = visibleNeurons.length - 1;
  return (
    <g>
      {visibleNeurons[lastLayerIndex].map((neuronId, neuronIndex) => {
        const pos = getNeuronPosition(lastLayerIndex, neuronIndex);
        return (
          <text
            key={neuronId}
            x={pos.x + 22}
            y={pos.y + 1}
            style={{ fill: 'var(--nn-text-primary)' }}
            fontSize={16}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {neuronId}
          </text>
        );
      })}
    </g>
  );
}

interface ImageGridProps {
  x: number;
  y: number;
  width: number;
  height: number;
  points: Point[];
  inputValues: number[];
  setPoints: (points: Point[]) => void;
  normalizing: boolean;
  editing: boolean;
  startEditing: () => void;
  highlightedTile: number | null;
}

function ImageGrid({
  x,
  y,
  width,
  height,
  points,
  inputValues,
  setPoints,
  normalizing,
  editing,
  startEditing,
  highlightedTile,
}: ImageGridProps) {
  const [dragging, setDragging] = useState(false);

  const fillAtPoint = useCallback(
    (px: number, py: number, drag: boolean) => {
      const interpolated: Point[] = [];
      if (drag && points.length > 0) {
        const last = points[points.length - 1];
        for (let d = 1; d <= 2; d++) {
          interpolated.push({
            x: last.x + (px - last.x) * (d / 3),
            y: last.y + (py - last.y) * (d / 3),
          });
        }
      }
      setPoints([...points, ...interpolated, { x: px, y: py }]);
    },
    [points, setPoints]
  );

  const fillAtClientPixel = useCallback(
    (screenX: number, screenY: number, target: EventTarget, drag: boolean) => {
      const rect = (target as Element).getBoundingClientRect();
      fillAtPoint(
        ((screenX - rect.left) / (rect.right - rect.left)) * 28,
        ((screenY - rect.top) / (rect.bottom - rect.top)) * 28,
        drag
      );
    },
    [fillAtPoint]
  );

  const fillAtEvent = useCallback(
    (event: React.MouseEvent | React.TouchEvent, drag = false) => {
      if ('touches' in event) {
        Array.from(event.touches).forEach((touch) =>
          fillAtClientPixel(touch.clientX, touch.clientY, event.target, drag)
        );
      } else {
        fillAtClientPixel(event.clientX, event.clientY, event.target, drag);
      }
    },
    [fillAtClientPixel]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  const onMouseDown = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (editing) {
        setDragging(true);
        fillAtEvent(event);
        event.preventDefault();
      }
    },
    [editing, fillAtEvent]
  );

  const onMouseMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (dragging && editing) {
        fillAtEvent(event, true);
        event.preventDefault();
      }
    },
    [dragging, editing, fillAtEvent]
  );

  const onClick = useCallback(() => {
    if (!editing) startEditing();
  }, [editing, startEditing]);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
    };
  }, [onMouseUp]);

  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px) scale(${width / 400}, ${height / 400})`,
        transition: 'all 500ms ease-in-out',
      }}
    >
      <rect x={0} y={0} width={400} height={400} fill="var(--nn-bg-primary)" />

      <g>
        {inputValues.map((value, n) => (
          <rect
            key={n}
            x={(n % 28) * (400 / 28)}
            y={Math.floor(n / 28) * (400 / 28)}
            width={400 / 28}
            height={400 / 28}
            fill={`rgba(var(--nn-grid-white-rgb), ${value})`}
            stroke={highlightedTile === n ? 'var(--nn-stroke-accent)' : 'none'}
            strokeWidth="2"
          />
        ))}
      </g>

      <g
        style={{
          opacity: normalizing ? 1 : 0,
          pointerEvents: 'none',
          transition: 'opacity 200ms ease-in-out',
        }}
      >
        <rect
          x={50}
          y={0}
          width={300}
          height={80}
          fill="var(--nn-bg-overlay)"
        />
        <text
          x={200}
          y={50}
          dominantBaseline="middle"
          textAnchor="middle"
          fill="var(--nn-text-accent)"
          fontFamily="sans-serif"
          fontSize={36}
        >
          Pre-processing...
        </text>
      </g>

      <rect
        x={0}
        y={0}
        width={400}
        height={400}
        stroke="var(--nn-stroke-subtle)"
        strokeWidth="1"
        rx="2"
        fill="var(--nn-transparent)"
        style={{ cursor: editing ? 'crosshair' : 'pointer' }}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        onMouseMove={onMouseMove}
        onTouchMove={onMouseMove}
      />
    </g>
  );
}

const VerticalEllipsis = React.memo(function VerticalEllipsis({
  cx = 0,
  cy = 0,
}: {
  cx?: number;
  cy?: number;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy - 10} r={2.5} fill="var(--nn-grid-white)" />
      <circle cx={cx} cy={cy} r={2.5} fill="var(--nn-grid-white)" />
      <circle cx={cx} cy={cy + 10} r={2.5} fill="var(--nn-grid-white)" />
    </g>
  );
});

function WeightGrid({
  x,
  y,
  width,
  height,
  weights: w,
  inputNeurons,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  weights: number[];
  inputNeurons: number[];
}) {
  const maxWeight = Math.max(...w.map(Math.abs));

  return (
    <g transform={`translate(${x} ${y}) scale(${width / 28} ${height / 28})`}>
      {[{ ox: -1 }, { ox: 31 }].map(({ ox }) => (
        <rect
          key={ox}
          x={ox}
          y="-1"
          width="30"
          height="30"
          fill="var(--nn-grid-fill)"
          stroke="var(--nn-grid-stroke)"
          strokeWidth="0.5"
        />
      ))}
      {w.map((weight, n) => {
        const wx = n % 28;
        const wy = Math.floor(n / 28);
        const alpha = (Math.abs(weight) / maxWeight) ** 0.3;
        const colorVar =
          weight < 0
            ? 'var(--nn-connection-negative-rgb)'
            : 'var(--nn-connection-positive-rgb)';
        return (
          <React.Fragment key={n}>
            <rect
              x={wx}
              y={wy}
              width="1"
              height="1"
              fill={`rgba(${colorVar}, ${alpha})`}
            />
            <rect
              x={32 + wx}
              y={wy}
              width="1"
              height="1"
              fill={`rgba(${colorVar}, ${alpha * inputNeurons[n]})`}
            />
          </React.Fragment>
        );
      })}
    </g>
  );
}

// ── Math utilities ──────────────────────────────────────────────────────────

function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

function matMulVec(matrix: number[][], vec: number[]): number[] {
  return matrix.map((row) => dotProduct(row, vec));
}

function vecAdd(a: number[], b: number[]): number[] {
  return a.map((v, i) => v + b[i]);
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

// a_1 = σ(W · a_0 + b)
function getAllNeuronValues(firstLayer: number[]): number[][] {
  if (!weights || !biases) return [firstLayer, [], [], []];
  const layers: number[][] = [firstLayer];
  while (layers.length <= weights.length) {
    const prev = layers[layers.length - 1];
    layers.push(
      vecAdd(
        matMulVec(weights[layers.length - 1], prev),
        biases[layers.length - 1]
      ).map(sigmoid)
    );
  }
  return layers;
}

function getInputNeuronValues(points: Point[]): number[] {
  let values = new Array<number>(28 * 28).fill(0);
  for (const { x, y } of points) {
    values = values.map((v, n) => {
      const penValue = Math.min(
        Math.max(
          0,
          0.8 - (Math.hypot((n % 28) - x, Math.floor(n / 28) - y) / 2) ** 2
        ),
        1
      );
      return v + (1 - v) * penValue;
    });
  }
  return values;
}

function getNeuronValues(points: Point[]): number[][] {
  return getAllNeuronValues(getInputNeuronValues(points));
}

function collectNormalizationData(points: Point[]): NormData {
  const values = getInputNeuronValues(points);
  let left = Infinity,
    right = -Infinity,
    top = Infinity,
    bottom = -Infinity;
  let centerX = 0,
    centerY = 0,
    total = 0;

  values.forEach((v, n) => {
    const x = n % 28,
      y = Math.floor(n / 28);
    centerX += x * v;
    centerY += y * v;
    total += v;
    if (v > 0.05) {
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  });

  return {
    scale: 20 / Math.max(right - left, bottom - top),
    centerX: centerX / total,
    centerY: centerY / total,
  };
}

function applyNormalizationTransformation(
  points: Point[],
  data: NormData,
  time = 1
): Point[] {
  const { scale, centerX, centerY } = data;
  return points.map((p) => {
    const tx = (p.x - centerX) * scale + 14;
    const ty = (p.y - centerY) * scale + 14;
    return { x: p.x + (tx - p.x) * time, y: p.y + (ty - p.y) * time };
  });
}
