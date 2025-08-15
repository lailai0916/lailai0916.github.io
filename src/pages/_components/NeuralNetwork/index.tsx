import React from 'react';
import NeuralNetworkInteractive from '@site/src/pages/_components/NeuralNetwork/NeuralNetwork';
import {
  SectionContainer,
  SectionHeader,
} from '@site/src/components/laikit/section';
import { translate } from '@docusaurus/Translate';

const TITLE = translate({
  id: 'home.neuralnetwork.title',
  message: 'Neural Network',
});
const DESCRIPTION = translate({
  id: 'home.neuralnetwork.description',
  message:
    'Draw digits 0~9 below, and the neural network will recognize your handwriting in real-time',
});

export default function NeuralNetwork() {
  return (
    <SectionContainer>
      <SectionHeader title={TITLE} description={DESCRIPTION} />
      <NeuralNetworkInteractive instant={false} />
    </SectionContainer>
  );
}
