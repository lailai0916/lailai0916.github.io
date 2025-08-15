import React from 'react';
import NeuralNetworkInteractive from '@site/src/pages/_components/NeuralNetwork/NeuralNetwork';
import {
  SectionMain,
  SectionHeader,
} from '@site/src/components/laikit/section';
import { translate } from '@docusaurus/Translate';

export default function NeuralNetwork() {
  return (
    <SectionMain>
      <SectionHeader
        title={translate({
          id: 'home.neuralnetwork.title',
          message: 'Neural Network',
        })}
        description={translate({
          id: 'home.neuralnetwork.description',
          message:
            'Draw digits 0~9 below, and the neural network will recognize your handwriting in real-time',
        })}
      />
      <NeuralNetworkInteractive instant={false} />
    </SectionMain>
  );
}
