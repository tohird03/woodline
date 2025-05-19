import React from 'react';
import {observer} from 'mobx-react';
import {PlusCircleOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Input, Typography} from 'antd';
import classNames from 'classnames';
import {DataTable} from '@/components/Datatable/datatable';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {useMediaQuery} from '@/utils/mediaQuery';
import styles from './showroom.scss';
import { showroomStores } from '@/stores/showroom';
import { IStorehouseType } from '@/api/storehouse/type';
import { showroomColumns } from './constants';
import { AddEditModal } from './AddEditModal';

const cn = classNames.bind(styles);

export const Showroom = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const {data: showroomData, isLoading: loading} = useQuery({
    queryKey: [
      'getShowrooms',
      showroomStores.pageNumber,
      showroomStores.pageSize,
      showroomStores.search,
    ],
    queryFn: () =>
      showroomStores.getShowrooms({
        pageNumber: showroomStores.pageNumber,
        pageSize: showroomStores.pageSize,
        type: IStorehouseType.SHOWROOM,
        name: showroomStores.search!,
      }),
  });

  const handleAddNewShowroom = () => {
    showroomStores.setIsOpenShowroomModal(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    showroomStores.setSearch(e.currentTarget.value.trim());
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    showroomStores.setPageNumber(page);
    showroomStores.setPageSize(pageSize!);
  };

  return (
    <main>
      <div className={cn('showroom__head')}>
        <Typography.Title level={3}>Выставочный зал</Typography.Title>
        <div className={cn('showroom__filter')}>
          <Input
            placeholder="Введите текст для поиска"
            allowClear
            onChange={handleSearch}
            className={cn('showroom__search')}
          />
          <Button
            onClick={handleAddNewShowroom}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Новый выставочный зал
          </Button>
        </div>
      </div>

      <DataTable
        columns={showroomColumns}
        data={showroomData?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        pagination={{
          total: showroomData?.data?.totalCount,
          current: showroomStores?.pageNumber,
          pageSize: showroomStores?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(showroomData?.data?.totalCount),
        }}
      />

      {showroomStores.isOpenAddEditShowroomModal && <AddEditModal />}
    </main>
  );
});
