import { IPagination } from '../types';

export interface IGetStorehouseParams extends IPagination {
  type: IStorehouseType;
  name?: string;
}

export interface IStorehouse {
  id: string;
  name: string;
  type: IStorehouseType;
}

export enum IStorehouseType {
  SHOWROOM = 'showroom',
  WAREHOUSE = 'warehouse',
}

export interface IAddEditStorehouse {
  id?: string;
  name: string;
  type: IStorehouseType;
}
