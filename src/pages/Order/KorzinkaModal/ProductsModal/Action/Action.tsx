import React, {FC} from 'react';
import {observer} from 'mobx-react';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Button, Popconfirm} from 'antd';
import {addNotification} from '@/utils';
import { furnutureTypeApi } from '@/api/furnuture-type/furnuture-type';
import { ICartProducts } from '@/api/order/types';
import { orderApi } from '@/api/order';

type Props = {
  product: ICartProducts;
};

export const Action: FC<Props> = observer(({product}) => {
  const queryClient = useQueryClient();

  const {mutate: deleteCartProduct} =
  useMutation({
    mutationKey: ['deleteCartProduct'],
    mutationFn: (id: string) => orderApi.deleteCartProduct(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getCartProducts']});
      addNotification('Success delete product');
    },
    onError: addNotification,
  });

  const handleDelete = () => {
    deleteCartProduct(product?.id);
  };

  return (
    <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
      <Popconfirm
        title="Удалить продукт"
        description="Вы уверены, что хотите удалить этого продукт?"
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
