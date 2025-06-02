import Layout from '@theme/Layout';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import TopBanner from './_components/TopBanner';
import HeroBanner from './_components/HeroBanner';
import FeaturesContainer from './_components/FeaturesContainer';

import Countdown from './_components/Countdown';
import Project from './_components/Project';
import Blog from './_components/Blog';

import Exploration from './_components/Exploration';
import Quote from './_components/Quote';

import Skill from './_components/Skill';
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
        <div className={styles.section}>
          <FeaturesContainer />
        </div>
        <Blog />
        <Countdown />
        <Project />
        <Exploration />
        {/* <Quote /> */}
        <Skill />
        <Community />
        <Device />
      </main>
    </Layout>
  );
}
