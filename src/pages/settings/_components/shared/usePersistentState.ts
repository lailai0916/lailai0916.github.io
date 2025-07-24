import { useEffect, useState } from 'react';

/**
 * 自定义 Hook，用于将状态持久化到 localStorage
 * @param key localStorage 的键名
 * @param defaultValue 默认值
 * @returns [state, setState] 元组
 */
export function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    // 仅在客户端尝试从 localStorage 读取
    if (typeof window !== 'undefined') {
      try {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
      } catch (error) {
        // 静默处理localStorage读取错误
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      // 静默处理localStorage写入错误
    }
  }, [key, state]);

  return [state, setState];
}
