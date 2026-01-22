import React from 'react';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import { Card } from '@site/src/theme/BlogShared/Components';
import { MOMENT_LIST } from '@site/src/data/moments';
import styles from './styles.module.css';
import IconText from '@site/src/components/laikit/widget/IconText';

const TITLE = 'Moments';
const DESCRIPTION = 'Share life, anytime, anywhere';

export default function moments() {
  return (
    <BlogScaffold title={TITLE} description={DESCRIPTION}>
      <Card>
        <div className={styles.headerSection}>
          <div>
            <h1 className={styles.title}>{TITLE}</h1>
            <p className={styles.description}>{DESCRIPTION}</p>
          </div>
          <div
            className={styles.momentCount}
          >{`${MOMENT_LIST.length} moments`}</div>
        </div>
      </Card>
      {MOMENT_LIST.map((moment) => (
        <Card key={moment.content}>
          <span dangerouslySetInnerHTML={{ __html: moment.content }} />
          {moment.images && (
            <div className={styles.imageContainer}>
              {moment.images.map((image) => (
                <img key={image} src={image} />
              ))}
            </div>
          )}
          <hr className={styles.hr} />
          <div className={styles.momentMeta}>
            <IconText icon="lucide:calendar" colorMode="monochrome">
              {new Date(moment.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </IconText>
          </div>
        </Card>
      ))}
    </BlogScaffold>
  );
}
