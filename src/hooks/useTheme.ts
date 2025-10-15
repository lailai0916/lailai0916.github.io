import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  isOriginalLayout: false,
  setIsOriginalLayout: (_: boolean) => {},
});

export const useTheme = () => useContext(ThemeContext);
