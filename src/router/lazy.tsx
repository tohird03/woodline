import {lazy} from 'react';
import {Loading} from '@/components';

const handleCatchChunkError = () => {
  window.location.reload();

  return {default: Loading};
};

// HOME
export const Login = lazy(() =>
  import('@/pages/Login').then(({Login}) => ({default: Login})).catch(handleCatchChunkError));

export const Staffs = lazy(() =>
  import('@/pages/Staffs').then(({Staffs}) => ({default: Staffs})).catch(handleCatchChunkError));

export const Partnor = lazy(() =>
  import('@/pages/ClientsInfo').then(({ClientsInfo}) => ({default: ClientsInfo})).catch(handleCatchChunkError));

export const FurnutureType = lazy(() =>
  import('@/pages/FurnutureType').then(({FurnutureType}) => ({default: FurnutureType})).catch(handleCatchChunkError));

export const Model = lazy(() =>
  import('@/pages/Model').then(({Model}) => ({default: Model})).catch(handleCatchChunkError));
