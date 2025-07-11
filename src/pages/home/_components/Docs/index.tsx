import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { Icon } from '@iconify/react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { FEATURE_LIST, type FeatureItem } from '@site/src/data/features';
import styles from './styles.module.css';

interface FeatureProps {
  feature: FeatureItem;
  className?: string;
}

function Feature({ feature, className }: FeatureProps) {
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <div className={clsx('col', className)}>
      <img
        className={styles.featureImage}
        alt={feature.title}
        width={Math.floor(feature.image.width)}
        height={Math.floor(feature.image.height)}
        src={withBaseUrl(feature.image.src)}
      />
      <Heading as="h3" className={styles.featureHeading}>
        <Link
          to={feature.url}
          style={{ color: 'inherit' }}
          className={styles.featureLink}
        >
          <Icon
            icon={feature.icon}
            width={24}
            height={24}
            className={styles.featureIcon}
          />
          {feature.title}
        </Link>
      </Heading>
      <div className="padding-horiz--md">{feature.text}</div>
    </div>
  );
}

export default function FeaturesContainer() {
  const firstRow = FEATURE_LIST.slice(0, 3);
  const secondRow = FEATURE_LIST.slice(3);

  return (
    <div className="py-16 w-full flex flex-col items-center">
      <div className="container text--center">
        <div className="row margin-top--lg margin-bottom--lg">
          {firstRow.map((feature, idx) => (
            <Feature
              feature={feature}
              key={idx}
              className={styles.featureCard}
            />
          ))}
        </div>
        <div className="row">
          {secondRow.map((feature, idx) => (
            <Feature
              feature={feature}
              key={idx}
              className={clsx(
                'col--4',
                idx === 0 && 'col--offset-2',
                styles.featureCard
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
