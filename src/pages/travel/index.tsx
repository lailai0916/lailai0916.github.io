import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { useColorMode } from '@docusaurus/theme-common';
import { Chrono } from 'react-chrono';
import BrowserOnly from '@docusaurus/BrowserOnly';

const TITLE = '旅行';
const DESCRIPTION = '纸上得来终觉浅，绝知此事要躬行';

const items = [
  {
    title: 'January 2022',
    cardTitle: 'Event 1',
    cardDetailedText: 'This is the first event on the timeline.',
  },
  {
    title: 'February 2022',
    cardTitle: 'Event 2',
    cardDetailedText: 'This is the second event on the timeline.',
  },
  {
    title: 'March 2022',
    cardTitle: 'Event 3',
    cardDetailedText: 'This is the third event on the timeline.',
  },
];

function PageHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  );
}

function Timeline() {
  const { colorMode } = useColorMode();

  const getTheme = (isDarkMode) => {
    const primaryColor =
      typeof window !== 'undefined'
        ? getComputedStyle(document.documentElement).getPropertyValue('--ifm-color-primary').trim() || '#007bff'
        : '#007bff';
    return isDarkMode
      ? {
          primary: primaryColor,
          secondary: '#6c757d',
          cardBgColor: '#2b3137',
          cardTitleColor: primaryColor,
          cardSubtitleColor: '#ffffff',
          cardDetailsColor: '#ffffff',
          titleColor: '#ffffff',
        }
      : {
          primary: primaryColor,
          secondary: '#adb5bd',
          cardBgColor: '#f5f6f7',
          cardTitleColor: primaryColor,
          cardSubtitleColor: '#000000',
          cardDetailsColor: '#000000',
          titleColor: '#000000',
        };
  };

  return (
    <BrowserOnly>
      {() => {
        const [theme, setTheme] = useState(getTheme(colorMode === 'dark')); // 初始值与colorMode同步
        useEffect(() => {
          setTheme(getTheme(colorMode === 'dark')); // 修正为一致的判断
        }, [colorMode]);

        // 监听窗口大小变化，确保theme更新
        useEffect(() => {
          const handleResize = () => {
            setTheme(getTheme(colorMode === 'dark')); // 窗口变化时重新计算theme
          };
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize); // 清理监听
        }, [colorMode]);

        return (
          <Chrono
            key={colorMode}
            items={items}
            mode="VERTICAL_ALTERNATING"
            theme={theme}
            cardWidth={300}
            cardHeight={120}
            useReadMore={true}
            disableToolbar={true}
            disableInteraction={true}
          />
        );
      }}
    </BrowserOnly>
  );
}

export default function travelPage() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader />
        <Timeline />
      </main>
    </Layout>
  );
}
