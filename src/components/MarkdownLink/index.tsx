import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '@iconify/react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import MDXA from '@theme/MDXComponents/A';
import MDXImg from '@theme/MDXComponents/Img';
import type { Props } from '@theme/MDXComponents/A';
import { getFaviconUrl } from '@site/src/utils/favicon';
import styles from './styles.module.css';

const IMAGE_LOAD_TIMEOUT_MS = 3000;

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
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (status !== 'loading') return;
    const image = imageRef.current;
    if (!image) return;

    if (image.complete) {
      setStatus(image.naturalWidth > 0 ? 'loaded' : 'error');
      return;
    }

    let timeoutId: number | undefined;
    // Start the timeout when a lazy-loaded link icon enters view.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      timeoutId = window.setTimeout(() => setStatus('error'), IMAGE_LOAD_TIMEOUT_MS);
      observer.disconnect();
    });
    observer.observe(image);

    return () => {
      observer.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [src, status]);

  return (
    <span className={styles.icon} aria-hidden="true">
      {status === 'error' ? (
        <Icon icon="lucide:globe" width="1em" height="1em" />
      ) : (
        <img
          ref={imageRef}
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          data-link-icon
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
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
