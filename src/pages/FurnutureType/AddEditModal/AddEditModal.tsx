import React, {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Form, Input, InputNumber, Modal, Select} from 'antd';
import {addNotification} from '@/utils';
import {priceFormat} from '@/utils/priceFormat';
import {trimValues} from '@/utils/trimObjectFunc';
import { IAddEditFurnutureType } from '@/api/furnuture-type/types';
import { furnutureTypeApi } from '@/api/furnuture-type/furnuture-type';
import { furnutureTypeStore } from '@/stores/furnuture-type';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {mutate: addFurnutureType} =
    useMutation({
      mutationKey: ['addFurnutureType'],
      mutationFn: (params: IAddEditFurnutureType) => furnutureTypeApi.addFurnutureType(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getFurnutureType']});
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const {mutate: updateFurnutureType} =
    useMutation({
      mutationKey: ['updateFurnutureType'],
      mutationFn: (params: IAddEditFurnutureType) => furnutureTypeApi.updateFurnutureType(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getFurnutureType']});
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const handleSubmit = (value: IAddEditFurnutureType) => {
    setLoading(true);
    const trimmedObject = trimValues(value);


    if (furnutureTypeStore?.singleFurnutureType) {
      updateFurnutureType({
        ...trimmedObject,
        id: furnutureTypeStore?.singleFurnutureType?.id,
      });

      return;
    }
    addFurnutureType(trimmedObject);
  };

  const handleModalClose = () => {
    furnutureTypeStore.setSingleFurnutureType(null);
    furnutureTypeStore.setIsOpenNewTypeModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (furnutureTypeStore.singleFurnutureType) {
      form.setFieldsValue(furnutureTypeStore.singleFurnutureType);
    }
  }, [furnutureTypeStore.singleFurnutureType]);

  return (
    <Modal
      open={furnutureTypeStore.isOpenAddNewTypeModal}
      title={furnutureTypeStore.singleFurnutureType ? 'Изменить Вид мебели' : 'Новый Вид мебели'}
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
          label="Вид мебели"
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
