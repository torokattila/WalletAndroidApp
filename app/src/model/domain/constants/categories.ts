import { Category } from '@model/domain';
import i18n from 'i18n-js';

export type ExtendedCategory = Category & { isDefault?: boolean };

export const defaultCategories: ExtendedCategory[] = [
  {
    id: '1',
    title: i18n.t('Purchases.Categories.food'),
    userId: '',
    createdAt: null,
    updatedAt: null,
    isDefault: true,
    color: '#58c962',
  },
  {
    id: '2',
    title: i18n.t('Purchases.Categories.clothing'),
    userId: '',
    createdAt: null,
    updatedAt: null,
    isDefault: true,
    color: '#822df1',
  },
  {
    id: '3',
    title: i18n.t('Purchases.Categories.entertainment'),
    userId: '',
    createdAt: null,
    updatedAt: null,
    isDefault: true,
    color: '#db3434',
  },
  {
    id: '4',
    title: i18n.t('Purchases.Categories.other'),
    userId: '',
    createdAt: null,
    updatedAt: null,
    isDefault: true,
    color: '#964B00',
  },
];
