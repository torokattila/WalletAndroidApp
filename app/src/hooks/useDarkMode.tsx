import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const theme = await AsyncStorage.getItem('theme');

      setIsDarkMode(theme === 'dark');
    };

    getTheme();
  }, []);

  const toggleDarkMode = async () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    await AsyncStorage.setItem('theme', newTheme);

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
