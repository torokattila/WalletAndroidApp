import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type VibrationContextProps = {
  isVibrationEnabled: boolean;
  toggleVibration: () => void;
};

const VibrationContext = createContext<VibrationContextProps>({
  isVibrationEnabled: true,
  toggleVibration: () => Promise.resolve(),
});

export const VibrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(true);

  useEffect(() => {
    const getVibrationSetting = async () => {
      const setting = await AsyncStorage.getItem('vibrationSetting');

      setIsVibrationEnabled(setting === 'true');
    };
    getVibrationSetting();
  }, []);

  const toggleVibrationSetting = async () => {
    const newSetting = isVibrationEnabled ? 'false' : 'true';
    await AsyncStorage.setItem('vibrationSetting', newSetting);

    setIsVibrationEnabled(!isVibrationEnabled);
  };

  return (
    <VibrationContext.Provider
      value={{ isVibrationEnabled, toggleVibration: toggleVibrationSetting }}
    >
      {children}
    </VibrationContext.Provider>
  );
};

export const useVibrationToggle = (): VibrationContextProps => {
  const context = useContext(VibrationContext);
  if (!context) {
    throw new Error('useVibrationToggle must be used within a VibrationProvider');
  }

  return context;
};
