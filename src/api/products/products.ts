import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import { IResponse } from '../types';
import { IGetProductParams, IProduct } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class ProductsApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getProducts = (params: IGetProductParams): Promise<IResponse<IProduct[]>> =>
    this.get(Endpoints.ProductMany, {params});

  // addModel = (params: IAddModel): Promise<AxiosResponse> =>
  //   this.post(Endpoints.ModelOne, params);

  // updateModel = (params: IAddModel): Promise<AxiosResponse> =>
  //   this.patch(`${Endpoints.ModelOne}`, params, {params: {id: params?.id}});

  // deleteModel = (id: string): Promise<AxiosResponse> =>
  //   this.delete(`${Endpoints.ModelOne}`, {params: {id}});

}

export const productsApi = new ProductsApi(config);
