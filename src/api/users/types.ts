import { ERoleName } from "../role";
import { IPagination } from "../types";

export interface IUser {
  id: string;
  fullname: string;
  phone: string;
}

export interface IGetUsersParams extends IPagination {
  search?: string;
  roleNames: ERoleName[];
}
