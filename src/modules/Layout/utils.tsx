import React from 'react';
import {MenuProps} from 'antd';
import {IMenuItems} from './types';

export type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => ({
  key,
  icon,
  children,
  label,
  type,
} as MenuItem);

export const generateAllMenuItems = (list: IMenuItems[] | undefined): MenuProps['items'] =>
  list?.map((item) => getItem(
    <div className="sidebar-links">
      {item?.label}
    </div>,
    item.key,
    item.icon,
    item.children && generateAllMenuItems(item.children) || undefined
  ));
