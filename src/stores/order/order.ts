import { ICartOrderPayment, IOrder } from '@/api/order/types';
import { spsProductApi } from '@/api/sps-product/sps-product';
import { IGetSpsProductParams } from '@/api/sps-product/types';
import { addNotification } from '@/utils';
import { makeAutoObservable } from 'mobx';

class OrderStore {
  isOpenCorzinaProductModal = false;
  isOpenCorzinkaClientModal = false;
  isOpenCorzinaPaymentModal = false;
  isOpenCheckUpAndCreateModal = false;
  singleOrderInfo: IOrder | null = null;
  payments: ICartOrderPayment[] = [];
  fromShowroomProductPage = 1;
  fromShowroomProductPageSize = 10;

  constructor() {
    makeAutoObservable(this);
  }

  getSpsProduct = (params: IGetSpsProductParams) =>
    spsProductApi.getSpsProduct(params)
      .then(res => res)
      .catch(addNotification);

  setIsOpenCorzinaProductModal = (isOpenCorzinaProductModal: boolean) => {
    this.isOpenCorzinaProductModal = isOpenCorzinaProductModal;
  };

  setIsOpenCorzinaClientModal = (isOpenCorzinkaClientModal: boolean) => {
    this.isOpenCorzinkaClientModal = isOpenCorzinkaClientModal;
  };

  setIsOpenCorzinaPaymentModal = (isOpenCorzinaPaymentModal: boolean) => {
    this.isOpenCorzinaPaymentModal = isOpenCorzinaPaymentModal;
  };

  setIsOpenCheckUpAndCreateModal = (isOpenCheckUpAndCreateModal: boolean) => {
    this.isOpenCheckUpAndCreateModal = isOpenCheckUpAndCreateModal;
  };

  setSingleOrderInfo = (singleOrderInfo: IOrder | null) => {
    this.singleOrderInfo = singleOrderInfo;
  };

  setPayments = (payments: ICartOrderPayment[]) => {
    this.payments = payments;
  };

  setFromShowroomProductPage = (fromShowroomProductPage: number) => {
    this.fromShowroomProductPage = fromShowroomProductPage;
  };

  setFromShowroomProductPageSize = (fromShowroomProductPageSize: number) => {
    this.fromShowroomProductPageSize = fromShowroomProductPageSize;
  };

  reset() {
  }
}

export const orderStore = new OrderStore();
