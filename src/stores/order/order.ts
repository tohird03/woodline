import {makeAutoObservable} from 'mobx';

class OrderStore {
  isOpenCorzinaProductModal = false;
  isOpenCorzinkaClientModal = false;
  isOpenCorzinaPaymentModal = false;
  isOpenCheckUpAndCreateModal = false;

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

  reset() {
  }
}

export const orderStore = new OrderStore();
