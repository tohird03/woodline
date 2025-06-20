import React from 'react';
import {observer} from 'mobx-react';
import {PlusCircleOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Input, Typography} from 'antd';
import classNames from 'classnames';
import {DataTable} from '@/components/Datatable/datatable';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {useMediaQuery} from '@/utils/mediaQuery';
import styles from './output.scss';
import { incomeColumns } from './constants';
import { outputStore } from '@/stores/storehouse/output/output';
import { ShowIncomeProductModal } from './ShowProductsModal';

const cn = classNames.bind(styles);

export const Output = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const {data: OutputData, isLoading: loading} = useQuery({
    queryKey: [
      'setSelling',
      outputStore.pageNumber,
      outputStore.pageSize,
      outputStore.search,
    ],
    queryFn: () =>
      outputStore.getSelling({
        pageNumber: outputStore.pageNumber,
        pageSize: outputStore.pageSize,
      }),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    outputStore.setSearch(e.currentTarget.value.trim());
  };

  const handleAddNewPurchase = () => {
    outputStore.setIsOpenAddEditSellingModal(true);
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    outputStore.setPageNumber(page);
    outputStore.setPageSize(pageSize!);
  };

  return (
    <main>
      <div className={cn('warehouse__head')}>
        <Typography.Title level={3}>Расходы</Typography.Title>
        <div className={cn('warehouse__filter')}>
          <Input
            placeholder="Введите текст для поиска"
            allowClear
            onChange={handleSearch}
            className={cn('warehouse__search')}
          />
        </div>
      </div>

      <DataTable
        columns={incomeColumns}
        data={OutputData?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        pagination={{
          total: OutputData?.data?.totalCount,
          current: outputStore?.pageNumber,
          pageSize: outputStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(OutputData?.data?.totalCount),
        }}
      />

      {outputStore.isOpenShowSellingProductsModal && <ShowIncomeProductModal />}
    </main>
  );
});
