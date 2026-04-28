import { useState, useEffect } from 'react';

interface ExperimentalSettings {
  originalLayout: boolean;
  debugMode: boolean;
}

export function useDebugMode(): boolean {
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    const loadDebugMode = () => {
      try {
        const settings = localStorage.getItem('settings-experimental');
        if (settings) {
          const parsed: ExperimentalSettings = JSON.parse(settings);
          setDebugMode(Boolean(parsed.debugMode));
        }
      } catch {
        setDebugMode(false);
      }
    };

    loadDebugMode();

    // `storage` fires across tabs; the custom event covers same-tab updates.
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'settings-experimental') {
        loadDebugMode();
      }
    };

    const handleExperimentalSettingsChange = (e: CustomEvent) => {
      if (e.detail.key === 'debugMode') {
        setDebugMode(e.detail.checked);
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

  return debugMode;
}
