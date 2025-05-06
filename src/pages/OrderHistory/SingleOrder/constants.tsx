import { IClientsInfo } from '@/api/clients';
import { ICartOrderPayment, ICartProducts, IOrder } from '@/api/order/types';
import { dateFormat } from '@/utils/getDateFormat';
import { phoneFormat } from '@/utils/phoneFormat';
import { ColumnType } from 'antd/es/table';
import React from 'react';
import { ClientInfo } from './Client';
import { Products } from './Products';
import { Payments } from './Payments';
import { priceFormat } from '@/utils/priceFormat';
import { orderPaymentType } from '@/pages/Order/KorzinkaModal/PaymentModal/constants';

export const OrderInfoTabsOptions = [
  {
    key: '1',
    label: 'О клиенте',
    children: <ClientInfo />,
  },
  {
    key: '2',
    label: 'Заказы',
    children: <Products />,
  },
  {
    key: '3',
    label: 'Способ оплаты',
    children: <Payments />,
  },
];

export const orderClientsInfo: ColumnType<IOrder>[] = [
  {
    title: 'Имя клиента',
    key: 'name',
    dataIndex: 'clientName',
    render: (_, record) => <>{record?.client?.fullname}</>,
  },
  {
    title: 'Тел клиента',
    key: 'phone',
    dataIndex: 'phone',
    render: (_, record) => <>{phoneFormat(record?.client?.phone)}</>,
  },
  {
    title: 'Откуда пришли',
    key: 'where_from',
    dataIndex: 'where_from',
    render: (_, record) => <>{record?.client?.whereFrom}</>,
  },
  {
    title: 'Дата доставки',
    key: 'delivery_date',
    dataIndex: 'delivery_date',
    render: (_, record) => dateFormat(record?.deliveryDate),
  },
];

export const orderPayments: ColumnType<ICartOrderPayment>[] = [
  {
    title: 'Способ оплаты',
    dataIndex: 'whereFrom',
    render: (value, record) => orderPaymentType[record?.method],
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

export const orderProductColumns: ColumnType<ICartProducts>[] = [
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
