import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { useColorMode } from '@docusaurus/theme-common';
import { Chrono } from 'react-chrono';

const TITLE = '旅行';
const DESCRIPTION = '纸上得来终觉浅，绝知此事要躬行';

const items = [
  {
    title: 'January 2022',
    cardTitle: 'Event 1',
    cardSubtitle: 'Event 1 Subtitle',
    cardDetailedText: 'This is the first event on the timeline.',
  },
  {
    title: 'February 2022',
    cardTitle: 'Event 2',
    cardSubtitle: 'Event 2 Subtitle',
    cardDetailedText: 'This is the second event on the timeline.',
  },
  {
    title: 'March 2022',
    cardTitle: 'Event 3',
    cardSubtitle: 'Event 3 Subtitle',
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
    let primaryColor = '#007bff';
    if (typeof window !== 'undefined') {
      primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ifm-color-primary').trim();
    }
    return isDarkMode
      ? {
        primary: primaryColor,
        secondary: '#6c757d',
        cardBgColor: '#1a1a1a',      // 暗色模式：深色背景
        cardTitleColor: '#ffffff',   // 标题白色
        cardSubtitleColor: '#ffffff', // 副标题白色
        cardDetailsColor: '#ffffff', // 详情文本白色
        titleColor: '#ffffff',       // 时间轴标题白色
      }
      : {
        primary: primaryColor,
        secondary: '#adb5bd',
        cardBgColor: '#ffffff',      // 浅色模式：浅色背景
        cardTitleColor: '#000000',   // 标题黑色
        cardSubtitleColor: '#000000', // 副标题黑色
        cardDetailsColor: '#000000', // 详情文本黑色
        titleColor: '#000000',       // 时间轴标题黑色
      };
  };

  const [theme, setTheme] = useState(() => getTheme(colorMode === 'dark'));

  useEffect(() => {
    setTheme(getTheme(colorMode !== 'dark'));
  }, [colorMode]);

  return (
    <Chrono
      key={colorMode}
      items={items}
      mode="VERTICAL_ALTERNATING"
      theme={theme}
      itemWidth={150}
      disableToolbar={true}
      disableInteraction={true}
    />
  );
}

export default function travelPage(): JSX.Element {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <PageHeader />
        <Timeline />
      </main>
    </Layout>
  );
}
