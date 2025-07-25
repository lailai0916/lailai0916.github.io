import type { ReactNode } from 'react';
import Layout from '@theme/Layout';
import { useDebugMode } from '@site/src/hooks/useDebugMode';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

import TopBanner from './_components/TopBanner';
import HeroBanner from './_components/HeroBanner';

import Docs from './_components/Docs';
import Blog from './_components/Blog';
import Countdown from './_components/Countdown';
import Project from './_components/Project';

import Skill from './_components/Skill';
import Exploration from './_components/Exploration';
import NeuralNetwork from './_components/NeuralNetwork';
import Quote from './_components/Quote';
import Community from './_components/Community';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const debugMode = useDebugMode();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
      wrapperClassName={debugMode && 'debug'}
    >
      <main>
        <TopBanner />
        <HeroBanner />
        <div className={styles.container}>
          <Docs />
          <Blog />
          <Countdown />
          <Project />
          <Skill />
          <Exploration />
          <NeuralNetwork />
          <Quote />
          <Community />
        </div>
      </main>
    </Layout>
  );
}
