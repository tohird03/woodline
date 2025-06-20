import React from 'react';
import { observer } from 'mobx-react';
import { DataTable } from '@/components/Datatable/datatable';
import { SpsProductColumns } from '../constants';
import { orderStore } from '@/stores/order';
import { useMediaQuery } from '@/utils/mediaQuery';
import { useQuery } from '@tanstack/react-query';
import {getPaginationParams} from '@/utils/getPaginationParams';

export const FromShowroom = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const {data: spsProductData, isLoading: loading} = useQuery({
    queryKey: [
      'getSpsProduct',
      orderStore.fromShowroomProductPage,
      orderStore.fromShowroomProductPageSize,
    ],
    queryFn: () =>
      orderStore.getSpsProduct({
        pageNumber: orderStore.fromShowroomProductPage,
        pageSize: orderStore.fromShowroomProductPageSize,
      }),
  });

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    orderStore.setFromShowroomProductPage(page);
    orderStore.setFromShowroomProductPageSize(pageSize!);
  };

  return (
    <>
      <DataTable
        columns={SpsProductColumns}
        data={spsProductData?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        pagination={{
          total: spsProductData?.data?.totalCount,
          current: orderStore?.fromShowroomProductPage,
          pageSize: orderStore?.fromShowroomProductPageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(spsProductData?.data?.totalCount),
        }}
      />
    </>
  );
});
