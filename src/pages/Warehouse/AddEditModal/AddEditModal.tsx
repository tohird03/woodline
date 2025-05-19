import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Form, Input, Modal} from 'antd';
import {addNotification} from '@/utils';
import {trimValues} from '@/utils/trimObjectFunc';
import { storehouseApi } from '@/api/storehouse';
import { IAddEditStorehouse, IStorehouseType } from '@/api/storehouse/type';
import { warehouseStores } from '@/stores/warehouse';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {mutate: addNewWarehouse} =
    useMutation({
      mutationKey: ['addNewWarehouse'],
      mutationFn: (params: IAddEditStorehouse) => storehouseApi.addStorehouse(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getWarehouses']});
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const {mutate: updateWarehouse} =
    useMutation({
      mutationKey: ['updateWarehouse'],
      mutationFn: (params: IAddEditStorehouse) => storehouseApi.updateStorehouse(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getWarehouses']});
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (value: IAddEditStorehouse) => {
    setLoading(true);
    const trimmedObject = trimValues(value);


    if (warehouseStores?.singleWarehouse) {
      updateWarehouse({
        ...trimmedObject,
        id: warehouseStores?.singleWarehouse?.id,
      });

      return;
    }
    addNewWarehouse({
      ...trimmedObject,
      type: IStorehouseType.WAREHOUSE,
    });
  };

  const handleModalClose = () => {
    warehouseStores.setSingleWarehouse(null);
    warehouseStores.setIsOpenWarehouseModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (warehouseStores.singleWarehouse) {
      form.setFieldsValue(warehouseStores.singleWarehouse);
    }
  }, [warehouseStores.singleWarehouse]);

  return (
    <Modal
      open={warehouseStores.isOpenWarehouseModal}
      title={warehouseStores.singleWarehouse ? 'Изменить склад' : 'Новый склад'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText="Создать"
      cancelText="Отмена"
      centered
      confirmLoading={loading}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Склад"
          rules={[{required: true}]}
        >
          <Input
            placeholder="Наименование"
            style={{width: '100%'}}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});
