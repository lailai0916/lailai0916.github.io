import { useRef, useState, type ComponentType } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import Card from '@site/src/components/laikit/Card';
import WindowBar from '@site/src/components/laikit/WindowBar';
import { useMeasuredHeight } from '@site/src/hooks/useMeasuredHeight';
import NeuralNetwork from '../NeuralNetwork';
import FourierTransform from '../FourierTransform';
import LorenzAttractor from '../LorenzAttractor';
import GameOfLife from '../GameOfLife';
import NimGame from '../NimGame';
import styles from './styles.module.css';

type Demo = { label: string; Render: ComponentType<{ bare?: boolean }> };

const DEMOS: Demo[] = [
  {
    label: translate({
      id: 'components.playground.tab.neuralNetwork',
      message: 'Neural Network',
    }),
    Render: NeuralNetwork,
  },
  {
    label: translate({
      id: 'components.playground.tab.fourierTransform',
      message: 'Fourier Transform',
    }),
    Render: FourierTransform,
  },
  {
    label: translate({
      id: 'components.playground.tab.lorenzAttractor',
      message: 'Lorenz Attractor',
    }),
    Render: LorenzAttractor,
  },
  {
    label: translate({
      id: 'components.playground.tab.gameOfLife',
      message: 'Game of Life',
    }),
    Render: GameOfLife,
  },
  {
    label: translate({
      id: 'components.playground.tab.nimGame',
      message: 'Nim Game',
    }),
    Render: NimGame,
  },
];

// The playground mirrors the Problem panel's browser-window chrome: the tab
// strip lives in the title bar next to the traffic lights, so the demos read as
// windows you switch between in one browser rather than a stacked list.
export default function Showcase() {
  const [active, setActive] = useState<number | null>(0);
  // Hold the last opened tab so the collapsing demo stays visible mid-animation.
  const lastIdx = useRef(0);
  if (active !== null) lastIdx.current = active;
  const open = active !== null;
  const { Render } = DEMOS[active ?? lastIdx.current];

  // Drive the window height from the measured demo height, so both collapse/
  // expand and switching between differently-sized demos animate smoothly
  // instead of snapping — no fixed height, no reserved dead space.
  const [contentRef, contentHeight] = useMeasuredHeight<HTMLDivElement>(active);

  return (
    <Card padding={0} className={clsx(styles.panel, open && styles.panelOpen)}>
      <WindowBar className={styles.header}>
        <div className={styles.tabs} role="tablist">
          {DEMOS.map((demo, i) => (
            <button
              key={demo.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={clsx(styles.tab, i === active && styles.tabActive)}
              onClick={() => setActive((cur) => (cur === i ? null : i))}
            >
              {demo.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-label={
            open
              ? translate({
                  id: 'components.playground.collapse',
                  message: 'Collapse',
                })
              : translate({
                  id: 'components.playground.expand',
                  message: 'Expand',
                })
          }
          onClick={() =>
            setActive((cur) => (cur === null ? lastIdx.current : null))
          }
        >
          <svg className={styles.chevron} viewBox="0 0 20 20" aria-hidden="true">
            <path
              d="M5 8l5 5 5-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </WindowBar>
      <div
        className={styles.viewport}
        style={{ height: open ? contentHeight : 0 }}
        aria-hidden={!open}
      >
        <div className={styles.body} ref={contentRef} role="tabpanel">
          <div className={styles.bodyInner}>
            <Render bare />
          </div>
        </div>
      </div>
    </Card>
  );
}
