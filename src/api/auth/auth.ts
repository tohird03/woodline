import {AxiosResponse} from 'axios';
import {Endpoints, umsStages} from '../endpoints';
import {INetworkConfig, Instance} from '../instance';
import {ILoginForm, ILoginResponse} from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class AuthApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getSignIn = (params: ILoginForm): Promise<AxiosResponse<ILoginResponse>> =>
    this.post(Endpoints.SignIn, params);

  getUserProfile = (): Promise<any> =>
    this.get(Endpoints.UserProfile);

  refreshToken = (refreshToken: string): Promise<AxiosResponse> =>
    this.post(Endpoints.RefreshToken, {refreshToken});
}

export const authApi = new AuthApi(config);
