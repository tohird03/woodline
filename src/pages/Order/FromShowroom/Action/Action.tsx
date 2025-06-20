import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import { addNotification } from '@/utils';
import { ISpsProduct } from '@/api/sps-product/types';
import { orderApi } from '@/api/order';
import { IAddProductToCart } from '@/api/order/types';

type Props = {
  spsProduct: ISpsProduct;
};

export const Action: FC<Props> = observer(({ spsProduct }) => {
  const queryClient = useQueryClient();

  const { mutate: addToCart } =
    useMutation({
      mutationKey: ['addToCart'],
      mutationFn: (params: IAddProductToCart) => orderApi.addProductToCart(params),
      onSuccess: () => {
        addNotification('Success add product to cart');
        queryClient.invalidateQueries({ queryKey: ['getCartProducts'] });
      },
      onError: addNotification,
    });

  const handleAddToCart = () => {
    addToCart({
      spsId: spsProduct?.id,
      price: 0,
      priceWithSale: 0,
      sale: 0,
      totalSum: 0,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
      <Button onClick={handleAddToCart} type="primary" icon={<PlusOutlined />} />
    </div>
  );
});
