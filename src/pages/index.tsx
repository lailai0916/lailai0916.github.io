import Layout from '@theme/Layout';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import TopBanner from './_components/TopBanner';
import HeroBanner from './_components/HeroBanner';
import FeaturesContainer from './_components/FeaturesContainer';
import Countdown from './_components/Countdown';

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
      </main>
    </Layout>
  );
}
