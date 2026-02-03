import { NativeModules, Platform } from 'react-native';

export interface NavigationModeInfo {
  type: '3_button' | '2_button' | 'gesture' | 'unknown';
  isGestureNavigation: boolean;
  interactionMode?: number;
  navigationBarHeight: number;
}

interface NavigationModeNativeModule {
  getNavigationMode(): Promise<NavigationModeInfo>;
  isGestureNavigation(): Promise<boolean>;
  getNavigationBarHeight(): Promise<number>;
}

const { NavigationMode } = NativeModules as { NavigationMode: NavigationModeNativeModule };

export const getNavigationMode = (): Promise<NavigationModeInfo> => {
  if (Platform.OS === 'ios') {
    return Promise.resolve({
      type: 'gesture',
      isGestureNavigation: true,
      navigationBarHeight: 0,
    });
  }
  return NavigationMode.getNavigationMode();
};

export const isGestureNavigation = (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return Promise.resolve(true);
  }
  return NavigationMode.isGestureNavigation();
};

export const getNavigationBarHeight = (): Promise<number> => {
  if (Platform.OS === 'ios') {
    return Promise.resolve(0);
  }
  return NavigationMode.getNavigationBarHeight();
};
