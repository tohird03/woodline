export const ROUTES = {
  home: '/',
  signIn: '/signin',

  staffs: '/staffs',
  partnor: '/partnor',
  furnutureType: '/furnuture-type',
  model: '/model',

  order: '/order',
  orderHistory: '/order-history',
} as const;

export const roleChecker = {
  storeKeeper: 'storekeeper',
  mainStoreKeeper: 'main-storekeeper',
};
