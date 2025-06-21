import { ERoleName, IRole } from "../role";
import { IPagination } from "../types";

export interface IUser {
  id: string;
  fullname: string;
  phone: string;
  actionIds: string[];
  roles: IRole[];
  source: string;
  balance: number;
}

export interface IGetUsersParams extends IPagination {
  search?: string;
  roleNames: ERoleName[];
}

export interface IUpdateUser {
  id?: string;
  fullname: string;
  phone: string;
  password: string;
  actionsToConnect: string[];
  actionsToDisconnect: string[];
  rolesToConnect: string[];
  rolesToDisconnect: string[];
}

export interface IAddUser {
  id?: string;
  fullname: string;
  phone: string;
  password: string;
  actionsToConnect: string[];
  rolesToConnect: string[];
}
