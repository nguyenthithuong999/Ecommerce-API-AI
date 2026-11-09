import { test, expect } from '@fixtures';

test.describe('Products UI Suite', () => {
  test('Verify All Products page and Product Detail page', {
    tag: ['@TC_UI_06', '@MOD_PRODUCT_UI', '@smoke'],
  }, async ({ conf, productsPage }) => {
    // 1. Navigate to Products page
    await productsPage.navigate();
    await productsPage.verifyProductsPageVisible();

    // 2. Click on 'View Product' of first product
    await productsPage.clickFirstProductView();

    // 3. Verify product details are visible
    await productsPage.verifyProductDetailsVisible();
  });

  test('Search Product with keyword', {
    tag: ['@TC_UI_07', '@MOD_PRODUCT_UI', '@regression'],
  }, async ({ conf, productsPage }) => {
    const { searchKeyword } = conf.caseData;

    // 1. Navigate to Products page
    await productsPage.navigate();
    await productsPage.verifyProductsPageVisible();

    // 2. Search for a product
    await productsPage.searchProduct(searchKeyword);

    // 3. Verify searched products are displayed
    await productsPage.verifySearchedProductsVisible();
  });
});
