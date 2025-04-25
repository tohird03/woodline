import {TStage} from './types';
export const stage = process.env.REACT_APP_STAGE || 'dev';

export enum Endpoints {
  Base = '',
  StaffRoleMany = '/staff-role/many',
  PartnerRoleMany = '/partner-role/many',

  // SETTINGS
  SignIn = '/auth/sign-in',
  RefreshToken = '/dashboard-auth/refresh',
  UserProfile = '/admin/profile',

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
