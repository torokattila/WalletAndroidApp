export const ROUTES = {
  // Tab Routes
  HOME: 'Home',
  PURCHASES: 'Purchases',
  INCOMES: 'Incomes',
  CATEGORIES: 'Categories',
  PROFILE: 'Profile',

  // Auth Routes
  LOGIN: 'Login',
  REGISTRATION: 'Registration',

  // Other
  LOADING: 'LoadingScreen',
} as const;

export type RouteNames = (typeof ROUTES)[keyof typeof ROUTES];
