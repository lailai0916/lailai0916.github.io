import React from 'react';
import NeuralNetworkInteractive from '@site/src/components/NeuralNetwork';
import { SectionMain, SectionHeader } from '@site/src/components/laikit/section';
import { translate } from '@docusaurus/Translate';

export default function NeuralNetwork() {
  return (
    <SectionMain>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
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

        <div className="flex justify-center">
          <NeuralNetworkInteractive instant={false} />
        </div>
      </div>
    </SectionMain>
  );
}
