import { test as base } from '@playwright/test';
import { AuthApi } from '@pages/api/auth/auth.api';
import { ProductApi } from '@pages/api/products/product.api';

export interface ApiFixtures {
  authApi: AuthApi;
  productApi: ProductApi;
}

export const test = base.extend<ApiFixtures>({
  authApi: async ({ request }, use) => {
    const authApi = new AuthApi(request);
    await use(authApi);
  },
  productApi: async ({ request }, use) => {
    const productApi = new ProductApi(request);
    await use(productApi);
  },
});

export { expect } from '@playwright/test';
