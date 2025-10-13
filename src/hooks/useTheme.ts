import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  isNewLayout: true,
  setIsNewLayout: (_: boolean) => {},
});

export const useTheme = () => useContext(ThemeContext);
