// KaTeX copy-tex: when the user copies rendered math, restore the original
// LaTeX source instead of the visible glyphs. Runs only in the browser.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  // @ts-expect-error — katex's contrib scripts ship without type declarations.
  import('katex/dist/contrib/copy-tex.mjs');
}
