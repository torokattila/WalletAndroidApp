import { NativeModules, Platform } from 'react-native';

export const Locales = {
  hu: 'hun',
  en: 'eng',
};

export const getLocale = (): string => {
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;

  return Locales[locale.split('_')[0]] || 'eng';
};
