import React from 'react';
import { observer } from 'mobx-react';
import { useMediaQuery } from '@/utils/mediaQuery';
import { getPaginationParams } from '@/utils/getPaginationParams';
import { Typography } from 'antd';
import { DataTable } from '@/components/Datatable/datatable';
import { producerOrderProductColumns } from './constants';
import { producerStore } from '@/stores/producer';
import styles from './producer.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';

const cn = classNames.bind(styles);

export const Producer = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const { data: orderProductsData, isLoading: loading } = useQuery({
    queryKey: ['getOrderProducts'],
    queryFn: () => producerStore.getOrderProducts(),
  });

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    producerStore.setPageNumber(page);
    producerStore.setPageSize(pageSize!);
  };

  return (
    <main>
      <div className={cn('producer__head')}>
        <Typography.Title level={3}>Заказать продукцию</Typography.Title>
      </div>

      <DataTable
        columns={producerOrderProductColumns}
        data={orderProductsData?.data?.data || []}
        // loading={loading}
        isMobile={isMobile}
        pagination={{
          total: 1,
          current: producerStore?.pageNumber,
          pageSize: producerStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(1),
        }}
      />

    </main>
  );
});
