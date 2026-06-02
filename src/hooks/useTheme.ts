import { createContext, useContext } from 'react';

export const ThemeContext = createContext({
  isClassicDesign: false,
  setIsClassicDesign: (_: boolean) => {},
});

export const useTheme = () => useContext(ThemeContext);
