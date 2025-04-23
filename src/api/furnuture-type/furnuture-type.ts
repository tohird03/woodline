import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import {IPagination, IResponse} from '../types';
import {IAddEditFurnutureType, IFurnutureType} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class FurnutureTypeApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getFurnutureType = (params: IPagination): Promise<IResponse<IFurnutureType[]>> =>
    this.get(Endpoints.FurnutureTypeMany, {params});

  addFurnutureType = (params: IAddEditFurnutureType): Promise<AxiosResponse> =>
    this.post(Endpoints.FurnutureTypeOne, params);

  updateFurnutureType = (params: IAddEditFurnutureType): Promise<AxiosResponse> =>
    this.patch(`${Endpoints.FurnutureTypeOne}`, params, {params: {id: params?.id}});

  deleteFurnutureType = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.FurnutureTypeOne}`, {params: {id}});
}

export const furnutureTypeApi = new FurnutureTypeApi(config);
