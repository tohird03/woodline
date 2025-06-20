import { IPagination } from "../types";

export interface IGetInventoryParams extends IPagination {
  type?: IInventoryStatus;
}

export interface IInventory {
  type: IInventoryStatus;
}

export enum IInventoryStatus {
  TRANSFER = 'transfer',
  PURCHASE = 'purchase',
  SELLING = 'selling',
}
