import React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { IOrderProduct, IOrderProductStatus } from '@/api/order-product/types';
import { observer } from 'mobx-react';

type Props = {
  product: IOrderProduct;
};

export const Action = observer(({ product }: Props) => {

  const handleChangeProductStatus = () => {
    // TODO
  };

  return (
    <Button
      type="default"
      icon={<EditOutlined />}
      disabled={
        product?.status === IOrderProductStatus.CANCELLED ||
        product?.status === IOrderProductStatus.RECEIVED
      }
      onClick={handleChangeProductStatus}
    />
  );
});
