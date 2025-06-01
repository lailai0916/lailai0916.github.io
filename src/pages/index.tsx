import Layout from '@theme/Layout';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import TopBanner from './_components/TopBanner';
import HeroBanner from './_components/HeroBanner';
import FeaturesContainer from './_components/FeaturesContainer';

import Countdown from './_components/Countdown';
import Project from './_components/Project';
import Blog from './_components/Blog';

import FunFactsSection from './_components/FunFactsSection';
import CurrentlyExploringSection from './_components/CurrentlyExploringSection';
import FavoriteQuotesSection from './_components/FavoriteQuotesSection';
import ToolsIUseSection from './_components/ToolsIUseSection';

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
          <Countdown />
        </div>
        <Project />
        <Blog />
        {/* <FunFactsSection />
        <CurrentlyExploringSection />
        <FavoriteQuotesSection />
        <ToolsIUseSection /> */}
        <Skill />
        <Community />
        <Device />
      </main>
    </Layout>
  );
}
