import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Modal } from 'antd';
import { incomeStores } from '@/stores/storehouse';
import { ColumnType } from 'antd/es/table';
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
