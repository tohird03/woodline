import React from 'react';
import { ColumnsType } from 'antd/es/table';
import { getDateFormat, getFullDateFormat } from '@/utils/getDateFormat';
import { Tag } from 'antd';
import { IOrderProduct, IOrderProductStatus } from '@/api/order-product/types';
import { Action } from './Action';

export const producerOrderProductColumns: ColumnsType<IOrderProduct> = [
  {
    title: '№ / Оформлена в ',
    key: 'index',
    dataIndex: 'id',
    align: 'center',
    width: 200,
    render: (value, record, index) => `${index + 1} | ${getFullDateFormat(record?.createdAt)}`,
  },
  {
    title: 'ID',
    key: 'publicId',
    dataIndex: 'publicId',
    align: 'center',
    render: (value, record) => <span>{record?.publicId || '--'}</span>,
  },
  {
    title: 'Вид мебели / Модель',
    key: 'type',
    dataIndex: 'type',
    align: 'center',
    width: 150,
    render: (value, record) => (
      <>
        <span>
          {record?.model?.furnitureType?.name || '--'}
        </span>
        <br />
        <span style={{ fontWeight: 'bold' }}>
          /{record?.model?.name || '--'}
        </span>
      </>
    ),
  },
  {
    title: 'Угол',
    key: 'diraction',
    dataIndex: 'diraction',
    align: 'center',
    render: (value, record) => <span>{record?.direction || '--'}</span>,
  },
  {
    title: 'Ткань',
    key: 'tissue',
    dataIndex: 'tissue',
    align: 'center',
    render: (value) => <span>{value || '--'}</span>,
  },
  {
    title: 'Колво',
    key: 'qty',
    dataIndex: 'qty',
    align: 'center',
    render: (value, record) => <span>{record?.quantity || '--'}</span>,
  },
  {
    title: 'Примечание',
    key: 'title',
    dataIndex: 'title',
    align: 'center',
    render: (value, record) => (
      <span style={{ overflow: 'visible', maxWidth: '300px', display: 'inherit' }}>
        {record?.description || '--'}
      </span>
    ),
  },
  // {
  //   title: 'Дата доставки',
  //   key: 'deal',
  //   dataIndex: 'deal',
  //   align: 'center',
  //   render: (value, record) => (
  //     <span>
  //       {record?.delivery_date ? getDateFormat(record?.delivery_date) : '--'}
  //     </span>
  //   )
  // },
  {
    title: 'Статус',
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    render: (value, record) => (
      <Tag color={orderProductStatusText[record?.status]}>
        {orderProductStatusColor[record?.status] || '--'}
      </Tag>
    ),
  },
  // {
  //   title: 'Клиент',
  //   key: 'deal',
  //   dataIndex: 'deal',
  //   align: 'center',
  //   render: (value, record) => (
  //     <span>
  //       {record?.deal?.client?.name || '--'}
  //       <br />
  //       {record?.deal?.client?.phone}
  //     </span>
  //   )
  // },
  // {
  //   title: 'Продавец',
  //   key: 'deal',
  //   dataIndex: 'deal',
  //   align: 'center',
  //   render: (value, record) => (
  //     <span>
  //       {record?.deal?.seller?.name || '--'}
  //       <br />
  //       {record?.deal?.seller?.phone}
  //     </span>
  //   )
  // },
  {
    title: 'Изменить статус',
    key: 'status',
    dataIndex: 'id',
    align: 'center',
    render: (value, record) => <Action product={record} />,
  },
];


const orderProductStatusText: Record<IOrderProductStatus, string> = {
  [IOrderProductStatus.NEW]: 'Новый',
  [IOrderProductStatus.RECEIVED]: 'Полученный',
  [IOrderProductStatus.CANCELLED]: 'Отменено',
};
const orderProductStatusColor: Record<IOrderProductStatus, string> = {
  [IOrderProductStatus.NEW]: 'blue',
  [IOrderProductStatus.RECEIVED]: 'green',
  [IOrderProductStatus.CANCELLED]: 'volcano',
};
