import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Features from '@site/src/data/features';
import styles from './styles.module.css';

import HeroBanner from './_components/HeroBanner';
import TopBanner from './_components/TopBanner';
import FeaturesContainer from './_components/FeaturesContainer';
import Timer from './_components/Timer';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
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
