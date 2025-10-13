import React, { type ReactNode } from 'react';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { DebugLayout } from '@site/src/components/laikit/page';
import styles from './styles.module.css';

import TopBanner from './_components/TopBanner';
import HeroBanner from './_components/HeroBanner';

import Docs from './_components/Docs';
import Blog from './_components/Blog';
import Countdown from './_components/Countdown';
import Project from './_components/Project';

import Skills from './_components/Skills';
import Exploration from './_components/Exploration';
import NeuralNetwork from './_components/NeuralNetwork';
import Quotes from './_components/Quotes';
import Community from './_components/Community';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <DebugLayout title={siteConfig.title} description={siteConfig.tagline}>
      <TopBanner />
      <HeroBanner />
      <div className={styles.section}>
        <Docs />
        <Blog />
        <Countdown />
        <Project />
        <Skills />
        <Exploration />
        <NeuralNetwork />
        <Quotes />
        <Community />
      </div>
    </DebugLayout>
  );
}
