import React from 'react';
import { Chrono } from 'react-chrono';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { items, type TravelItem } from '@site/src/data/travel';
import './styles.module.css';

export default function Timeline() {
  const theme = {
    primary: 'var(--ifm-color-primary)', // 使用 Infima 主题色
    secondary: 'var(--ifm-color-primary-light)', // 使用 Infima 浅色变体
    cardBgColor: 'var(--ifm-card-background-color)',
    cardTitleColor: 'var(--ifm-color-emphasis-800)', // Infima 强调色
    cardSubtitleColor: 'var(--ifm-color-emphasis-600)', // Infima 次要文本色
    cardDetailsColor: 'var(--ifm-color-emphasis-700)', // Infima 详情文本色
    titleColor: 'var(--ifm-color-emphasis-700)', // Infima 标题色
    titleColorActive: 'var(--ifm-color-primary)', // 使用 Infima 主题色
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
