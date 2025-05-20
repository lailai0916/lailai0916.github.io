import { Chrono } from 'react-chrono';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { items, type TravelItem } from '@site/src/data/travel';

export default function Timeline() {

  const theme = {
    primary: 'var(--ifm-color-primary)',
    secondary: 'var(--ifm-color-secondary)',
    cardBgColor: 'var(--ifm-background-surface-color)',
    cardTitleColor: 'var(--ifm-color-primary)',
    cardSubtitleColor: 'var(--ifm-font-color-base)',
    cardDetailsColor: 'var(--ifm-font-color-base)',
    titleColor: 'var(--ifm-font-color-base)',
  };

  return (
    <BrowserOnly>
      {() => (
        <Chrono
          items={[...items].reverse()}
          mode="VERTICAL_ALTERNATING"
          theme={theme}
          cardWidth={300}
          cardHeight={100}
          useReadMore={true}
          disableInteraction={true}
        />
      )}
    </BrowserOnly>
  );
}
