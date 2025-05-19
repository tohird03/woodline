import {appStore} from './app';
import {authStore} from './auth';
import {breadcrumbStore} from './breadcrumb';
import {profileStore} from './profile';
import {showroomStores} from './showroom';
import {warehouseStores} from './warehouse';

export const stores = {
  appStore,
  authStore,
  breadcrumbStore,
  profileStore,
  showroomStores,
  warehouseStores,
};

export const resetStores = () => {
  appStore.reset();
  authStore.reset();
  breadcrumbStore.reset();
  profileStore.reset();
  showroomStores.reset();
  warehouseStores.reset();
};
