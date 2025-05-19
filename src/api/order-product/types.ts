import { IModel } from '../model/types';
import { ICartProducts } from '../order/types';

export enum IOrderProductStatus {
  NEW = 'new',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
}

export interface IOrderProduct {
  id: string;
  publicId: string;
  quantity: number;
  sale: number;
  tissue: string;
  totalSum: number;
  model: IModel;
  description: string;
  price: string;
  priceWithSale: number;
  direction: string;
  status: IOrderProductStatus;
  createdAt: string;
}
