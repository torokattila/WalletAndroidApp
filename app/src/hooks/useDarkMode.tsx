import React, { createContext, useContext } from 'react';
import { useDarkModeStore } from '@stores/darkMode.store';

type DarkModeContextProps = {
  isDarkMode: boolean;
};

const DarkModeContext = createContext<DarkModeContextProps>({
  isDarkMode: false,
});

export const DarkModeProvider = ({ children }) => {
  const { isDarkMode } = useDarkModeStore();

  return <DarkModeContext.Provider value={{ isDarkMode }}>{children}</DarkModeContext.Provider>;
};

export const useDarkMode = (): DarkModeContextProps => {
  const context = useContext(DarkModeContext);

  return context;
};
