import { useEffect } from 'react';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';

// The Debug / Gray experimental toggles paint the whole page (element outlines,
// grayscale). Applying them to <html> means no layout-owning wrapper is needed —
// which is what let the near-verbatim `@theme/Layout` swizzle be removed; the CSS
// lives in `src/css/custom.css` as `html.debug-mode` / `html.gray-mode`.
export default function ExperimentalMode() {
  const debugMode = useExperimentalFlag('debugMode');
  const grayMode = useExperimentalFlag('grayMode');

  useEffect(() => {
    const { classList } = document.documentElement;
    classList.toggle('debug-mode', debugMode);
    classList.toggle('gray-mode', grayMode);
  }, [debugMode, grayMode]);

  return null;
}
