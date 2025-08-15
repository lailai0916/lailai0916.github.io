/*
  Neural Network Interactive Component
  Originally created by Grant Sanderson (3Blue1Brown)
  Adapted for Docusaurus/TypeScript environment
  
  This interactive works, but it isn't exactly a shining example of elegant code.

  I don't expect this to be edited a whole lot going forward, so I don't think
  it's worth taking the time to make the code beautiful. (Hopefully this doesn't come
  back to bite me.)

  So instead, here are a few noteworthy quirks to be aware of if you dive into this:
  - The entire interface is just one big SVG with event handlers to make it interactive.
    I chose to use an SVG because positioning everything with CSS sounds kind of nightmarish.

  - The entire animation process happens with pure CSS transitions. The only javascript
    involved is a single boolean called "animating" that turns on when the animation
    begins. I use transition-delay to orchestrate all the changes over time, so that not
    everything appears immediately when "animating" becomes true. I can't decide if this
    solution is really elegant or really ugly.

  - This was originally written as pretty much just one giant component that rendered
    everything. I've since split it up into smaller components, but the concerns aren't
    really separated as much as they should be. These components aren't really reusable;
    they're designed to do one thing and one thing only. In an ideal world, you might
    split these components up more nicely so they aren't quite as intertwined.
*/

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  threeImage,
  weights,
  biases,
} from './data';
import styles from './styles.module.css';

// This array defines which neurons are visible on screen.
// The null values indicate empty spaces (where the ... lives)
// It is used by many components, along with...
const visibleNeurons = [
  [0, 1, 2, 3, 4, 5, null, null, 778, 779, 780, 781, 782, 783],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
];

// ...this function, which spits out the on-screen x/y coordinates
// of a given neuron in the array above.
function getNeuronPosition(layerIndex, visibleNeuronIndex) {
  const visibleNeuronsInLayer = visibleNeurons[layerIndex].length;
  return {
    x: 230 + 115 * layerIndex,
    y: 240 + 28 * (visibleNeuronIndex - (visibleNeuronsInLayer - 1) / 2),
  };
}

