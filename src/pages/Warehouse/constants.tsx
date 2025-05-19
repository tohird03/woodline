import React from 'react';
import {ColumnType} from 'antd/es/table';
import { IStorehouse } from '@/api/storehouse/type';
import { Action } from './Action';

export const warehouseColumns: ColumnType<IStorehouse>[] = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Название склад',
    align: 'center',
    render: (value) => value,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action warehouse={record} />,
  },
];
