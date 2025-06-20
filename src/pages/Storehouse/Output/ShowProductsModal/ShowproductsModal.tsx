import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Form, Input, InputNumber, Modal, Select, Tag, notification } from 'antd';
import { incomeStores } from '@/stores/storehouse';
import { ColumnType } from 'antd/es/table';
import { IProduct } from '@/api/products/types';
import { DataTable } from '@/components/Datatable/datatable';
import { useMediaQuery } from '@/utils/mediaQuery';

export const ShowIncomeProductModal = observer(() => {
  const isMobile = useMediaQuery('(max-width: 800px)');
  const [loading, setLoading] = useState(false);

  const handleModalClose = () => {
    incomeStores.setIncome(null);
    incomeStores.setIsOpenAddEditIncomeModal(false);
  };

  const productColumns: ColumnType<IProduct>[] = [
    {
      key: 'index',
      dataIndex: 'index',
      title: '#',
      align: 'center',
      render: (value, record, index) => index + 1,
    },
    {
      key: 'model',
      dataIndex: 'model',
      title: 'Model',
      align: 'center',
      render: (value, record, index) => record?.model?.name,
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
      width={600}
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
