import { IProduct } from "../products/types";
import { IStorehouse } from "../storehouse/type";
import { IPagination } from "../types";

export interface ISelling {
  id: string;
  createdAt: string;
  storehouse: IStorehouse;
  orderProduct: {
    quantity: number;
    sps: {
      sp: {
        product: IProduct;
      }
    }
  }
}

export interface IGetSellingParams extends IPagination {

}
