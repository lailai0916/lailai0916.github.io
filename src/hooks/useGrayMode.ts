import { useState, useEffect } from 'react';

interface ExperimentalSettings {
  originalLayout: boolean;
  debugMode: boolean;
  grayMode: boolean;
}

export function useGrayMode(): boolean {
  const [grayMode, setGrayMode] = useState(false);

  useEffect(() => {
    const loadGrayMode = () => {
      try {
        const settings = localStorage.getItem('settings-experimental');
        if (settings) {
          const parsed: ExperimentalSettings = JSON.parse(settings);
          setGrayMode(Boolean(parsed.grayMode));
        }
      } catch {
        setGrayMode(false);
      }
    };

    loadGrayMode();

    // `storage` fires across tabs; the custom event covers same-tab updates.
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'settings-experimental') {
        loadGrayMode();
      }
    };

    const handleExperimentalSettingsChange = (e: CustomEvent) => {
      if (e.detail.key === 'grayMode') {
        setGrayMode(e.detail.checked);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(
      'experimentalSettingsChanged',
      handleExperimentalSettingsChange as EventListener
    );

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(
        'experimentalSettingsChanged',
        handleExperimentalSettingsChange as EventListener
      );
    };
  }, []);

  return grayMode;
}
