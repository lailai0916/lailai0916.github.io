import { type ReactNode } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CookieConsent from './CookieConsent';
import ThemeColor from './ThemeColor';

interface RootProps {
  children: ReactNode;
}

export default function Root({ children }: RootProps) {
  return (
    <>
      {children}
      <BrowserOnly>
        {() => (
          <>
            <ThemeColor />
            <CookieConsent />
          </>
        )}
      </BrowserOnly>
    </>
  );
}
