import React from 'react';
import { observer } from 'mobx-react';
import { Typography } from 'antd';
import { DataTable } from '@/components/Datatable/datatable';
import { orderPayments } from '../constants';
import { orderStore } from '@/stores/order';
import { useMediaQuery } from '@/utils/mediaQuery';

export const Payments = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');

  return (
    <div>
      <Typography.Title level={4}>
        Способ оплаты
      </Typography.Title>
      <DataTable
        columns={orderPayments}
        data={orderStore?.singleOrderInfo?.payments || []}
        isMobile={isMobile}
      />
    </div>
  );
});
