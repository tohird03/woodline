import {IPagination} from '../types';

export interface IClientsInfo {
  id: string;
  name: string;
  phone: string;
}

export interface IGetClientsInfoParams extends IPagination {
  search?: string;
  debt?: number;
}

export interface IAddClientInfo {
  id?: string;
  name: string;
  phone: string;
}
