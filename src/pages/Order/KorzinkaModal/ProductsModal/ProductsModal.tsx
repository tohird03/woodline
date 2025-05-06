import React from 'react';
import { DataTable } from '@/components/Datatable/datatable';
import { orderStore } from '@/stores/order';
import { useMediaQuery } from '@/utils/mediaQuery';
import { Modal } from 'antd';
import { observer } from 'mobx-react';
import { corzinkaProductModal } from './constants';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '@/api/order';

export const CorzinaProductsModal = observer(() => {
  const isMobile = useMediaQuery('(max-width: 650px)');

  const { data: cartProducts } = useQuery({
    queryKey: ['getCartProducts'],
    queryFn: () =>
      orderApi.getCartProducts(),
  });

  const handleCloseModal = () => {
    orderStore.setIsOpenCorzinaProductModal(false);
  };

  const handleSaveModalOk = () => {
    orderStore.setIsOpenCorzinaClientModal(true);
    orderStore.setIsOpenCorzinaProductModal(false);
  };

  return (
    <Modal
      open={orderStore.isOpenCorzinaProductModal}
      onCancel={handleCloseModal}
      title="Корзинка"
      onOk={handleSaveModalOk}
      okText="Следующий"
      cancelText="Закрывать"
      style={{ top: 0, padding: '15px' }}
      bodyStyle={{
        height: '85vh',
        overflow: 'auto',
      }}
      width="100vw"
    >
      <DataTable
        isMobile={isMobile}
        columns={corzinkaProductModal}
        data={cartProducts?.data?.data || []}
      />
    </Modal>
  );
});
