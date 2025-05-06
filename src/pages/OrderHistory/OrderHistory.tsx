import { DataTable } from '@/components/Datatable/datatable';
import { observer } from 'mobx-react';
import React from 'react';
import { orderHistoryColumns } from './constants';
import { useMediaQuery } from '@/utils/mediaQuery';
import { getPaginationParams } from '@/utils/getPaginationParams';
import { Typography } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api/order';

export const OrderHistory = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const { data: ordersData } = useQuery({
    queryKey: ['getOrders'],
    queryFn: () =>
      orderApi.getOrders({
        pagination: false,
      }),
  });

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    // modelStore.setPage(page);
    // modelStore.setLimit(pageSize!);
  };

  return (
    <main>
      <Typography.Title level={3}>Мои заказы</Typography.Title>

      <DataTable
        columns={orderHistoryColumns}
        data={ordersData?.data?.data || []}
        // loading={loading}
        isMobile={isMobile}
        pagination={{
          total: 1,
          current: 1,
          pageSize: 10,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(1),
        }}
      />
    </main>
  );
});
