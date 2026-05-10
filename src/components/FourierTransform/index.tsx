import React from 'react';
import FourierTransformCanvas from './FourierTransformCanvas';
import SectionContainer, {
  SectionHeader,
} from '@site/src/components/laikit/Section';
import { translate } from '@docusaurus/Translate';

const TITLE = translate({
  id: 'components.fouriertransform.title',
  message: 'Fourier Transform',
});
const DESCRIPTION = translate({
  id: 'components.fouriertransform.description',
  message:
    'Draw any shape below to see its Fourier series visualization with rotating circles',
});

export default function FourierTransform() {
  return (
    <SectionContainer>
      <SectionHeader title={TITLE} description={DESCRIPTION} />
      <FourierTransformCanvas />
    </SectionContainer>
  );
}
