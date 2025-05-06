import { IClientsInfo } from '../clients';
import { IModel } from '../model/types';
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
  tissue: string;
  totalSum: number;
}

export interface ICartProducts {
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
}

export interface ICartOrderClient {
  client: any;
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
  method: EOrderPaymentType;
}

export interface ICreateOrder {
  deliveryAddress: string;
  deliveryDate: string;
  clientId: string;
  products: ICartProducts[];
  payments: ICartOrderPayment[];
}

export interface IOrder {
  id: string;
  payments: ICartOrderPayment[];
  products: ICartProducts[];
  client: IClientsInfo;
  status: IOrderStatus;
  deliveryDate: string;
}

export enum IOrderStatus {
  NEW = 'new',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
}

export interface IGetOrderParams extends IPagination {
  staffId?: string;
}

export enum EOrderPaymentType {
  CASH_WITH_RECEIPT = 'cash_with_receipt',
  CASH_WITHOUT_RECEIPT='cash_without_receipt',
  CARD_PAYME='card_payme',
  CARD_UZUM='card_uzum',
  CARD_ANOR='card_anor',
  CARD_SOLFY='card_solfy',
  CARD_ZOODPAY='card_zoodpay',
  CARD_TO_CARD='card_to_card',
  TRANSFER='transfer',
  TERMINAL='terminal',
}
