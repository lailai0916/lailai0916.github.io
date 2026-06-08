import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
