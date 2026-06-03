import { useState, useEffect } from 'react';

export const EXPERIMENTAL_STORAGE_KEY = 'settings-experimental';
export const EXPERIMENTAL_EVENT = 'experimentalSettingsChanged';

export const SETTINGS_EXPERIMENTAL_DEFAULT = {
  classicDesign: false,
  debugMode: false,
  grayMode: false,
};

export type ExperimentalSettings = typeof SETTINGS_EXPERIMENTAL_DEFAULT;

export interface ExperimentalSettingsChangedDetail {
  key: keyof ExperimentalSettings;
  checked: boolean;
}

export function useExperimentalFlag(key: keyof ExperimentalSettings): boolean {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem(EXPERIMENTAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as Partial<ExperimentalSettings>;
          setValue(Boolean(parsed[key]));
        }
      } catch {
        setValue(false);
      }
    };

    load();

    // `storage` fires across tabs; the custom event covers same-tab updates.
    const handleStorage = (e: StorageEvent) => {
      if (e.key === EXPERIMENTAL_STORAGE_KEY) load();
    };
    const handleChange = (e: Event) => {
      const { detail } = e as CustomEvent<ExperimentalSettingsChangedDetail>;
      if (detail.key === key) setValue(detail.checked);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(EXPERIMENTAL_EVENT, handleChange);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(EXPERIMENTAL_EVENT, handleChange);
    };
  }, [key]);

  return value;
}
