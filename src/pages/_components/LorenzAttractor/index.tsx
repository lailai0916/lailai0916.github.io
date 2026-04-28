import React from 'react';
import LorenzAttractorCanvas from './LorenzAttractorCanvas';
import SectionContainer, {
  SectionHeader,
} from '@site/src/components/laikit/Section';
import { translate } from '@docusaurus/Translate';

const TITLE = translate({
  id: 'home.lorenz.title',
  message: 'Lorenz Attractor',
});
const DESCRIPTION = translate({
  id: 'home.lorenz.description',
  message:
    'Drag to rotate the view and tune the parameters to explore deterministic chaos and the butterfly effect',
});

export default function LorenzAttractor() {
  return (
    <SectionContainer>
      <SectionHeader title={TITLE} description={DESCRIPTION} />
      <LorenzAttractorCanvas />
    </SectionContainer>
  );
}
