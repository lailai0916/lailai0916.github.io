import React, { type ReactNode } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

import TopBanner from './_components/TopBanner';
import HeroBanner from './_components/HeroBanner';
import Docs from './_components/Docs';
import Blog from './_components/Blog';
import Countdown from './_components/Countdown';
import Project from './_components/Project';
import Skills from './_components/Skills';
import Exploration from './_components/Exploration';
import FourierTransform from './_components/FourierTransform';
import NeuralNetwork from './_components/NeuralNetwork';
import Community from './_components/Community';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
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
        <FourierTransform />
        <Community />
      </div>
    </Layout>
  );
}
