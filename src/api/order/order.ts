import { AxiosResponse } from 'axios';
import { Endpoints, umsStages } from '../endpoints';
import { INetworkConfig, Instance } from '../instance';
import { IResponse } from '../types';
import { IAddProductToCart, IGenerateId, ICartProducts, IOrder, IGetOrderParams, ICreateOrder } from './types';

const config: INetworkConfig = {
  baseURL: Endpoints.Base,
  stageUrl: umsStages.apiUrl,
};

class OrderApi extends Instance {
  constructor(config: INetworkConfig) {
    super(config);
  }

  getOrderGenerateId = (): Promise<IGenerateId> =>
    this.get(Endpoints.GenerateOrderId);

  addProductToCart = (params: IAddProductToCart): Promise<AxiosResponse> =>
    this.post(Endpoints.CartOne, params);

  createOrder = (params: ICreateOrder): Promise<AxiosResponse> =>
    this.post(Endpoints.OrderCreate, params);

  getCartProducts = (): Promise<IResponse<ICartProducts[]>> =>
    this.get(Endpoints.CartManyMy);

  deleteCartProduct = (id: string): Promise<AxiosResponse> =>
    this.delete(`${Endpoints.CartOne}`, { params: { id } });

  getOrders = (params: IGetOrderParams): Promise<IResponse<IOrder[]>> =>
    this.get(Endpoints.OrderMany);

  getSingleOrder = (orderId: string): Promise<{ data: IOrder }> =>
    this.get(Endpoints.OrderOne, { params: { id: orderId } });


  // updateModel = (params: IAddModel): Promise<AxiosResponse> =>
  //   this.patch(`${Endpoints.ModelOne}`, params, {params: {id: params?.id}});

}

export const orderApi = new OrderApi(config);
