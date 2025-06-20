import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input, InputNumber, Modal, Select, Tag, notification } from 'antd';
import { addNotification } from '@/utils';
import { trimValues } from '@/utils/trimObjectFunc';
import { storehouseApi } from '@/api/storehouse';
import { IAddEditStorehouse, IStorehouseType } from '@/api/storehouse/type';
import { showroomStores } from '@/stores/showroom';
import { incomeStores } from '@/stores/storehouse';
import { warehouseStores } from '@/stores/warehouse';
import { usersApi } from '@/api/users/users';
import { ERoleName } from '@/api/role';
import { productsApi } from '@/api/products/products';
import { ColumnType } from 'antd/es/table';
import { IProduct } from '@/api/products/types';
import { DataTable } from '@/components/Datatable/datatable';
import { useMediaQuery } from '@/utils/mediaQuery';
import { IPurchase, IPurchaseProductMvs } from '@/api/purchase/types';

export const ShowIncomeProductModal = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    incomeStores.setIncome(null);
    incomeStores.setIsOpenShowIncomeProductsModal(false);
  };

  const getStatusQuantity = (
    statuses: IPurchaseProductMvs['statuses'] | undefined,
    status: 'active' | 'defected'
  ): number => statuses?.find(s => s.status === status)?.quantity ?? 0;

  const productColumns: ColumnType<IPurchaseProductMvs>[] = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '#',
      align: 'center',
      render: (value, record, index) => index + 1,
    },
    {
      key: 'index',
      title: 'ID',
      dataIndex: 'index',
      render: (value, record, index) => record?.product?.publicId,
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'Модель',
      render: (value, record, index) => record?.product?.model?.name,
    },
    {
      key: 'tissue',
      dataIndex: 'tissue',
      title: 'Ткань',
      render: (value, record, index) => record?.product?.tissue,
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Примечание',
      render: (value, record, index) => record?.product?.description,
    },
    {
      key: 'active',
      dataIndex: 'active',
      title: 'Active product count',
      align: 'center',
      render: (_, record) => getStatusQuantity(record?.statuses, 'active'),
    },
    {
      key: 'defected',
      dataIndex: 'defected',
      title: 'Defected product count',
      align: 'center',
      render: (_, record) => getStatusQuantity(record?.statuses, 'defected'),
    },
  ];

  return (
    <Modal
      open={incomeStores.isOpenShowIncomeProductsModal}
      title="Продукты"
      onCancel={handleModalClose}
      onOk={handleModalClose}
      cancelText="Отмена"
      centered
      confirmLoading={loading}
      width={800}
    >
      <DataTable
        columns={productColumns}
        data={incomeStores.income?.productMVs || []}
        loading={loading}
        isMobile={isMobile}
        pagination={false}
      />
    </Modal>
  );
});
