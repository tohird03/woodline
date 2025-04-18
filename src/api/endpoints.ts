import {TStage} from './types';
export const stage = process.env.REACT_APP_STAGE || 'dev';

export enum Endpoints {
  Base = '',

  // SETTINGS
  SignIn = '/auth/sign-in',
  RefreshToken = '/dashboard-auth/refresh',
  UserProfile = '/admin/profile',

  // PAYMENT
  payment = '/payment',
  paymentUpload = '/payment/upload',
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
