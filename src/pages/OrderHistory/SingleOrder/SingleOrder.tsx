import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import { OrderInfoTabsOptions } from './constants';
import { useMediaQuery } from '@/utils/mediaQuery';
import { observer } from 'mobx-react';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api/order';
import { useParams } from 'react-router-dom';
import { orderStore } from '@/stores/order';

export const SingleOrder = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const {orderId} = useParams();

  const { data: singleOrderData } = useQuery({
    queryKey: ['getOrders', orderId],
    queryFn: () => orderApi.getSingleOrder(orderId!),
  });

  useEffect(() => {
    if (singleOrderData) {
      orderStore.setSingleOrderInfo(singleOrderData?.data);
    }
  }, [singleOrderData]);

  return (
    <div>
      <Tabs
        centered={isMobile}
        tabPosition={isMobile ? 'bottom' : 'top'}
        defaultActiveKey="1"
        // onChange={handleTabChange}
        size="large"
        items={OrderInfoTabsOptions}
      />
    </div>
  );
});
