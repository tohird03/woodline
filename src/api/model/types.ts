import { IFurnutureType } from '../furnuture-type/types';
import {IPagination} from '../types';
import { IUser } from '../users/types';

export interface IModel {
  id: string;
  name: string;
  provider: IUser;
  furnitureType: IFurnutureType;
}

export interface IGetModel {
  count: number;
  modelList: IModel[];
}

export interface IModelParams extends IPagination {
  name?: string;
  categoryId?: string;
  furnitureTypeId?: string;
}

export interface IAddModel {
  id?: string;
  name: string;
  furnitureTypeId: string;
  partnerId: string;
}
