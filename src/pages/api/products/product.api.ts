import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from '@pages/api/base.api';

export class ProductApi extends BaseApi {
  constructor(request: APIRequestContext, baseUrl?: string) {
    super(request, baseUrl);
  }

  async getAllProducts(): Promise<APIResponse> {
    return await this.get('/productsList');
  }

  async postToAllProducts(): Promise<APIResponse> {
    return await this.post('/productsList');
  }

  async getAllBrands(): Promise<APIResponse> {
    return await this.get('/brandsList');
  }

  async putToAllBrands(): Promise<APIResponse> {
    return await this.put('/brandsList');
  }

  async searchProduct(keyword?: string): Promise<APIResponse> {
    if (keyword !== undefined) {
      return await this.post('/searchProduct', { search_product: keyword });
    }
    return await this.post('/searchProduct');
  }
}
