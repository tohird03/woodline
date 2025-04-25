import { IClientsInfo } from '../clients';
import { IFurnutureType } from '../furnuture-type/types';
import {IPagination} from '../types';

export interface IModel {
  id: string;
  name: string;
  provider: IClientsInfo;
  furnitureType: IFurnutureType;
}

export interface IGetModel {
  count: number;
  modelList: IModel[];
}

export interface IModelParams extends IPagination {
  name: string;
  categoryId?: string;
}

export interface IAddModel {
  id?: string;
  name: string;
  furnitureTypeId: string;
  partnerId: string;
}
