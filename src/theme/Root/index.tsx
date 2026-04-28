import React, { useState, useEffect, type ReactNode } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { ThemeContext } from '@site/src/hooks/useTheme';
import CookieConsent from './CookieConsent';

interface RootProps {
  children: ReactNode;
}

interface ExperimentalSettings {
  originalLayout?: boolean;
}

interface ExperimentalSettingsChangedDetail {
  key: string;
  checked: boolean;
}

export default function Root({ children }: RootProps) {
  const [isOriginalLayout, setIsOriginalLayout] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem('settings-experimental');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings) as ExperimentalSettings;
      setIsOriginalLayout(settings.originalLayout === true);
    }

    const handleSettingsChange: EventListener = (event) => {
      const { detail } =
        event as CustomEvent<ExperimentalSettingsChangedDetail>;

      if (detail.key === 'originalLayout') {
        setIsOriginalLayout(detail.checked);
      }
    };

    window.addEventListener(
      'experimentalSettingsChanged',
      handleSettingsChange
    );

    return () => {
      window.removeEventListener(
        'experimentalSettingsChanged',
        handleSettingsChange
      );
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isOriginalLayout, setIsOriginalLayout }}>
      {children}
      <BrowserOnly>{() => <CookieConsent />}</BrowserOnly>
    </ThemeContext.Provider>
  );
}
