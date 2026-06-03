import { type ReactNode } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CookieConsent from './CookieConsent';

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps) {
  return (
    <>
      {children}
      <BrowserOnly>{() => <CookieConsent />}</BrowserOnly>
    </>
  );
}
