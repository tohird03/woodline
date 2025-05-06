import React, { useEffect, useMemo, useState } from 'react';
import { priceFormat } from '@/utils/priceFormat';
import { Alert, Badge, Button, Col, Form, Input, InputNumber, Row, Select, Typography } from 'antd';
import { observer } from 'mobx-react';
import styles from './order.scss';
import classNames from 'classnames/bind';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCookies } from 'react-cookie';
import { orderStore } from '@/stores/order';
import { CorzinaProductsModal } from './KorzinkaModal/ProductsModal';
import { CorzinkaClientsModal } from './KorzinkaModal/ClientsModal';
import { CorzinaPaymentModal } from './KorzinkaModal/PaymentModal/PaymentModal';
import { useMutation, useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api/order';
import { furnutureTypeApi } from '@/api/furnuture-type/furnuture-type';
import { modelApi } from '@/api/model/model';
import { SelectOptionType } from '@/api/types';
import { directionOptions } from './constants';
import { addNotification } from '@/utils';
import { IAddProductToCart } from '@/api/order/types';
import { CheckUpAndCreateModal } from './KorzinkaModal/CheckUpAndCreateModal/CheckUpAndCreateModal';

const cn = classNames.bind(styles);

export const Order = observer(() => {
  const [form] = Form.useForm();
  const [orderIdCookie, setOrderIdCookie] = useCookies(['orderId']);
  const [modelOptions, setModelOptions] = useState<SelectOptionType[]>([]);

  const { data: orderId } = useQuery({
    queryKey: ['getOrderId', orderIdCookie?.orderId],
    queryFn: async () => {
      if (orderIdCookie?.orderId) {
        return orderIdCookie.orderId;
      } else {
        const generated = await orderApi.getOrderGenerateId();
        const newId = generated?.data?.id;

        setOrderIdCookie('orderId', newId, { path: '/' });

        return newId;
      }
    },
  });

  const { data: furnutureTypeData } = useQuery({
    queryKey: ['getFunutureType'],
    queryFn: () =>
      furnutureTypeApi.getFurnutureType({
        pagination: false,
      }),
  });

  const { mutate: addProductToCart, isPending: addLoading } =
    useMutation({
      mutationKey: ['addProductToCart'],
      mutationFn: (params: IAddProductToCart) => orderApi.addProductToCart({ ...params }),
      onSuccess: () => {
        addNotification('Success add product to cart');
        form.resetFields();
      },
      onError: addNotification,

    });

  const handleOpenKorzinka = () => {
    orderStore.setIsOpenCorzinaProductModal(true);
  };

  const handleFinish = (values: IAddProductToCart) => {
    addProductToCart({
      description: values?.description,
      direction: 'right',
      modelId: values?.modelId,
      price: values?.price,
      priceWithSale: values?.priceWithSale,
      publicId: values?.publicId,
      quantity: values?.quantity,
      sale: 10,
      staffId: '75b128d4-4a0b-4a4b-b92a-1dcdf5a538b8',
      tissue: values?.tissue,
      totalSum: values?.priceWithSale * values?.quantity,
    });
  };

  const handleFurnutureTypeChange = (value: string) => {
    modelApi.getModels({
      furnitureTypeId: value,
    })
      .then((res) => {
        if (res) {
          const options = res?.data?.data?.map((model) => ({
            value: model?.id,
            label: model?.name,
          }));

          setModelOptions(options);
        }
      });
  };

  const handleClearForm = () => {
    form.resetFields();
  };

  const handleFormAddFinish = () => {
    form.submit();
  };

  const furnutureTyoeOptions = useMemo(() => (
    furnutureTypeData?.data?.data.map((furnutureType) => ({
      value: furnutureType?.id,
      label: `${furnutureType?.name}`,
    }))
  ), [furnutureTypeData]);

  useEffect(() => {
    if (orderId) {
      form.setFieldsValue({ publicId: orderId });
    }
  }, [orderId]);

  return (
    <>
      <div>
        <div className={cn('order-form__head')}>
          <Typography.Title level={3}>Заказ</Typography.Title>
          <Badge
            className="site-badge-count-109"
            count={12}
            style={{ backgroundColor: '#52c41a' }}
          >
            <Button
              type="primary"
              size="large"
              onClick={handleOpenKorzinka}
            >
              <ShoppingCartOutlined
                size={24}
                style={{
                  fontSize: '24px',
                  backgroundColor: '',
                }}
              />
            </Button>
          </Badge>
        </div>
        <div
          className={cn('order-form__wrapper')}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className={cn('order-form')}
          >
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Введите ID заказа"
                  name="publicId"
                  initialValue={orderId}
                >
                  <Input value={orderId} disabled placeholder="Id" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Вид мебели"
                  name="furnuture"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="выбрать Вид мебели"
                    optionFilterProp="label"
                    options={furnutureTyoeOptions}
                    onChange={handleFurnutureTypeChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Модели"
                  name="modelId"
                  rules={[{ required: true }]}
                >
                  <Select
                    showSearch
                    placeholder="выбрать Модель"
                    optionFilterProp="label"
                    disabled={modelOptions?.length === 0}
                    options={modelOptions}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Введите название ткани"
                  name="tissue"
                  rules={[{ required: true }]}
                  getValueFromEvent={(event) => event.target.value.trimStart()}
                >
                  <Input placeholder="Ткань" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Угол" name="direction" rules={[{ required: true }]}>
              <Select
                placeholder="выбрать Угол"
                optionFilterProp="direction"
                options={directionOptions}
                allowClear
              />
            </Form.Item>
            <Form.Item
              label="Примечание"
              name="description"
              rules={[{ required: true }]}
              getValueFromEvent={(event) => event.target.value.trimStart()}
            >
              <Input.TextArea
                placeholder="Примечание"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>

            <Row gutter={24} align="middle">
              <Col xs={24} md={10}>
                <Form.Item label="Цена" name="price" rules={[{ required: true }]}>
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    placeholder="Цена"
                    formatter={(value: number | undefined) => priceFormat(value)}
                    className={cn('order-form__price')}
                  />
                </Form.Item>
              </Col>
              <Col xs={18} md={10}>
                <Form.Item
                  label="Цена со скидкой"
                  name="priceWithSale"
                  rules={[{ required: true }]}
                >
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    placeholder="Цена со скидкой"
                    formatter={(value: number | undefined) => priceFormat(value)}
                    className={cn('order-form__price')}
                  />
                </Form.Item>
              </Col>
              <Col xs={6} md={4}>
                <Form.Item label="Скидка">
                  <Badge
                    count={`${10} %`}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24} align="middle">
              <Col xs={12}>
                <Form.Item label="Кол-во" name="quantity" rules={[{ required: true }]}>
                  <InputNumber
                    min={0}
                    defaultValue={0}
                    placeholder="Кол-во"
                    formatter={(value: number | undefined) => priceFormat(value)}
                    className={cn('order-form__price')}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label="Сумма">
                  <Alert
                    message={`${priceFormat(10)} сум`}
                    type="info"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24} justify="end" align="middle">
              <Col xs={12} lg={4}>
                <Button
                  type="primary"
                  danger
                  onClick={handleClearForm}
                >
                  Clear
                </Button>
              </Col>
              <Col xs={12} lg={4}>
                <Button
                  type="primary"
                  onClick={handleFormAddFinish}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>

      {orderStore.isOpenCorzinaProductModal && <CorzinaProductsModal />}
      {orderStore.isOpenCorzinkaClientModal && <CorzinkaClientsModal />}
      {orderStore.isOpenCorzinaPaymentModal && <CorzinaPaymentModal />}
      {orderStore.isOpenCheckUpAndCreateModal && <CheckUpAndCreateModal />}
    </>
  );
});
