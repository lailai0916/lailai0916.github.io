import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import useBaseUrl, {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import Features from '@site/src/data/features';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link className="button button--secondary button--lg" to="/blog">
//             进入博客 →
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

function Feature({
  feature,
  className,
}: {
  feature: FeatureItem;
  className?: string;
}) {
  const {withBaseUrl} = useBaseUrlUtils();

  return (
    <div className={clsx('col', className)}>
      <img
        className={styles.featureImage}
        alt={feature.title}
        width={Math.floor(feature.image.width)}
        height={Math.floor(feature.image.height)}
        src={withBaseUrl(feature.image.src)}
      />
      <Heading as="h3" className={clsx(styles.featureHeading)}>
        <Link to={feature.url} style={{ color: 'inherit' }}>
          {feature.title}
        </Link>
      </Heading>
      <p className="padding-horiz--md">{feature.text}</p>
    </div>
  );
}

function FeaturesContainer() {
  const firstRow = Features.slice(0, 3);
  const secondRow = Features.slice(3);

  return (
    <div className="container text--center">
      <div className="row margin-top--lg margin-bottom--lg">
        {firstRow.map((feature, idx) => (
          <Feature feature={feature} key={idx} />
        ))}
      </div>
      <div className="row">
        {secondRow.map((feature, idx) => (
          <Feature
            feature={feature}
            key={idx}
            className={clsx('col--4', idx === 0 && 'col--offset-2')}
          />
        ))}
      </div>
    </div>
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
            loading="lazy"
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
          <Link className={`button ${styles.button}`} to="/blog">
            博客
          </Link>
          <Link className={`button ${styles.button}`} to="/about">
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
        <Link className={styles.topBannerTitleText} to="/about">
          {'Hello,\xa0I\'m\xa0lailai'}
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
        <div className={styles.section}>
          <FeaturesContainer />
        </div>
      </main>
    </Layout>
  );
}
