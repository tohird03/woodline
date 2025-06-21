import {makeAutoObservable} from 'mobx';
import {clientsInfoApi, IClientsInfo, IGetClientsInfoParams} from '@/api/clients';
import {addNotification} from '@/utils';
import { usersApi } from '@/api/users/users';
import { IGetUsersParams, IUser } from '@/api/users/types';

class ClientsInfoStore {
  pageNumber = 1;
  pageSize = 100;
  search: string | null = null;
  debt: number | null = null;
  isOpenAddEditClientModal = false;
  singleClientInfo: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getClients = (params: IGetUsersParams) =>
    usersApi.getUsers(params)
      .then(res => res)
      .catch(addNotification);

  setPageNumber = (pageNumber: number) => {
    this.pageNumber = pageNumber;
  };

  setPageSize = (pageSize: number) => {
    this.pageSize = pageSize;
  };

  setSearch = (search: string | null) => {
    this.search = search;
  };

  setDebt = (debt: number | null) => {
    this.debt = debt;
  };

  setIsOpenAddEditClientModal = (isOpenAddEditClientModal: boolean) => {
    this.isOpenAddEditClientModal = isOpenAddEditClientModal;
  };

  setSingleClientInfo = (singleClientInfo: IUser | null) => {
    this.singleClientInfo = singleClientInfo;
  };

  reset() {
    this.pageNumber = 1;
    this.pageSize = 100;
    this.search = null;
  }
}

export const clientsInfoStore = new ClientsInfoStore();
