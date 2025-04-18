import {appStore} from './app';
import {authStore} from './auth';
import {breadcrumbStore} from './breadcrumb';
import {profileStore} from './profile';

export const stores = {
  appStore,
  authStore,
  breadcrumbStore,
  profileStore,
};

export const resetStores = () => {
  appStore.reset();
  authStore.reset();
  breadcrumbStore.reset();
  profileStore.reset();
};
