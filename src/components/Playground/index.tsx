import { type ComponentType } from 'react';
import { translate } from '@docusaurus/Translate';
import WindowPanel, { type WindowPanelTab } from '@site/src/components/laikit/WindowPanel';
import NeuralNetwork from './NeuralNetwork';
import FourierTransform from './FourierTransform';
import LorenzAttractor from './LorenzAttractor';
import GameOfLife from './GameOfLife';
import NimGame from './NimGame';

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

// The Playground mirrors the Problem panel's browser-window chrome (shared via
// laikit/WindowPanel): the tab strip lives in the title bar next to the traffic
// lights, so the demos read as windows you switch between in one browser rather
// than a stacked list. Collapsing re-opens the last-viewed demo (expandTo="last").
export default function Playground() {
  const tabs: WindowPanelTab[] = DEMOS.map(({ label, Render }) => ({
    label,
    content: <Render bare />,
  }));

  return (
    <WindowPanel
      tabs={tabs}
      expandTo="last"
      collapseLabel={translate({
        id: 'components.playground.collapse',
        message: 'Collapse',
      })}
      expandLabel={translate({
        id: 'components.playground.expand',
        message: 'Expand',
      })}
    />
  );
}
