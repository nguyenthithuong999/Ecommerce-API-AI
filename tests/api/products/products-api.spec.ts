import { test, expect } from '@fixtures';

test.describe('Product & Brand API Suite', () => {
  test('GET All Products List - should return status 200 and product list', {
    tag: ['@TC_API_01', '@MOD_PRODUCT_API', '@smoke'],
  }, async ({ productApi, conf }) => {
    const response = await productApi.getAllProducts();
    expect(response.status()).toBe(conf.caseData.expectedCode);

    const body = await response.json();
    expect(body.responseCode).toBe(conf.caseData.expectedCode);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);

    const firstProduct = body.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
  });

  test('POST To All Products List - should return 405 Method Not Supported', {
    tag: ['@TC_API_02', '@MOD_PRODUCT_API', '@regression'],
  }, async ({ productApi, conf }) => {
    const response = await productApi.postToAllProducts();
    const body = await response.json();
    expect(body.responseCode).toBe(conf.caseData.expectedCode);
    expect(body.message).toContain(conf.caseData.expectedMessage);
  });

  test('GET All Brands List - should return status 200 and brand list', {
    tag: ['@TC_API_03', '@MOD_PRODUCT_API', '@smoke'],
  }, async ({ productApi, conf }) => {
    const response = await productApi.getAllBrands();
    expect(response.status()).toBe(conf.caseData.expectedCode);

    const body = await response.json();
    expect(body.responseCode).toBe(conf.caseData.expectedCode);
    expect(Array.isArray(body.brands)).toBe(true);
    expect(body.brands.length).toBeGreaterThan(0);

    const firstBrand = body.brands[0];
    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');
  });

  test('POST To Search Product with valid term - should return matched products', {
    tag: ['@TC_API_04', '@MOD_PRODUCT_API', '@regression'],
  }, async ({ productApi, conf }) => {
    const searchTerm = conf.caseData.searchTerm;
    const response = await productApi.searchProduct(searchTerm);
    expect(response.status()).toBe(conf.caseData.expectedCode);

    const body = await response.json();
    expect(body.responseCode).toBe(conf.caseData.expectedCode);
    expect(Array.isArray(body.products)).toBe(true);
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST To Search Product without parameter - should return 400 Bad Request', {
    tag: ['@TC_API_05', '@MOD_PRODUCT_API', '@regression'],
  }, async ({ productApi, conf }) => {
    const response = await productApi.searchProduct();
    const body = await response.json();
    expect(body.responseCode).toBe(conf.caseData.expectedCode);
    expect(body.message).toContain(conf.caseData.expectedMessage);
  });
});
