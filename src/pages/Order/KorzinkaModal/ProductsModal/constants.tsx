import React from 'react';
import { ColumnType } from 'antd/es/table';
import { ICartProducts } from '@/api/order/types';
import { priceFormat } from '@/utils/priceFormat';
import { Action } from './Action';

export const corzinkaProductModal: ColumnType<ICartProducts>[] = [
  {
    key: 'index',
    title: 'ID',
    dataIndex: 'index',
    render: (value, record, index) => record?.publicId,
  },
  {
    key: 'id',
    dataIndex: 'id',
    title: 'Модель',
    render: (value, record, index) => record?.model?.name,
  },
  {
    key: 'qty',
    dataIndex: 'qty',
    title: 'Кол-во',
    render: (value, record, index) => record?.quantity,
  },
  {
    key: 'tissue',
    dataIndex: 'tissue',
    title: 'Ткань',
    render: (value, record, index) => record?.tissue,
  },
  {
    key: 'description',
    dataIndex: 'description',
    title: 'Примечание',
    render: (value, record, index) => record?.description,
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Цена',
    render: (value, record, index) => priceFormat(record?.price),
  },
  {
    key: 'salePrice',
    dataIndex: 'salePrice',
    title: 'Цена со скидкой',
    render: (value, record, index) => priceFormat(record?.priceWithSale),
  },
  {
    key: 'sale',
    dataIndex: 'sale',
    title: 'Скидка',
    render: (value, record, index) => record?.sale,
  },
  {
    key: 'price',
    dataIndex: 'price',
    title: 'Сумма',
    render: (value, record, index) => priceFormat(record?.totalSum),
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action product={record} />,
  },
];

export const userInfoWhereFromOptions = [
  { label: "Кол центр", value: "Кол центр" },
  { label: "т.г.", value: "т.г." },
  { label: "инстаграм.", value: "инстаграм." },
  { label: "фейсбук", value: "фейсбук" },
  { label: "наружная реклама", value: "наружная реклама" },
  { label: "посоветовали.", value: "посоветовали." },
  { label: "OLX.", value: "OLX." },
  { label: "Диллер", value: "Диллер" },
  { label: "Новостные каналы", value: "Новостные каналы" },
  { label: "Телевидение", value: "Телевидение" },
  { label: "Прохожие", value: "Прохожие" },
];
