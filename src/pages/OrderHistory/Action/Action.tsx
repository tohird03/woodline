import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { SmallDashOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { IOrder } from '@/api/order/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

type Props = {
  order: IOrder;
};

export const Action: FC<Props> = observer(({ order }) => {
  const navigate = useNavigate();

  const handleReloadToSingleOrder = () => {
    navigate(ROUTES.singleOrder?.replace(':orderId', String(order?.id)));
  };

  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'center' }}>
      <Button type="primary" onClick={handleReloadToSingleOrder} icon={<SmallDashOutlined />} />
    </div>
  );
});
