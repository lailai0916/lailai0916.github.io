import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

import TopBanner from './home/_components/TopBanner';
import HeroBanner from './home/_components/HeroBanner';

import Docs from './home/_components/Docs';
import Blog from './home/_components/Blog';
import Countdown from './home/_components/Countdown';
import Project from './home/_components/Project';
import NeuralNetwork from './home/_components/NeuralNetwork';

import Skill from './home/_components/Skill';
import Exploration from './home/_components/Exploration';
import Quote from './home/_components/Quote';
import Community from './home/_components/Community';
import Device from './home/_components/Device';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const { title, tagline } = siteConfig;

  return (
    <Layout title={title} description={tagline}>
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
        {/* <Device /> */}
      </main>
    </Layout>
  );
}
