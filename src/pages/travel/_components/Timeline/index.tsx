import React from 'react';
import { Chrono } from 'react-chrono';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { items, type TravelItem } from '@site/src/data/travel';
import './styles.module.css';

export default function Timeline() {
  const theme = {
    primary: '#3b82f6', // blue-500 - 与主页保持一致
    secondary: '#60a5fa', // blue-400
    cardBgColor: 'var(--ifm-background-surface-color)',
    cardTitleColor: '#1f2937', // gray-800
    cardSubtitleColor: '#4b5563', // gray-600
    cardDetailsColor: '#6b7280', // gray-500
    titleColor: '#374151', // gray-700
    titleColorActive: '#3b82f6', // blue-500
  };

  return (
    <BrowserOnly>
      {() => (
        <div className="w-full max-w-5xl mx-auto">
          <Chrono
            items={[...items].reverse()}
            mode="VERTICAL_ALTERNATING"
            theme={theme}
            cardWidth={340}
            cardHeight={140}
            useReadMore={false}
            disableInteraction={false}
            hideControls={true}
            scrollable={false}
            enableOutline={false}
            fontSizes={{
              cardSubtitle: '0.875rem',
              cardText: '0.875rem', 
              cardTitle: '1.125rem',
              title: '0.75rem',
            }}
            classNames={{
              card: 'travel-timeline-card',
              cardMedia: 'travel-timeline-card-media',
              cardSubTitle: 'travel-timeline-card-subtitle',
              cardText: 'travel-timeline-card-text',
              cardTitle: 'travel-timeline-card-title',
              title: 'travel-timeline-title',
            }}
          />
        </div>
      )}
    </BrowserOnly>
  );
}
