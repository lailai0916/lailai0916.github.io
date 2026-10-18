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

export function isExperimentalSettings(value: unknown): value is ExperimentalSettings {
  if (value === null || typeof value !== 'object') return false;
  const settings = value as Partial<ExperimentalSettings>;
  return (
    typeof settings.classicDesign === 'boolean' &&
    typeof settings.debugMode === 'boolean' &&
    typeof settings.grayMode === 'boolean'
  );
}

export function useExperimentalFlag(key: keyof ExperimentalSettings): boolean {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem(EXPERIMENTAL_STORAGE_KEY);
        const parsed: unknown = stored ? JSON.parse(stored) : null;
        setValue(isExperimentalSettings(parsed) ? parsed[key] : false);
      } catch {
        setValue(false);
      }
    };

    load();

    // `storage` fires across tabs; the custom event covers same-tab updates.
    const handleStorage = (e: StorageEvent) => {
      if (e.key === EXPERIMENTAL_STORAGE_KEY || e.key === null) load();
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
