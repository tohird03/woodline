export interface IPemissions {
  id: string;
  key: IStaffPerKey;
  name: string;
}

export type ChangePasswordFormType = {
  currentPassword: string;
  newPassword: string;
};

export enum IStaffPerKey {
  GET_STATISTIC = 'page_statistic',
  GET_PRODUCTS = 'page_products',
  GET_ORDER = 'page_orders',
  GET_INCOME_ORDERS = 'page_incomeorders',
  GET_CLIENTS = 'page_clients',
  GET_PAYMENTS = 'page_payments',
  GET_SUPPLIERS = 'page_supplier',
  GET_STAFFS = 'page_staffs',
  GET_STAFFS_PAYMENTS = 'page_staffs_payments',
  GET_STAFFS_EXPENSES = 'page_staffs_expenses',
}
