import React from 'react';
import { ColumnType } from 'antd/es/table';
import { IOrder, IOrderStatus } from '@/api/order/types';
import { ClientNameLink } from '../ActionComponents/ClientNameLink';
import { Tag } from 'antd';

export const orderHistoryColumns: ColumnType<IOrder>[] = [
  {
    key: 'index',
    title: '№',
    dataIndex: 'index',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'id',
    dataIndex: 'id',
    title: 'Идентификаторы',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'client',
    dataIndex: 'client',
    title: 'Клиент',
    render: (value, record, index) => <ClientNameLink client={record?.client} />,
  },
  {
    key: 'status',
    dataIndex: 'status',
    title: 'Статус',
    render: (value, record, index) => <Tag>{record?.status}</Tag>,
  },
];

const orderStatusText: Record<IOrderStatus, string> = {
  [IOrderStatus.NEW]: '',
  [IOrderStatus.RECEIVED]: '',
  [IOrderStatus.CANCELLED]: '',
};
