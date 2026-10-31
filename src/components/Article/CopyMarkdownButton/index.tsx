import IconButton from '@lailai0916/ui/IconButton';
import { useCallback, useEffect, useRef, useState } from 'react';
import { loadIcons } from '@iconify/react';
import Icon from '@lailai0916/ui/Icon';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';

declare const require: any;

// Each blog/docs .mdx is registered as a lazy chunk via raw-loader, kept out of
// the initial bundle (no extra static files emitted). We prefetch the current
// page's chunk on mount rather than inside the click, so the click handler can
// write to the clipboard synchronously — awaiting the chunk inside the click
// let the first click's network fetch outlast its user activation, so the first
// copy always failed. The directory argument must be a static literal for
// webpack, hence one context per content root.
const blogMdxCtx = require.context('!!raw-loader!@site/blog', true, /\.mdx?$/, 'lazy');
const docsMdxCtx = require.context('!!raw-loader!@site/docs', true, /\.mdx?$/, 'lazy');

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

async function writeClipboard(text: string) {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
    await navigator.clipboard.writeText(text);
  } catch {
    const previousFocus = document.activeElement;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.readOnly = true;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    try {
      textarea.select();
      if (!document.execCommand('copy')) throw new Error('Copy failed');
    } finally {
      textarea.remove();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    }
  }
}

export default function CopyMarkdownButton({ source }: { source: string }) {
  const [state, setState] = useState<State>('idle');
  const textRef = useRef<string | null>(null);
  const loadRef = useRef<Promise<string> | null>(null);
  const sourceVersionRef = useRef(0);
  const requestRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const invalidateRequests = useCallback(() => {
    sourceVersionRef.current++;
    requestRef.current++;
    clearTimeout(timerRef.current);
  }, []);

  const loadSource = useCallback(() => {
    const resolved = resolveSource(source);
    if (!resolved) return null;
    const version = sourceVersionRef.current;
    const promise: Promise<string> = resolved.ctx(resolved.key).then(
      (mod: { default: string }) => {
        if (version === sourceVersionRef.current) textRef.current = mod.default;
        return mod.default;
      },
      (error: unknown) => {
        if (version === sourceVersionRef.current) loadRef.current = null;
        throw error;
      }
    );
    loadRef.current = promise;
    return promise;
  }, [source]);

  useEffect(() => {
    loadIcons(STATUS_ICONS);
  }, []);

  useEffect(() => {
    invalidateRequests();
    textRef.current = null;
    loadRef.current = null;
    setState('idle');
    loadSource()?.catch(() => {});
    return invalidateRequests;
  }, [loadSource, invalidateRequests]);

  if (!resolveSource(source)) return null;

  function feedback(next: State, request: number) {
    if (request !== requestRef.current) return;
    clearTimeout(timerRef.current);
    setState(next);
    timerRef.current = setTimeout(() => setState('idle'), 2000);
  }

  async function copy(text: string, request: number) {
    try {
      await writeClipboard(text);
      feedback('copied', request);
    } catch {
      feedback('error', request);
    }
  }

  function onClick() {
    const request = ++requestRef.current;
    clearTimeout(timerRef.current);
    // Fast path: source already prefetched — write synchronously so the
    // clipboard call stays inside the click's user activation.
    if (textRef.current != null) {
      void copy(textRef.current, request);
    } else {
      (loadRef.current ?? loadSource())
        ?.then((text) => {
          if (request === requestRef.current) void copy(text, request);
        })
        .catch(() => feedback('error', request));
    }
  }

  const icon =
    state === 'copied' ? 'lucide:check' : state === 'error' ? 'lucide:x' : 'lucide:clipboard';
  const label =
    state === 'copied' ? COPIED_LABEL : state === 'error' ? COPY_ERROR_LABEL : COPY_LABEL;

  return (
    <IconButton size="xs" label={label} onClick={onClick}>
      <Icon icon={icon} width={16} height={16} aria-hidden />
      <span className={styles.status} role="status" aria-live="polite">
        {state === 'copied' ? COPIED_LABEL : state === 'error' ? COPY_ERROR_LABEL : ''}
      </span>
    </IconButton>
  );
}
