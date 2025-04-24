import React from 'react';
import {ColumnType} from 'antd/es/table';
import {IStaffs} from '@/api/staffs';
import {formatPhoneNumber} from '@/utils/phoneFormat';
import {Action} from './Action';

export const staffsColumns: ColumnType<IStaffs>[] = [
  {
    key: 'index',
    dataIndex: 'index',
    title: '#',
    align: 'center',
    render: (value, record, index) => index + 1,
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Имя',
    align: 'center',
    render: (value, record) => record?.fullname,
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Номер телефона',
    align: 'center',
    render: (value, record) => `+${formatPhoneNumber(record?.phone)}`,
  },
  {
    key: 'action',
    dataIndex: 'action',
    title: 'Действия',
    align: 'center',
    render: (value, record) => <Action staff={record} />,
  },
];
