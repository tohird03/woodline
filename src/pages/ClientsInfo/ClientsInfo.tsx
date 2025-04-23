import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Typography } from 'antd';
import classNames from 'classnames';
import { DataTable } from '@/components/Datatable/datatable';
import { getPaginationParams } from '@/utils/getPaginationParams';
import { useMediaQuery } from '@/utils/mediaQuery';
import { AddEditModal } from './AddEditModal';
import styles from './client-info.scss';
import { clientsColumns } from './constants';
import { clientsInfoStore } from '@/stores/clients-info';

const cn = classNames.bind(styles);

export const ClientsInfo = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [downloadLoading, setDownLoadLoading] = useState(false);

  const { data: clientsInfoData, isLoading: loading } = useQuery({
    queryKey: [
      'getClients',
      clientsInfoStore.pageNumber,
      clientsInfoStore.pageSize,
      clientsInfoStore.search,
      clientsInfoStore.debt,
    ],
    queryFn: () =>
      clientsInfoStore.getClients({
        pageNumber: clientsInfoStore.pageNumber,
        pageSize: clientsInfoStore.pageSize,
        search: clientsInfoStore.search!,
        debt: clientsInfoStore.debt!,
      }),
  });

  const handleAddNewClient = () => {
    clientsInfoStore.setIsOpenAddEditClientModal(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    clientsInfoStore.setSearch(e.currentTarget?.value);
    handlePageChange(1, 100);
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    clientsInfoStore.setPageNumber(page);
    clientsInfoStore.setPageSize(pageSize!);
  };

  useEffect(() => () => {
    clientsInfoStore.reset();
  }, []);

  return (
    <main>
      <div className={cn('client-info__head')}>
        <Typography.Title level={3}>Mijozlar</Typography.Title>
        <div className={cn('client-info__filter')}>
          <Input
            placeholder="Mijozlarni qidirish"
            allowClear
            onChange={handleSearch}
            className={cn('client-info__search')}
          />
          <Button
            onClick={handleAddNewClient}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Mijoz qo&apos;shish
          </Button>
        </div>
      </div>

      <DataTable
        columns={clientsColumns}
        data={clientsInfoData?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        pagination={{
          total: clientsInfoData?.data?.totalCount,
          current: clientsInfoStore?.pageNumber,
          pageSize: clientsInfoStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(clientsInfoData?.data?.totalCount),
        }}
      />

      {clientsInfoStore.isOpenAddEditClientModal && <AddEditModal />}
    </main>
  );
});
