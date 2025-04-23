import React from 'react';
import {ColumnType} from 'antd/es/table';
import {ModelAction} from './Action';
import { IModel } from '@/api/model/types';

export const modelColumns: ColumnType<IModel>[] = [
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
    title: 'Название модели',
    align: 'center',
    render: (value) => value,
  },
  {
    key: 'qtyPerDay',
    dataIndex: 'qtyPerDay',
    title: 'Вид мебели',
    align: 'center',
    render: (value) => value,
  },
  {
    key: 'provider',
    dataIndex: 'provider',
    title: 'Поставщик',
    align: 'center',
    render: (value, record) => <span>{record?.category?.title}</span>,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <ModelAction model={record} />,
  },
];
