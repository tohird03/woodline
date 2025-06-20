import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import {IResponse} from '../types';
import { IGetInventoryParams, IInventory } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class InventoryApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getInventory = (params: IGetInventoryParams): Promise<IResponse<IInventory[]>> =>
    this.get(Endpoints.InventoryMany, {params});

  // addStorehouse = (params: IAddEditStorehouse): Promise<AxiosResponse> =>
  //   this.post(Endpoints.StorehouseOne, params);

  // updateStorehouse = (params: IAddEditStorehouse): Promise<AxiosResponse> =>
  //   this.patch(`${Endpoints.StorehouseOne}`, params, {params: {id: params?.id}});

  // deleteStorehouse = (id: string): Promise<AxiosResponse> =>
  //   this.delete(`${Endpoints.StorehouseOne}`, {params: {id}});
}

export const inventoryApi = new InventoryApi(config);
