import {makeAutoObservable} from 'mobx';
import {addNotification} from '@/utils';
import { usersApi } from '@/api/users/users';
import { IGetUsersParams, IUser } from '@/api/users/types';

class Staffs {
  pageNumber = 1;
  pageSize = 20;
  search: string | null = null;
  isOpenAddEditStaffModal = false;
  singleStaff: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  getStaffs = (params: IGetUsersParams) =>
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

  setIsOpenAddEditStaffModal = (isOpenAddEditStaffModal: boolean) => {
    this.isOpenAddEditStaffModal = isOpenAddEditStaffModal;
  };

  setSingleStaff = (singleStaff: IUser | null) => {
    this.singleStaff = singleStaff;
  };

  reset = () => {
    this.pageNumber = 1;
    this.pageSize = 10;
    this.search = null;
    this.isOpenAddEditStaffModal = false;
  };
}

export const staffsStore = new Staffs();
