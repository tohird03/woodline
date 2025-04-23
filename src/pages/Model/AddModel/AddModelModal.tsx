import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Form, Input, InputNumber, Modal, TreeSelect, TreeSelectProps} from 'antd';
import {IAddModel} from '@/api/model/types';
import {modelStore} from '@/stores/model';
import {addNotification} from '@/utils';
import {trimValues} from '@/utils/trimObjectFunc';

export const AddModelModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const {mutate: addModel, isPending: addLoading} =
    useMutation({
      mutationKey: ['addModel'],
      mutationFn: (params: IAddModel) =>
        modelStore.addModel({...params}),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getModel']});
        handleModalClose();
      },
      onError: addNotification,

    });

  const {mutate: updateModel, isPending: updateLoading} =
    useMutation({
      mutationKey: ['updateModel'],
      mutationFn: (params: IAddModel) => modelStore.updateModel(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getModel']});
        handleModalClose();
      },
      onError: addNotification,
    });

  const handleSubmit = (value: IAddModel) => {

    const trimmedObject = trimValues(value);


    if (modelStore?.singleModel) {
      updateModel({
        ...trimmedObject,
        id: modelStore?.singleModel?.id,
      });

      return;
    }

    addModel(trimmedObject);
  };

  const handleModalClose = () => {
    modelStore.setSingleModel(null);
    modelStore.setIsOpenNewModel(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  return (
    <Modal
      open={modelStore.isOpenNewModel}
      title={modelStore.singleModel ? 'Изменить модель' : 'Новый модель'}
      onCancel={handleModalClose}
      onOk={handleModalOk}
      okText="Создать"
      cancelText="Отмена"
      centered
      confirmLoading={modelStore?.singleModel ? updateLoading : addLoading}
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Название модели"
          rules={[{ required: true }]}
        >
          <Input placeholder="Название модели" />
        </Form.Item>
      </Form>
    </Modal>
  );
});
