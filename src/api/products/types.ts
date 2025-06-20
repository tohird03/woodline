import { IModel } from "../model/types";
import { IStorehouse } from "../storehouse/type";
import { IPagination } from "../types";

export interface IProduct {
  id: string;
  model: IModel;
  publicId: string;
  quantity: number;
  description: string;
  direction: string;
  tissue: string;
  storehouse: IStorehouse;
}

export interface IGetProductParams extends IPagination {
  search?: string;
}
