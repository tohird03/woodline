import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import {IResponse} from '../types';
import { IAddEditStorehouse, IGetStorehouseParams, IStorehouse } from './type';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class StorehouseApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getStorehouses = (params: IGetStorehouseParams): Promise<IResponse<IStorehouse[]>> =>
    this.get(Endpoints.StorehouseMany, {params});

  addStorehouse = (params: IAddEditStorehouse): Promise<AxiosResponse> =>
    this.post(Endpoints.StorehouseOne, params);

  updateStorehouse = (params: IAddEditStorehouse): Promise<AxiosResponse> =>
    this.patch(`${Endpoints.StorehouseOne}`, params, {params: {id: params?.id}});

  deleteStorehouse = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.StorehouseOne}`, {params: {id}});
}

export const storehouseApi = new StorehouseApi(config);
