import { useCallback } from 'react';
import { Vibration } from 'react-native';

const useVibration = () => {
  const vibrateLight = useCallback(() => {
    Vibration.vibrate(10);
    console.log('vibrateLight');
  }, []);

  const vibrateMedium = useCallback(() => {
    Vibration.vibrate(30);
  }, []);

  const vibrateHeavy = useCallback(() => {
    Vibration.vibrate(60);
  }, []);

  return { vibrateLight, vibrateMedium, vibrateHeavy };
};

export default useVibration;
