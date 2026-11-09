import { APIRequestContext, APIResponse } from '@playwright/test';
import globalData from '@data/global.json';

// Ưu tiên: biến môi trường CI → fallback về global.json
const API_BASE_URL = process.env.API_BASE_URL || globalData.apiBaseUrl;

export class BaseApi {
  protected request: APIRequestContext;
  protected baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string = API_BASE_URL) {
    this.request = request;
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  protected async get(endpoint: string, params?: Record<string, string | number>): Promise<APIResponse> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    return await this.request.get(url, { params });
  }

  protected async post(endpoint: string, data?: Record<string, any>, isFormData = true): Promise<APIResponse> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    if (isFormData && data) {
      return await this.request.post(url, { form: data });
    }
    return await this.request.post(url, { data });
  }

  protected async put(endpoint: string, data?: Record<string, any>, isFormData = true): Promise<APIResponse> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    if (isFormData && data) {
      return await this.request.put(url, { form: data });
    }
    return await this.request.put(url, { data });
  }

  protected async delete(endpoint: string, data?: Record<string, any>, isFormData = true): Promise<APIResponse> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    if (isFormData && data) {
      return await this.request.delete(url, { form: data });
    }
    return await this.request.delete(url, { data });
  }
}
