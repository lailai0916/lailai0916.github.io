import { type ReactNode } from 'react';
import clsx from 'clsx';
import { HtmlClassNameProvider } from '@docusaurus/theme-common';
import { useExperimentalFlag } from '@site/src/hooks/useExperimentalFlag';

interface ExperimentalModeProps {
  children: ReactNode;
}

export default function ExperimentalMode({ children }: ExperimentalModeProps) {
  const debugMode = useExperimentalFlag('debugMode');
  const grayMode = useExperimentalFlag('grayMode');

  // Docusaurus owns <html class>; joining its provider chain keeps these flags
  // merged with the route classes that change during client-side navigation.
  return (
    <HtmlClassNameProvider className={clsx(debugMode && 'debug-mode', grayMode && 'gray-mode')}>
      {children}
    </HtmlClassNameProvider>
  );
}
