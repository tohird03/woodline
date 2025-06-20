import React from 'react';
import {observer} from 'mobx-react';
import {PlusCircleOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Input, Typography} from 'antd';
import classNames from 'classnames';
import {DataTable} from '@/components/Datatable/datatable';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {useMediaQuery} from '@/utils/mediaQuery';
import styles from './income.scss';
import { IStorehouseType } from '@/api/storehouse/type';
import { incomeColumns } from './constants';
import { incomeStores } from '@/stores/storehouse';
import { AddEditModal } from './AddEditModal';
import { ShowIncomeProductModal } from './ShowProductsModal';

const cn = classNames.bind(styles);

export const Income = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const {data: Income, isLoading: loading} = useQuery({
    queryKey: [
      'getPurchase',
      incomeStores.pageNumber,
      incomeStores.pageSize,
      incomeStores.search,
    ],
    queryFn: () =>
      incomeStores.getPurchaseIncome({
        pageNumber: incomeStores.pageNumber,
        pageSize: incomeStores.pageSize,
      }),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    incomeStores.setSearch(e.currentTarget.value.trim());
  };

  const handleAddNewPurchase = () => {
    incomeStores.setIsOpenAddEditIncomeModal(true);
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    incomeStores.setPageNumber(page);
    incomeStores.setPageSize(pageSize!);
  };

  return (
    <main>
      <div className={cn('warehouse__head')}>
        <Typography.Title level={3}>Приходы</Typography.Title>
        <div className={cn('warehouse__filter')}>
          <Input
            placeholder="Введите текст для поиска"
            allowClear
            onChange={handleSearch}
            className={cn('warehouse__search')}
          />
          <Button
            onClick={handleAddNewPurchase}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Новый Приходы
          </Button>
        </div>
      </div>

      <DataTable
        columns={incomeColumns}
        data={Income?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        pagination={{
          total: Income?.data?.totalCount,
          current: incomeStores?.pageNumber,
          pageSize: incomeStores?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(Income?.data?.totalCount),
        }}
      />

      {incomeStores.isOpenAddEditIncomeModal && <AddEditModal />}
      {incomeStores.isOpenShowIncomeProductsModal && <ShowIncomeProductModal />}
    </main>
  );
});
