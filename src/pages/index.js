import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/blog">
            进入博客 →
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroBanner() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <Heading as="h1" className={styles.heroProjectTagline}>
          <img
            alt="lailai's Logo"
            src="/img/logo.svg"
            className={styles.heroLogo}
            width="200"
            height="200"
          />
          <span
            className={styles.heroTitleTextHtml}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: '<b>Welcome</b> to lailai\'s <b>Home</b>!',
            }}
          />
        </Heading>
        <div className={styles.indexCtas}>
          <Link className="button button--info" to="/blog">
            博客
          </Link>
          <Link className="button button--info" to="/about">
            关于
          </Link>
        </div>
      </div>
    </div>
  );
}

function TopBanner() {
  return (
    <div className={styles.topBanner}>
      <div className={styles.topBannerTitle}>
        {'🎉\xa0'}
        <Link className={styles.topBannerTitleText} to={`/about`}>
          Hello, I'm lailai
        </Link>
        {'\xa0🥳'}
      </div>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title="Hello from lailai">
      <main>
        <TopBanner />
        <HeroBanner />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
