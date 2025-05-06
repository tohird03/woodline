import { ICartOrderPayment } from '@/api/order/types';
import { priceFormat } from '@/utils/priceFormat';
import { ColumnType } from 'antd/es/table';

export const orderCartPayments: ColumnType<ICartOrderPayment>[] = [
  {
    title: 'Способ оплаты',
    dataIndex: 'whereFrom',
  },
  {
    title: 'Сумма',
    dataIndex: 'cash',
    render: (value) => priceFormat(value),
  },
  {
    title: 'Валюта',
    dataIndex: 'currency',
    render: (value) => priceFormat(value),
  },
  {
    title: 'Курс валют',
    dataIndex: 'exchangeRate',
    render: (value) => priceFormat(value),
  },
  {
    title: 'Примечание',
    dataIndex: 'description',
  },
];
