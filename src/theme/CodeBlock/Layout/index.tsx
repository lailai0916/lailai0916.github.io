import React from 'react';
import clsx from 'clsx';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import Buttons from '@theme/CodeBlock/Buttons';
import styles from './styles.module.css';

export default function CodeBlockLayout({
  className,
}: {
  className?: string;
}): React.ReactElement {
  const { metadata } = useCodeBlockContext();
  return (
    <Container
      as="div"
      className={clsx(className, metadata.className, styles.codeBlock)}
    >
      <div className={styles.header}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ background: '#ff5f57' }} />
          <span className={styles.dot} style={{ background: '#ffbd2e' }} />
          <span className={styles.dot} style={{ background: '#28c840' }} />
        </div>
        <div className={styles.title}>
          {metadata.title && <Title>{metadata.title}</Title>}
        </div>
        <span className={styles.language}>
          {metadata.language?.toLowerCase() ?? ''}
        </span>
      </div>
      <div className={styles.body}>
        <Content />
        <Buttons />
      </div>
    </Container>
  );
}
