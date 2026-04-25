import { useState, useEffect } from 'react';

interface ExperimentalSettings {
  originalLayout: boolean;
  debugMode: boolean;
  grayMode: boolean;
}

export function useGrayMode(): boolean {
  const [grayMode, setGrayMode] = useState(false);

  useEffect(() => {
    // 读取localStorage中的灰色模式状态
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

    // 初始加载
    loadGrayMode();

    // 监听localStorage变化（跨标签页同步）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'settings-experimental') {
        loadGrayMode();
      }
    };

    // 监听自定义事件（同一页面内的变化）
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
