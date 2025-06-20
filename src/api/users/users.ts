import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import { IGetUsersParams, IUser } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class UsersApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getUsers = (params: IGetUsersParams): Promise<IResponse<IUser[]>> =>
    this.get(Endpoints.UsersMany, {
      params,
      paramsSerializer: {
        indexes: null,
      },
    });

  // getOnlyProviders = (params: IGetClientsInfoParams): Promise<IResponse<IClientsInfo[]>> =>
  //   this.get(Endpoints.Provider, {params});

  // addClients = (params: IAddClientInfo): Promise<AxiosResponse> =>
  //   this.post(Endpoints.ClientsOne, params);

  // updateClient = (params: IUpdateClient): Promise<AxiosResponse> =>
  //   this.patch(`${Endpoints.ClientsOne}`, params, {params: {id: params?.id}});

  // deleteClient = (id: string): Promise<AxiosResponse> =>
  //   this.delete(`${Endpoints.ClientsOne}`, {params: {id}});
}

export const usersApi = new UsersApi(config);
