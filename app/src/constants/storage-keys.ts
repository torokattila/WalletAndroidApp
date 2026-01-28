export const STORAGE_KEYS = {
  CLIENT_ID: 'clientId',
  AUTH_USER: 'authUser',
  USER_UID: 'userUid',
  THEME: 'theme',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
