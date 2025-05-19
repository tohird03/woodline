import { orderProductsApi } from '@/api/order-product';
import { addNotification } from '@/utils';
import {makeAutoObservable} from 'mobx';

class ProducerStore {
  pageNumber = 1;
  pageSize = 10;

  constructor() {
    makeAutoObservable(this);
  }

  getOrderProducts = () =>
    orderProductsApi.getOrderProducts()
      .then(res => res)
      .catch(addNotification);

  setPageNumber = (page: number) => {
    this.pageNumber = page;
  };

  setPageSize = (limit: number) => {
    this.pageSize = limit;
  };

  reset() {
  }
}

export const producerStore = new ProducerStore();
