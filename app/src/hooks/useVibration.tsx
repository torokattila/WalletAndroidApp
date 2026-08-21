import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Vibration } from 'react-native';

type VibrationContextProps = {
  isVibrationEnabled: boolean;
  toggleVibration: () => void;
  vibrateLight: () => void;
  vibrateMedium: () => void;
  vibrateHeavy: () => void;
};

const VibrationContext = createContext<VibrationContextProps>({
  isVibrationEnabled: true,
  toggleVibration: () => {},
  vibrateLight: () => {},
  vibrateMedium: () => {},
  vibrateHeavy: () => {},
});

export const VibrationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);

  useEffect(() => {
    const getVibrationSetting = async () => {
      const setting = await AsyncStorage.getItem('vibrationSetting');
      setIsVibrationEnabled(setting === null ? true : setting === 'true');
    };
    getVibrationSetting();
  }, []);

  const toggleVibrationSetting = async () => {
    const nextState = !isVibrationEnabled;
    const newSettingStr = nextState ? 'true' : 'false';

    setIsVibrationEnabled(nextState);
    await AsyncStorage.setItem('vibrationSetting', newSettingStr);

    if (nextState) {
      Vibration.vibrate(10);
    }
  };

  const vibrateLight = () => {
    if (isVibrationEnabled) {
      console.log('vibrated');
      Vibration.vibrate(10);
    }
  };

  const vibrateMedium = () => {
    if (isVibrationEnabled) {
      Vibration.vibrate(30);
    }
  };

  const vibrateHeavy = () => {
    if (isVibrationEnabled) {
      Vibration.vibrate(60);
    }
  };

  return (
    <VibrationContext.Provider
      value={{
        isVibrationEnabled,
        toggleVibration: toggleVibrationSetting,
        vibrateLight,
        vibrateMedium,
        vibrateHeavy,
      }}
    >
      {children}
    </VibrationContext.Provider>
  );
};

export const useVibration = (): VibrationContextProps => {
  const context = useContext(VibrationContext);
  if (!context) {
    throw new Error('useVibration must be used within a VibrationProvider');
  }

  return context;
};
