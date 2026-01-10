import React, { useState, useEffect } from 'react';
import { ThemeContext } from '@site/src/hooks/useTheme';

export default function Root({ children }) {
  const [isOriginalLayout, setIsOriginalLayout] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem('settings-experimental');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setIsOriginalLayout(settings.originalLayout === true);
    }

    const handleSettingsChange = (event) => {
      if (event.detail.key === 'originalLayout') {
        setIsOriginalLayout(event.detail.checked);
      }
    };

    window.addEventListener(
      'experimentalSettingsChanged',
      handleSettingsChange
    );

    return () => {
      window.removeEventListener(
        'experimentalSettingsChanged',
        handleSettingsChange
      );
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isOriginalLayout, setIsOriginalLayout }}>
      {children}
    </ThemeContext.Provider>
  );
}
