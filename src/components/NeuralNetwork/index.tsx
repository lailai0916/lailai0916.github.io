import React from 'react';
import NeuralNetworkInteractive from '@site/src/components/NeuralNetwork/NeuralNetworkInteractive';
import SectionContainer, {
  SectionHeader,
} from '@site/src/components/laikit/Section';
import { translate } from '@docusaurus/Translate';

const TITLE = translate({
  id: 'components.neuralnetwork.title',
  message: 'Neural Network',
});
const DESCRIPTION = translate({
  id: 'components.neuralnetwork.description',
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
