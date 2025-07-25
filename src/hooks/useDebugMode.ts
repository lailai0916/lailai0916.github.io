import { useState, useEffect } from 'react';

interface ExperimentalSettings {
  newLayout: boolean;
  debugMode: boolean;
}

export function useDebugMode(): boolean {
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    // 只在客户端执行
    if (typeof window === 'undefined') return;
    
    // 读取localStorage中的调试模式状态
    const loadDebugMode = () => {
      try {
        const settings = localStorage.getItem('settings-experimental');
        if (settings) {
          const parsed: ExperimentalSettings = JSON.parse(settings);
          setDebugMode(parsed.debugMode || false);
        }
      } catch {
        setDebugMode(false);
      }
    };

    // 初始加载
    loadDebugMode();

    // 监听localStorage变化（跨标签页同步）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'settings-experimental') {
        loadDebugMode();
      }
    };

    // 监听自定义事件（同一页面内的变化）
    const handleExperimentalSettingsChange = (e: CustomEvent) => {
      if (e.detail.key === 'debugMode') {
        setDebugMode(e.detail.checked);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('experimentalSettingsChanged', handleExperimentalSettingsChange as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('experimentalSettingsChanged', handleExperimentalSettingsChange as EventListener);
    };
  }, []);

  return debugMode;
}
