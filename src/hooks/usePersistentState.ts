import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export function usePersistentState<T>(
  key: string,
  defaultValue: T,
  isValid: (value: unknown) => value is T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue === null) return defaultValue;
      const parsed: unknown = JSON.parse(storedValue);
      return isValid(parsed) ? parsed : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Browsers can deny storage without blocking the settings page.
    }
  }, [key, state]);

  return [state, setState];
}
