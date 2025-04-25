import React from 'react';
import { ColumnType } from 'antd/es/table';
import { IClientsInfo } from '@/api/clients';
import { Action } from './Action';
import { formatPhoneNumber } from '@/utils/phoneFormat';
import { ClientNameLink } from '@/pages/ActionComponents/ClientNameLink';
import { priceFormat } from '@/utils/priceFormat';

export const clientsColumns: ColumnType<IClientsInfo>[] = [
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
    title: 'Имя',
    align: 'center',
    render: (value, record) => <ClientNameLink client={record} />,
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Номер телефона',
    align: 'center',
    render: (value, record) => `+${formatPhoneNumber(record?.phone)}`,
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Баланс',
    align: 'center',
    render: (value, record) => `${priceFormat(record?.balance)}`,
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Откуда пришел',
    align: 'center',
    render: (value, record) => record?.whereFrom,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action client={record} />,
  },
];
