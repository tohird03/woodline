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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
  const [saleCount, setSaleCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const queryClient = useQueryClient();

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

  const { data: cartProducts } = useQuery({
    queryKey: ['getCartProducts'],
    queryFn: () =>
      orderApi.getCartProducts(),
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
        queryClient.invalidateQueries({ queryKey: ['getCartProducts'] });
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
      direction: values?.direction,
      modelId: values?.modelId,
      price: values?.price,
      priceWithSale: values?.priceWithSale,
      publicId: values?.publicId,
      quantity: values?.quantity,
      sale: saleCount,
      tissue: values?.tissue,
      totalSum: totalPrice,
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

  const handleSumChange = (value: number | null) => {
    const saleValue = form.getFieldValue('priceWithSale');

    if (!value || !saleValue) {
      setSaleCount(100);

      return;
    }

    const calculatedSaleCount = 100 - (saleValue / value) * 100;

    setSaleCount(Number(calculatedSaleCount.toFixed(3)));
  };

  const handleSaleChange = (value: number | null) => {
    const sumValue = form.getFieldValue('price');
    const qty = form.getFieldValue('quantity');

    if (!value) {
      setSaleCount(100);
      setTotalPrice(0);

      return;
    }
    const calculatedSaleCount =
      sumValue !== undefined ? 100 - (value / sumValue) * 100 : 0;

    setSaleCount(Number(calculatedSaleCount.toFixed(3)));
    setTotalPrice(qty ? value * qty : 0);
  };

  const handleQtyChange = (value: number | null) => {
    const saleValue = form.getFieldValue('priceWithSale');

    if (!value || !saleValue) {
      setTotalPrice(0);

      return;
    }
    setTotalPrice(value * saleValue);
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
            count={cartProducts?.data?.data?.length}
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
                    onChange={handleSumChange}
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
                    onChange={handleSaleChange}
                    formatter={(value: number | undefined) => priceFormat(value)}
                    className={cn('order-form__price')}
                  />
                </Form.Item>
              </Col>
              <Col xs={6} md={4}>
                <Form.Item label="Скидка">
                  <Badge
                    count={`${saleCount} %`}
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
                    onChange={handleQtyChange}
                    formatter={(value: number | undefined) => priceFormat(value)}
                    className={cn('order-form__price')}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item label="Сумма">
                  <Alert
                    message={`${priceFormat(totalPrice)} сум`}
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
