import React, { useEffect, useMemo } from 'react';
import { orderStore } from '@/stores/order';
import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { regexPhoneNumber } from '@/utils/phoneFormat';
import { observer } from 'mobx-react';
import { useQuery } from '@tanstack/react-query';
import { clientsInfoApi } from '@/api/clients';
import { ICartOrderClient } from '@/api/order/types';
import dayjs from 'dayjs';

export const CorzinkaClientsModal = observer(() => {
  const [form] = Form.useForm();

  const { data: clientsData } = useQuery({
    queryKey: ['getClients'],
    queryFn: () =>
      clientsInfoApi.getClientsInfo({
        pagination: false,
      }),
  });

  const handleCloseModal = () => {
    orderStore.setIsOpenCorzinaProductModal(true);
    orderStore.setIsOpenCorzinaClientModal(false);
  };

  const handleSaveModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleFinishForm(values);
        orderStore.setIsOpenCorzinaPaymentModal(true);
        orderStore.setIsOpenCorzinaClientModal(false);
      })
      .catch((errorInfo) => {
        console.log('Validation Failed:', errorInfo);
      });
  };

  const handleFinishForm = (values: ICartOrderClient) => {
    localStorage.setItem('orderClient', JSON.stringify(values));
  };

  const handleClientChange = (value: string) => {
    const selectedClient = clientsData?.data?.data?.find((client) => client?.id === value);

    if (selectedClient) {
      form.setFieldsValue({ phone: selectedClient?.phone?.slice(3) });
    }
  };

  const clientsOptions = useMemo(() => (
    clientsData?.data?.data.map((client) => ({
      value: client?.id,
      label: `${client?.fullname}`,
    }))
  ), [clientsData]);

  useEffect(() => {
    const savedClient = localStorage.getItem('orderClient');

    if (savedClient) {
      const parsed: ICartOrderClient = JSON.parse(savedClient);

      form.setFieldsValue({
        ...parsed,
        deliveryDate: dayjs(parsed?.deliveryDate),
      });
    }
  }, [form]);

  return (
    <Modal
      open={orderStore.isOpenCorzinkaClientModal}
      onCancel={handleCloseModal}
      title="О клиента"
      onOk={handleSaveModalOk}
      okText="Следующий"
      cancelText="Назад"
    >
      <Form
        form={form}
        onFinish={handleFinishForm}
        layout="vertical"
      >
        <Form.Item
          rules={[{ required: true }]}
          label="Имя клиента"
          name="clientId"
        >
          <Select
            showSearch
            placeholder="Имя клиента"
            options={clientsOptions}
            allowClear
            onChange={handleClientChange}
          />
        </Form.Item>
        <Form.Item
          rules={[
            { required: true },
            {
              pattern: regexPhoneNumber,
              message: 'Неправильный формат телефона, например: 901234567',
            },
          ]}
          label="Тел клиента:"
          name="phone"
        >
          <Input
            type="tel"
            addonBefore="+998"
            maxLength={9}
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label="Откуда пришли:"
          name="whereFrom"
        >
          <Select
            showSearch
            placeholder="Откуда"
            optionFilterProp="label"
            options={[{
              value: 'instagram',
              label: 'Instagram',
            }]}
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true }]}
          label="Дата доставки:"
          name="deliveryDate"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item rules={[{ required: true }]} label="Адрес" name="deliveryAddress">
          <Input placeholder="Адрес" type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );
});
