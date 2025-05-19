import {makeAutoObservable} from 'mobx';
import {addNotification} from '@/utils';
import { IGetStorehouseParams, IStorehouse } from '@/api/storehouse/type';
import { storehouseApi } from '@/api/storehouse';

class ShowroomStores {
  pageNumber = 1;
  pageSize = 10;
  search: string | null = null;
  singleShowroom: IStorehouse | null = null;
  isOpenAddEditShowroomModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  getShowrooms = (params: IGetStorehouseParams) =>
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

  setSingleShowroom = (singleShowroom: IStorehouse | null) => {
    this.singleShowroom = singleShowroom;
  };

  setIsOpenShowroomModal = (isOpen: boolean) => {
    this.isOpenAddEditShowroomModal = isOpen;
  };

  reset() {
  }
}

export const showroomStores = new ShowroomStores();
