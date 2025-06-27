import React from 'react';
import { Chrono } from 'react-chrono';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { items, type TravelItem } from '@site/src/data/travel';
import './styles.module.css';

export default function Timeline() {
  // 自定义主题 - 遵循网站设计理念：统一·简约·现代
  const theme = {
    // 主色调 - 与网站保持一致
    primary: 'var(--ifm-color-primary)',
    secondary: 'var(--ifm-color-primary-light)',
    
    // 卡片样式
    cardBgColor: 'var(--ifm-card-background-color)',
    cardTitleColor: 'var(--ifm-color-emphasis-800)',
    cardDetailsColor: 'var(--ifm-color-emphasis-700)',
    
    // 时间轴样式
    titleColor: 'var(--ifm-color-emphasis-700)',
    titleColorActive: 'var(--ifm-color-primary)',
    
    // 工具栏样式
    toolbarBgColor: 'var(--ifm-background-surface-color)',
    toolbarBtnBgColor: 'var(--ifm-button-background-color)',
    toolbarTextColor: 'var(--ifm-color-emphasis-800)',
    
    // 暗色模式增强
    iconColor: 'var(--ifm-color-primary-light)',
    buttonHoverBgColor: 'var(--ifm-color-emphasis-200)',
    buttonActiveBgColor: 'var(--ifm-color-primary)',
    buttonActiveIconColor: '#ffffff',
    
    // 边框和阴影
    buttonBorderColor: 'var(--ifm-color-emphasis-300)',
    buttonHoverBorderColor: 'var(--ifm-color-primary-lighter)',
    buttonActiveBorderColor: 'var(--ifm-color-primary)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    glowColor: 'var(--ifm-color-primary-lightest)',
  };

  // 字体大小配置 - 确保可读性
  const fontSizes = {
    cardText: '0.875rem', 
    cardTitle: '1.125rem',
    title: '0.75rem',
  };

  // 自定义类名 - 与现有样式保持一致
  const classNames = {
    card: 'travel-timeline-card',
    cardMedia: 'travel-timeline-card-media',
    cardText: 'travel-timeline-card-text',
    cardTitle: 'travel-timeline-card-title',
    title: 'travel-timeline-title',
  };

  // 按钮文本配置 - 中文优化
  const buttonTexts = {
    first: '回到开始',
    last: '跳到最新',
    next: '下一个',
    previous: '上一个',
    play: '开始播放',
    stop: '停止播放',
  };

  return (
    <BrowserOnly>
      {() => (
        <div className="w-full max-w-6xl mx-auto">
          <Chrono
            // 核心配置
            items={[...items].reverse()}
            mode="VERTICAL_ALTERNATING"
            
            // 主题和样式
            theme={theme}
            fontSizes={fontSizes}
            classNames={classNames}
            buttonTexts={buttonTexts}
            
            // 布局和尺寸
            cardWidth={400}
            cardHeight={160}
            contentDetailsHeight={120}
            lineWidth={3}
            timelinePointDimension={18}
            
            // 交互体验
            useReadMore={false}
            hideControls={true}
            disableClickOnCircle={false}
            disableNavOnKey={false}
            enableBreakPoint={true}
            responsiveBreakPoint={768}
            
            // 时间轴点样式
            timelinePointShape="circle"
            
            // 可访问性
            semanticTags={{
              cardTitle: 'h3',
            }}
            
            // 高级功能
            highlightCardsOnHover={true}
            borderLessCards={false}
            
            // 幻灯片配置（可选）
            slideShow={false}
            slideItemDuration={3000}
            slideShowType="slide_from_sides"
            
            // 媒体设置
            mediaSettings={{
              align: 'center',
              fit: 'cover',
            }}
          />
        </div>
      )}
    </BrowserOnly>
  );
}
