import React from 'react';
import BlogScaffold from '@site/src/theme/BlogShared/Scaffold';
import { Card } from '@site/src/theme/BlogShared/Components';
import { MOMENT_LIST } from '@site/src/data/moments';
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
      {MOMENT_LIST.map((moment) => (
        <Card key={moment.content}>{moment.content}</Card>
      ))}
    </BlogScaffold>
  );
}
