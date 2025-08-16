import React from 'react';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { FEATURE_LIST, type FeatureItem } from '@site/src/data/features';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import IconText from '@site/src/components/laikit/widget/IconText';
import styles from './styles.module.css';

function DocsCard({ feature }: { feature: FeatureItem }) {
  const { withBaseUrl } = useBaseUrlUtils();

  return (
    <div className="col">
      <img
        className={styles.featureImage}
        alt={feature.title}
        width={Math.floor(feature.image.width)}
        height={Math.floor(feature.image.height)}
        src={withBaseUrl(feature.image.src)}
        loading="lazy"
      />
      <Heading as="h3" className={styles.featureHeading}>
        <Link to={feature.url} className={styles.featureLinking}>
          <IconText icon={feature.icon}>{feature.title}</IconText>
        </Link>
      </Heading>
      <p className="padding-horiz--md">{feature.text}</p>
    </div>
  );
}

export default function Docs() {
  return (
    <div className="container text--center">
      <div className="row margin-top--lg margin-bottom--lg">
        {FEATURE_LIST.map((feature, idx) => (
          <DocsCard feature={feature} key={idx} />
        ))}
      </div>
    </div>
  );
}
