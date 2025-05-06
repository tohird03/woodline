import { IClientsInfo } from '../clients';
import { IPagination } from '../types';

export interface IGenerateId {
  data: {
    id: string;
  };
}

export interface IAddProductToCart {
  description: string;
  direction: string;
  modelId: string;
  price: number;
  priceWithSale: number;
  publicId: string;
  quantity: number;
  sale: number;
  staffId: string;
  tissue: string;
  totalSum: number;
}

export interface ICartProducts {
  publicId: string;
  quantity: number;
  sale: number;
  tissue: string;
  totalSum: number;
}

export interface ICartOrderClient {
  clientId: string;
  deliveryDate: string;
  deliveryAddress: string;
  whereFrom: string;
}

export interface ICartOrderPayment {
  description: string;
  sum: number;
  totalSum: number;
  exchangeRate: number;
  fromCurrency: string;
  method: string;
}

export interface ICreateOrder {
  deliveryAddress: string;
  deliveryDate: string;
  clientId: string;
  products: ICartProducts[];
  payments: ICartOrderPayment[];
}

export interface IOrder {
  payments: ICartOrderPayment;
  client: IClientsInfo;
  status: IOrderStatus;
}

export enum IOrderStatus {
  NEW = 'new',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
}

export interface IGetOrderParams extends IPagination {
  staffId?: string;
}
