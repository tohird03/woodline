import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {addNotification} from '@/utils';
import { furnutureTypeApi } from '@/api/furnuture-type/furnuture-type';
import { ICartOrderPayment, ICartProducts } from '@/api/order/types';
import { orderApi } from '@/api/order';
import { orderStore } from '@/stores/order';

type Props = {
  payment: ICartOrderPayment;
};

export const Action: FC<Props> = observer(({payment}) => {
  const payments: ICartOrderPayment[] = JSON.parse(localStorage.getItem('corzinkaPayments')!);

  const handleDelete = () => {
    const updatedPayments = payments!.filter((p: ICartOrderPayment) => p?.method !== payment?.method);

    localStorage.setItem('corzinkaPayments', JSON.stringify(updatedPayments));
    orderStore.setPayments(updatedPayments);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Popconfirm
        title="Удалить оплата"
        description="Вы уверены, что хотите удалить этого оплата?"
        onConfirm={handleDelete}
        okText="Да"
        okButtonProps={{style: {background: 'red'}}}
        cancelText="Нет"
      >
        <Button type="primary" icon={<DeleteOutlined />} danger />
      </Popconfirm>
    </div>
  );
});
