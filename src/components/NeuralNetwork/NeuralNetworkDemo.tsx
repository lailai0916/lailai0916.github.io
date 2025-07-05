import React from 'react';
import NeuralNetworkInteractive from './index';
import { Section, SectionHeader } from '@site/src/pages/_components/common';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

export default function NeuralNetworkDemo() {
  return (
    <Section>
      <div className="max-w-7xl mx-auto flex flex-col px-5">
        <SectionHeader
          title={translate({
            id: 'home.neuralnetwork.title',
            message: 'Neural Network',
          })}
          description={translate({
            id: 'home.neuralnetwork.description',
            message: 'Draw digits 0-9 below, and the neural network will recognize your handwriting in real-time',
          })}
        />

        <div className="flex justify-center">
          <div className={styles.container}>
            <NeuralNetworkInteractive instant={false} />
          </div>
        </div>
      </div>
    </Section>
  );
}
