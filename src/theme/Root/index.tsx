import { type ReactNode } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ThemeColor from './ThemeColor';
import ExperimentalMode from './ExperimentalMode';
import LaikitProvider from '@site/src/components/LaikitProvider';

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps) {
  return (
    <LaikitProvider>
      <ExperimentalMode>
        {children}
        <BrowserOnly>{() => <ThemeColor />}</BrowserOnly>
      </ExperimentalMode>
    </LaikitProvider>
  );
}
