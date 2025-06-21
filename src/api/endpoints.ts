import {TStage} from './types';
export const stage = process.env.REACT_APP_STAGE || 'dev';

export enum Endpoints {
  Base = '',
  RoleMany = '/role/many',
  RoleOne = '/role/one',

  // USERS
  UsersMany = '/user/many',
  UserOne = '/user/one',

  // SETTINGS
  SignIn = '/auth/sign-in',
  RefreshToken = '/dashboard-auth/refresh',
  UserProfile = '/admin/profile',

  // PRODUCT
  ProductMany = '/product/many',

  // PAYMENT
  payment = '/payment',
  paymentUpload = '/payment/upload',

  StaffsMany = '/staff/many',
  StaffsOne = '/staff/one',

  ClientsMany = '/partner/many',
  ClientsOne = '/partner/one',
  Provider = '/partner/provider/many',

  ModelMany = '/model/many',
  ModelOne = '/model/one',

  FurnutureTypeMany = '/furniture-type/many',
  FurnutureTypeOne = '/furniture-type/one',

  // Order
  GenerateOrderId = '/public-id/generate',
  CartMany = '/cart/many',
  CartManyMy = '/cart/my/many',
  CartOne = '/cart/one',
  OrderMany = '/order/many',
  OrderOne = '/order/one',
  OrderCreate = '/order/one-with-payment-product',

  SpsProductMany = '/storehouse-product-status/many',

  StorehouseMany = '/storehouse/many',
  StorehouseOne = '/storehouse/one',

  InventoryMany = '/inventory/many',
  InventoryOne = '/inventory/one',

  PurchaseMany = '/purchase/many',
  PurchaseOne = '/purchase/one',

  SellingMany = '/selling/many',
  SellingOne = '/selling/one',
}

const config: Record<string, TStage> = {
  dev: {
    apiUrl: 'https://woodline.16.170.250.134.nip.io',
  },
  prod: {
    apiUrl: 'https://woodline.16.170.250.134.nip.io',
  },
};

const imgConfig: Record<string, TStage> = {
  dev: {
    apiUrl: 'https://minio.mydevops.uz/',
  },
  prod: {
    apiUrl: 'https://minio.mydevops.uz/',
  },
};


export const umsStages = config[stage];
export const imgStages = imgConfig[stage];
