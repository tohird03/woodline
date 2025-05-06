import React, { useEffect, useState } from 'react';
import { orderStore } from '@/stores/order';
import {
  Alert,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
} from 'antd';
import { observer } from 'mobx-react';
import { priceFormat } from '@/utils/priceFormat';
import { ICartOrderPayment } from '@/api/order/types';
import { orderCartPayments, orderPaymentOptions } from './constants';
import { useMediaQuery } from '@/utils/mediaQuery';
import { DataTable } from '@/components/Datatable/datatable';

export const CorzinaPaymentModal = observer(() => {
  const [form] = Form.useForm();
  const fromCurrency = Form.useWatch('fromCurrency', form);
  const exchangeRate = Form.useWatch('exchangeRate', form);
  const sum = Form.useWatch('sum', form);
  const [totalSum, setTotalSum] = useState(0);
  const isMobile = useMediaQuery('(max-width: 650px)');

  useEffect(() => {
    const saved = localStorage.getItem('corzinkaPayments');

    if (saved) {
      orderStore.setPayments(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (fromCurrency === 'uzs') {
      form.setFieldsValue({ exchangeRate: 1 });
    }
  }, [fromCurrency, form]);

  useEffect(() => {
    const cash = (sum || 0) * (exchangeRate || 1);

    setTotalSum(cash);
  }, [sum, exchangeRate]);

  // LocalStorage-ga yozish
  const saveToLocalStorage = (newPayments: ICartOrderPayment[]) => {
    localStorage.setItem('corzinkaPayments', JSON.stringify(newPayments));
  };

  const handleCloseModal = () => {
    orderStore.setIsOpenCorzinaClientModal(true);
    orderStore.setIsOpenCorzinaPaymentModal(false);
  };

  const handleSaveModalOk = () => {
    orderStore.setIsOpenCorzinaPaymentModal(false);
    orderStore.setIsOpenCheckUpAndCreateModal(true);
  };

  const handleAddPayment = () => {
    form.validateFields().then((values) => {
      const newPayments = [...orderStore.payments, {...values, totalSum}];

      orderStore.setPayments(newPayments);
      saveToLocalStorage(newPayments);
      form.resetFields(); // formani tozalash
    });
  };

  return (
    <Modal
      open={orderStore.isOpenCorzinaPaymentModal}
      onCancel={handleCloseModal}
      title="Предоплата"
      onOk={handleSaveModalOk}
      okText="Следующий"
      okButtonProps={{disabled: orderStore?.payments?.length === 0}}
      cancelText="Назад"
      style={{ top: 0, padding: '15px' }}
      bodyStyle={{ height: '85vh', overflow: 'auto' }}
      width="100vw"
    >
      <Form form={form} layout="vertical">
        <Row gutter={24} style={{ margin: 0 }}>
          <Col xs={24} lg={4}>
            <Form.Item
              rules={[{ required: true }]}
              label="Способ оплаты"
              name="method"
            >
              <Select
                showSearch
                placeholder="Способ оплаты"
                optionFilterProp="label"
                options={orderPaymentOptions}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={4}>
            <Form.Item label="Сумма" name="sum" initialValue={0}>
              <InputNumber
                placeholder="Сумма"
                style={{ width: '100%' }}
                formatter={(value) => priceFormat(value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={4}>
            <Form.Item
              rules={[{ required: true }]}
              label="Валюта"
              name="fromCurrency"
            >
              <Select
                showSearch
                placeholder="Валюта"
                optionFilterProp="label"
                options={[
                  {
                    value: 'uzs',
                    label: 'UZS',
                  },
                  {
                    value: 'usd',
                    label: 'USD',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={4}>
            <Form.Item
              label="Курс валют"
              name="exchangeRate"
              initialValue={1}
            >
              <InputNumber
                placeholder="Курс валют"
                style={{ width: '100%' }}
                disabled={fromCurrency === 'uzs'}
                formatter={(value) => priceFormat(value)}
              />
            </Form.Item>
            <Alert
              message={priceFormat(totalSum)}
            />
          </Col>
          <Col xs={24} lg={4}>
            <Form.Item label="Примечание" name="description">
              <Input.TextArea
                placeholder="Примечание"
                style={{ width: '100%' }}
                rows={2}
                maxLength={100}
                showCount
              />
            </Form.Item>
          </Col>
          <Col xs={24} lg={4} style={{ alignSelf: 'center' }}>
            <Button style={{ width: '100%' }} type="primary" onClick={handleAddPayment}>
              Добавить
            </Button>
          </Col>
        </Row>
      </Form>

      <DataTable
        columns={orderCartPayments}
        data={orderStore?.payments}
        pagination={false}
        isMobile={isMobile}
      />
    </Modal>
  );
});
