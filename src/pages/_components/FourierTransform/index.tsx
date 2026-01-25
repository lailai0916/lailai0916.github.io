import React from 'react';
import FourierTransformCanvas from './FourierTransformCanvas';
import SectionContainer from '@site/src/components/laikit/section/SectionContainer1';
import SectionHeader from '@site/src/components/laikit/section/SectionHeader';
import { translate } from '@docusaurus/Translate';

const TITLE = translate({
  id: 'home.fouriertransform.title',
  message: 'Fourier Transform',
});
const DESCRIPTION = translate({
  id: 'home.fouriertransform.description',
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
