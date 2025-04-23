import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {PlusCircleOutlined} from '@ant-design/icons';
import {useQuery} from '@tanstack/react-query';
import {Button, Input, Typography} from 'antd';
import classNames from 'classnames';
import {DataTable} from '@/components/Datatable/datatable';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {useMediaQuery} from '@/utils/mediaQuery';
import {AddEditModal} from './AddEditModal';
import {processColumns} from './constants';
import styles from './furnuture-type.scss';
import { furnutureTypeStore } from '@/stores/furnuture-type/furnuture-type';

const cn = classNames.bind(styles);

export const FurnutureType = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');

  const {data: process, isLoading: loading} = useQuery({
    queryKey: [
      'getFurnutureType',
      furnutureTypeStore.pageNumber,
      furnutureTypeStore.pageSize,
      furnutureTypeStore.search,
    ],
    queryFn: () =>
      furnutureTypeStore.getFurnutureType({
        pageNumber: furnutureTypeStore.pageNumber,
        pageSize: furnutureTypeStore.pageSize,
      }),
  });

  const handleAddUser = () => {
    furnutureTypeStore.setIsOpenNewTypeModal(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    furnutureTypeStore.setSearch(e.currentTarget.value.trim());
  };

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    furnutureTypeStore.setPageNumber(page);
    furnutureTypeStore.setPageSize(pageSize!);
  };

  useEffect(() => () => {
    furnutureTypeStore.setSearch('');
  }, []);

  return (
    <main>
      <div className={cn('process__head')}>
        <Typography.Title level={3}>Вид мебели</Typography.Title>
        <div className={cn('process__filter')}>
          <Input
            placeholder="Введите текст для поиска"
            allowClear
            onChange={handleSearch}
            className={cn('process__search')}
          />
          <Button
            onClick={handleAddUser}
            type="primary"
            icon={<PlusCircleOutlined />}
          >
            Новый Вид мебели
          </Button>
        </div>
      </div>

      <DataTable
        columns={processColumns}
        data={process?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        pagination={{
          total: process?.data?.totalCount,
          current: furnutureTypeStore?.pageNumber,
          pageSize: furnutureTypeStore?.pageSize,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(process?.data?.totalCount),
        }}
      />

      {furnutureTypeStore.isOpenAddNewTypeModal && <AddEditModal />}
    </main>
  );
});
