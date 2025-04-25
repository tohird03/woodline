import React from 'react';
import {ColumnType} from 'antd/es/table';
import {ModelAction} from './Action';
import { IModel } from '@/api/model/types';
import { ClientNameLink } from '../ActionComponents/ClientNameLink';

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
    key: 'furnutureType',
    dataIndex: 'furnutureType',
    title: 'Вид мебели',
    align: 'center',
    render: (value, record) => record?.furnutureType?.name,
  },
  {
    key: 'provider',
    dataIndex: 'provider',
    title: 'Поставщик',
    align: 'center',
    render: (value, record) => <ClientNameLink client={record?.provider} />,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <ModelAction model={record} />,
  },
];
