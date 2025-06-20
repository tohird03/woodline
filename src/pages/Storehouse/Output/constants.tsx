import React from 'react';
import {ColumnType} from 'antd/es/table';
import { Action } from './Action';
import { IPurchase } from '@/api/purchase/types';
import { getFullDateFormat } from '@/utils/getDateFormat';
import { ClientNameLink } from '@/pages/ActionComponents/ClientNameLink';
import { Tag } from 'antd';
import { ISelling } from '@/api/selling/types';

export const incomeColumns: ColumnType<ISelling>[] = [
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
    render: (value, record, index) => record?.orderProduct?.quantity,
  },
  {
    key: 'id',
    dataIndex: 'id',
    title: 'Модель',
    render: (value, record, index) => record?.orderProduct?.sps?.sp?.product?.model?.name,
  },
  {
    key: 'tissue',
    dataIndex: 'tissue',
    title: 'Ткань',
    render: (value, record, index) => record?.orderProduct?.sps?.sp?.product?.tissue,
  },
];
