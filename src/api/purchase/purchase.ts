import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import { IAddEditPurchase, IGetPurchaseParams, IPurchase } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class PurchaseApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getPurchase = (params: IGetPurchaseParams): Promise<IResponse<IPurchase[]>> =>
    this.get(Endpoints.PurchaseMany, {params});

  // getOnlyProviders = (params: IGetClientsInfoParams): Promise<IResponse<IClientsInfo[]>> =>
  //   this.get(Endpoints.Provider, {params});

  addPurchase = (params: IAddEditPurchase): Promise<AxiosResponse> =>
    this.post(Endpoints.PurchaseOne, params);

  // updateClient = (params: IUpdateClient): Promise<AxiosResponse> =>
  //   this.patch(`${Endpoints.ClientsOne}`, params, {params: {id: params?.id}});

  // deleteClient = (id: string): Promise<AxiosResponse> =>
  //   this.delete(`${Endpoints.ClientsOne}`, {params: {id}});

  // //
  // getSingleClient = (clientId: string): Promise<AxiosResponse<IClientsInfo>> =>
  //   this.get(`${Endpoints.ClientsOne}`, {params: {id: clientId}});
}

export const purchaseApi = new PurchaseApi(config);
