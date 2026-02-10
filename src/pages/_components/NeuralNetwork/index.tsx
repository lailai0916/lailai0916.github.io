import React from 'react';
import NeuralNetworkInteractive from '@site/src/pages/_components/NeuralNetwork/NeuralNetworkInteractive';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import { translate } from '@docusaurus/Translate';

const TITLE = translate({
  id: 'home.neuralnetwork.title',
  message: 'Neural Network',
});
const DESCRIPTION = translate({
  id: 'home.neuralnetwork.description',
  message:
    'Draw digits 0–9 below, and the neural network will recognize your handwriting',
});

export default function NeuralNetwork() {
  return (
    <SectionContainer>
      <SectionHeader title={TITLE} description={DESCRIPTION} />
      <NeuralNetworkInteractive instant={false} />
    </SectionContainer>
  );
}
