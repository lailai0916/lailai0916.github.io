import { type ReactElement } from 'react';
import clsx from 'clsx';
import { useCodeBlockContext } from '@docusaurus/theme-common/internal';
import Container from '@theme/CodeBlock/Container';
import Title from '@theme/CodeBlock/Title';
import Content from '@theme/CodeBlock/Content';
import Buttons from '@theme/CodeBlock/Buttons';
import TrafficLights from '@site/src/components/laikit/TrafficLights';
import { formatBytes } from '@site/src/utils/format';
import styles from './styles.module.css';

export default function CodeBlockLayout({
  className,
}: {
  className?: string;
}): ReactElement {
  const { metadata } = useCodeBlockContext();
  const bare = metadata.className?.split(/\s+/).includes('codeBlockBare');
  const size = formatBytes(new TextEncoder().encode(metadata.code).length);
  return (
    <Container
      as="div"
      className={clsx(className, metadata.className, styles.codeBlock)}
    >
      {!bare && (
        <div className={styles.header}>
          <TrafficLights className={styles.dots} />
          <div className={styles.title}>
            {metadata.title && <Title>{metadata.title}</Title>}
          </div>
          <span className={styles.meta}>
            <span className={styles.size}>{size}</span>
            <span className={styles.language}>
              {metadata.language?.toLowerCase() ?? ''}
            </span>
          </span>
        </div>
      )}
      <div className={styles.body}>
        <Content />
        <Buttons />
      </div>
    </Container>
  );
}
