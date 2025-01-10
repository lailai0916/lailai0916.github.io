import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import useBaseUrl, {useBaseUrlUtils} from '@docusaurus/useBaseUrl';
import Features from '@site/src/data/features';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import React, { useEffect, useState } from 'react';

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

function Countdown() {
  const calculateTimeLeft = () => {
    const difference = +new Date('2025-01-29T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    );
  });

  return (
    <div align="center">
      <h1>距离2025春节还剩</h1>
      <h1>
        {timerComponents.length ? (
          <span>{timerComponents}</span>
        ) : (
          <span>春节快乐!</span>
        )}
      </h1>
    </div>
  );
};

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
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
