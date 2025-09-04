import React, { useState, useEffect } from 'react';
import { ThemeContext } from '@site/src/context/ThemeContext';

export default function Root({ children }) {
  const [isNewLayout, setIsNewLayout] = useState(false);

  useEffect(() => {
    const storedSettings = localStorage.getItem('settings-experimental');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setIsNewLayout(settings.newLayout === true);
    }

    const handleSettingsChange = (event) => {
      if (event.detail.key === 'newLayout') {
        setIsNewLayout(event.detail.checked);
      }
    };

    window.addEventListener('experimentalSettingsChanged', handleSettingsChange);

    return () => {
      window.removeEventListener('experimentalSettingsChanged', handleSettingsChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isNewLayout, setIsNewLayout }}>
      {children}
    </ThemeContext.Provider>
  );
}
