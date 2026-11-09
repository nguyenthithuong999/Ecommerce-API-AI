import { test, expect } from '@fixtures';

test.describe('Cart UI Suite', () => {
  test('Add Products to Cart and verify', {
    tag: ['@TC_UI_08', '@MOD_CART_UI', '@smoke'],
  }, async ({ conf, productsPage, cartPage }) => {
    const { firstProductIndex, secondProductIndex, expectedItemCount } = conf.caseData;

    // 1. Navigate to products
    await productsPage.navigate();
    await productsPage.verifyProductsPageVisible();

    // 2. Add first product
    await productsPage.addProductToCartByIndex(firstProductIndex);
    await productsPage.clickContinueShopping();

    // 3. Add second product
    await productsPage.addProductToCartByIndex(secondProductIndex);
    await productsPage.clickViewCartFromModal();

    // 4. Verify both products in cart
    await cartPage.verifyCartHasItems(expectedItemCount);
  });

  test('Remove Product from Cart', {
    tag: ['@TC_UI_09', '@MOD_CART_UI', '@regression'],
  }, async ({ conf, productsPage, cartPage }) => {
    const { productIndex, initialItemCount, expectedItemCountAfterDelete } = conf.caseData;

    // 1. Navigate to products and add item
    await productsPage.navigate();
    await productsPage.addProductToCartByIndex(productIndex);
    await productsPage.clickViewCartFromModal();

    // 2. Verify item exists
    await cartPage.verifyCartHasItems(initialItemCount);

    // 3. Remove product
    await cartPage.removeCartItemByIndex(0);

    // 4. Verify item removed
    await expect(cartPage.cartItems).toHaveCount(expectedItemCountAfterDelete);
  });
});
