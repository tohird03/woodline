import React from 'react';
import { ICartOrderClient, ICartProducts } from '@/api/order/types';
import { ColumnType } from 'antd/es/table';

export const checkUpClientInfoColumns: ColumnType<ICartOrderClient>[] = [
  {
    title: 'Имя клиента',
    dataIndex: 'clientId',
    key: 'clientId',
    render: (value, record) => record?.clientId,
  },
  { title: 'Телефон', dataIndex: 'phone', key: 'phone' },
  { title: 'Адрес', dataIndex: 'deliveryAddress', key: 'deliveryAddress' },
  { title: 'Дата доставки', dataIndex: 'deliveryDate', key: 'deliveryDate' },
];

export const checkUpProductsColumn: ColumnType<ICartProducts>[] = [
  {
    key: 'index',
    title: 'ID',
    dataIndex: 'index',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'id',
    dataIndex: 'id',
    title: 'Модель',
    render: (value, record, index) => 'model',
  },
  {
    key: 'qty',
    dataIndex: 'qty',
    title: 'Кол-во',
    render: (value, record, index) => <span>Кол-во</span>,
  },
  {
    key: 'tissue',
    dataIndex: 'tissue',
    title: 'Ткань',
    render: (value, record, index) => <span>Ткань</span>,
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: 'Примечание',
    render: (value, record, index) => <span>Примечание</span>,
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Цена',
    render: (value, record, index) => <span>Цена</span>,
  },
  {
    key: 'salePrice',
    dataIndex: 'salePrice',
    title: 'Цена со скидкой',
    render: (value, record, index) => <span>Цена со скидкой</span>,
  },
  {
    key: 'sale',
    dataIndex: 'sale',
    title: 'Скидка',
    render: (value, record, index) => <span>Скидка</span>,
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Сумма',
    render: (value, record, index) => <span>Сумма</span>,
  },
];

export const checkUpPrePaymentColumn = [
  { title: 'Способ оплаты', dataIndex: 'whereFrom', key: 'whereFrom' },
  { title: 'Сумма', dataIndex: 'cash', key: 'cash' },
  { title: 'Примечание', dataIndex: 'description', key: 'description' },
];
