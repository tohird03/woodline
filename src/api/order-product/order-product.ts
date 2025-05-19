import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import { IOrderProduct } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class OrderProductsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getOrderProducts = (): Promise<IResponse<IOrderProduct[]>> =>
    this.get(Endpoints.CartManyMy);
}

export const orderProductsApi = new OrderProductsApi(config);
