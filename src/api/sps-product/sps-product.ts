import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import {IResponse} from '../types';
import { IGetSpsProductParams, ISpsProduct } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class SpsProductApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getSpsProduct = (params: IGetSpsProductParams): Promise<IResponse<ISpsProduct[]>> =>
    this.get(Endpoints.SpsProductMany, {params});

  // addFurnutureType = (params: IAddEditFurnutureType): Promise<AxiosResponse> =>
  //   this.post(Endpoints.FurnutureTypeOne, params);

  // updateFurnutureType = (params: IAddEditFurnutureType): Promise<AxiosResponse> =>
  //   this.patch(`${Endpoints.FurnutureTypeOne}`, params, {params: {id: params?.id}});

  // deleteFurnutureType = (id: string): Promise<AxiosResponse> =>
  //   this.delete(`${Endpoints.FurnutureTypeOne}`, {params: {id}});
}

export const spsProductApi = new SpsProductApi(config);
