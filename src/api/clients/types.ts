import {IPagination} from '../types';

export interface IClientsInfo {
  id: string;
  fullname: string;
  phone: string;
  actionIds: string[];
}

export interface IGetClientsInfoParams extends IPagination {
  search?: string;
  debt?: number;
}

export interface IAddClientInfo {
  id?: string;
  fullname: string;
  phone: string;
  password: string;
  actionsToConnect: string[];
}

export interface IUpdateClient {
  id?: string;
  fullname: string;
  phone: string;
  password: string;
  actionsToConnect: string[];
  actionsToDisconnect: string[];
}
