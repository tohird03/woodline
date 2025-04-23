import {makeAutoObservable} from 'mobx';
import {furnutureTypeApi} from '@/api/furnuture-type/furnuture-type';
import {IPagination} from '@/api/types';
import {addNotification} from '@/utils';
import { IFurnutureType } from '@/api/furnuture-type/types';

class FurnutureTypeStore {
  pageNumber = 1;
  pageSize = 10;
  search: string | null = null;
  singleFurnutureType: IFurnutureType | null = null;
  isOpenAddNewTypeModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  getFurnutureType = (params: IPagination) =>
    furnutureTypeApi.getFurnutureType(params)
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

  setSingleFurnutureType = (singleFurnutureType: IFurnutureType | null) => {
    this.singleFurnutureType = singleFurnutureType;
  };

  setIsOpenNewTypeModal = (isOpen: boolean) => {
    this.isOpenAddNewTypeModal = isOpen;
  };

  reset() {
  }
}

export const furnutureTypeStore = new FurnutureTypeStore();
