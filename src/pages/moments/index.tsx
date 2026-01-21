import React from 'react';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import { Card } from '@site/src/theme/BlogShared/Components';
import styles from './styles.module.css';

export default function moments() {
  return (
    <BlogScaffold title="Moments" description="lailai's Moments">
      <Card>
        <div className={styles.headerSection}>
          <div>
            <h1 className={styles.title}>Moments</h1>
            <p className={styles.description}>Share life, anytime, anywhere</p>
          </div>
        </div>
      </Card>
      <Card>{'qwq'}</Card>
    </BlogScaffold>
  );
}
