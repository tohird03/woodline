import React, {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {Form, Input, Modal} from 'antd';
import {addNotification} from '@/utils';
import {trimValues} from '@/utils/trimObjectFunc';
import { storehouseApi } from '@/api/storehouse';
import { IAddEditStorehouse, IStorehouseType } from '@/api/storehouse/type';
import { showroomStores } from '@/stores/showroom';

export const AddEditModal = observer(() => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const {mutate: addNewShowroom} =
    useMutation({
      mutationKey: ['addNewShowroom'],
      mutationFn: (params: IAddEditStorehouse) => storehouseApi.addStorehouse(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getShowrooms']});
        handleModalClose();
      },
      onError: addNotification,
      onSettled: async () => {
        setLoading(false);
      },
    });

  const {mutate: updateShowroom} =
    useMutation({
      mutationKey: ['updateShowroom'],
      mutationFn: (params: IAddEditStorehouse) => storehouseApi.updateStorehouse(params),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['getShowrooms']});
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


    if (showroomStores?.singleShowroom) {
      updateShowroom({
        ...trimmedObject,
        id: showroomStores?.singleShowroom?.id,
      });

      return;
    }
    addNewShowroom({
      ...trimmedObject,
      type: IStorehouseType.SHOWROOM,
    });
  };

  const handleModalClose = () => {
    showroomStores.setSingleShowroom(null);
    showroomStores.setIsOpenShowroomModal(false);
  };

  const handleModalOk = () => {
    form.submit();
  };

  useEffect(() => {
    if (showroomStores.singleShowroom) {
      form.setFieldsValue(showroomStores.singleShowroom);
    }
  }, [showroomStores.singleShowroom]);

  return (
    <Modal
      open={showroomStores.isOpenAddEditShowroomModal}
      title={showroomStores.singleShowroom ? 'Изменить выставочный зал' : 'Новый выставочный зал'}
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
          label="Выставочный зал"
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
