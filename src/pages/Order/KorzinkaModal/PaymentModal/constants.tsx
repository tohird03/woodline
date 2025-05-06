import React from 'react';
import { EOrderPaymentType, ICartOrderPayment } from '@/api/order/types';
import { priceFormat } from '@/utils/priceFormat';
import { ColumnType } from 'antd/es/table';
import { Action } from './Action';

export const orderCartPayments: ColumnType<ICartOrderPayment>[] = [
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
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Action',
    align: 'center',
    render: (value, record) => <Action payment={record} />,
  },
];


export const orderPaymentType: Record<EOrderPaymentType, string> = {
  [EOrderPaymentType.CASH_WITH_RECEIPT]: 'Наличными с чеком',
  [EOrderPaymentType.CASH_WITHOUT_RECEIPT]: 'НАЛИЧНЫЕ БЕЗ ЧЕКА',
  [EOrderPaymentType.CARD_PAYME]: 'PAYME',
  [EOrderPaymentType.CARD_UZUM]: 'UZUM',
  [EOrderPaymentType.CARD_ANOR]: 'ANOR',
  [EOrderPaymentType.CARD_SOLFY]: 'SOLFY',
  [EOrderPaymentType.CARD_ZOODPAY]: 'ZOODPAY',
  [EOrderPaymentType.CARD_TO_CARD]: 'С КАРТЫ НА КАРТУ',
  [EOrderPaymentType.TRANSFER]: 'ПЕРЕДАЧА',
  [EOrderPaymentType.TERMINAL]: 'ТЕРМИНАЛ',
};

export const orderPaymentOptions = [
  {
    value: EOrderPaymentType.CASH_WITH_RECEIPT,
    label: orderPaymentType[EOrderPaymentType.CASH_WITH_RECEIPT],
  },
  {
    value: EOrderPaymentType.CASH_WITHOUT_RECEIPT,
    label: orderPaymentType[EOrderPaymentType.CASH_WITHOUT_RECEIPT],
  },
  {
    value: EOrderPaymentType.CARD_PAYME,
    label: orderPaymentType[EOrderPaymentType.CARD_PAYME],
  },
  {
    value: EOrderPaymentType.CARD_UZUM,
    label: orderPaymentType[EOrderPaymentType.CARD_UZUM],
  },
  {
    value: EOrderPaymentType.CARD_ANOR,
    label: orderPaymentType[EOrderPaymentType.CARD_ANOR],
  },
  {
    value: EOrderPaymentType.CARD_SOLFY,
    label: orderPaymentType[EOrderPaymentType.CARD_SOLFY],
  },
  {
    value: EOrderPaymentType.CARD_ZOODPAY,
    label: orderPaymentType[EOrderPaymentType.CARD_ZOODPAY],
  },
  {
    value: EOrderPaymentType.CARD_TO_CARD,
    label: orderPaymentType[EOrderPaymentType.CARD_TO_CARD],
  },
  {
    value: EOrderPaymentType.TRANSFER,
    label: orderPaymentType[EOrderPaymentType.TRANSFER],
  },
  {
    value: EOrderPaymentType.TERMINAL,
    label: orderPaymentType[EOrderPaymentType.TERMINAL],
  },
];
