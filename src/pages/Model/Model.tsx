import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useQuery} from '@tanstack/react-query';
import {Input, TreeSelect, TreeSelectProps, Typography} from 'antd';
import classNames from 'classnames';
import {DataTable} from '@/components/Datatable/datatable';
import {modelStore} from '@/stores/model';
import {addNotification} from '@/utils';
import {getPaginationParams} from '@/utils/getPaginationParams';
import {useMediaQuery} from '@/utils/mediaQuery';
import {AddModelModal} from './AddModel';
import {modelColumns} from './constants';
import styles from './model.scss';

const cn = classNames.bind(styles);

export const Model = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');


  const {data: model, isLoading: loading} = useQuery({
    queryKey: ['getModel', modelStore.modelCategoryId, modelStore.page, modelStore.limit, modelStore.search],
    queryFn: () =>
      modelStore.getModel({
        pageNumber: modelStore.page,
        pageSize: modelStore.limit,
        name: modelStore.search,
        categoryId: modelStore.modelCategoryId!,
      }),
  });

  const handlePageChange = (page: number, pageSize: number | undefined) => {
    modelStore.setPage(page);
    modelStore.setLimit(pageSize!);
  };

  useEffect(() => () => {
    modelStore.setSearch('');
  }, []);

  return (
    <main>
      <div className={cn('model__head')}>
        <Typography.Title level={3}>Модели</Typography.Title>
      </div>

      <DataTable
        columns={modelColumns}
        data={model?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        pagination={{
          total: model?.data?.totalCount,
          current: modelStore?.page,
          pageSize: modelStore?.limit,
          showSizeChanger: true,
          onChange: handlePageChange,
          ...getPaginationParams(model?.data?.totalCount),
        }}
      />

      {modelStore.isOpenNewModel && <AddModelModal />}
    </main>
  );
});
