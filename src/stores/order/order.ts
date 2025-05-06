import { ICartOrderPayment, IOrder } from '@/api/order/types';
import {makeAutoObservable} from 'mobx';

class OrderStore {
  isOpenCorzinaProductModal = false;
  isOpenCorzinkaClientModal = false;
  isOpenCorzinaPaymentModal = false;
  isOpenCheckUpAndCreateModal = false;
  singleOrderInfo: IOrder | null = null;
  payments: ICartOrderPayment[] = [];

  constructor() {
    makeAutoObservable(this);
  }

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

  reset() {
  }
}

export const orderStore = new OrderStore();
