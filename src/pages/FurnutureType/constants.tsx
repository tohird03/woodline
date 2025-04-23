import React from 'react';
import {ColumnType} from 'antd/es/table';
import {Action} from './Action';
import { IFurnutureType } from '@/api/furnuture-type/types';

export const processColumns: ColumnType<IFurnutureType>[] = [
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
    title: 'Наименование',
    align: 'center',
    render: (value, record) => record?.name,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action type={record} />,
  },
];
