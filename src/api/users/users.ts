import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import { IAddUser, IGetUsersParams, IUpdateUser, IUser } from './types';

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

  addUsers = (params: IAddUser): Promise<AxiosResponse> =>
    this.post(Endpoints.UserOne, params);

  updateUsers = (params: IUpdateUser): Promise<AxiosResponse> =>
    this.patch(`${Endpoints.UserOne}`, params, { params: { id: params?.id } });

  deleteUser = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.UserOne}`, { params: { id } });

  getSingleUser = (id: string): Promise<AxiosResponse<IUser>> =>
    this.get(`${Endpoints.UserOne}`, { params: { id } });
}

export const usersApi = new UsersApi(config);
