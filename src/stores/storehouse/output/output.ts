import { makeAutoObservable } from 'mobx';
import { addNotification } from '@/utils';
import { IGetPurchaseParams, IPurchase } from '@/api/purchase/types';
import { sellingApi } from '@/api/selling/selling';

class OutputStore {
  pageNumber = 1;
  pageSize = 10;
  search: string | null = null;
  selling: IPurchase | null = null;
  isOpenAddEditSellingModal = false;
  isOpenShowSellingProductsModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  getSelling = (params: IGetPurchaseParams) =>
    sellingApi.getSellings(params)
      .then(res => res)
      .catch(addNotification);

  setPageNumber = (page: number) => {
    this.pageNumber = page;
  };

  setPageSize = (limit: number) => {
    this.pageSize = limit;
  };

  setSearch = (search: string) => {
    this.search = search;
  };

  setSelling = (Selling: IPurchase | null) => {
    this.selling = Selling;
  };

  setIsOpenAddEditSellingModal = (isOpen: boolean) => {
    this.isOpenAddEditSellingModal = isOpen;
  };

  setIsOpenShowSellingProductsModal = (isOpenShowSellingProductsModal: boolean) => {
    this.isOpenShowSellingProductsModal = isOpenShowSellingProductsModal;
  };

  reset() {
  }
}

export const outputStore = new OutputStore();
