import React from 'react';
import { observer } from 'mobx-react';
import { Typography } from 'antd';
import { DataTable } from '@/components/Datatable/datatable';
import { orderPayments, orderProductColumns } from '../constants';
import { orderStore } from '@/stores/order';
import { useMediaQuery } from '@/utils/mediaQuery';

export const Products = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');

  return (
    <div>
      <Typography.Title level={4}>
        Заказы
      </Typography.Title>
      <DataTable
        columns={orderProductColumns}
        data={orderStore?.singleOrderInfo?.products || []}
        isMobile={isMobile}
      />
    </div>
  );
});
