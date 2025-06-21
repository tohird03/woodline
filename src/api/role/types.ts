export interface IRole {
  name: string;
  actions: IPermission[];
}

export interface IPermission {
  id: string;
  name: string;
  method: 'get' | 'post' | 'patch' | 'delete';
  description: string;
  url: string;
}

export enum ERoleName {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  CLIENT = 'client',
  SELLER = 'seller',
  STOREKEEPER = 'storekeeper',
}
