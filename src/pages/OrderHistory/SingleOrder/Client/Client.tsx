import React from 'react';
import { observer } from 'mobx-react';
import { Typography } from 'antd';
import { DataTable } from '@/components/Datatable/datatable';
import { orderClientsInfo } from '../constants';
import { useMediaQuery } from '@/utils/mediaQuery';
import { orderStore } from '@/stores/order';

export const ClientInfo = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');

  return (
    <div>
      <Typography.Title level={4}>
        О клиенте
      </Typography.Title>
      <DataTable
        columns={orderClientsInfo}
        data={orderStore?.singleOrderInfo ? [orderStore?.singleOrderInfo] : []}
        isMobile={isMobile}
      />
    </div>
  );
});
