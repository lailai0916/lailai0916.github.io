import { useState, useEffect, type ReactNode } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { ThemeContext } from '@site/src/hooks/useTheme';
import CookieConsent from './CookieConsent';

interface RootProps {
  children: ReactNode;
}

interface ExperimentalSettings {
  classicDesign?: boolean;
}

interface ExperimentalSettingsChangedDetail {
  key: string;
  checked: boolean;
}

export default function Root({ children }: RootProps) {
  const [isClassicDesign, setIsClassicDesign] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem('settings-experimental');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings) as ExperimentalSettings;
      setIsClassicDesign(settings.classicDesign === true);
    }

    const handleSettingsChange: EventListener = (event) => {
      const { detail } =
        event as CustomEvent<ExperimentalSettingsChangedDetail>;

      if (detail.key === 'classicDesign') {
        setIsClassicDesign(detail.checked);
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
    <ThemeContext.Provider value={{ isClassicDesign, setIsClassicDesign }}>
      {children}
      <BrowserOnly>{() => <CookieConsent />}</BrowserOnly>
    </ThemeContext.Provider>
  );
}
