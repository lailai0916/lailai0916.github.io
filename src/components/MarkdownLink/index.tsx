import { Children, isValidElement, useState, type ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import MDXA from '@theme/MDXComponents/A';
import MDXImg from '@theme/MDXComponents/Img';
import type { Props } from '@theme/MDXComponents/A';
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

function LinkIcon({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <span className={styles.icon} aria-hidden="true">
      {failed ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
        </svg>
      ) : (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          data-link-icon
          onError={() => setFailed(true)}
        />
      )}
    </span>
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
      {iconSrc && <LinkIcon key={iconSrc} src={iconSrc} />}
      {children}
    </MDXA>
  );
}
