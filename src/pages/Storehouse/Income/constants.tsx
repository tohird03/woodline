import React from 'react';
import {ColumnType} from 'antd/es/table';
import { Action } from './Action';
import { IPurchase } from '@/api/purchase/types';
import { getFullDateFormat } from '@/utils/getDateFormat';
import { ClientNameLink } from '@/pages/ActionComponents/ClientNameLink';
import { Tag } from 'antd';

export const incomeColumns: ColumnType<IPurchase>[] = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'date',
    dataIndex: 'date',
    title: 'Дата',
    align: 'center',
    render: (value, record, index) => getFullDateFormat(record?.createdAt),
  },
  {
    key: 'provider',
    dataIndex: 'provider',
    title: 'Поставщик',
    align: 'center',
    render: (value, record, index) => <ClientNameLink client={record?.provider} />,
  },
  {
    key: 'warehouse',
    dataIndex: 'warehouse',
    title: 'Склад',
    align: 'center',
    render: (value, record, index) => record?.storehouse?.name,
  },
  {
    key: 'qty',
    dataIndex: 'qty',
    title: 'Кол-во продуктов',
    align: 'center',
    render: (value, record, index) => 'Miqdori',
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Статус',
    align: 'center',
    render: (value, record, index) => <Tag color="green">{record?.status}</Tag>,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action income={record} />,
  },
];
