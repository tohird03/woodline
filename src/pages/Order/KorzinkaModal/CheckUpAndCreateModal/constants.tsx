import React from 'react';
import { ICartOrderClient, ICartOrderPayment, ICartProducts } from '@/api/order/types';
import { ColumnType } from 'antd/es/table';
import { priceFormat } from '@/utils/priceFormat';
import { dateFormat } from '@/utils/getDateFormat';
import { orderPaymentType } from '../PaymentModal/constants';

export const checkUpClientInfoColumns: ColumnType<ICartOrderClient>[] = [
  {
    title: 'Имя клиента',
    dataIndex: 'clientId',
    key: 'clientId',
    render: (value, record) => record?.client?.fullname,
  },
  {
    title: 'Телефон',
    dataIndex: 'phone',
    key: 'phone',
    render: (value, record) => record?.client?.phone,
  },
  {
    title: 'Адрес',
    dataIndex: 'deliveryAddress',
    key: 'deliveryAddress',
    render: (value, record) => record?.deliveryAddress,
  },
  {
    title: 'Дата доставки',
    dataIndex: 'deliveryDate',
    key: 'deliveryDate',
    render: (value, record) => dateFormat(record?.deliveryDate),
  },
];

export const checkUpProductsColumn: ColumnType<ICartProducts>[] = [
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
];

export const checkUpPrePaymentColumn: ColumnType<ICartOrderPayment>[] = [
  {
    title: 'Способ оплаты',
    dataIndex: 'whereFrom',
    render: (value, record) => <span>{orderPaymentType[record?.method]}</span>,
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    render: (value, record) => priceFormat(record?.sum),
  },
  {
    title: 'Валюта',
    dataIndex: 'currency',
    render: (value, record) => record?.fromCurrency,
  },
  {
    title: 'Курс валют',
    dataIndex: 'exchangeRate',
    render: (value, record) => priceFormat(record?.exchangeRate),
  },
  {
    title: 'Общая сумма',
    dataIndex: 'totalSum',
    render: (value, record) => record?.totalSum,
  },
  {
    title: 'Примечание',
    dataIndex: 'description',
    render: (value, record) => record?.description,
  },
];
