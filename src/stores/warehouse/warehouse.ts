import {makeAutoObservable} from 'mobx';
import {addNotification} from '@/utils';
import { IGetStorehouseParams, IStorehouse } from '@/api/storehouse/type';
import { storehouseApi } from '@/api/storehouse';

class WarehouseStores {
  pageNumber = 1;
  pageSize = 10;
  search: string | null = null;
  singleWarehouse: IStorehouse | null = null;
  isOpenWarehouseModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  getWarehouses = (params: IGetStorehouseParams) =>
    storehouseApi.getStorehouses(params)
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

  setSingleWarehouse = (singleWarehouse: IStorehouse | null) => {
    this.singleWarehouse = singleWarehouse;
  };

  setIsOpenWarehouseModal = (isOpen: boolean) => {
    this.isOpenWarehouseModal = isOpen;
  };

  reset() {
  }
}

export const warehouseStores = new WarehouseStores();
