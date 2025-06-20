import { IProduct } from "../products/types";
import { IStorehouse } from "../storehouse/type";
import { IPagination } from "../types";

export interface IGetSpsProductParams extends IPagination {

}

export interface ISpsProduct {
  id: string;
  status: string;
  quantity: string;
  sp: {
    product: IProduct;
    storehouse: IStorehouse;
  }
}
