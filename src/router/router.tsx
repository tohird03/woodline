/* eslint-disable import/namespace */
import React, {Suspense} from 'react';
import {Navigate, useRoutes} from 'react-router-dom';
import {Loading} from '@/components';
import {ROUTES} from '@/constants';
import {Layout} from '@/modules/Layout';
import {
  Login,
} from './lazy';
import {ProtectedRoutes} from './ProtectedRoutes';
import {PublicRoutes} from './PublicRoutes';

type Props = {
  isAuth: boolean | null;
};

export const Router = ({isAuth}: Props) => useRoutes([
  {
    path: ROUTES.home,
    element: <ProtectedRoutes isAuth={isAuth} />,
    children: [
      {
        path: ROUTES.home,
        element: <Layout />,
        children: [
          // SETTING ROUTES
          {
            element: <Navigate to={ROUTES.home} />,
            path: '*',
          },
          {
            element: <Navigate to={ROUTES.home} />,
            path: '/',
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.signIn,
    element: <PublicRoutes isAuth={isAuth} />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><Login /></Suspense>,
      },
    ],
  },
]);
