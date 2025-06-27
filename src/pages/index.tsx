import React from 'react';
import Layout from '@theme/Layout';
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
import Quote from './_components/Quote';
import Community from './_components/Community';
import Device from './_components/Device';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const {title, tagline} = siteConfig;
  
  return (
    <Layout>
      <main>
        <TopBanner />
        <HeroBanner />
        <div className={styles.mainSections}>
          <Docs />
          <Blog />
          <Countdown />
          <Project />
          <Skill />
          <Exploration />
          <Quote />
          <Community />
          <Device />
        </div>
      </main>
    </Layout>
  );
}