export default function NeuralNetworkInteractive({ instant = false }) {
  const [points, setPoints] = useState(threeImage);
  const [isNormalized, setIsNormalized] = useState(true);
  const [normalizing, setNormalizing] = useState(false);

  const [animating, setAnimating] = useState(false);

  // Update neuron values based on points the user draws
  const [neurons, setNeurons] = useState(getNeuronValues(points));
  useEffect(() => {
    if (instant || animating) {
      setNeurons(getNeuronValues(points));
    }
  }, [points, instant, animating]);

  const normalizePointsAnimated = (duration = 1.0) => {
    setNormalizing(true);

    const data = collectNormalizationData(points);

    const startTime = Date.now();
    const ease = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

    return new Promise<void>((resolve) => {
      const frame = () => {
        const t = (Date.now() - startTime) / 1000;

        const newPoints = applyNormalizationTransformation(
          points,
          data,
          ease(Math.min(1, t / duration))
        );
        setPoints(newPoints);
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
  };

  function animate() {
    setAnimating(false);

    if (isNormalized) {
      setTimeout(() => setAnimating(true), 1);
    } else {
      normalizePointsAnimated().then(() => {
        setTimeout(() => setAnimating(true), 200);
      });
    }
  }

  const [selectedNeuron, setSelectedNeuron] = useState(null);

  return (
    <div className={styles.container}>
      <svg
        className={styles.svg}
        width={640}
        height={480}
        viewBox="0 0 640 480"
        style={{
          touchAction: 'none', // Prevent scrolling on mobile while drawing
        }}
      >
        <NeuronConnections
          selectedNeuron={selectedNeuron}
          animating={animating}
          instant={instant}
        />

        <VerticalEllipsis cx={230} cy={240} />

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

        {/* Weight grid for neurons in 2nd layer */}
        {selectedNeuron &&
          selectedNeuron.layerIndex === 1 &&
          (() => {
            const position = getNeuronPosition(
              selectedNeuron.layerIndex,
              selectedNeuron.neuronId
            );

            return (
              <WeightGrid
                x={position.x + 20}
                y={-40 + (position.y - 240) * 0.85 + 240}
                width={85}
                height={85}
                weights={weights[0][selectedNeuron.neuronId]}
                inputNeurons={neurons[0]}
              />
            );
          })()}

        {/* Background overlay while drawing (covers everything else) */}
        {!instant && (
          <rect
            x="0"
            y="0"
            width="640"
            height="480"
            fill="var(--ifm-background-color)"
            style={{
              opacity: animating ? 0.0 : 1.0,
              pointerEvents: animating ? 'none' : undefined,
              transition: 'opacity 300ms ease-in-out',
            }}
          />
        )}

        <ImageGrid
          instant={instant}
          editing={!animating || instant}
          startEditing={() => {
            setAnimating(false);
            setPoints([]);
            setIsNormalized(false);
          }}
          x={animating || instant ? 10 : 125}
          y={animating || instant ? 10 : 10}
          width={animating || instant ? 190 : 390}
          height={animating || instant ? 190 : 390}
          points={points}
          setPoints={(newPoints) => {
            setPoints(newPoints);
            setIsNormalized(false);
          }}
          normalizing={normalizing}
          isNormalized={isNormalized}
          normalizePointsAnimated={normalizePointsAnimated}
          beginAnimation={animate}
          highlightedTile={
            selectedNeuron && selectedNeuron.layerIndex === 0
              ? selectedNeuron.neuronId
              : null
          }
        />
      </svg>
    </div>
  );
}

function NeuronConnections({ selectedNeuron, animating, instant }) {
  let connections = [];

  for (let layerIndex = 1; layerIndex < visibleNeurons.length; layerIndex++) {
    const layer = visibleNeurons[layerIndex];

    const prevLayerIndex = layerIndex - 1;
    const prevLayer = visibleNeurons[prevLayerIndex];

    layer.forEach((neuronId, neuronIndex) => {
      if (neuronId === null) return;

      prevLayer.forEach((prevNeuronId, prevNeuronIndex) => {
        if (prevNeuronId === null) return;

        const weight = weights[prevLayerIndex][neuronId][prevNeuronId];

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

        const prevNeuronPos = getNeuronPosition(
          prevLayerIndex,
          prevNeuronIndex
        );
        const nextNeuronPos = getNeuronPosition(layerIndex, neuronIndex);

        const lineLength = Math.hypot(
          prevNeuronPos.x - nextNeuronPos.x,
          prevNeuronPos.y - nextNeuronPos.y
        );

        const thisLineCanAnimate =
          (prevNeuronId * layer.length + neuronId) % 7 === 2;

        connections.push(
          <line
            key={`${prevLayerIndex}-${prevNeuronId}-${layerIndex}-${neuronId}`}
            x1={prevNeuronPos.x}
            x2={nextNeuronPos.x}
            y1={prevNeuronPos.y}
            y2={nextNeuronPos.y}
            stroke={color}
            strokeWidth={lineWidth}
          />
        );

        if (thisLineCanAnimate && !instant) {
          connections.push(
            <line
              key={`${prevLayerIndex}-${prevNeuronId}-${layerIndex}-${neuronId}-anim`}
              x1={prevNeuronPos.x}
              x2={nextNeuronPos.x}
              y1={prevNeuronPos.y}
              y2={nextNeuronPos.y}
              stroke="var(--nn-connection-animation)"
              strokeWidth={lineWidth}
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
}) {
  return (
    <g>
      {visibleNeurons.map((layer, layerIndex) =>
        layer.map((neuronId, neuronIndex) => {
          if (neuronId === null) return null;

          const neuronValue = neurons[layerIndex][neuronId];
          const grayCalc = `calc(var(--nn-neuron-gray-base) + var(--nn-neuron-gray-multiplier) * ${neuronValue})`;
          const fill = `rgb(${grayCalc}, ${grayCalc}, ${grayCalc})`;

          const neuronPos = getNeuronPosition(layerIndex, neuronIndex);

          const isSelected =
            selectedNeuron &&
            selectedNeuron.layerIndex === layerIndex &&
            selectedNeuron.neuronId === neuronId;

          return (
            <circle
              key={`${layerIndex}-${neuronId}`}
              cx={neuronPos.x}
              cy={neuronPos.y}
              r={10}
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
              onClick={() => {
                if (isSelected) {
                  setSelectedNeuron(null);
                } else {
                  setSelectedNeuron({ layerIndex, neuronId });
                }
              }}
            />
          );
        })
      )}
    </g>
  );
}

function WinningOutputNeuronBox({ neurons, animating, instant }) {
  const winningValue = Math.max(...neurons[3]);
  const winningNeuron = neurons[3].indexOf(winningValue);
  const position = getNeuronPosition(3, winningNeuron);
  return (
    <rect
      x={position.x - 18}
      y={position.y - 16}
      width={56}
      height={32}
      stroke="var(--nn-stroke-accent)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray="176 176"
      strokeDashoffset={(animating || instant ? 0 : 1) * 176}
      style={{
        transition: animating
          ? `stroke-dashoffset 800ms ease-in-out ${instant ? '0ms' : '4500ms'}`
          : 'none',
      }}
    />
  );
}

function OutputDigitLabels() {
  return (
    <g>
      {visibleNeurons[visibleNeurons.length - 1].map(
        (neuronId, neuronIndex) => {
          const position = getNeuronPosition(
            visibleNeurons.length - 1,
            neuronIndex
          );

          return (
            <text
              key={neuronId}
              x={position.x + 25}
              y={position.y + 2}
              style={{ fill: 'var(--nn-text-primary)' }}
              fontSize={20}
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {neuronId}
            </text>
          );
        }
      )}
    </g>
  );
}

function ImageGrid({
  x,
  y,
  width,
  height,
  points,
  setPoints,
  normalizing,
  isNormalized,
  normalizePointsAnimated,
  instant,
  editing,
  startEditing,
  beginAnimation,
  highlightedTile,
}) {
  const [dragging, setDragging] = useState(false);

  const fillAtPoint = useCallback(
    (x, y, drag) => {
      setPoints((points) => {
        let newPoints = [];
        if (drag && points.length > 0) {
          const prevPoint = points[points.length - 1];
          for (let d = 1; d <= 2; d++) {
            newPoints.push({
              x: prevPoint.x + (x - prevPoint.x) * (d / 3),
              y: prevPoint.y + (y - prevPoint.y) * (d / 3),
            });
          }
        }

        newPoints.push({ x, y });

        return [...points, ...newPoints];
      });
    },
    [setPoints]
  );

  const fillAtClientPixel = useCallback(
    (screenX, screenY, target, drag) => {
      const rect = target.getBoundingClientRect();
      const x = ((screenX - rect.left) / (rect.right - rect.left)) * 28;
      const y = ((screenY - rect.top) / (rect.bottom - rect.top)) * 28;

      fillAtPoint(x, y, drag);
    },
    [fillAtPoint]
  );

  const fillAtEventLocation = useCallback(
    (event, drag = false) => {
      if (event.touches) {
        for (const touch of event.touches) {
          // This code is supposed to handle multi-touch (drawing with two
          // fingers at once) but on my phone it only seems to deal with
          // one touch at a time. Not sure why.
          fillAtClientPixel(touch.clientX, touch.clientY, event.target, drag);
        }
      } else {
        // This was a mouse event
        fillAtClientPixel(event.clientX, event.clientY, event.target, drag);
      }
    },
    [fillAtClientPixel]
  );

  const onMouseUp = useCallback((event) => {
    setDragging(false);
  }, []);

  const onMouseDown = useCallback(
    (event) => {
      if (editing) {
        setDragging(true);
        fillAtEventLocation(event);
        event.preventDefault();
      }
    },
    [editing, fillAtEventLocation]
  );

  const onMouseMove = useCallback(
    (event) => {
      if (dragging && editing) {
        fillAtEventLocation(event, true);
        event.preventDefault();
      }
    },
    [dragging, editing, fillAtEventLocation]
  );

  const onClick = useCallback(() => {
    if (!editing) {
      startEditing();
    }
  }, [editing, startEditing]);

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
    };
  }, [onMouseUp]);

  const values = useMemo(() => getInputNeuronValues(points), [points]);

  const isEmpty = !values.some((value) => value > 0.1);

  return (
    <g
      style={{
        transform: `translate(${x}px, ${y}px) scale(${width / 400}, ${height / 400})`,
        transition: 'all 500ms ease-in-out',
      }}
    >
      <rect x={0} y={0} width={400} height={400} fill="var(--nn-bg-primary)" />

      <g>
        {values.map((value, n) => {
          const tileX = n % 28;
          const tileY = Math.floor(n / 28);

          return (
            <rect
              key={`${tileX}-${tileY}`}
              x={(tileX * 400) / 28}
              y={(tileY * 400) / 28}
              width={400 / 28}
              height={400 / 28}
              fill={`rgba(var(--nn-grid-white-rgb), ${value})`}
              stroke={
                highlightedTile === n ? 'var(--nn-stroke-accent)' : 'none'
              }
              strokeWidth="2"
            />
          );
        })}
      </g>

      <g
        style={{
          opacity: normalizing ? 1.0 : 0.0,
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
        stroke="var(--nn-stroke-primary)"
        strokeWidth="2"
        rx="2"
        fill="var(--nn-transparent)"
        style={{
          cursor: editing ? 'crosshair' : 'pointer',
        }}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        onMouseMove={onMouseMove}
        onTouchMove={onMouseMove}
      />

      <g
        transform="translate(0 410)"
        style={{
          opacity: editing ? 1.0 : 0.0,
          pointerEvents: editing ? undefined : 'none',
          transition: 'opacity 500ms ease-in-out',
        }}
      >
        <g>
          <rect
            x={0}
            y={0}
            width={150}
            height={60}
            tabIndex={0}
            rx={3}
            onClick={() => {
              if (!isEmpty) {
                setPoints([]);
              }
            }}
            style={{
              fill: 'var(--nn-button-clear)',
              cursor: isEmpty ? 'default' : 'pointer',
              opacity: isEmpty ? 0.5 : 1.0,
            }}
          />

          <text
            x={75}
            y={32}
            dominantBaseline="middle"
            textAnchor="middle"
            fill="var(--nn-text-secondary)"
            fontFamily="sans-serif"
            fontSize={24}
            style={{
              pointerEvents: 'none',
              opacity: isEmpty ? 0.5 : 1.0,
            }}
          >
            Clear
          </text>
        </g>

        {!instant && (
          <g>
            <rect
              x={200}
              y={0}
              width={200}
              height={60}
              tabIndex={0}
              rx={3}
              onClick={() => {
                if (!isEmpty) {
                  beginAnimation();
                }
              }}
              style={{
                fill: 'var(--nn-button-primary)',
                cursor: isEmpty ? 'default' : 'pointer',
                opacity: isEmpty ? 0.5 : 1.0,
              }}
            />

            <text
              x={300}
              y={32}
              dominantBaseline="middle"
              textAnchor="middle"
              fill="var(--nn-text-primary)"
              fontFamily="sans-serif"
              fontSize={24}
              style={{
                pointerEvents: 'none',
                opacity: isEmpty ? 0.5 : 1.0,
              }}
            >
              Check digit
            </text>
          </g>
        )}

        {instant && (
          <g>
            <rect
              x={200}
              y={0}
              width={200}
              height={60}
              tabIndex={0}
              rx={3}
              onClick={() => {
                if (!(isEmpty || isNormalized)) {
                  normalizePointsAnimated(1);
                }
              }}
              style={{
                fill: 'var(--nn-button-primary)',
                cursor: isEmpty || isNormalized ? 'default' : 'pointer',
                opacity: isEmpty || isNormalized ? 0.5 : 1.0,
              }}
            />

            <text
              x={300}
              y={32}
              dominantBaseline="middle"
              textAnchor="middle"
              fill="var(--nn-text-primary)"
              fontFamily="sans-serif"
              fontSize={24}
              style={{
                pointerEvents: 'none',
                opacity: isEmpty || isNormalized ? 0.5 : 1.0,
              }}
            >
              Pre-process
            </text>
          </g>
        )}
      </g>
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
      <circle cx={cx} cy={cy - 12} r={3} fill="var(--nn-grid-white)" />
      <circle cx={cx} cy={cy} r={3} fill="var(--nn-grid-white)" />
      <circle cx={cx} cy={cy + 12} r={3} fill="var(--nn-grid-white)" />
    </g>
  );
});

function WeightGrid({ x, y, width, height, weights, inputNeurons }) {
  const maxWeight = Math.max(...weights.map(Math.abs));

  return (
    <g transform={`translate(${x} ${y}) scale(${width / 28} ${height / 28})`}>
      <rect
        x="-1"
        y="-1"
        width="30"
        height="30"
        fill="var(--nn-grid-fill)"
        stroke="var(--nn-grid-stroke)"
        strokeWidth="0.5"
      />
      {weights.map((weight, n) => {
        const weightX = n % 28;
        const weightY = Math.floor(n / 28);

        const alpha = Math.abs(weight / maxWeight) ** 0.3;
        const color =
          weight < 0
            ? `rgba(var(--nn-connection-negative-rgb), ${alpha})`
            : `rgba(var(--nn-connection-positive-rgb), ${alpha})`;

        return (
          <rect
            key={n}
            x={weightX}
            y={weightY}
            width="1"
            height="1"
            fill={color}
          />
        );
      })}
      <rect
        x="31"
        y="-1"
        width="30"
        height="30"
        fill="var(--nn-grid-fill)"
        stroke="var(--nn-grid-stroke)"
        strokeWidth="0.5"
      />
      {weights.map((weight, n) => {
        const weightX = n % 28;
        const weightY = Math.floor(n / 28);

        const alpha = Math.abs(weight / maxWeight) ** 0.3 * inputNeurons[n];
        const color =
          weight < 0
            ? `rgba(var(--nn-connection-negative-rgb), ${alpha})`
            : `rgba(var(--nn-connection-positive-rgb), ${alpha})`;

        return (
          <rect
            key={`weighted-${n}`}
            x={32 + weightX}
            y={weightY}
            width="1"
            height="1"
            fill={color}
          />
        );
      })}
    </g>
  );
}

function dotProduct(vec1, vec2) {
  let result = 0;
  for (let i = 0; i < vec1.length; i++) {
    result += vec1[i] * vec2[i];
  }
  return result;
}

function matrixVectorMult(matrix, vector) {
  let result = [];
  for (let row = 0; row < matrix.length; row++) {
    result.push(dotProduct(matrix[row], vector));
  }
  return result;
}

function vectorAdd(vec1, vec2) {
  let result = [];
  for (let i = 0; i < vec1.length; i++) {
    result.push(vec1[i] + vec2[i]);
  }
  return result;
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

// a_1 = sigma(W * a_0 + b)
function getAllNeuronValues(firstLayer) {
  let layers = [firstLayer];

  while (layers.length <= weights.length) {
    const previousLayer = layers[layers.length - 1];
    const weightMatrix = weights[layers.length - 1];
    const biasVector = biases[layers.length - 1];
    layers.push(
      vectorAdd(matrixVectorMult(weightMatrix, previousLayer), biasVector).map(
        sigmoid
      )
    );
  }

  return layers;
}

function getInputNeuronValues(points) {
  let values = new Array(28 ** 2).fill(0);

  for (const point of points) {
    const { x, y } = point;

    values = values.map((value, n) => {
      const tileX = n % 28;
      const tileY = Math.floor(n / 28);

      const dist = Math.hypot(tileX - x, tileY - y);

      let penValue = 0.8 - (dist / 2) ** 2;
      penValue = Math.min(Math.max(0, penValue), 1);
      return value + (1 - value) * penValue;
    });
  }

  return values;
}

function getNeuronValues(points) {
  const inputNeurons = getInputNeuronValues(points);
  return getAllNeuronValues(inputNeurons);
}

function collectNormalizationData(points) {
  const values = getInputNeuronValues(points);

  let left = Infinity;
  let right = -Infinity;
  let top = Infinity;
  let bottom = -Infinity;

  let centerX = 0;
  let centerY = 0;
  let totalValue = 0;

  for (let n = 0; n < values.length; n++) {
    const x = n % 28;
    const y = Math.floor(n / 28);
    const value = values[n];

    centerX += x * value;
    centerY += y * value;
    totalValue += value;

    if (value > 0.05) {
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }

  centerX /= totalValue;
  centerY /= totalValue;

  const width = right - left;
  const height = bottom - top;

  const scale = 20 / Math.max(width, height);

  return { scale, centerX, centerY };
}

function applyNormalizationTransformation(points, data, time = 1) {
  const { scale, centerX, centerY } = data;

  return points.map((point) => {
    let { x, y } = point;

    x -= centerX;
    y -= centerY;

    x *= scale;
    y *= scale;

    x += 14;
    y += 14;

    return {
      ...point,
      x: point.x + (x - point.x) * time,
      y: point.y + (y - point.y) * time,
    };
  });
}
