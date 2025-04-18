import {lazy} from 'react';
import {Loading} from '@/components';

const handleCatchChunkError = () => {
  window.location.reload();

  return {default: Loading};
};

// HOME
export const Login = lazy(() =>
  import('@/pages/Login').then(({Login}) => ({default: Login})).catch(handleCatchChunkError));
