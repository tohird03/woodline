import React from 'react';
import {observer} from 'mobx-react';
import {PlusCircleOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Input, Typography} from 'antd';
import classNames from 'classnames';
import {DataTable} from '@/components/Datatable/datatable';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {useMediaQuery} from '@/utils/mediaQuery';
import styles from './warehouse.scss';
import { IStorehouseType } from '@/api/storehouse/type';
import { warehouseColumns } from './constants';
import { AddEditModal } from './AddEditModal';
import { warehouseStores } from '@/stores/warehouse';

const cn = classNames.bind(styles);

export const Warehouse = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const {data: warehousesData, isLoading: loading} = useQuery({
    queryKey: [
      'getWarehouses',
      warehouseStores.pageNumber,
      warehouseStores.pageSize,
      warehouseStores.search,
    ],
    queryFn: () =>
      warehouseStores.getWarehouses({
        pageNumber: warehouseStores.pageNumber,
        pageSize: warehouseStores.pageSize,
        type: IStorehouseType.WAREHOUSE,
        name: warehouseStores.search!,
      }),
  });

  const handelAddNewWarehouse = () => {
    warehouseStores.setIsOpenWarehouseModal(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    warehouseStores.setSearch(e.currentTarget.value.trim());
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    warehouseStores.setPageNumber(page);
    warehouseStores.setPageSize(pageSize!);
  };

  return (
    <main>
      <div className={cn('warehouse__head')}>
        <Typography.Title level={3}>Склад</Typography.Title>
        <div className={cn('warehouse__filter')}>
          <Input
            placeholder="Введите текст для поиска"
            allowClear
            onChange={handleSearch}
            className={cn('warehouse__search')}
          />
          <Button
            onClick={handelAddNewWarehouse}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Новый склад
          </Button>
        </div>
      </div>

      <DataTable
        columns={warehouseColumns}
        data={warehousesData?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        pagination={{
          total: warehousesData?.data?.totalCount,
          current: warehouseStores?.pageNumber,
          pageSize: warehouseStores?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(warehousesData?.data?.totalCount),
        }}
      />

      {warehouseStores.isOpenWarehouseModal && <AddEditModal />}
    </main>
  );
});
