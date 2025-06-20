import { makeAutoObservable } from 'mobx';
import { addNotification } from '@/utils';
import { inventoryApi } from '@/api/inventory/inventory';
import { IGetInventoryParams, IInventory } from '@/api/inventory/types';
import { IGetPurchaseParams, IPurchase } from '@/api/purchase/types';
import { purchaseApi } from '@/api/purchase/purchase';

class IncomeStores {
  pageNumber = 1;
  pageSize = 10;
  search: string | null = null;
  income: IPurchase | null = null;
  isOpenAddEditIncomeModal = false;
  isOpenShowIncomeProductsModal = false;

  constructor() {
    makeAutoObservable(this);
  }

  getPurchaseIncome = (params: IGetPurchaseParams) =>
    purchaseApi.getPurchase(params)
      .then(res => res)
      .catch(addNotification);

  setPageNumber = (page: number) => {
    this.pageNumber = page;
  };

  setPageSize = (limit: number) => {
    this.pageSize = limit;
  };

  setSearch = (search: string) => {
    this.search = search;
  };

  setIncome = (income: IPurchase | null) => {
    this.income = income;
  };

  setIsOpenAddEditIncomeModal = (isOpen: boolean) => {
    this.isOpenAddEditIncomeModal = isOpen;
  };

  setIsOpenShowIncomeProductsModal = (isOpenShowIncomeProductsModal: boolean) => {
    this.isOpenShowIncomeProductsModal = isOpenShowIncomeProductsModal;
  };

  reset() {
  }
}

export const incomeStores = new IncomeStores();
