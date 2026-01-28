import { STORAGE_KEYS } from '@constants/storage-keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type DarkModeContextProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => Promise<void>;
};

const DarkModeContext = createContext<DarkModeContextProps>({
  isDarkMode: false,
  toggleDarkMode: () => Promise.resolve(),
});

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getTheme = async () => {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);

      setIsDarkMode(theme === 'dark');
    };

    getTheme();
  }, []);

  const toggleDarkMode = async () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    await AsyncStorage.setItem(STORAGE_KEYS.THEME, newTheme);

    setIsDarkMode(!isDarkMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkModeContextProps => {
  const context = useContext(DarkModeContext);

  return context;
};
