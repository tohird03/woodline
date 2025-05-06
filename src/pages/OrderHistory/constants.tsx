import React from 'react';
import { ColumnType } from 'antd/es/table';
import { IOrder, IOrderStatus } from '@/api/order/types';
import { ClientNameLink } from '../ActionComponents/ClientNameLink';
import { Tag } from 'antd';
import { Action } from './Action';

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
    render: (value, record, index) => <Tag color={orderStatusColor[record?.status]}>{orderStatusText[record?.status]}</Tag>,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Больше информации',
    align: 'center',
    render: (value, record) => <Action order={record} />,
  },
];

const orderStatusText: Record<IOrderStatus, string> = {
  [IOrderStatus.NEW]: 'Новый',
  [IOrderStatus.RECEIVED]: 'Полученный',
  [IOrderStatus.CANCELLED]: 'Отменено',
};
const orderStatusColor: Record<IOrderStatus, string> = {
  [IOrderStatus.NEW]: 'blue',
  [IOrderStatus.RECEIVED]: 'green',
  [IOrderStatus.CANCELLED]: 'volcano',
};
