import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, InputNumber, Modal, Select, Tag, notification } from 'antd';
import { addNotification } from '@/utils';
import { trimValues } from '@/utils/trimObjectFunc';
import { IStorehouseType } from '@/api/storehouse/type';
import { incomeStores } from '@/stores/storehouse';
import { warehouseStores } from '@/stores/warehouse';
import { usersApi } from '@/api/users/users';
import { productsApi } from '@/api/products/products';
import { ColumnType } from 'antd/es/table';
import { IProduct } from '@/api/products/types';
import { IAddEditPurchase, IPurchaseProduct } from '@/api/purchase/types';
import { DataTable } from '@/components/Datatable/datatable';
import { useMediaQuery } from '@/utils/mediaQuery';
import {getPaginationParams} from '@/utils/getPaginationParams';
import { purchaseApi } from '@/api/purchase/purchase';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const isMobile = useMediaQuery('(max-width: 800px)');
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [productChanges, setProductChanges] = useState<IPurchaseProduct[]>([]);

  const { data: warehousesData, isLoading: loadingWarehouse } = useQuery({
    queryKey: [
      'getWarehouses',
    ],
    queryFn: () =>
      warehouseStores.getWarehouses({
        pagination: false,
        type: IStorehouseType.WAREHOUSE,
      }),
  });

  const { data: providerData, isLoading: loadingProvider } = useQuery({
    queryKey: ['getProviders'],
    queryFn: () =>
      usersApi.getUsers({
        pagination: false,
      }),
  });

  const { data: productData, isLoading: loadingProduct } = useQuery({
    queryKey: ['getProducts'],
    queryFn: () =>
      productsApi.getProducts({
        pagination: false,
      }),
  });

  const { mutate: addPurchase } =
    useMutation({
      mutationKey: ['addPurchase'],
      mutationFn: (params: IAddEditPurchase) => purchaseApi.addPurchase(params),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getPurchases'] });
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (value: IAddEditPurchase) => {
    setLoading(true);
    const trimmedObject = trimValues(value);

    if (productChanges?.length === 0) {
      notification.error({
        message: 'Mahsulot kiritilmadi!',
      });

      return;
    }

    addPurchase({
      ...trimmedObject,
      productMVs: productChanges,
    });
  };

  const handleModalClose = () => {
    incomeStores.setIncome(null);
    incomeStores.setIsOpenAddEditIncomeModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const warehouseOptions = useMemo(() => (
    warehousesData?.data?.data.map((warehouse) => ({
      value: warehouse?.id,
      label: `${warehouse?.name}`,
    }))
  ), [warehousesData]);

  const providerOptions = useMemo(() => (
    providerData?.data?.data.map((provider) => ({
      value: provider?.id,
      label: `${provider?.fullname}`,
    }))
  ), [providerData]);

  useEffect(() => {
    if (incomeStores.income) {
      form.setFieldsValue(incomeStores.income);
    }
  }, [incomeStores.income]);

  const updateProductChange = (
    id: string,
    quantity: number | null,
    status: 'active' | 'defected'
  ) => {
    setProductChanges((prev) => {
      const otherChanges = prev.filter(c => !(c.id === id && c.status === status));

      if (quantity === null || quantity === 0) {
        return otherChanges;
      }

      return [...otherChanges, { id, quantity, status }];
    });
  };

  const handleChangeProductActive = (value: number | null, product: IProduct) => {
    updateProductChange(product.id, value, 'active');
  };

  const handleChangeProductDefected = (value: number | null, product: IProduct) => {
    updateProductChange(product.id, value, 'defected');
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
    {
      key: 'index',
      dataIndex: 'index',
      title: <Tag color="green">Active</Tag>,
      align: 'center',
      render: (value, record, index) => (
        <InputNumber
          min={0}
          onChange={(value) => handleChangeProductActive(value, record)}
        />
      ),
    },
    {
      key: 'index',
      dataIndex: 'index',
      title: <Tag color="green">Defected</Tag>,
      align: 'center',
      render: (value, record, index) => (
        <InputNumber
          min={0}
          onChange={(value) => handleChangeProductDefected(value, record)}
        />
      ),
    },
  ];

  return (
    <Modal
      open={incomeStores.isOpenAddEditIncomeModal}
      title={incomeStores.income ? 'Изменить Приходы' : 'Новый Приходы'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText="Создать"
      cancelText="Отмена"
      centered
      confirmLoading={loading}
      width={600}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          label="Склад"
          rules={[{ required: true }]}
          name="storehouseId"
        >
          <Select
            showSearch
            placeholder="Склад"
            options={warehouseOptions}
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Поставщик"
          rules={[{ required: true }]}
          name="providerId"
        >
          <Select
            showSearch
            placeholder="Поставщик"
            options={providerOptions}
            allowClear
          />
        </Form.Item>
      </Form>
      <DataTable
        columns={productColumns}
        data={productData?.data?.data || []}
        loading={loading}
        isMobile={isMobile}
        pagination={false}
      />
    </Modal>
  );
});
