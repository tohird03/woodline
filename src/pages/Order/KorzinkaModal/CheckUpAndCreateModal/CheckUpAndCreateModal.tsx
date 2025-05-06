import React, { useEffect, useState } from 'react';
import { orderStore } from '@/stores/order';
import { Modal, Typography, notification } from 'antd';
import { observer } from 'mobx-react';
import { ICartOrderClient, ICartOrderPayment, ICreateOrder } from '@/api/order/types';
import dayjs from 'dayjs';
import { DataTable } from '@/components/Datatable/datatable';
import { checkUpClientInfoColumns, checkUpPrePaymentColumn, checkUpProductsColumn } from './constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api/order';
import { addNotification } from '@/utils';

export const CheckUpAndCreateModal = observer(() => {
  const [checkUpUserInfo, setCheckUpUserInfo] = useState<ICartOrderClient | null>(null);
  const [payments, setPayments] = useState<ICartOrderPayment[]>([]);

  const { data: cartProducts } = useQuery({
    queryKey: ['getCartProducts'],
    queryFn: () =>
      orderApi.getCartProducts(),
  });

  const handleCloseModal = () => {
    orderStore.setIsOpenCorzinaPaymentModal(true);
    orderStore.setIsOpenCheckUpAndCreateModal(false);
  };

  const { mutate: createOrder, isPending: addLoading } =
    useMutation({
      mutationKey: ['createOrder'],
      mutationFn: (params: ICreateOrder) => orderApi.createOrder(params),
      onSuccess: () => {
        handleCloseModal();
      },
      onError: addNotification,

    });

  const handleSaveModalOk = () => {
    if (checkUpUserInfo) {
      createOrder({
        ...checkUpUserInfo,
        products: cartProducts?.data?.data!,
        payments,
      });
    }

  };

  useEffect(() => {
    const clientData = localStorage.getItem('orderClient');
    const paymentsData = localStorage.getItem('corzinkaPayments');

    if (clientData) {
      const parsed = JSON.parse(clientData);

      setCheckUpUserInfo(parsed);
    }

    if (paymentsData) {
      setPayments(JSON.parse(paymentsData));
    }
  }, []);

  return (
    <Modal
      open={orderStore.isOpenCheckUpAndCreateModal}
      onCancel={handleCloseModal}
      title="Проверьте"
      onOk={handleSaveModalOk}
      okText="Оформить"
      cancelText="Назад"
    >
      <div>
        <Typography.Title level={3}>Данные о клиенте</Typography.Title>
        <DataTable
          isMobile
          data={checkUpUserInfo ? [checkUpUserInfo] : []}
          columns={checkUpClientInfoColumns}
        />
      </div>
      <div>
        <Typography.Title level={3}>Данные о заказе</Typography.Title>
        <DataTable
          isMobile
          data={cartProducts?.data?.data || []}
          columns={checkUpProductsColumn}
        />
      </div>
      <div>
        <Typography.Title level={3}>Предоплата</Typography.Title>
        <DataTable
          isMobile
          data={payments || []}
          columns={checkUpPrePaymentColumn}
        />
      </div>
    </Modal>
  );
});
