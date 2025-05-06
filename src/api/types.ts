export interface IResponse<TBody, TTotalCalc = any> {
  data: {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    data: TBody;
  };
  calc?: TTotalCalc;
}

export interface IResponseSingle<TBody> {
  data: TBody;
}

export interface IOneElement {
  id: string;
  name: string;
}

export interface ISuccessResponse {
  success: boolean;
}

export interface IPagination {
  pageNumber?: number;
  pageSize?: number;
  pagination?: boolean;
  description?: string;
}

export type TStage = {
  apiUrl: string;
  cdnHost?: string;
};

export interface IPayment extends IPaymentType {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalPay: number;
}

export interface IPaymentType {
  card: number;
  cash: number;
  other: number;
  description: string;
}

export interface SelectOptionType {
  value: string;
  label: string;
};
