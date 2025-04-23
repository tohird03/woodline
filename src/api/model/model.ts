import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import {IAddModel, IGetModel, IModel, IModelParams} from './types';
import { IResponse } from '../types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class ModelApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getModels = (params: IModelParams): Promise<IResponse<IModel[]>> =>
    this.get(Endpoints.ModelMany, {params});

  addModel = (params: IAddModel): Promise<AxiosResponse> =>
    this.post(Endpoints.ModelOne, params);

  updateModel = (params: IAddModel): Promise<AxiosResponse> =>
    this.patch(`${Endpoints.ModelOne}/${params?.id}`, params);

  deleteModel = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.ModelOne}/${id}`);

}

export const modelApi = new ModelApi(config);
