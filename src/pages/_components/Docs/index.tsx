import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { FEATURE_LIST, type FeatureItem } from '@site/src/data/features';
import IconText from '@site/src/components/laikit/widget/IconText';
import styles from './styles.module.css';

function Feature({
  feature,
  className,
}: {
  feature: FeatureItem;
  className?: string;
}) {
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <div className={clsx('col', className)}>
      <img
        className={styles.featureImage}
        alt={feature.title}
        width={Math.floor(feature.image.width)}
        height={Math.floor(feature.image.height)}
        src={withBaseUrl(feature.image.src)}
        loading="lazy"
      />
      <Heading as="h3" className={styles.featureHeading}>
        <Link
          to={feature.url}
          style={{ color: 'inherit', display: 'inline-flex' }}
        >
          <IconText icon={feature.icon}>{feature.title}</IconText>
        </Link>
      </Heading>
      <p className="padding-horiz--md">{feature.text}</p>
    </div>
  );
}

export default function Docs() {
  const firstRow = FEATURE_LIST.slice(0, 3);
  const secondRow = FEATURE_LIST.slice(3);

  return (
    <div className="container text--center" style={{ padding: '40px 0' }}>
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
