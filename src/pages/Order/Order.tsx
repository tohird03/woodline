import React from 'react';
import { Badge, Button, Tabs } from 'antd';
import { observer } from 'mobx-react';
import { orderStore } from '@/stores/order';
import { CorzinaProductsModal } from './KorzinkaModal/ProductsModal';
import { CorzinkaClientsModal } from './KorzinkaModal/ClientsModal';
import { CorzinaPaymentModal } from './KorzinkaModal/PaymentModal/PaymentModal';
import { FromShowroom } from './FromShowroom/FromShowroom';
import { NewOrder } from './NewOrder';
import { CheckUpAndCreateModal } from './KorzinkaModal/CheckUpAndCreateModal/CheckUpAndCreateModal';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api/order';
import { ShoppingCartOutlined } from '@ant-design/icons';

export const Order = observer(() => {
  const { data: cartProducts } = useQuery({
    queryKey: ['getCartProducts'],
    queryFn: () =>
      orderApi.getCartProducts(),
  });

  const handleOpenKorzinka = () => {
    orderStore.setIsOpenCorzinaProductModal(true);
  };

  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Badge
          className="site-badge-count-109"
          count={cartProducts?.data?.data?.length}
          style={{ backgroundColor: '#52c41a' }}
        >
          <Button
            type="primary"
            size="large"
            onClick={handleOpenKorzinka}
          >
            <ShoppingCartOutlined
              size={24}
              style={{
                fontSize: '24px',
                backgroundColor: '',
              }}
            />
          </Button>
        </Badge>
      </div>
      <Tabs
        defaultActiveKey="1"
        animated
        items={[
          {
            key: '1',
            label: 'Заказ',
            children: <NewOrder />,
          },
          {
            key: '2',
            label: 'Продажа с витрины',
            children: <FromShowroom />,
          },
        ]}
      />

      {orderStore.isOpenCorzinaProductModal && <CorzinaProductsModal />}
      {orderStore.isOpenCorzinkaClientModal && <CorzinkaClientsModal />}
      {orderStore.isOpenCorzinaPaymentModal && <CorzinaPaymentModal />}
      {orderStore.isOpenCheckUpAndCreateModal && <CheckUpAndCreateModal />}
    </>
  );
});
