import i18n from 'i18n-js';

export const getLocalizedName = (lastname: string, firstname: string): string => {
  return i18n.t('NameTemplate').replace('<lastname>', lastname).replace('<firstname>', firstname);
};
