import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from '@pages/api/base.api';
import { RegisterUserData } from '@utils/test-data.generator';

export class AuthApi extends BaseApi {
  constructor(request: APIRequestContext, baseUrl?: string) {
    super(request, baseUrl);
  }

  async verifyLogin(params?: { email?: string; password?: string }): Promise<APIResponse> {
    return await this.post('/verifyLogin', params);
  }

  async verifyLoginWithMethod(method: 'DELETE'): Promise<APIResponse> {
    return await this.delete('/verifyLogin');
  }

  async createAccount(userData: RegisterUserData): Promise<APIResponse> {
    const payload: Record<string, string> = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      title: userData.title || 'Mr',
      birth_date: userData.birth_date || '1',
      birth_month: userData.birth_month || '1',
      birth_year: userData.birth_year || '1990',
      firstname: userData.firstname,
      lastname: userData.lastname,
      company: userData.company || '',
      address1: userData.address1,
      address2: userData.address2 || '',
      country: userData.country,
      zipcode: userData.zipcode,
      state: userData.state,
      city: userData.city,
      mobile_number: userData.mobile_number,
    };
    return await this.post('/createAccount', payload);
  }

  async deleteAccount(params: { email: string; password?: string }): Promise<APIResponse> {
    return await this.delete('/deleteAccount', params);
  }

  async getUserDetailByEmail(email: string): Promise<APIResponse> {
    return await this.get('/getUserDetailByEmail', { email });
  }

  async updateAccount(userData: Partial<RegisterUserData> & { email: string; password?: string }): Promise<APIResponse> {
    return await this.put('/updateAccount', userData);
  }
}
