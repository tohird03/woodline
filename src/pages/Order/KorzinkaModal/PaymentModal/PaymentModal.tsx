import React, { useEffect, useState } from 'react';
import { orderStore } from '@/stores/order';
import {
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
import { orderCartPayments } from './constants';

export const CorzinaPaymentModal = observer(() => {
  const [form] = Form.useForm();
  const [payments, setPayments] = useState<ICartOrderPayment[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('corzinkaPayments');

    if (saved) {
      setPayments(JSON.parse(saved));
    }
  }, []);

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
      const newPayments = [...payments, values];

      setPayments(newPayments);
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
      cancelText="Назад"
      style={{ top: 0, padding: '15px' }}
      bodyStyle={{ height: '85vh', overflow: 'auto' }}
      width="100vw"
    >
      <Form form={form} layout="vertical">
        <Row gutter={24} style={{ margin: 0 }}>
          <Col xs={12} lg={4}>
            <Form.Item
              rules={[{ required: true }]}
              label="Способ оплаты"
              name="whereFrom"
            >
              <Select
                showSearch
                placeholder="Способ оплаты"
                optionFilterProp="label"
                options={[
                  { label: 'Наличные', value: 'cash' },
                  { label: 'Карта', value: 'card' },
                  { label: 'Банк', value: 'bank' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Item label="Сумма" name="cash" initialValue={0}>
              <InputNumber
                placeholder="Сумма"
                style={{ width: '100%' }}
                formatter={(value) => priceFormat(value)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Item label="Валюта" name="currency" initialValue={0}>
              <InputNumber
                placeholder="Валюта"
                style={{ width: '100%' }}
                formatter={(value) => priceFormat(value)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} lg={4}>
            <Form.Item label="Курс валют" name="exchangeRate" initialValue={0}>
              <InputNumber
                placeholder="Курс валют"
                style={{ width: '100%' }}
                formatter={(value) => priceFormat(value)}
              />
            </Form.Item>
          </Col>
          <Col xs={12} lg={4}>
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
          <Col xs={12} lg={4} style={{ alignSelf: 'center' }}>
            <Button style={{ width: '100%' }} type="primary" onClick={handleAddPayment}>
              Добавить
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Jadvalni forma ostida ko‘rsatamiz */}
      <Table
        columns={orderCartPayments}
        dataSource={payments}
        style={{ marginTop: 24 }}
        pagination={false}
      />
    </Modal>
  );
});
