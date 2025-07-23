import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

import TopBanner from './_components/TopBanner';
import HeroBanner from './_components/HeroBanner';

import Docs from './_components/Docs';
import Blog from './_components/Blog';
import Countdown from './_components/Countdown';
import Project from './_components/Project';
import NeuralNetwork from './_components/NeuralNetwork';

import Skill from './_components/Skill';
import Exploration from './_components/Exploration';
import Quote from './_components/Quote';
import Community from './_components/Community';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <TopBanner />
      <HeroBanner />
      <main className={styles.section}>
        <Docs />
        <Blog />
        <Countdown />
        <Project />
        <Skill />
        <Exploration />
        <NeuralNetwork />
        <Quote />
        <Community />
      </main>
    </Layout>
  );
}
