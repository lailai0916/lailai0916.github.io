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
    const primaryColor =
      typeof window !== 'undefined'
        ? getComputedStyle(document.documentElement).getPropertyValue('--ifm-color-primary').trim() || '#007bff'
        : '#007bff'; // 服务端用默认值
    return isDarkMode
    ? {
        primary: primaryColor,
        secondary: '#6c757d',
        cardBgColor: '#1a1a1a',
        cardTitleColor: '#ffffff',
        cardSubtitleColor: '#ffffff',
        cardDetailsColor: '#ffffff',
        titleColor: '#ffffff',
    }
    : {
        primary: primaryColor,
        secondary: '#adb5bd',
        cardBgColor: '#ffffff',
        cardTitleColor: '#000000',
        cardSubtitleColor: '#000000',
        cardDetailsColor: '#000000',
        titleColor: '#000000',
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
