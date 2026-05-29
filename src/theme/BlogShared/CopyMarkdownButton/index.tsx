import { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';
import shared from '../styles.module.css';

declare const require: any;

// Each blog .mdx is registered as a lazy chunk via raw-loader. The chunk for a
// given post is only downloaded when its "Copy Markdown" button is clicked, so
// the initial bundle is unaffected and no extra static files are emitted.
const blogMdxCtx = require.context(
  '!!raw-loader!@site/blog',
  true,
  /\.mdx?$/,
  'lazy'
);

function sourceToCtxKey(source: string): string | null {
  // metadata.source examples (English locale):
  //   @site/blog/record/zk.mdx
  //   @site/blog/welcome.mdx
  // Strip the @site/blog/ prefix to match the require.context base.
  const m = source.match(/^@site\/blog\/(.+\.mdx?)$/);
  return m ? './' + m[1] : null;
}

type State = 'idle' | 'copying' | 'copied' | 'error';

const COPY_LABEL = translate({
  id: 'blog.post.copyMarkdown',
  message: 'Copy Markdown',
});
const COPIED_LABEL = translate({
  id: 'blog.post.copyMarkdownCopied',
  message: 'Copied!',
});
const COPY_ERROR_LABEL = translate({
  id: 'blog.post.copyMarkdownError',
  message: 'Copy failed',
});

export default function CopyMarkdownButton({ source }: { source: string }) {
  const [state, setState] = useState<State>('idle');
  const key = sourceToCtxKey(source);
  if (!key) return null;

  async function onClick() {
    setState('copying');
    try {
      const mod = (await blogMdxCtx(key!)) as { default: string };
      await navigator.clipboard.writeText(mod.default);
      setState('copied');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Copy markdown failed:', e);
      setState('error');
    }
    setTimeout(() => setState('idle'), 2000);
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
      disabled={state === 'copying'}
      aria-label={label}
      title={label}
      className={clsx(
        shared.articleFooterMetaItem,
        shared.articleFooterMetaLink,
        shared.articleFooterMetaIconBtn,
        styles.copyMarkdownButton
      )}
    >
      <Icon icon={icon} width={16} height={16} />
    </button>
  );
}
