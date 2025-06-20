import { IProduct } from "../products/types";
import { IStorehouse } from "../storehouse/type";
import { IPagination } from "../types";
import { IUser } from "../users/types";

export interface IPurchase {
  id: string;
  status: string;
  createdAt: string;
  provider: IUser;
  storehouse: IStorehouse;
  productMVs: IPurchaseProductMvs[];
}

export interface IPurchaseProductMvs {
  product: IProduct;
  statuses: [
    {
      id: string;
      quantity: number;
      status: "active" | "defected";
    },
    {
      id: string;
      quantity: number;
      status: "active" | "defected";
    },
  ];
}

export interface IGetPurchaseParams extends IPagination {

}

export interface IAddEditPurchase {
  storehouseId: string;
  providerId: string;
  productMVs: IPurchaseProduct[];
}

export interface IPurchaseProduct {
  id: string;
  status: 'active' | 'defected',
  quantity: number;
}
