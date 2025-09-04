import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  isNewLayout: false,
  setIsNewLayout: (_: boolean) => {},
});

export const useTheme = () => useContext(ThemeContext);
