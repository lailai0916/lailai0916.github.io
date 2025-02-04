import Layout from '@theme/Layout';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import HeroBanner from './_components/HeroBanner';
import TopBanner from './_components/TopBanner';
import FeaturesContainer from './_components/FeaturesContainer';
import Timer from './_components/Timer';

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
          <Timer />
        </div>
      </main>
    </Layout>
  );
}
