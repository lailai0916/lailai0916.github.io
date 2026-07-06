import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Icon, loadIcons } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';
import shared from '../styles.module.css';

declare const require: any;

// Each blog/docs .mdx is registered as a lazy chunk via raw-loader, kept out of
// the initial bundle (no extra static files emitted). We prefetch the current
// page's chunk on mount rather than inside the click, so the click handler can
// write to the clipboard synchronously — awaiting the chunk inside the click
// let the first click's network fetch outlast its user activation, so the first
// copy always failed. The directory argument must be a static literal for
// webpack, hence one context per content root.
const blogMdxCtx = require.context(
  '!!raw-loader!@site/blog',
  true,
  /\.mdx?$/,
  'lazy'
);
const docsMdxCtx = require.context(
  '!!raw-loader!@site/docs',
  true,
  /\.mdx?$/,
  'lazy'
);

// metadata.source examples:
//   @site/blog/record/zk.mdx   @site/blog/welcome.mdx
//   @site/docs/project/index.mdx
// Strip the @site/<root>/ prefix to match the require.context base.
function resolveSource(source: string): { ctx: any; key: string } | null {
  const m = source.match(/^@site\/(blog|docs)\/(.+\.mdx?)$/);
  if (!m) return null;
  return { ctx: m[1] === 'blog' ? blogMdxCtx : docsMdxCtx, key: './' + m[2] };
}

type State = 'idle' | 'copied' | 'error';

const COPY_LABEL = translate({
  id: 'components.article.copyMarkdown',
  message: 'Copy Markdown',
});
const COPIED_LABEL = translate({
  id: 'components.article.copyMarkdownCopied',
  message: 'Copied!',
});
const COPY_ERROR_LABEL = translate({
  id: 'components.article.copyMarkdownError',
  message: 'Copy failed',
});

// The check/x icons only appear after a click; preload them so the swap never
// flashes an empty button while Iconify fetches them on first use.
const STATUS_ICONS = ['lucide:check', 'lucide:x'];

export default function CopyMarkdownButton({ source }: { source: string }) {
  const [state, setState] = useState<State>('idle');
  const textRef = useRef<string | null>(null);
  const loadRef = useRef<Promise<string> | null>(null);

  useEffect(() => {
    loadIcons(STATUS_ICONS);
  }, []);

  useEffect(() => {
    textRef.current = null;
    const resolved = resolveSource(source);
    if (!resolved) {
      loadRef.current = null;
      return;
    }
    const promise = resolved
      .ctx(resolved.key)
      .then((mod: { default: string }) => {
        textRef.current = mod.default;
        return mod.default;
      });
    promise.catch(() => {});
    loadRef.current = promise;
  }, [source]);

  if (!resolveSource(source)) return null;

  function copy(text: string) {
    navigator.clipboard.writeText(text).then(
      () => {
        setState('copied');
        setTimeout(() => setState('idle'), 2000);
      },
      (e: unknown) => {
        // eslint-disable-next-line no-console
        console.error('Copy markdown failed:', e);
        setState('error');
        setTimeout(() => setState('idle'), 2000);
      }
    );
  }

  function onClick() {
    // Fast path: source already prefetched — write synchronously so the
    // clipboard call stays inside the click's user activation.
    if (textRef.current != null) {
      copy(textRef.current);
    } else if (loadRef.current) {
      // Rare: clicked before the in-flight prefetch resolved.
      loadRef.current.then(copy).catch(() => setState('error'));
    }
  }

  const icon =
    state === 'copied'
      ? 'lucide:check'
      : state === 'error'
        ? 'lucide:x'
        : 'lucide:clipboard';
  const label =
    state === 'copied'
      ? COPIED_LABEL
      : state === 'error'
        ? COPY_ERROR_LABEL
        : COPY_LABEL;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={clsx(
        shared.metaItem,
        shared.metaLink,
        shared.iconBtn,
        styles.copyMarkdownButton
      )}
    >
      <Icon icon={icon} width={16} height={16} />
    </button>
  );
}
