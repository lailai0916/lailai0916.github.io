import { Children, isValidElement, type ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import MDXA from '@theme/MDXComponents/A';
import MDXImg from '@theme/MDXComponents/Img';
import type { Props } from '@theme/MDXComponents/A';
import WebsiteIcon from '@site/src/components/WebsiteIcon';
import { getFaviconUrl } from '@site/src/utils/favicon';
import styles from './styles.module.css';

function isImageOnly(children: ReactNode): boolean {
  const nodes = Children.toArray(children).filter(
    (node) => typeof node !== 'string' || node.trim().length > 0
  );
  return (
    nodes.length === 1 &&
    isValidElement(nodes[0]) &&
    (nodes[0].type === 'img' || nodes[0].type === MDXImg)
  );
}

export default function MarkdownLink({ href, children, ...props }: Props) {
  const ownIcon = useBaseUrl('/img/logo.svg');
  let iconSrc: string | undefined;

  if (href && !href.startsWith('#') && !isImageOnly(children)) {
    iconSrc = href.startsWith('/') && !href.startsWith('//') ? ownIcon : getFaviconUrl(href);
  }

  return (
    <MDXA {...props} href={href}>
      {iconSrc && <WebsiteIcon key={iconSrc} src={iconSrc} className={styles.icon} />}
      {children}
    </MDXA>
  );
}
