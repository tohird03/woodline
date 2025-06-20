import React from 'react';
import { ISpsProduct } from '@/api/sps-product/types';
import { ColumnType } from 'antd/es/table';
import { Action } from './FromShowroom/Action';

export const directionOptions = [
  {
    value: 'left',
    label: 'Левый',
  },
  {
    value: 'right',
    label: 'Правый',
  },
  {
    value: 'none',
    label: 'Нет направлений',
  },
];

export const SpsProductColumns: ColumnType<ISpsProduct>[] = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: 'Статус',
    align: 'center',
    render: (value, record, index) => record?.status,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: 'ИД',
    align: 'center',
    render: (value, record, index) => record?.sp?.product?.publicId,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: 'Склад',
    align: 'center',
    render: (value, record, index) => record?.sp?.storehouse?.name,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: 'Модель',
    align: 'center',
    render: (value, record, index) => record?.sp?.product?.model?.name,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: 'Кол-во',
    align: 'center',
    render: (value, record, index) => record?.quantity,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: 'Ткань',
    align: 'center',
    render: (value, record, index) => record?.sp?.product?.tissue,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: 'Угол',
    align: 'center',
    render: (value, record, index) => record?.sp?.product?.direction,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: 'Примечание',
    align: 'center',
    render: (value, record, index) => record?.sp?.product?.description,
  },
  {
    key: 'index',
    dataIndex: 'index',
    title: 'Примечание',
    align: 'center',
    render: (value, record, index) => <Action spsProduct={record} />,
  },
];
