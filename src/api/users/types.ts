import { IPagination } from "../types";

export interface IUser {
  id: string;
  fullname: string;
  phone: string;
  source: string;
  balance: number;
}

export interface IGetUsersParams extends IPagination {
  search?: string;
}

export interface IUpdateUser {
  id?: string;
  fullname: string;
  phone: string;
  password: string;
}

export interface IAddUser {
  id?: string;
  fullname: string;
  phone: string;
  password: string;
}
