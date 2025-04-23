import React from 'react';
import {
  AlignLeftOutlined,
  AppstoreAddOutlined,
  CodeSandboxOutlined,
  ContactsOutlined,
  DownloadOutlined,
  FileSyncOutlined,
  HomeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
  TableOutlined,
  TeamOutlined,
  UserOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import {ROUTES} from '@/constants';
import {IAppRole, IMenuItems} from './types';
import { IStaffPerKey } from '@/stores/profile/types';

export const appRoles: Record<IAppRole, {name: string, color: string}> = {
  [IAppRole.SuperAdmin]: {
    name: 'Super admin',
    color: 'green',
  },
  [IAppRole.Engeneer]: {
    name: 'Engeneer',
    color: 'pink',
  },
  [IAppRole.ProductManager]: {
    name: 'Product Manager',
    color: 'cyan',
  },
  [IAppRole.Provider]: {
    name: 'Provider',
    color: 'orange',
  },
  [IAppRole.Storekeeper]: {
    name: 'Storekeeper',
    color: 'yellow',
  },
  [IAppRole.MainStorekeeper]: {
    name: 'Main Storekeeper',
    color: 'purple',
  },
  [IAppRole.Seller]: {
    name: 'Seller',
    color: 'volcano',
  },
  [IAppRole.MainSeller]: {
    name: 'Main Seller',
    color: 'magenta',
  },
  [IAppRole.HeadSeller]: {
    name: 'Head Seller',
    color: 'red',
  },
  [IAppRole.DeliveryAdmin]: {
    name: 'Delivery admin',
    color: 'gold',
  },
  [IAppRole.Courier]: {
    name: 'Courier',
    color: 'gold',
  },
};

export const mainMenuList: IMenuItems[] = [
  {
    label: 'Пользователи',
    key: ROUTES.staffs,
    icon: <UserSwitchOutlined />,
  },
  {
    label: 'Партнеры',
    key: ROUTES.partnor,
    icon: <UserOutlined />,
  },
  {
    label: 'Вид мебели',
    key: ROUTES.furnutureType,
    icon: <TableOutlined />,
  },
  {
    label: 'Модели',
    key: ROUTES.model,
    icon: <AlignLeftOutlined />,
  },
];
