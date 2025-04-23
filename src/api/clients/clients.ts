import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import {
  IAddClientInfo,
  IClientsInfo,
  IGetClientsInfoParams,
} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class ClientsInfoApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getClientsInfo = (params: IGetClientsInfoParams): Promise<IResponse<IClientsInfo[]>> =>
    this.get(Endpoints.ClientsMany, {params});

  addClients = (params: IAddClientInfo): Promise<AxiosResponse> =>
    this.post(Endpoints.ClientsOne, params);

  updateClient = (params: IAddClientInfo): Promise<AxiosResponse> =>
    this.patch(`${Endpoints.ClientsOne}`, params, {params: {id: params?.id}});

  deleteClient = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.ClientsOne}`, {params: {id}});

  //
  getSingleClient = (clientId: string): Promise<IClientsInfo> =>
    this.get(`${Endpoints.ClientsOne}/${clientId}`);
}

export const clientsInfoApi = new ClientsInfoApi(config);
