import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

export function usePersistentState<T>(
  key: string,
  defaultValue: T,
  isValid: (value: unknown) => value is T
): [T, Dispatch<SetStateAction<T>>] {
  const read = useCallback((): T => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue === null) return defaultValue;
      const parsed: unknown = JSON.parse(storedValue);
      return isValid(parsed) ? parsed : defaultValue;
    } catch {
      return defaultValue;
    }
  }, [key, defaultValue, isValid]);
  const [state, setState] = useState(read);
  const current = useRef(state);

  useEffect(() => {
    const load = () => {
      current.current = read();
      setState(current.current);
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) load();
    };
    window.addEventListener('storage', handleStorage);
    load();
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, read]);

  // Only local edits write storage; receiving an update must not write it back to other tabs.
  const setPersistentState = useCallback<Dispatch<SetStateAction<T>>>(
    (update) => {
      const next =
        typeof update === 'function' ? (update as (value: T) => T)(current.current) : update;
      current.current = next;
      setState(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Browsers can deny storage without blocking the settings page.
      }
    },
    [key]
  );

  return [state, setPersistentState];
}
